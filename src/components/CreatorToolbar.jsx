import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Button from "material-ui/Button";
import ShareIcon from "material-ui-icons/Share";
import ClearIcon from "material-ui-icons/Clear";
import Card from "material-ui/Card";

const styles = theme => ({
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "16px"
  }
});

const CreatorToolbar = ({ classes, onShareClick, onClearClick }) => {
  return (
    <div className={classes.buttonContainer} style={{ marginBottom: 16 }}>
      <Button
        color="primary"
        onClick={() => {
          onShareClick();
        }}
      >
        <ShareIcon />Share
      </Button>
      <Button
        color="secondary"
        onClick={() => {
          onClearClick();
        }}
      >
        <ClearIcon />Clear
      </Button>
    </div>
  );
};

CreatorToolbar.propTypes = {};

export default withStyles(styles)(CreatorToolbar);
