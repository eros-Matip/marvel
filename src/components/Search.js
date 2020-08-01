import React, { useState } from "react";
import axios from "axios";

function Search({ setDatas }) {
  const [search, setSearch] = useState("");
  const apikey = process.env.REACT_APP_KEY_PUBLIC;
  const hash = process.env.REACT_APP_HASH;

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.get(
      `http://gateway.marvel.com/v1/public/characters?name=${search}&ts=1&apikey=${apikey}&hash=${hash}`
    );
    setDatas(response.data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="search ..."
          onChange={handleSearch}
        ></input>
        <button type="submit">search</button>
      </form>
    </div>
  );
}

export default Search;
