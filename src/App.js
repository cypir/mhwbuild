import React, { Component } from "react";
import { Route } from "react-router-dom";
import MainAppBar from "./components/MainAppBar";
import Create from "./pages/create";
import Plan from "./pages/plan";
import Index from "./pages/index";
import CssBaseline from "material-ui/CssBaseline";
import { withStyles } from "material-ui/styles";
import DevTools from "mobx-react-devtools";
import "typeface-roboto";

import CustomEquipmentSetStore from "./stores/CustomEquipmentSetStore";

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

const customEquipmentSetStore = new CustomEquipmentSetStore();

class App extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <CssBaseline />
        <Route path="/" component={() => <MainAppBar />} />
        <div className={classes.content}>
          <DevTools />
          <Route exact path="/" component={() => <Index />} />
          <Route
            path="/plan"
            component={() => (
              <Plan customEquipmentSetStore={customEquipmentSetStore} />
            )}
          />
          <Route
            path="/create"
            component={() => (
              <Create customEquipmentSetStore={customEquipmentSetStore} />
            )}
          />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(App);
