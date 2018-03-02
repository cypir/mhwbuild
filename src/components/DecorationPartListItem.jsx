import React, { Component } from "react";
import PropTypes from "prop-types";
import { ListItem, ListItemIcon, ListItemText } from "material-ui/List";
import Collapse from "material-ui/transitions/Collapse";
import TextField from "material-ui/TextField";

/**
 * Create the form for listing out the decorations. Iterate through slots and create the form.
 */
class DecorationPartListItem extends Component {
  constructor() {
    super();
    this.state = {
      open: false
    };
  }
  render() {
    const { icon, handleDecorationChanged, piece } = this.props;
    console.log(piece);
    return (
      <div>
        <ListItem
          button
          onClick={() => {
            console.log("clicked");
            //toggle the state
            this.setState({ open: !this.state.open });
          }}
        >
          <ListItemIcon>
            <img alt="part" src={icon} />
          </ListItemIcon>
          <ListItemText primary={"0/2 Slots"} />
        </ListItem>
        {piece ? (
          <Collapse in={this.state.open} timeout="auto" unmountOnExit>
            {piece.slots.map((slot, index) => {
              return slot > 0 ? (
                <TextField
                  key={`${piece.part}_${index}`}
                  id={`${piece.part}_${index}`}
                  label={`Level ${slot}`}
                  value={"Wind Proof"}
                  onChange={handleDecorationChanged}
                  margin="normal"
                />
              ) : (
                ""
              );
            })}
          </Collapse>
        ) : (
          ""
        )}
      </div>
    );
  }
}

DecorationPartListItem.propTypes = {
  handleDecorationChanged: PropTypes.func,
  icon: PropTypes.string
};

export default DecorationPartListItem;
