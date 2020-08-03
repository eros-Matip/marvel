import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import Header from "../components/Header";

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
        <h1 className="waiting">Your comics comming soon ...</h1>
      ) : (
        <div>
          <div className="all-description">
            {data.map((description) => {
              return (
                <div
                  style={{
                    transform: visible
                      ? "translateY(0vh"
                      : "translateY(-100vh)",
                    opacity: visible ? "1" : "0",
                  }}
                >
                  <button onClick={hiddenModalChange}>x</button>
                  <div key={description.id} className="box-description">
                    <div className="img-comic-description">
                      <div className="box-img-decription">
                        <img
                          className="img-description"
                          src={`${description.thumbnail.path}.${description.thumbnail.extension}`}
                        ></img>
                      </div>
                      <div className="img-modal">
                        <h1 className="h1-description">{description.name}</h1>
                        <p className="p-description">
                          {description.description}
                        </p>
                      </div>
                    </div>

                    <div className="box-comic">
                      {dataComics.map((comic) => {
                        return (
                          <div className="all-div-comic" key={comic.id}>
                            <div className="all-img-comic">
                              <img
                                className="img-comic"
                                src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                              ></img>
                            </div>
                            <div className="text-comics">
                              <h2 className="h2-comics">{comic.title}</h2>
                              <p className="p-comics">{comic.description}</p>
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
