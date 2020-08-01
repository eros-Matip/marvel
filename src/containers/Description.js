import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Header from "../components/Header";

const Description = () => {
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const [dataComics, setDataComics] = useState({});

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
  console.log("data->", data);

  console.log("dataComics->", dataComics);

  return (
    <div className="page-description">
      <Header data={data} setData={setData} />
      {isLoading ? (
        <h1 className="waiting">Your comics comming soon ...</h1>
      ) : (
        <div className="all-description">
          <div>
            {data.map((description) => {
              return (
                <div key={description.id}>
                  <div className="box-description">
                    <h1>{description.name}</h1>
                    <p>{description.description}</p>
                    <img
                      className="img.description"
                      src={`${description.thumbnail.path}.${description.thumbnail.extension}`}
                    ></img>
                  </div>

                  <div className="box-comic">
                    {dataComics.map((comic) => {
                      return (
                        <div key={comic.id}>
                          <h2>{comic.title}</h2>

                          <img
                            className="img-comic"
                            src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                          ></img>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Description;
