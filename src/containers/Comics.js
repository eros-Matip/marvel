import React, { useState, useEffect } from "react";
import Pagination from "../components/Pagination";
import axios from "axios";
import Cookies from "js-cookie";
import { useLocation } from "react-router-dom";

const Comics = ({ setId, setLocation, data, setData, offset }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [,] = useState(0);
  const [page, setPage] = useState(0);
  const [favoris, setFavoris] = useState(false);
  const location = useLocation();

  const limit = 100;

  const handleClick = () => {
    setFavoris(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `http://gateway.marvel.com/v1/public/comics?offset=${offset}&limit=${limit}&${process.env.REACT_APP_TS_HASH}`
      );
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, [page]);
  setLocation(location.pathname);

  return (
    <div className="page-comics">
      {isLoading ? (
        <h1 className="waiting">
          Veuillez patienter pendant le chargement ...
        </h1>
      ) : (
        <div className="all-comics">
          {data.data.results.map((comic) => {
            return (
              <div key={comic.id} className="box-comics">
                <div>
                  <input
                    type="checkbox"
                    id="favoris"
                    name="favoris"
                    onClick={handleClick}
                  ></input>
                  <img
                    className="img-comics"
                    src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                  ></img>
                </div>
                <div className="box-comics-pictures">
                  <h2 className="h2-comics">{comic.title}</h2>
                  {comic.description ? (
                    <p className="text-comics">{comic.description}</p>
                  ) : (
                    <h2 className="comics-soon">
                      description comming soon ...
                    </h2>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
      <Pagination limit={data.limit} total={data.total} setPage={setPage} />
    </div>
  );
};
export default Comics;
