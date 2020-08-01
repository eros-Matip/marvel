import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Pagination from "../components/Pagination";
import axios from "axios";
import Cookies from "js-cookie";

const Comics = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const [page, setPage] = useState(0);
  const [favoris, setFavoris] = useState(false);

  const limit = 100;

  const handleClick = () => {
    setFavoris(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `http://gateway.marvel.com/v1/public/comics?offset=${offset}&limit=${limit}&${process.env.REACT_APP_TS_HASH}`
      );
      setData(response.data.data);
      setIsLoading(false);
    };
    fetchData();
  }, [page]);
  console.log("data->", data);

  return (
    <div className="page-comics">
      <Header data={data} setData={setData} />

      {isLoading ? (
        <h1 className="waiting">
          Veuillez patienter pendant le chargement ...
        </h1>
      ) : (
        <div className="all-comics">
          {data.results.map((comic) => {
            return (
              <div key={comic.id} className="box-comics">
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
                <h2 className="h2-comics">{comic.title}</h2>
                {comic.description ? (
                  <p className="text-comics">{comic.description}</p>
                ) : (
                  <h2 className="comics-soon">description comming soon ...</h2>
                )}
              </div>
            );
          })}
        </div>
      )}
      <Pagination
        limit={data.limit}
        total={data.total}
        setPage={setPage}
        setOffset={setOffset}
      />
    </div>
  );
};
export default Comics;
