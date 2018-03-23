import React, { Component } from "react";
import PropTypes from "prop-types";
import List, { ListItem, ListItemText } from "material-ui/List";
import Card, { CardContent } from "material-ui/Card";
import Typography from "material-ui/Typography";
import _ from "lodash";
import { observer } from "mobx-react";

class CreateGrandTotalCard extends Component {
  render() {
    const { set } = this.props;

    //iterate through set and get skills
    let totals = {};

    _.values(set.pieces).forEach(piece => {
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

        skills.forEach(skill => {
          //if no name, then empty
          if (!skill.name || skill.name === "") {
            return;
          }

          if (!totals[skill.name]) {
            totals[skill.name] = 0;
          }

          totals[skill.name]++;
        });
      }
    }

    let totalsArray = Object.keys(totals).map(function(skill) {
      return { name: skill, level: totals[skill] };
    });

    return (
      <div style={{ marginTop: 24 }}>
        <Card>
          <CardContent>
            <Typography variant="title">Grand Totals</Typography>

            <List>
              {totalsArray.map(skill => {
                return (
                  <ListItem key={skill.name} style={{ padding: "4px" }}>
                    <ListItemText primary={`${skill.name} +${skill.level}`} />
                  </ListItem>
                );
              })}
            </List>
          </CardContent>
        </Card>
      </div>
    );
  }
}

CreateGrandTotalCard.propTypes = {
  set: PropTypes.object
};

export default observer(CreateGrandTotalCard);
