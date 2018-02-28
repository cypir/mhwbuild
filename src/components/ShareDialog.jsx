import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "material-ui/Button";
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "material-ui/Dialog";
import querystring from "query-string";
import _ from "lodash";
import axios from "axios";
import Stepper, { Step, StepLabel, StepContent } from "material-ui/Stepper";
import Typography from "material-ui/Typography/Typography";

import CopyToClipboard from "react-copy-to-clipboard";

class ShareDialog extends Component {
  constructor() {
    super();
    this.state = {
      url: "",
      qsObj: {},
      activeStep: 0
    };
  }

  componentWillReceiveProps(nextProps) {
    const { set } = nextProps;
    let qsObj = {};
    for (let piece in set.pieces) {
      if (set.pieces.hasOwnProperty(piece)) {
        //convert set into a qs
        qsObj[piece] = set.pieces[piece].name;
      }
    }
    this.setState({ qsObj });
  }

  generateUrl = () => {
    let equipsQs = querystring.stringify(this.state.qsObj);
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
          url: `mhwbuild.com/create?id=${shortId}`,
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
      activeStep: 0
    });
  };

  render() {
    const { open, onCopyClose, set } = this.props;
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
                  <CopyToClipboard text={this.state.url}>
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
      </div>
    );
  }
}

ShareDialog.propTypes = {};

export default ShareDialog;
