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
                    <div>
                      <div className="img-modal">
                        <h1>{description.name}</h1>
                        {/* <p>{description.description}</p> */}
                      </div>
                      <div>
                        <img
                          className="img-description"
                          src={`${description.thumbnail.path}.${description.thumbnail.extension}`}
                        ></img>
                      </div>
                    </div>

                    <div className="box-comic">
                      {dataComics.map((comic) => {
                        return (
                          <div key={comic.id}>
                            <div>
                              <img
                                className="img-comic"
                                src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                              ></img>
                            </div>
                            <div>
                              <h2>{comic.title}</h2>
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
