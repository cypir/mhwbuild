import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Button from "material-ui/Button";
import Dialog from "material-ui/Dialog";
import List, { ListItem, ListItemText } from "material-ui/List";
import Divider from "material-ui/Divider";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import IconButton from "material-ui/IconButton";
import Typography from "material-ui/Typography";
import CloseIcon from "material-ui-icons/Close";
import Slide from "material-ui/transitions/Slide";
import TextField from "material-ui/TextField";

import equipment from "../data/equipment.json";
import skillformat from "../util/skillformat";

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

class EquipmentPickerDialog extends Component {
  constructor() {
    super();
    this.state = {
      filter: ""
    };
  }

  handleFilterChange = e => {
    this.setState({ filter: e.target.value });
  };

  render() {
    const {
      open,
      onClose,
      classes,
      selectedPart,
      handlePieceSelected,
      handlePieceRemoved
    } = this.props;
    return (
      <div>
        <Dialog
          fullScreen
          open={open}
          onClose={onClose}
          transition={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton color="inherit" onClick={onClose} aria-label="Close">
                <CloseIcon />
              </IconButton>
              <Typography
                variant="title"
                color="inherit"
                className={classes.flex}
              >
                Select {selectedPart} equipment
              </Typography>
              <Button
                color="inherit"
                onClick={() => {
                  handlePieceRemoved(selectedPart);
                }}
              >
                Remove
              </Button>
            </Toolbar>
          </AppBar>
          <div className={classes.filter}>
            <TextField
              label="Filter"
              fullWidth
              value={this.state.filter}
              onChange={this.handleFilterChange}
              type="text"
            />
          </div>
          <List>
            {equipment
              .filter(equip => equip.part === selectedPart)
              .filter(equip =>
                equip.name
                  .toLowerCase()
                  .includes(this.state.filter.toLowerCase())
              )
              .map(equip => {
                return (
                  <div key={equip.name}>
                    <ListItem
                      button
                      onClick={e => {
                        handlePieceSelected(equip);
                      }}
                    >
                      <ListItemText
                        primary={`${equip.name}`}
                        secondary={skillformat.skillSecondaryDisplayPlanner(
                          equip
                        )}
                      />
                    </ListItem>
                    <Divider />
                  </div>
                );
              })}
          </List>
        </Dialog>
      </div>
    );
  }
}

EquipmentPickerDialog.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EquipmentPickerDialog);
