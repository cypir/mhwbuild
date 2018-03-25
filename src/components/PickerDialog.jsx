import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Button from "material-ui/Button";
import Dialog from "material-ui/Dialog";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import IconButton from "material-ui/IconButton";
import Typography from "material-ui/Typography";
import CloseIcon from "material-ui-icons/Close";
import Slide from "material-ui/transitions/Slide";
import PickerDialogList from "./PickerDialogList";

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

/**
 * Generic picker dialog that can be extended to create pickers for different armor parts or decorations
 *
 * items must have a name
 */
class PickerDialog extends Component {
  constructor() {
    super();
    this.state = {
      filter: ""
    };
  }

  render() {
    const {
      open,
      onClose,
      classes,
      selectedPart,
      handlePieceSelected,
      handlePieceRemoved,
      items,
      secondaryTextProp
    } = this.props;
    return (
      <div>
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
                Select {selectedPart} equipment
              </Typography>
              <Button
                color="inherit"
                onClick={() => {
                  handlePieceRemoved(selectedPart);
                  this.setState({ filter: "" });
                }}
              >
                Remove
              </Button>
            </Toolbar>
          </AppBar>
          <PickerDialogList
            items={items}
            handlePieceSelected={handlePieceSelected}
            secondaryTextProp={secondaryTextProp}
          />
        </Dialog>
      </div>
    );
  }
}

PickerDialog.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PickerDialog);
