import React from "react";
import PropTypes from "prop-types";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import equipmentParts from "../data/equipment_part.json";
import armIcon from "../icons/1/arm.png";
import skillformat from "../util/skillformat";

/**
 * Display the equipment part (arms, chest, etc). If the set does not contain it, display the icon and
 * write in ---
 * @param {} param0
 */
const CharmSelector = ({ set, clickable, handlePartClick }) => {
  return (
    <div>
      <List>
        {equipmentParts.map((part, index) => {
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
              <ListItemIcon style={{ height: 30, width: 30 }}>
                <img alt="part" src={armIcon} />
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

EquipmentPartList.propTypes = {
  set: PropTypes.object,
  clickable: PropTypes.bool,
  handlePartClick: PropTypes.func
};

export default EquipmentPartList;
