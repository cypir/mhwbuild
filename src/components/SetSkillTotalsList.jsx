import React from "react";
import PropTypes from "prop-types";
import List, { ListItem, ListItemIcon, ListItemText } from "material-ui/List";
import Typography from "material-ui/Typography";
import _ from "lodash";

/**
 * TODO Break down into generic skill totals list and a separate set bonus component
 * @param {*} param0
 */
const SetSkillTotalsList = ({ set }) => {
  let totals = {};

  _.values(set.pieces).forEach(piece => {
    piece.skills.forEach(skill => {
      if (!totals[skill.name]) {
        totals[skill.name] = { name: skill.name, total: 0 };
      }

      totals[skill.name].total += skill.level;
    });
  });

  return (
    <List>
      {_.values(totals).map(skill => {
        return (
          <ListItem key={`${skill.name}`} style={{ padding: "4px" }}>
            <ListItemText primary={`${skill.name} +${skill.total}`} />
          </ListItem>
        );
      })}
      {set.bonuses.immediate.map(bonus => {
        return bonus.map(singleBonus => {
          return (
            <ListItem key={singleBonus} style={{ padding: "4px" }}>
              <ListItemText
                disableTypography
                primary={
                  <Typography>
                    <strong>{singleBonus}</strong>
                  </Typography>
                }
              />
            </ListItem>
          );
        });
      })}
    </List>
  );
};

SetSkillTotalsList.propTypes = {
  set: PropTypes.object
};

export default SetSkillTotalsList;
