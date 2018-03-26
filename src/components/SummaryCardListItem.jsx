import React, { Component } from "react";
import PropTypes from "prop-types";
import { ListItem, ListItemText } from "material-ui/List";
import possibleSkills from "../data/skill";

const displaySkillTotal = skill => {
  let range = skill.level - possibleSkills[skill.name].levels.length;
  let style = {};
  if (range === 0) {
    style = { color: "#43A047" };
  } else if (range > 0) {
    style = { color: "#E53935" };
  } else {
    style = { color: "black" };
  }
  return (
    <div style={style}>{`${skill.name} ${skill.level}/${
      possibleSkills[skill.name].levels.length
    }`}</div>
  );
};

class SummaryCardListItem extends Component {
  render() {
    const { skill } = this.props;
    return (
      <div>
        <ListItem style={{ padding: "4px" }}>
          <ListItemText primary={displaySkillTotal(skill)} />
        </ListItem>
      </div>
    );
  }
}

SummaryCardListItem.propTypes = {};

export default SummaryCardListItem;
