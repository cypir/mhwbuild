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

/**
 * Display the equipment part (arms, chest, etc). If the set does not contain it, display the icon and
 * write in ---
 * @param {} param0
 */
const EquipmentPartDisplay = ({ part, set }) => {
  console.log(set[part]);
  return (
    <ListItem button>
      <ListItemText primary={set[part] ? set[part].name : "-----"} />
    </ListItem>
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
        <List>
          {equipmentParts.map((part, index) => {
            return <EquipmentPartDisplay part={part} set={set} key={index} />;
          })}
        </List>
      </CardContent>
    </Card>
  );
};

export default EquipmentSetDisplay;
