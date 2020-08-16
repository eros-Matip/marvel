import React, { useState, useEffect } from "react";
import axios from "axios";
import Description from "./Description";
import Pagination from "../components/Pagination";
import { Link, useLocation } from "react-router-dom";
import ReactLoading from "react-loading";

const Characters = ({ setId, setLocation, fetched, setFetched }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const [page, setPage] = useState(0);

  const [hidden, sethidden] = useState(true);
  const [pushed, setPushed] = useState(false);
  const location = useLocation();

  const limit = 100;
  setLocation(location.pathname);

  useEffect(() => {
    const apikey = process.env.REACT_APP_KEY_PUBLIC;
    const hash = process.env.REACT_APP_HASH;

    const fetchData = async () => {
      const response = await axios.get(
        `http://gateway.marvel.com/v1/public/characters?&offset=${offset}&limit=${limit}&ts=1&apikey=${apikey}&hash=${hash}`
      );
      setFetched(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, [page]);

  return (
    <div>
      {hidden ? (
        <div>
          {isLoading ? (
            <h1 className="waiting">
              is Loading <ReactLoading type={"spinningBubbles"} />
            </h1>
          ) : (
            <div className="all-card">
              {fetched.data.results.map((character) => {
                return (
                  <div className="card" key={character.id}>
                    <button
                      className="btn-star"
                      onClick={() => {
                        setPushed(!pushed);
                        // localStorage.setItem(
                        //   `${"Favoris"}`,
                        //   JSON.stringify(
                        //     `{name:${character.name}`,
                        //     `image: {${character.thumbnail.path}.${character.thumbnail.extension}}`
                        //   )
                        // );
                      }}
                    >
                      {pushed ? (
                        <i className="fas fa-star"></i>
                      ) : (
                        <i className="far fa-star"></i>
                      )}
                    </button>
                    <div>
                      <Link
                        key={character.id}
                        to={"/characters/" + character.id}
                        onClick={() => {
                          setId(character.id);
                          sethidden(false);
                        }}
                      >
                        <div className="box-characters">
                          <img
                            alt={character.name}
                            className="img-characters"
                            src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                          ></img>

                          <h2 className="h2-characters">{character.name}</h2>

                          <p className="text-characters">
                            {character.description}
                          </p>
                        </div>
                      </Link>
                    </div>
                  </div>
                );
              })}
              <div className="pagination">
                <Pagination
                  limit={limit}
                  total={fetched.data.total}
                  setPage={setPage}
                  offset={offset}
                  setOffset={setOffset}
                />
              </div>
            </div>
          )}
        </div>
      ) : (
        <Description />
      )}
    </div>
  );
};
export default Characters;
