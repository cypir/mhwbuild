import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

import IconButton from "@material-ui/core/IconButton";
import GitHubIcon from "./GitHubIcon";
import { withRouter } from "react-router-dom";

const styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flex: 1
  }
};

class MainAppBar extends Component {
  render() {
    const { classes, history } = this.props;
    return (
      <div>
        <AppBar position="static" className={classes.root}>
          <Toolbar>
            <Typography
              variant="title"
              color="inherit"
              className={classes.flex}
            >
              MHW Build
            </Typography>
            <Button
              color="inherit"
              onClick={() => {
                history.push("/plan");
              }}
            >
              Plan
            </Button>
            <Button
              color="inherit"
              onClick={() => {
                history.push("/create");
              }}
            >
              Create
            </Button>
            <IconButton
              color="inherit"
              onClick={() => {
                window.location.href =
                  "https://github.com/alexmnguyen/mhwbuild";
              }}
              aria-label="Close"
            >
              <GitHubIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(MainAppBar));
