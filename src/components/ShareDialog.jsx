import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import qs from "qs";
import axios from "axios";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Typography from "@material-ui/core/Typography";
import Snackbar from "@material-ui/core/Snackbar";
import CopyToClipboard from "react-copy-to-clipboard";
import { toJS } from "mobx";

class ShareDialog extends Component {
  constructor() {
    super();
    this.state = {
      url: "",
      activeStep: 0,
      snackbarOpen: false
    };
  }

  generateUrl = () => {
    //convert set to POJO
    let set = toJS(this.props.set);
    let equipsQs = qs.stringify(set);
    let longUrl = "mhwbuild.com/create?" + equipsQs;

    var self = this;

    //convert long url to short one
    axios
      .post(
        "https://www.googleapis.com/urlshortener/v1/url?key=AIzaSyAYTNlLf0WnrtaGuTCTuR8AFF4Xs_fmSnA",
        {
          longUrl
        }
      )
      .then(function(response) {
        //get the last index
        let shortUrl = response.data.id;
        let shortId = shortUrl.substring(shortUrl.lastIndexOf("/") + 1);
        self.setState({
          url: `https://www.mhwbuild.com/create?id=${shortId}`,
          activeStep: 1
        });
      });
  };

  onCloseWrapper = () => {
    const { onClose } = this.props;

    //clear state
    onClose();

    this.setState({
      url: "",
      qsObj: {},
      activeStep: 0,
      snackbarOpen: false
    });
  };

  render() {
    const { open } = this.props;
    return (
      <div>
        <Dialog
          open={open}
          onClose={this.onCloseWrapper}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Share Build</DialogTitle>
          <DialogContent>
            <Stepper activeStep={this.state.activeStep} orientation="vertical">
              <Step>
                <StepLabel>Generate URL</StepLabel>
                <StepContent>
                  <Button onClick={this.generateUrl} color="primary" autoFocus>
                    Generate URL
                  </Button>
                </StepContent>
              </Step>
              <Step>
                <StepLabel>Click on URL to copy to clipboard</StepLabel>
                <StepContent>
                  <CopyToClipboard
                    text={this.state.url}
                    onCopy={() => this.setState({ snackbarOpen: true })}
                  >
                    <Typography variant="subheading">
                      {this.state.url}
                    </Typography>
                  </CopyToClipboard>
                </StepContent>
              </Step>
            </Stepper>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.onCloseWrapper} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right"
          }}
          open={this.state.snackbarOpen}
          autoHideDuration={6000}
          onClose={() => {
            this.setState({ snackbarOpen: false });
          }}
          SnackbarContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id="message-id">URL Copied to Clipboard!</span>}
        />
      </div>
    );
  }
}

ShareDialog.propTypes = {};

export default ShareDialog;
