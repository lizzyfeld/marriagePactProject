import "./App.css";
import React from "react";
import HomePage from "./HomePage/HomePage";
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      {/* <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/:id" component={UserPage} />
      </Switch> */}
      <HomePage />
    </div>
  );
}

export default App;
