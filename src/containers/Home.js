import React from "react";
import Picture from "../img/home.png";
import Logo from "../img/logo.png";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="home">
        <div className="box-home">
          <div>
            <img className="logo-home" home src={Logo}></img>
          </div>
          <div className="menu-home">
            <Link to="/">
              <h3 className="text-home">LogIn/SignUp</h3>
            </Link>

            <Link to="/characters">
              <h3 className="text-home">Characters</h3>
            </Link>

            <Link to="/comics">
              <h3 className="text-home">Comics</h3>
            </Link>
          </div>
        </div>
        <img className="img-home" src={Picture}></img>
      </div>
    </>
  );
};

export default Home;
