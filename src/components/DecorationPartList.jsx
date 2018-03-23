import React from "react";
import PropTypes from "prop-types";
import List from "material-ui/List";
import equipmentParts from "../data/equipment_part.json";
import armIcon from "../icons/1/arm.png";
import chestIcon from "../icons/1/chest.png";
import headIcon from "../icons/1/head.png";
import waistIcon from "../icons/1/waist.png";
import legIcon from "../icons/1/leg.png";
import calculate from "../util/calculate";
import DecorationPartListItem from "./DecorationPartListItem";

const getIcon = part => {
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
const DecorationPartList = ({
  set,
  onDecorationChanged,
  onDecorationRemoved
}) => {
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
                onDecorationChanged={onDecorationChanged}
                icon={getIcon(part)}
                piece={set.pieces[part]}
                decorations={set.decorations}
                onDecorationRemoved={onDecorationRemoved}
                index={index}
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
