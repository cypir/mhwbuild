import React, { Component } from "react";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";

import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";

import weapons from "../data/weapon.json";
import PickerDialogList from "./PickerDialogList";
import weaponmeta from "../util/weaponmeta";

import _ from "lodash";

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

//displays the appropriate active step
const StepDisplay = ({
  set,
  step,
  onClose,
  weaponTypeSelected,
  weaponSelected,
  selectedWeaponType,
  selectedWeapon
}) => {
  switch (step) {
    case 0:
      return <WeaponList weaponTypeSelected={weaponTypeSelected} />;
    case 1:
      return (
        <PickerDialogList
          items={weapons[selectedWeaponType]}
          handlePieceSelected={piece => {
            //update set and move to augment
            weaponSelected(piece);

            //if not possible to augment, skip the augment section
            if (piece.possibleAugments === 0) {
              set.setPiece(piece);
              onClose();
            }
          }}
        />
      );
    case 2:
      return (
        <AugmentList
          set={set}
          onClose={onClose}
          selectedWeapon={selectedWeapon}
        />
      );
    default:
      return <div />;
  }
};

/**
 * Once the user makes an augment selection, persist selected weapon to store
 * and modify the weapon jewel slots relative to augmentation
 */
const AugmentList = ({ set, onClose, selectedWeapon }) => {
  console.log(selectedWeapon);

  let possibleAugmentList = [];
  for (let i = 0; i < selectedWeapon.possibleAugments + 1; i++) {
    possibleAugmentList.push(i);
  }

  return (
    <List>
      {possibleAugmentList.map(level => {
        return (
          <ListItem
            key={level}
            button
            onClick={() => {
              //augments only apply when the level is > 0
              if (level > 0) {
                //on click, we assign the appropriate slot to the eqipment then close the dialog
                let leastIndex = 0;
                //look for lowest level slot and boost it by augment level
                selectedWeapon.slots.forEach((slot, index) => {
                  //if we found a slot with less value, save the index
                  if (slot < selectedWeapon.slots[leastIndex]) {
                    leastIndex = index;
                  }
                });

                //clone selected weapon and add in appropriate props for UI
                let updatedWeapon = _.merge({}, selectedWeapon);
                updatedWeapon.slots[leastIndex] += level;
                updatedWeapon.augmentLevel = level;

                set.setPiece(updatedWeapon);
              } else {
                set.setPiece(selectedWeapon);
              }

              onClose();
            }}
          >
            <ListItemText primary={`Slot Augment Level ${level}`} />
          </ListItem>
        );
      })}
    </List>
  );
};

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
              <ListItemIcon style={{ height: 30, width: 30 }}>
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
      selectedWeaponType: "",
      selectedWeapon: null
    };
  }

  weaponTypeSelected = selectedWeaponType => {
    this.setState({
      activeStep: 1,
      selectedWeaponType
    });
  };

  //temporarily hold the weapon selection in memory
  weaponSelected = selectedWeapon => {
    this.setState({
      activeStep: 2,
      selectedWeapon
    });
  };

  /**
   * Wrapper to clean up when close is called
   */
  closeWrapper = onClose => {
    onClose();
    this.setState({
      filter: "",
      activeStep: 0,
      selectedWeaponType: "",
      selectedWeapon: null
    });
  };

  render() {
    const { set, open, onClose, classes } = this.props;
    return (
      <Dialog
        fullScreen
        open={open}
        onClose={() => {
          this.closeWrapper(onClose);
        }}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              onClick={() => {
                this.closeWrapper(onClose);
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
                this.closeWrapper(onClose);
              }}
            >
              Remove
            </Button>
          </Toolbar>
        </AppBar>
        <Stepper activeStep={this.state.activeStep}>
          <Step>
            <StepLabel>Weapon Type</StepLabel>
          </Step>
          <Step>
            <StepLabel>Weapon</StepLabel>
          </Step>
          <Step>
            <StepLabel>Augment Level</StepLabel>
          </Step>
        </Stepper>
        <StepDisplay
          set={set}
          step={this.state.activeStep}
          weaponTypeSelected={this.weaponTypeSelected}
          weaponSelected={this.weaponSelected}
          selectedWeaponType={this.state.selectedWeaponType}
          selectedWeapon={this.state.selectedWeapon}
          onClose={() => {
            this.closeWrapper(onClose);
          }}
        />
      </Dialog>
    );
  }
}

WeaponPickerDialog.propTypes = {};

export default withStyles(styles)(WeaponPickerDialog);
