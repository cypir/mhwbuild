import React, { Component } from "react";
import PropTypes from "prop-types";
import EquipmentSetCard from "../components/EquipmentSetCard";
import EquipmentPickerDialog from "../components/EquipmentPickerDialog";
import Button from "material-ui/Button";
import { withStyles } from "material-ui/styles";
import { navigateTo } from "gatsby-link";

import ShareIcon from "material-ui-icons/Share";
import querystring from "query-string";
import calculate from "../util/calculate";
import equipment from "../data/equipment.json";
import ShareDialog from "../components/ShareDialog";

const styles = theme => ({
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "16px"
  }
});

class Planner extends Component {
  constructor(props) {
    super(props);

    //do initial load from query params
    console.log(this.props);

    //parse qs
    let qs = querystring.parse(this.props.location.search);

    //convert qs to set

    console.log(qs);
    let set = this.convertQsToSet(qs);

    this.state = {
      set,
      setName: "Custom Set",
      dialogOpen: false,
      selectedPart: "",
      shareDialogOpen: false
    };
  }

  componentDidMount() {
    //listen to back button presses to close dialog
    // window.onpopstate = () => {
    //   if (this.state.dialogOpen) {
    //     this.setState({ dialogOpen: false });
    //   }
    // };
  }

  /**
   * We save data in the qs but need to load the details
   */
  convertQsToSet = qs => {
    console.log(qs);
    let set = {
      bonuses: {
        immediate: []
      },
      pieces: {}
    };

    for (let part in qs) {
      console.log(part);
      let piece = equipment.find(piece => qs[part] === piece.name);
      set.pieces[part] = piece;
    }

    //then get set bonuses
    let bonuses = calculate.setBonus(set);
    set.bonuses = bonuses;

    console.log(set);
    return set;
  };

  handlePartClick = part => {
    this.setState({ selectedPart: part, dialogOpen: true });
  };

  handlePieceSelected = piece => {
    //get existing qs
    let qs = querystring.parse(this.props.location.search);

    //set the piece name in the qs
    qs[piece.part] = piece.name;

    //set qs to the proper route
    //navigateTo(`${this.props.location.pathname}?${querystring.stringify(qs)}`);

    let newSet = {
      ...this.state.set,
      pieces: {
        ...this.state.set.pieces,
        [piece.part]: piece
      }
    };

    //calculate set bonus
    let bonuses = calculate.setBonus(newSet);
    newSet.bonuses = bonuses;

    //save a copy to internal state
    this.setState({
      set: newSet,
      dialogOpen: false
    });
  };

  //piece is just the string of the part (but called piece because its equipped)
  handlePieceRemoved = piece => {
    //get existing qs
    let qs = querystring.parse(this.props.location.search);

    //set the piece name in the qs
    delete qs[piece];

    //set qs to the proper route
    navigateTo(`${this.props.location.pathname}?${querystring.stringify(qs)}`);

    const pieces = { ...this.state.set.pieces };
    delete pieces[piece];

    this.setState({
      set: {
        ...this.state.set,
        pieces
      },
      dialogOpen: false
    });
  };

  /**
   * copy build url to clipboard
   */
  closeShareDialog = toCopy => {
    this.setState({ shareDialogOpen: false });
  };

  render() {
    const { classes, location } = this.props;
    console.log(location);
    return (
      <div>
        <EquipmentSetCard
          set={this.state.set}
          title={this.state.setName}
          clickable={true}
          handlePartClick={this.handlePartClick}
        />
        <div className={classes.buttonContainer}>
          <Button
            color="primary"
            onClick={() => {
              this.setState({ shareDialogOpen: true });
            }}
          >
            <ShareIcon />Share
          </Button>
        </div>
        <EquipmentPickerDialog
          open={this.state.dialogOpen}
          onClose={() => {
            this.setState({ dialogOpen: false });
          }}
          selectedPart={this.state.selectedPart}
          handlePieceSelected={this.handlePieceSelected}
          handlePieceRemoved={this.handlePieceRemoved}
        />
        <ShareDialog
          open={this.state.shareDialogOpen}
          onClose={() => {
            this.closeShareDialog(false);
          }}
          onCopyClose={() => {
            this.closeShareDialog(true);
          }}
        />
      </div>
    );
  }
}

Planner.propTypes = {};

export default withStyles(styles)(Planner);
