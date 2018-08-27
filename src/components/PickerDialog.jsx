import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
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
      secondaryTextProp,
      filterFn
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
            filterFn={filterFn}
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
