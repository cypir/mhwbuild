import React, { Component } from "react";
import PropTypes from "prop-types";
import Grid from "material-ui/Grid";
import EquipmentSetCard from "./EquipmentSetCard";

class EquipmentSetList extends Component {
  render() {
    const { matchingEquipmentSets } = this.props;
    return (
      <div>
        <Grid container spacing={8}>
          {matchingEquipmentSets.map((set, index) => {
            return (
              <Grid item xs={12} md={6} key={index}>
                <EquipmentSetCard key={index} set={set} index={index} />
              </Grid>
            );
          })}
        </Grid>
      </div>
    );
  }
}

EquipmentSetList.propTypes = {};

export default EquipmentSetList;
