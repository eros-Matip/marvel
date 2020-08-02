import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import Logo from "../img/logo.png";

function Header({ handleSearch, handleSubmit, search }) {
  const [hidden, setHidden] = useState(false);

  let history = useHistory();

  const onclickHidden = () => {
    setHidden(!hidden);
  };
  const handleChangeCharacters = () => {
    history = "/characters";
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
