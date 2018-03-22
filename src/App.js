import React, { Component } from "react";
import { decorate, observable } from "mobx";
import { Route } from "react-router-dom";
import MainAppBar from "./components/MainAppBar";
import Create from "./pages/create";
import Plan from "./pages/plan";
import CssBaseline from "material-ui/CssBaseline";
import { withStyles } from "material-ui/styles";
import "typeface-roboto";

//css base config
const styles = theme => ({
  content: {
    marginTop: "16px",
    marginLeft: "150px",
    marginRight: "150px",

    [theme.breakpoints.down("sm")]: {
      marginLeft: "5px",
      marginRight: "5px"
    }
  }
});

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
    const { classes } = this.props;
    return (
      <div>
        <CssBaseline />
        <Route path="/" component={() => <MainAppBar />} />
        <div className={classes.content}>
          <Route exact path="/" component={() => <div>Landing Page</div>} />
          <Route path="/plan" component={() => <Plan />} />
          <Route path="/create" component={() => <Create />} />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(App);
