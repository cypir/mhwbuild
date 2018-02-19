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
const EquipmentPartDisplay = ({ part, set }) => {
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
    <div>
      <ListItem button>
        <ListItemIcon>
          <img alt="part" src={imageSrc} />
        </ListItemIcon>
        <ListItemText
          primary={set[part] ? set[part].name : "-----"}
          secondary={<SkillSecondaryDisplay part={part} set={set} />}
        />
      </ListItem>
    </div>
  );
};

/**
 * Component that displays a set
 */
const EquipmentSetDisplay = ({ set, index }) => {
  console.log(_.values(set));
  return (
    <Card>
      <CardContent>
        <Typography variant="title">Equipment Set {index}</Typography>
        <Grid container spacing={24}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subheading">Equipment Pieces</Typography>
            <List>
              {equipmentParts.map((part, index) => {
                return (
                  <EquipmentPartDisplay part={part} set={set} key={index} />
                );
              })}
            </List>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subheading">Totals</Typography>
            <Typography variant="body2">Fire Resistance + 3</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default EquipmentSetDisplay;
