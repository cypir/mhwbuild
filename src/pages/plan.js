import React, { Component } from "react";
import PropTypes from "prop-types";
import EquipmentSetCard from "../components/EquipmentSetCard";
import EquipmentPickerDialog from "../components/EquipmentPickerDialog";

class Planner extends Component {
  constructor() {
    super();
    this.state = {
      set: {
        bonuses: {
          immediate: []
        },
        pieces: {}
      },
      setName: "Custom Set",
      dialogOpen: false,
      selectedPart: ""
    };
  }

  handlePartClick = part => {
    console.log(part);

    this.setState({ selectedPart: part, dialogOpen: true });
  };

  handlePieceSelected = piece => {
    this.setState({
      set: {
        ...this.state.set,
        pieces: {
          ...this.state.set.pieces,
          [piece.part]: piece
        }
      },
      dialogOpen: false
    });
  };

  render() {
    return (
      <div>
        <EquipmentSetCard
          set={this.state.set}
          title={this.state.setName}
          clickable={true}
          handlePartClick={this.handlePartClick}
        />
        <EquipmentPickerDialog
          open={this.state.dialogOpen}
          onClose={() => {
            this.setState({ dialogOpen: false });
          }}
          selectedPart={this.state.selectedPart}
          handlePieceSelected={this.handlePieceSelected}
        />
      </div>
    );
  }
}

Planner.propTypes = {};

export default Planner;
