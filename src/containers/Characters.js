import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagintation from "../components/Pagination";
import { Link } from "react-router-dom";

const Characters = ({ setId }) => {
  const [datas, setDatas] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const limit = 100;
    const apikey = process.env.REACT_APP_KEY_PUBLIC;
    const hash = process.env.REACT_APP_HASH;

    const fetchData = async () => {
      const response = await axios.get(
        `http://gateway.marvel.com/v1/public/characters?offset=${offset}&limit=${limit}&ts=1&apikey=${apikey}&hash=${hash}`
      );
      setDatas(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, [page]);

  return (
    <div>
      {isLoading ? (
        <p>En cours de chargement ...</p>
      ) : (
        <div className="all-card">
          {datas.data.results.map((character) => {
            return (
              <div className="card">
                <div>
                  <Link
                    key={character.id}
                    to={"/characters/" + character.id}
                    onClick={() => {
                      setId(character.id);
                    }}
                  >
                    <div className="box-characters">
                      <img
                        className="img-characteres"
                        src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                      ></img>
                      <h2>{character.name}</h2>
                      <p className="text-characters">{character.description}</p>
                    </div>
                  </Link>
                </div>
              </div>
            );
          })}

          <Pagintation
            limit={datas.data.limit}
            total={datas.data.total}
            setPage={setPage}
            setOffset={setOffset}
          />
        </div>
      )}
    </div>
  );
};
export default Characters;
