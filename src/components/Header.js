import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Logo from "../img/logo.png";
import Cookies from "js-cookie";

function Header({ handleSearch, handleSubmit }) {
  const name = Cookies.get("username");
  const [hidden, setHidden] = useState(false);
  const [log, setlog] = useState(true);

  let history = useHistory();

  const onclickHidden = () => {
    setHidden(!hidden);
  };
  const handleChangeCharacters = () => {
    history.push("/characters");
  };

  const handleClick = () => {
    Cookies.remove("username");
    history.push("/home");
    setlog(!log);
  };

  const handleClicklogin = () => {
    setlog(!log);
  };
  console.log("name->", name);

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
          {name ? (
            <div>
              <p className="name-header">{name}</p>
              <button onClick={handleClick}>Se Déconnecter</button>
            </div>
          ) : (
            <div>
              <Link to="signUp">
                <button className="signUp" onClick={handleClicklogin}>
                  SignUp
                </button>
              </Link>
              <Link to="logIn">
                <button className="logIn" onClick={handleClicklogin}>
                  logIn
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
