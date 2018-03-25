import React, { Component } from "react";
import PropTypes from "prop-types";
import List, { ListItem, ListItemIcon, ListItemText } from "material-ui/List";
import WeaponPickerDialog from "./WeaponPickerDialog";
//import

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
    let imageSrc = null;

    if (weapon) {
      imageSrc = require(`../icons/1/weapons/${weapon.type}.png`);
    }

    return (
      <div>
        <List>
          <ListItem
            button
            onClick={() => {
              this.setState({ dialogOpen: !this.state.dialogOpen });
            }}
          >
            {imageSrc ? (
              <ListItemIcon>
                <img alt="weapon" src={""} />
              </ListItemIcon>
            ) : (
              ""
            )}
            <ListItemText
              inset={imageSrc === null}
              primary={set.pieces.weapon ? set.pieces.weapon.name : "-----"}
              secondary={SecondaryTextDisplay(set.pieces.weapon)}
            />
          </ListItem>
        </List>
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
