import React, { Component } from "react";
import { decorate, observable } from "mobx";
import { Route } from "react-router-dom";
import MainAppBar from "./components/MainAppBar";
import Create from "./pages/create";
import Plan from "./pages/plan";

//define stores that need to be accessed at the global level

/**
 * Manages the changes to the equipment set that we are focusing on
 */

class CustomEquipmentSet {
  bonuses = {
    immediate: []
  };

  pieces = {};
  decorations = {};
}

decorate(CustomEquipmentSet, {
  bonuses: observable,
  pieces: observable,
  decorations: observable
});

class App extends Component {
  render() {
    return (
      <div>
        <Route path="/" component={() => <MainAppBar />} />
        <Route exact path="/" component={() => <div>Landing Page</div>} />
        <Route path="/plan" component={() => <Plan />} />
        <Route path="/create" component={() => <Create />} />
      </div>
    );
  }
}

export default App;
