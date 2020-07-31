import React from "react";
import { Link } from "react-router-dom";
import Logo from "../img/logo.png";

function Header() {
  return (
    <div className="header">
      <div className="box-header">
        <div>
          <Link to="/">
            <img alt="logo" src={Logo} className="logo-header"></img>
          </Link>
        </div>
        <div className="header-box-right">
          <Link to="/characters">
            <button className="characters">Characters</button>
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
