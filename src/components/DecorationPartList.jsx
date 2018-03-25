import React from "react";
import PropTypes from "prop-types";
import List from "material-ui/List";
import equipmentParts from "../data/equipment_part.json";
import armIcon from "../icons/1/arm.png";
import chestIcon from "../icons/1/chest.png";
import headIcon from "../icons/1/head.png";
import waistIcon from "../icons/1/waist.png";
import legIcon from "../icons/1/leg.png";
import DecorationPartListItem from "./DecorationPartListItem";
import { observer } from "mobx-react";
import weaponmeta from "../util/weaponmeta";
import greatswordIcon from "../icons/1/weapons/greatsword.png";

const getIcon = (part, weapon) => {
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
    case "weapon":
      if (weapon) {
        imageSrc = weaponmeta.getWeapon(weapon.type).imageSrc;
      } else {
        imageSrc = greatswordIcon;
      }
      break;
    default:
      break;
  }

  return imageSrc;
};

/**
 * Display equipment parts and slot info for each
 *
 * We take in the set and then derive the decoration form based on the set
 * @param {} param0
 */
const DecorationPartList = ({ set }) => {
  //let { set } = props;
  console.log(set);
  //we calculate the decoration information based on slots. This is the template
  //that we create the form with. We use set.decorations as the placeholder for
  //our actual decoration input
  return (
    <div>
      <List>
        {equipmentParts
          .filter(part => {
            return part !== "charm";
          })
          .map((part, index) => {
            return (
              <DecorationPartListItem
                key={part}
                icon={getIcon(part, set.pieces["weapon"])}
                set={set}
                part={part}
              />
            );
          })}
      </List>
    </div>
  );
};

DecorationPartList.propTypes = {
  decorations: PropTypes.object,
  handlePartClick: PropTypes.func
};

export default DecorationPartList;
