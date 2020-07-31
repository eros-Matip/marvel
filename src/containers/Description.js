import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

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
    <div>
      {isLoading ? (
        <p>Chargement en cours ...</p>
      ) : (
        <div>
          <div>
            {data.map((description) => {
              return (
                <div key={description.id}>
                  <h1>{description.name}</h1>
                  <p>{description.description}</p>
                  <img
                    src={`${description.thumbnail.path}.${description.thumbnail.extension}`}
                  ></img>
                  <div>
                    {dataComics.map((comic) => {
                      return (
                        <div key={comic.id}>
                          <h2>{comic.title}</h2>

                          <img
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
