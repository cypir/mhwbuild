import React, { Component } from "react";
import PropTypes from "prop-types";
import List, { ListItem, ListItemIcon, ListItemText } from "material-ui/List";
import WeaponPickerDialog from "./WeaponPickerDialog";
import { observer } from "mobx-react";
import weaponmeta from "../util/weaponmeta";
import greatswordIcon from "../icons/1/weapons/greatsword.png";

const SecondaryTextDisplay = weapon => {
  //get weapon info

  return (
    <div>
      {weapon ? `Attack: ${weapon.attack} / Affinity: ${weapon.affinity}%` : ""}
    </div>
  );
};

/**
 * Represents weapon selection on create menu
 */
class WeaponListItem extends Component {
  constructor() {
    super();
    this.state = {
      dialogOpen: false
    };
  }

  render() {
    const { set } = this.props;
    let weapon = set.pieces.weapon;

    let imageSrc = greatswordIcon;

    if (weapon) {
      imageSrc = weaponmeta.getWeapon(weapon.type).imageSrc;
    }

    return (
      <div>
        <ListItem
          button
          onClick={() => {
            this.setState({ dialogOpen: !this.state.dialogOpen });
          }}
        >
          <ListItemIcon>
            <img alt="weapon" src={imageSrc} />
          </ListItemIcon>

          <ListItemText
            inset={imageSrc === null}
            primary={set.pieces.weapon ? set.pieces.weapon.name : "-----"}
            secondary={SecondaryTextDisplay(set.pieces.weapon)}
          />
        </ListItem>
        <WeaponPickerDialog
          open={this.state.dialogOpen}
          onClose={() => {
            this.setState({ dialogOpen: false });
          }}
          set={set}
        />
      </div>
    );
  }
}

WeaponListItem.propTypes = {
  set: PropTypes.object
};

export default WeaponListItem;
