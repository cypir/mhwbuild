import React, { Component } from "react";
import PropTypes from "prop-types";

import Button from "material-ui/Button";
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "material-ui/Dialog";

class ShareDialog extends Component {
  render() {
    const { onClose, open, onCopyClose } = this.props;
    return (
      <div>
        <Dialog
          open={open}
          onClose={onClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Share Build</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Copy the following URL to share this build:
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} color="primary">
              Close
            </Button>
            <Button onClick={onCopyClose} color="primary" autoFocus>
              Copy and Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

ShareDialog.propTypes = {};

export default ShareDialog;
