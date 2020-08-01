import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "../components/Pagination";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Cookies from "js-cookie";

const Characters = ({ setId }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [offset, setOffset] = useState(0);
  const [data, setData] = useState({});
  const [datas, setDatas] = useState({});
  const [favoris, setFavoris] = useState(false);

  const handleClick = () => {
    setFavoris(true);
  };

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
      <Header data={data} setData={setData} />

      {isLoading ? (
        <p>En cours de chargement ...</p>
      ) : (
        <div className="all-card">
          {datas.data.results.map((character) => {
            return (
              <div className="card">
                <div>
                  {favoris
                    ? Cookies.set("id", character.id)
                    : Cookies.remove("id", character.id)}
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
                      <h2 className="h2-characters">{character.name}</h2>

                      <p className="text-characters">{character.description}</p>
                    </div>
                  </Link>
                  <input
                    type="checkbox"
                    id="favoris"
                    name="favoris"
                    onClick={handleClick}
                  ></input>
                </div>
              </div>
            );
          })}

          <Pagination
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
