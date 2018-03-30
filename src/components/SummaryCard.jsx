import React, { Component } from "react";
import PropTypes from "prop-types";
import List from "material-ui/List";
import Card, { CardContent } from "material-ui/Card";
import Typography from "material-ui/Typography";
import _ from "lodash";
import { observer } from "mobx-react";
import SummaryCardListItem from "./SummaryCardListItem";

class SummaryCard extends Component {
  render() {
    const { set } = this.props;

    //iterate through set and get skills
    let totals = {};

    _.values(set.pieces).forEach(piece => {
      //if equipment piece does not have any skills (weapons), then do nothing
      if (!piece || !piece.skills) {
        return;
      }

      piece.skills.forEach(skill => {
        if (!totals[skill.name]) {
          totals[skill.name] = 0;
        }

        totals[skill.name] += skill.level;
      });
    });

    //iterate through decorations and get skills
    let decoParts = set.decorations;

    for (let part in decoParts) {
      if (decoParts.hasOwnProperty(part)) {
        let skills = decoParts[part];

        //may not have this piece selected, so undefined
        if (!skills) {
          continue;
        }

        skills.forEach(skill => {
          //if no name, then empty
          if (!skill.name || skill.name === "") {
            return;
          }

          if (!totals[skill.skill]) {
            totals[skill.skill] = 0;
          }

          totals[skill.skill]++;
        });
      }
    }

    //skill.name for equipment, skill.skill for decoration
    let totalsArray = Object.keys(totals)
      .sort()
      .map(function(skill) {
        return { name: skill, level: totals[skill] };
      });

    return (
      <div style={{ marginTop: 24 }}>
        <Card>
          <CardContent>
            <Typography variant="title">Summary</Typography>
            <Typography variant="subheading">
              <strong>Skill Totals</strong>
            </Typography>
            <List>
              {totalsArray.map(skill => {
                return (
                  <SummaryCardListItem
                    key={skill.name}
                    skill={skill}
                    style={{ padding: "4px" }}
                  />
                );
              })}
            </List>
          </CardContent>
        </Card>
      </div>
    );
  }
}

SummaryCard.propTypes = {
  set: PropTypes.object
};

export default observer(SummaryCard);
