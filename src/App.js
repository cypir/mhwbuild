import React, { Component } from "react";
import { Route } from "react-router-dom";
import MainAppBar from "./components/MainAppBar";
import Create from "./pages/create";
import Plan from "./pages/plan";
import Index from "./pages/index";
import CssBaseline from "material-ui/CssBaseline";
import { withStyles } from "material-ui/styles";
import "typeface-roboto";
import DevTools from "mobx-react-devtools";

import CustomEquipmentSetStore from "./stores/CustomEquipmentSetStore";
import { MuiThemeProvider, createMuiTheme } from "material-ui/styles";

import blue from "material-ui/colors/blue";
import indigo from "material-ui/colors/indigo";
import pink from "material-ui/colors/pink";
import { darken } from "material-ui/styles/colorManipulator";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: blue,
    secondary: {
      // Darken so we reach the AA contrast ratio level.
      main: pink.A700
    }
  },
  overrides: {
    MuiAppBar: {
      colorPrimary: {
        backgroundColor: indigo["500"]
      }
    }
  }
});

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
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          {process.env.NODE_ENV === "development" ? <DevTools /> : null}
          <Route path="/" component={() => <MainAppBar />} />
          <div className={classes.content}>
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
        </MuiThemeProvider>
      </div>
    );
  }
}

export default withStyles(styles)(App);
