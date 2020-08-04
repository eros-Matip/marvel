import React, { useState, useEffect } from "react";
import axios from "axios";
import Description from "./Description";
import Pagination from "../components/Pagination";
import { Link, useLocation } from "react-router-dom";

const Characters = ({
  setId,
  setLocation,
  data,
  setData,
  // page,
  // offset,
  // setPage,
  // setOffset,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const [page, setPage] = useState(0);

  // const [favoris, setFavoris] = useState(false);
  const [hidden, sethidden] = useState(true);
  const location = useLocation();
  console.log(setId);

  console.log("data->", data);
  console.log("page->", page);
  console.log("offset->", offset);

  const limit = 100;

  useEffect(() => {
    const apikey = process.env.REACT_APP_KEY_PUBLIC;
    const hash = process.env.REACT_APP_HASH;

    const fetchData = async () => {
      const response = await axios.get(
        `http://gateway.marvel.com/v1/public/characters?&offset=${offset}&limit=${limit}&ts=1&apikey=${apikey}&hash=${hash}`
      );
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, [page]);
  setLocation(location.pathname);

  return (
    <div>
      {hidden ? (
        <div>
          {isLoading ? (
            <h1 className="waiting">is Loading ...</h1>
          ) : (
            <div className="all-card">
              {data.data.results.map((character) => {
                return (
                  <div className="card" key={character.id}>
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
              <div className="coucou">
                <Pagination
                  className="pagination"
                  limit={limit}
                  total={data.total}
                  setPage={setPage}
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
