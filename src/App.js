import React, { useState } from "react";
import Header from "./components/Header";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import Characters from "./containers/Characters";
import Description from "./containers/Description";
import Comics from "./containers/Comics";
import axios from "axios";
import Pagination from "./components/Pagination";
import SignUp from "./containers/SignUp";
import LogIn from "./containers/LogIn";
import "./App.css";

const App = () => {
  const [id, setId] = useState("");
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState({});
  const [location, setLocation] = useState("");
  const [data, setData] = useState({});
  const [offset, setOffset] = useState(0);

  const limit = 100;
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
    setData(response.data);
  };
  return (
    <div className="page">
      <Router>
        <Header
          handleSearch={handleSearch}
          handleSubmit={handleSubmit}
          data={setData}
        />
        <Switch>
          <Route path="/logIn">
            <LogIn />
          </Route>
          <Route path="/signUp">
            <SignUp />
          </Route>
          <Route path="/comics">
            <Comics
              setId={setId}
              setLocation={setLocation}
              data={data}
              setData={setData}
              setPage={setPage}
              offset={offset}
              setOffset={setOffset}
            />
          </Route>
          <Route path="/characters/:id">
            <Description id={id} />
          </Route>
          <Route path="/characters">
            <Characters
              setId={setId}
              setLocation={setLocation}
              data={data}
              setData={setData}
              page={page}
              setPage={setPage}
              offset={offset}
              setOffset={setOffset}
            />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
      <Pagination
        limit={limit}
        total={data.total}
        page={page}
        setPage={setPage}
        offset={offset}
        setOffset={setOffset}
      />
    </div>
  );
};

export default App;
