import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Card, { CardActions, CardContent } from "material-ui/Card";
import Button from "material-ui/Button";
import Typography from "material-ui/Typography";
import List, { ListItem, ListItemIcon, ListItemText } from "material-ui/List";
import _ from "lodash";

import equipmentParts from "../data/equipment_part.json";

import armIcon from "../icons/1/arm.png";
import chestIcon from "../icons/1/chest.png";
import headIcon from "../icons/1/head.png";
import waistIcon from "../icons/1/waist.png";
import legIcon from "../icons/1/leg.png";

import Avatar from "material-ui/Avatar";

import Collapse from "material-ui/transitions/Collapse";
import ExpandLess from "material-ui-icons/ExpandLess";
import ExpandMore from "material-ui-icons/ExpandMore";

import Grid from "material-ui/Grid";

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
        return (
          <ListItem key={bonus} style={{ padding: "4px" }}>
            <ListItemText
              disableTypography
              primary={
                <Typography>
                  <strong>{bonus}</strong>
                </Typography>
              }
            />
          </ListItem>
        );
      })}
    </List>
  );
};

/**
 * Display the equipment part (arms, chest, etc). If the set does not contain it, display the icon and
 * write in ---
 * @param {} param0
 */
const EquipmentPartList = ({ set }) => {
  const skillSecondaryDisplay = (part, set) => {
    const piece = set.pieces[part];

    //if this piece exists, then get skills
    if (piece) {
      let buffer = "";
      piece.skills.forEach(skill => {
        buffer += `${skill.name} +${skill.level} / `;
      });

      return buffer.substring(0, buffer.length - 3);
    }

    return "";
  };

  return (
    <div>
      <List>
        {equipmentParts.map((part, index) => {
          let imageSrc = "";
          switch (part) {
            case "head":
              imageSrc = headIcon;
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
                primary={set.pieces[part] ? set.pieces[part].name : "-----"}
                secondary={skillSecondaryDisplay(part, set)}
              />
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};

//breakdown by total number of slots and by sum of each level of slot
//data is stored like [3,2,2] meaning 1 level 3 slot and 2 level 2 slots
//we convert this to a list of level sums where [3,2,2] means 3 level 1,
//2 level 2, 2 level 3
const SlotList = ({ set }) => {
  let levels = [0, 0, 0];

  for (let piece in set.pieces) {
    if (set.pieces.hasOwnProperty(piece)) {
      //index is slot, value is level
      //index is level, value is amount
      set.pieces[piece].slots.forEach(slot => {
        //slot is a gem slot that contains a variable level
        switch (slot) {
          case 1:
            levels[0]++;
            break;
          case 2:
            levels[1]++;
            break;
          case 3:
            levels[2]++;
            break;
        }
      });
    }
  }

  return (
    <div>
      <List>
        {levels.map((numLevel, index) => {
          return (
            <ListItem key={index} style={{ padding: "4px" }}>
              <ListItemText primary={`Level ${index + 1}: ${numLevel}`} />
            </ListItem>
          );
        })}
        <ListItem>
          <ListItemText primary={`Total: ${_.sum(levels)}`} />
        </ListItem>
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
          <Typography variant="title">Equipment Set {index + 1}</Typography>
          <Grid container spacing={8}>
            <Grid item xs={12} sm={5}>
              <Typography variant="subheading">Equipment Pieces</Typography>
              <EquipmentPartList set={set} />
            </Grid>
            <Grid item xs={6} sm={4}>
              <Typography variant="subheading">Skill Totals</Typography>
              <SkillTotalsList set={set} />
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography variant="subheading">Slot Totals</Typography>
              <SlotList set={set} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default EquipmentSetCard;
