import React, { useState, useEffect } from "react";
import Pagination from "../components/Pagination";
import axios from "axios";
import { useLocation } from "react-router-dom";
import ReactLoading from "react-loading";

const Comics = ({ setLocation, fetched, setFetched }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const [page, setPage] = useState(0);
  const location = useLocation();

  const limit = 100;

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `http://gateway.marvel.com/v1/public/comics?offset=${offset}&limit=${limit}&${process.env.REACT_APP_TS_HASH}`
      );

      setFetched(response.data.data);
      setIsLoading(false);
    };
    fetchData();
  }, [page]);

  setLocation(location.pathname);

  return (
    <div className="page-comics">
      {isLoading ? (
        <h1 className="waiting">
          Veuillez patienter pendant le chargement
          <ReactLoading type={"cylon"} />
        </h1>
      ) : (
        <div className="all-comics">
          {fetched.results.map((comic) => {
            return (
              <div key={comic.id} className="box-comics">
                <div>
                  <img
                    alt={comic.name}
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
          <div className="pagination">
            <Pagination
              className="pagination"
              limit={limit}
              total={fetched.total}
              setPage={setPage}
              offset={offset}
              setOffset={setOffset}
            />
          </div>
        </div>
      )}
    </div>
  );
};
export default Comics;
