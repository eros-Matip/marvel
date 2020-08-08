import React, { useEffect, useState } from "react";
import axios from "axios";
const Favoris = (setHiddenFavoris) => {
  const [fetched, setFetched] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const apikey = process.env.REACT_APP_KEY_PUBLIC;
    const hash = process.env.REACT_APP_HASH;

    const fetchData = async () => {
      const response = await axios.get(
        `http://gateway.marvel.com/v1/public/characters?ts=1&apikey=${apikey}&hash=${hash}`
      );
      setFetched(response.data);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div>
      {isLoading ? (
        <h1>patienter ...</h1>
      ) : (
        <div className="box-favoris">
          <div className="window-favoris">
            <div className="div-favoris">Hello FAvoris 2</div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Favoris;
