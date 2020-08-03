import React from "react";
import Picture from "../img/home.png";
import Logo from "../img/logo.png";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="home">
        <img className="img-home" src={Picture}></img>
      </div>
    </>
  );
};

export default Home;
