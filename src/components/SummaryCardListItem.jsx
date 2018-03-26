import React, { Component } from "react";
import PropTypes from "prop-types";
import List, { ListItem, ListItemText } from "material-ui/List";
import possibleSkills from "../data/skill";
import Collapse from "material-ui/transitions/Collapse";
import { observer } from "mobx-react";

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
    style = { color: "black" };
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
          {this.state.open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
          <List>
            {possibleSkills[skill.name].levels.map((skillLevelDesc, index) => {
              //calculate if is achieved
              return (
                <ListItem
                  key={skill.name}
                  style={{
                    paddingTop: 0,
                    paddingBottom: 0
                  }}
                >
                  <ListItemText
                    primary={
                      <div
                        style={{
                          fontWeight:
                            index === skill.level - 1 ? "bold" : "normal",
                          color:
                            index === skill.level - 1 ? "black" : "#0000008a"
                        }}
                      >
                        {skillLevelDesc}
                      </div>
                    }
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
