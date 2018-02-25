import React from "react";
import PropTypes from "prop-types";
import List, { ListItem, ListItemIcon, ListItemText } from "material-ui/List";

const SkillTotalsList = ({ set }) => {
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
        console.log(bonus);
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

SkillTotalsList.PropTypes = {
  set: PropTypes.object
};

export default SkillTotalsList;
