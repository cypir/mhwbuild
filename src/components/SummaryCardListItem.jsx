import React, { Component } from "react";
import PropTypes from "prop-types";
import List, { ListItem, ListItemText } from "material-ui/List";
import possibleSkills from "../data/skill";
import Collapse from "material-ui/transitions/Collapse";

import ExpandLess from "material-ui-icons/ExpandLess";
import ExpandMore from "material-ui-icons/ExpandMore";

const displaySkillTotal = skill => {
  let range = skill.level - possibleSkills[skill.name].levels.length;
  let style = {};
  if (range === 0) {
    style = { color: "#43A047" };
  } else if (range > 0) {
    style = { color: "#E53935" };
  } else {
    style = { color: "#fff" };
  }
  return (
    <div style={style}>{`${skill.name} ${skill.level}/${
      possibleSkills[skill.name].levels.length
    }`}</div>
  );
};

class SummaryCardListItem extends Component {
  constructor() {
    super();
    this.state = {
      open: false
    };
  }

  /**
   * index = which description we are looking at currently
   * skill = our skill object, with current level
   * skillLevelDesc = description in text form
   */
  displayDescription = (index, skill, skillLevelDesc) => {
    //get max for skill
    const maxLevel = possibleSkills[skill.name].levels.length;

    //if we have allocated over the max level for skill and we are currently on the max description,
    //bold that one
    if (skill.level > maxLevel && index === maxLevel - 1) {
      return (
        <div
          style={{
            fontWeight: "bold"
          }}
        >
          {skillLevelDesc}
        </div>
      );
    }

    //otherwise bold when it matches what we are reading
    return (
      <div
        style={{
          fontWeight: index === skill.level - 1 ? "bold" : "normal",
          color: index === skill.level - 1 ? "#fff" : "#ffffff8a"
        }}
      >
        {skillLevelDesc}
      </div>
    );
  };

  render() {
    const { skill } = this.props;
    return (
      <div>
        <ListItem
          style={{ padding: "4px" }}
          button
          onClick={() => {
            //toggle the state
            this.setState({ open: !this.state.open });
          }}
        >
          <ListItemText primary={displaySkillTotal(skill)} />
          {this.state.open ? (
            <ExpandLess color="primary" />
          ) : (
            <ExpandMore color="primary" />
          )}
        </ListItem>
        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
          <List>
            {possibleSkills[skill.name].levels.map((skillLevelDesc, index) => {
              //calculate if is achieved
              return (
                <ListItem
                  key={`skill.name_${index}`}
                  style={{
                    paddingTop: 0,
                    paddingBottom: 0
                  }}
                >
                  <ListItemText
                    primary={this.displayDescription(
                      index,
                      skill,
                      skillLevelDesc
                    )}
                  />
                </ListItem>
              );
            })}
          </List>
        </Collapse>
      </div>
    );
  }
}

SummaryCardListItem.propTypes = {};

export default SummaryCardListItem;
