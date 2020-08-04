import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Logo from "../img/logo.png";
import Cookies from "js-cookie";

function Header({ handleSearch, handleSubmit }) {
  const name = Cookies.get("username");
  const [hidden, setHidden] = useState(false);
  const [log, setlog] = useState(true);

  const handleClickSubmit = () => {
    setHidden(false);
  };

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
                className="input-search"
                type="text"
                placeholder="search ..."
                onChange={handleSearch}
              ></input>
              <button className="btn-search" type="submit">
                search
              </button>
              <button
                className="btn-searchClose"
                type="checked"
                onClick={handleClickSubmit}
              >
                X
              </button>
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
            <div className="unlog">
              <p className="name-header">{name}</p>
              <button className="btn-unlog" onClick={handleClick}>
                <strong>Se Déconnecter</strong>
              </button>
            </div>
          ) : (
            <div className="logInSignUp">
              <Link to="signUp">
                <button className="btn-signUp" onClick={handleClicklogin}>
                  SignUp
                </button>
              </Link>
              <p className="white">/</p>
              <Link to="logIn">
                <button className="btn-logIn" onClick={handleClicklogin}>
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
