import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Card, { CardActions, CardContent } from "material-ui/Card";
import Button from "material-ui/Button";
import Typography from "material-ui/Typography";
import List, { ListItem, ListItemIcon, ListItemText } from "material-ui/List";
import _ from "lodash";

import equipmentParts from "../data/equipment_part.json";

import armIcon from "../icons/arm.png";
import chestIcon from "../icons/chest.png";
import helmetIcon from "../icons/helmet.png";
import waistIcon from "../icons/waist.png";
import legIcon from "../icons/leg.png";

import Avatar from "material-ui/Avatar";

import Collapse from "material-ui/transitions/Collapse";
import ExpandLess from "material-ui-icons/ExpandLess";
import ExpandMore from "material-ui-icons/ExpandMore";

import Grid from "material-ui/Grid";

const SkillTotalsList = ({ set }) => {
  let totals = {};

  _.values(set).forEach(piece => {
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
          <ListItem key={`${skill.name}`}>
            <ListItemText primary={`${skill.name} +${skill.total}`} />
          </ListItem>
        );
      })}
    </List>
  );
};

const SkillSecondaryDisplay = ({ part, set }) => {
  const piece = set[part];

  //if this piece exists, then get skills
  if (piece) {
    let buffer = "";
    piece.skills.forEach(skill => {
      buffer += `${skill.name} +${skill.level} / `;
    });

    return <div>{buffer.substring(0, buffer.length - 3)}</div>;
  }

  return <div />;
};

/**
 * Display the equipment part (arms, chest, etc). If the set does not contain it, display the icon and
 * write in ---
 * @param {} param0
 */
const EquipmentPartList = ({ set }) => {
  return (
    <div>
      <List>
        {equipmentParts.map((part, index) => {
          let imageSrc = "";
          switch (part) {
            case "helmet":
              imageSrc = helmetIcon;
              break;
            case "chest":
              imageSrc = chestIcon;
              break;
            case "arm":
              imageSrc = armIcon;
              break;
            case "waist":
              imageSrc = waistIcon;
              break;
            case "leg":
              imageSrc = legIcon;
              break;
          }
          return (
            <ListItem key={index}>
              <ListItemIcon>
                <img alt="part" src={imageSrc} />
              </ListItemIcon>
              <ListItemText
                primary={set[part] ? set[part].name : "-----"}
                secondary={<SkillSecondaryDisplay part={part} set={set} />}
              />
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};

/**
 * Component that displays a set
 */
const EquipmentSetCard = ({ set, index, classes }) => {
  return (
    <div>
      <Card>
        <CardContent>
          <Typography variant="title">Equipment Set {index}</Typography>
          <Grid container spacing={24}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subheading">Equipment Pieces</Typography>
              <EquipmentPartList set={set} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subheading">Totals</Typography>
              <SkillTotalsList set={set} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default EquipmentSetCard;
