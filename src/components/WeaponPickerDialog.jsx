import React, { Component } from "react";
import PropTypes from "prop-types";

import { withStyles } from "material-ui/styles";
import Button from "material-ui/Button";
import Dialog, { DialogContent } from "material-ui/Dialog";
import List, { ListItem, ListItemText } from "material-ui/List";
import Divider from "material-ui/Divider";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import IconButton from "material-ui/IconButton";
import Typography from "material-ui/Typography";
import CloseIcon from "material-ui-icons/Close";
import Slide from "material-ui/transitions/Slide";
import TextField from "material-ui/TextField";

import Stepper, { Step, StepLabel, StepContent } from "material-ui/Stepper";

import weapons from "../data/weapon.json";

const styles = theme => ({
  appBar: {
    position: "relative"
  },
  flex: {
    flex: 1
  },
  filter: {
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2
  }
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class WeaponPickerDialog extends Component {
  constructor() {
    super();
    this.state = {
      activeStep: 0
    };
  }

  render() {
    const { set, open, onClose, classes } = this.props;
    return (
      <Dialog
        fullScreen
        open={open}
        onClose={() => {
          onClose();
          this.setState({ filter: "" });
        }}
        transition={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              onClick={() => {
                onClose();
                this.setState({ filter: "" });
              }}
              aria-label="Close"
            >
              <CloseIcon />
            </IconButton>
            <Typography
              variant="title"
              color="inherit"
              className={classes.flex}
            >
              Select weapon equipment
            </Typography>
            <Button
              color="inherit"
              onClick={() => {
                set.removePiece("weapon");
                this.setState({ filter: "" });
                onClose();
              }}
            >
              Remove
            </Button>
          </Toolbar>
        </AppBar>
        <Stepper activeStep={this.state.activeStep}>
          <Step>
            <StepLabel>Select Weapon Type</StepLabel>
          </Step>
          <Step>
            <StepLabel>Select Weapon</StepLabel>
          </Step>
        </Stepper>
        <DialogContent>I am a content</DialogContent>
      </Dialog>
    );
  }
}

WeaponPickerDialog.propTypes = {};

export default withStyles(styles)(WeaponPickerDialog);
