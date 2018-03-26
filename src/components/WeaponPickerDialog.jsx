import React, { Component } from "react";

import { withStyles } from "material-ui/styles";
import Button from "material-ui/Button";
import Dialog from "material-ui/Dialog";
import List, { ListItem, ListItemText, ListItemIcon } from "material-ui/List";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import IconButton from "material-ui/IconButton";
import Typography from "material-ui/Typography";
import CloseIcon from "material-ui-icons/Close";
import Slide from "material-ui/transitions/Slide";

import Stepper, { Step, StepLabel } from "material-ui/Stepper";

import weapons from "../data/weapon.json";
import PickerDialogList from "./PickerDialogList";
import weaponmeta from "../util/weaponmeta";

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

const WeaponList = ({ weaponTypeSelected }) => {
  let weaponTypes = Object.keys(weapons);

  return (
    <List>
      {weaponTypes.sort().map(weaponType => {
        let { imageSrc, eng } = weaponmeta.getWeapon(weaponType);

        return (
          <ListItem
            key={weaponType}
            button
            onClick={() => {
              //move to next step
              weaponTypeSelected(weaponType);
            }}
          >
            {imageSrc ? (
              <ListItemIcon>
                <img alt="part" src={imageSrc} />
              </ListItemIcon>
            ) : (
              ""
            )}
            <ListItemText inset={imageSrc ? false : true} primary={eng} />
          </ListItem>
        );
      })}
    </List>
  );
};

class WeaponPickerDialog extends Component {
  constructor() {
    super();
    this.state = {
      activeStep: 0,
      selectedWeaponType: ""
    };
  }

  weaponTypeSelected = selectedWeaponType => {
    this.setState({
      activeStep: 1,
      selectedWeaponType
    });
  };

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
                this.setState({
                  filter: "",
                  activeStep: 0,
                  selectedWeaponType: ""
                });
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
                this.setState({
                  filter: "",
                  activeStep: 0,
                  selectedWeaponType: ""
                });
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
        {this.state.activeStep === 0 ? (
          <WeaponList weaponTypeSelected={this.weaponTypeSelected} />
        ) : (
          <PickerDialogList
            items={weapons[this.state.selectedWeaponType]}
            handlePieceSelected={piece => {
              //update set and close dialog
              set.setPiece(piece);
              onClose();
              this.setState({
                filter: "",
                activeStep: 0,
                selectedWeaponType: ""
              });
            }}
          />
        )}
      </Dialog>
    );
  }
}

WeaponPickerDialog.propTypes = {};

export default withStyles(styles)(WeaponPickerDialog);
