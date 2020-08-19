import React, { useEffect, useState } from "react";
import axios from "axios";
const Favoris = () => {
  const [fetched, setFetched] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const apikey = process.env.REACT_APP_KEY_PUBLIC;
    const hash = process.env.REACT_APP_HASH;

    const fetchData = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/favorite`
      );
      setFetched(response.data);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div>
      {isLoading ? (
        <h1 className="box-favoris">patienter ...</h1>
      ) : (
        <div className="box-favoris">
          <div className="window-favoris">
            <div className="div-favoris">Hello FAvoris </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Favoris;
