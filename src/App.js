import React, { Component } from "react";
import Navigation from "./Components/Navigation";
import Signup from "./Components/Signup";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Authentication from "./Components/Authentication";
import CloudStorage from "./Components/CloudStorage/CloudStorage";

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Navigation />

        <Switch>
          <Route path="/auth" component={Authentication} />
          <Route path="/firestore" component={CloudStorage} />
          <Route path="/" component={Signup} />
        </Switch>
      </BrowserRouter>
    );
  }
}
