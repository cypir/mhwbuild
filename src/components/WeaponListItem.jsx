import React from "react";
import PropTypes from "prop-types";
import List, { ListItem, ListItemIcon, ListItemText } from "material-ui/List";
//import

const SecondaryTextDisplay = weapon => {
  //get weapon info

  return <div />;
};

/**
 * Display the weapon part. The weapon icon needs to change based on the selected weapon
 * @param {} param0
 */
const WeaponListItem = ({ set, clickable, handlePartClick }) => {
  //get weapon
  let weapon = set.pieces.weapon;

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
    case "charm":
      imageSrc = charmIcon;
      break;
    default:
      break;
  }

  return (
    <div>
      <List>
        <ListItem
          key={index}
          button={clickable ? true : false}
          onClick={() => {
            if (clickable) {
              handlePartClick("weapon");
            }
          }}
        >
          <ListItemIcon>
            <img alt="part" src={imageSrc} />
          </ListItemIcon>
          <ListItemText
            primary={set.pieces.weapon ? set.pieces.weapon.name : "-----"}
            secondary={SecondaryTextDisplay(set.pieces.weapon)}
          />
        </ListItem>
        })
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
