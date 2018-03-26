import React, { Component } from "react";
import PropTypes from "prop-types";
import List, { ListItem, ListItemText } from "material-ui/List";
import { observer } from "mobx-react";

/**
 * Generic skill list not tied to any particular set. Pass in an object of part: skill
 * and this will calculate the total
 */
class SkillTotalsList extends Component {
  render() {
    const { set } = this.props;

    let skillSums = {};

    for (let part in set.decorations) {
      if (set.decorations.hasOwnProperty(part)) {
        let skills = set.decorations[part];

        //could be undefined if no gear selected
        if (skills) {
          skills.forEach(skill => {
            //if no name, then empty
            if (!skill.name || skill.name === "") {
              return;
            }

            if (!skillSums[skill.skill]) {
              skillSums[skill.skill] = 0;
            }

            skillSums[skill.skill]++;
          });
        }
      }
    }

    console.log(skillSums);

    let skillSumsArray = Object.keys(skillSums).map(function(skill) {
      return { name: skill, level: skillSums[skill] };
    });

    return (
      <div>
        <List>
          {skillSumsArray.map(skill => {
            return (
              <ListItem key={skill.name} style={{ padding: "4px" }}>
                <ListItemText primary={`${skill.name} +${skill.level}`} />
              </ListItem>
            );
          })}
        </List>
      </div>
    );
  }
}

SkillTotalsList.propTypes = {
  skills: PropTypes.arrayOf(PropTypes.string)
};

export default observer(SkillTotalsList);
