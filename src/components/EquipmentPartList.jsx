import React from "react";
import PropTypes from "prop-types";
import List, { ListItem, ListItemIcon, ListItemText } from "material-ui/List";
import equipmentParts from "../data/equipment_part.json";
import armIcon from "../icons/1/arm.png";
import chestIcon from "../icons/1/chest.png";
import headIcon from "../icons/1/head.png";
import waistIcon from "../icons/1/waist.png";
import legIcon from "../icons/1/leg.png";
import skillformat from "../util/skillformat";

/**
 * Display the equipment part (arms, chest, etc). If the set does not contain it, display the icon and
 * write in ---
 * @param {} param0
 */
const EquipmentPartList = ({ set, clickable, handlePartClick }) => {
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
            <ListItem
              key={index}
              button={clickable ? true : false}
              onClick={() => {
                if (clickable) {
                  handlePartClick(part);
                }
              }}
            >
              <ListItemIcon>
                <img alt="part" src={imageSrc} />
              </ListItemIcon>
              <ListItemText
                primary={set.pieces[part] ? set.pieces[part].name : "-----"}
                secondary={skillformat.skillSecondaryDisplay(part, set)}
              />
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};

EquipmentPartList.PropTypes = {
  set: PropTypes.object,
  clickable: PropTypes.bool,
  handlePartClick: PropTypes.func
};

export default EquipmentPartList;
