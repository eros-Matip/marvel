import React, { useEffect, useState } from "react";
import axios from "axios";
const Favoris = () => {
  const [fetched, setFetched] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [idFetched, setIdFetched] = useState({});
  const [cookie, setCookie] = useState({});

  console.log("idFetched->", idFetched);
  console.log("cookie->", cookie);

  const cardFavoris = localStorage.getItem("favoris");
  const tab = cardFavoris.split("-");
  const apikey = process.env.REACT_APP_KEY_PUBLIC;
  const hash = process.env.REACT_APP_HASH;

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `http://gateway.marvel.com/v1/public/characters/1016823?&ts=1&apikey=${apikey}&hash=${hash}`
      );
      setFetched(response.data.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  console.log("tab->", tab);

  return (
    <div>
      {isLoading ? (
        <h1>patienter ...</h1>
      ) : (
        <div>
          <div className="window-favoris">Hello FAvoris</div>
          {fetched.results.map((favory) => {
            return (
              <div>
                <h1 className="white">{favory.name}</h1>
                <img
                  src={`${favory.thumbnail.path}.${favory.thumbnail.extension} `}
                  width={100}
                ></img>
                {tab.map((id) => {
                  console.log("id->", id);
                  const fetchCookie = async () => {
                    const responseCookie = await axios.get(
                      `http://gateway.marvel.com/v1/public/characters/${id}?&ts=1&apikey=${apikey}&hash=${hash}`
                    );
                    console.log("responseCookie.data->", responseCookie.data);
                  };
                  fetchCookie();
                  return <p className="white">{id}</p>;
                })}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default Favoris;
