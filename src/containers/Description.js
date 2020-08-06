import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import Header from "../components/Header";
import ReactLoading from "react-loading";

function Description() {
  const { id } = useParams();
  let history = useHistory();

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const [dataComics, setDataComics] = useState({});
  const [visible, setVisible] = useState(true);

  const hiddenModalChange = () => {
    setVisible(false);
    history.push("/characters");
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `http://gateway.marvel.com/v1/public/characters/${id}?${process.env.REACT_APP_TS_HASH}`
      );
      const responseComics = await axios.get(
        `http://gateway.marvel.com/v1/public/characters/${id}/comics?${process.env.REACT_APP_TS_HASH}`
      );
      setDataComics(responseComics.data.data.results);
      setData(response.data.data.results);
      setIsLoading(false);
    };

    fetchData();
  }, [id]);

  return (
    <div className="page-description">
      <Header data={data} setData={setData} />

      {isLoading ? (
        <h1 className="waiting">
          Your comics comming soon <ReactLoading type={"spinningBubbles"} />
        </h1>
      ) : (
        <div className="box-all-modal">
          <button className="btn-close-modal" onClick={hiddenModalChange}>
            x
          </button>
          <div className="all-modal">
            {data.map((description) => {
              return (
                <div
                  style={{
                    transform: visible
                      ? "translateY(0vh"
                      : "translateY(-100vh)",
                    opacity: visible ? "1" : "0",
                  }}
                  key={description.id}
                >
                  <div className="modal">
                    <div className="img-description-modal">
                      <img
                        alt={description.name}
                        className="img-description"
                        src={`${description.thumbnail.path}.${description.thumbnail.extension}`}
                      ></img>

                      <div className="details-modal">
                        <h1 className="h1-description">{description.name}</h1>

                        <p className="p-description">
                          {description.description}
                        </p>
                      </div>
                    </div>

                    <div className="box-modal">
                      {dataComics.map((modal) => {
                        return (
                          <div className="all-modal-magazin" key={modal.id}>
                            <div className="all-img-modal">
                              <img
                                alt={description.name}
                                className="img-modal"
                                src={`${modal.thumbnail.path}.${modal.thumbnail.extension}`}
                              ></img>
                            </div>
                            <div className="text-modal">
                              <h2 className="h2-modal">{modal.title}</h2>
                              <p className="p-modal">{modal.description}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default Description;
