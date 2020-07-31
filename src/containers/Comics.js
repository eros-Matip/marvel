import React, { useState, useEffect } from "react";
import axios from "axios";

const Comics = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `http://gateway.marvel.com/v1/public/comics?${process.env.REACT_APP_TS_HASH}`
      );
      setData(response.data.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);
  console.log("data->", data);

  return (
    <>
      {isLoading ? (
        <p>Veuillez patienter pendant le chargement ...</p>
      ) : (
        <div className="all-comics">
          {data.results.map((comic) => {
            return (
              <div className="box-comics">
                <img
                  className="img-comics"
                  src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                ></img>
                <h2>{comic.title}</h2>
                <p>{comic.description}</p>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};
export default Comics;
