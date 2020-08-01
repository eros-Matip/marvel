import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import Logo from "../img/logo.png";

function Header({ setData }) {
  const [search, setSearch] = useState("");
  const [hidden, setHidden] = useState(false);
  const apikey = process.env.REACT_APP_KEY_PUBLIC;
  const hash = process.env.REACT_APP_HASH;

  let history = useHistory();

  const handleSearch = (event) => {
    event.preventDefault();
    event.target.value !== "" && setSearch(event.target.value.toLowerCase());
  };

  const onclickHidden = () => {
    setHidden(!hidden);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.get(
      `http://gateway.marvel.com/v1/public/characters?name=${search}&ts=1&apikey=${apikey}&hash=${hash}`
    );
    setData(response.data);
  };
  const handleChangeCharacters = () => {
    history.push("/");
  };

  return (
    <div className="header">
      <div className="box-header">
        <div className="header-box-left">
          <Link to="/">
            <img alt="logo" src={Logo} className="logo-header"></img>
          </Link>
          {!hidden ? (
            <div onClick={onclickHidden}>
              <i className="fas fa-search"></i>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                defaultValue={search}
                placeholder="search ..."
                onChange={handleSearch}
              ></input>
              <button type="submit">search</button>
            </form>
          )}
        </div>

        <div className="header-box-right">
          <Link to="/characters">
            <button className="characters" onClick={handleChangeCharacters}>
              Characters
            </button>
          </Link>

          <Link to="/comics">
            <button className="comics">Comics</button>
          </Link>
          <button className="sign-in">Sign In / logIn</button>
        </div>
      </div>
    </div>
  );
}

export default Header;
