import React, { useState } from "react";
import Header from "./components/Header";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import Characters from "./containers/Characters";
import Description from "./containers/Description";
import Comics from "./containers/Comics";
import "./App.css";

const App = () => {
  const [id, setId] = useState("");

  return (
    <div className="page">
      <Router>
        <Switch>
          <Route path="/comics">
            <Comics />
          </Route>
          <Route path="/characters/:id">
            <Description id={id} />
          </Route>
          <Route path="/characters">
            <Characters setId={setId} />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
