import React, { useState } from "react";
import Header from "./components/Header";
import Footer from "./containers/Footer";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";
import "./App.css";

import Home from "./containers/Home";
import Characters from "./containers/Characters";
import Description from "./containers/Description";
import Comics from "./containers/Comics";
import SignUp from "./containers/SignUp";
import LogIn from "./containers/LogIn";

//

const App = () => {
  const [id, setId] = useState("");
  const [search, setSearch] = useState({});
  const [location, setLocation] = useState("");
  const [fetched, setFetched] = useState({});

  let locationUrl = "";

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (location === "/comics") {
      locationUrl = "/comics?titleStartsWith=";
    }
    if (location === "/characters") {
      locationUrl = "/characters?nameStartsWith=";
    }
    const response = await axios.get(
      `http://gateway.marvel.com/v1/public${locationUrl}${search}&${process.env.REACT_APP_TS_HASH}`
    );
    setFetched(response.data);
  };

  return (
    <div className="page">
      <Router>
        <Header handleSearch={handleSearch} handleSubmit={handleSubmit} />

        {/* <Favoris className="white" /> */}

        <Switch>
          <Route path="/logIn">
            <LogIn />
          </Route>
          <Route path="/signUp">
            <SignUp />
          </Route>
          <Route path="/comics">
            <Comics
              setLocation={setLocation}
              fetched={fetched}
              setFetched={setFetched}
            />
          </Route>
          <Route path="/characters/:id">
            <Description id={id} />
          </Route>
          <Route path="/characters">
            <Characters
              setId={setId}
              setLocation={setLocation}
              fetched={fetched}
              setFetched={setFetched}
            />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>

      <Footer app="React" school="Le Réacteur" name="Eros" />
    </div>
  );
};

export default App;
