import React, { Component } from "react";
import PropTypes from "prop-types";
import { ListItem, ListItemIcon, ListItemText } from "material-ui/List";
import Collapse from "material-ui/transitions/Collapse";
import PickerDialog from "./PickerDialog";
import possibleDecorations from "../data/decoration.json";
import Typography from "material-ui/Typography";
import List from "material-ui/List";

/**
 * Create the form for listing out the decorations. Iterate through slots and create the form.
 */
class DecorationPartListItem extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      dialogOpen: false,
      selectedIndex: -1
    };
  }

  getSlotDisplay = (piece, decorations) => {
    let sum = 0;

    console.log(piece);

    //total number possible slots
    let total = 0;
    if (!piece || !decorations[piece.part]) {
      return "-----";
    }

    decorations[piece.part].forEach(decoration => {
      if (decoration.hasOwnProperty("name")) {
        total++;

        if (decoration.name !== "") {
          sum++;
        }
      }
    });

    return `${sum}/${total}`;
  };

  render() {
    const { icon, set, part } = this.props;
    const { decorations } = set;
    const piece = set.pieces[part];

    return (
      <div>
        <ListItem
          button
          onClick={() => {
            //toggle the state
            this.setState({ open: !this.state.open });
          }}
        >
          <ListItemIcon>
            <img alt="part" src={icon} />
          </ListItemIcon>
          <ListItemText primary={this.getSlotDisplay(piece, decorations)} />
        </ListItem>
        {piece ? (
          <Collapse in={this.state.open} timeout="auto" unmountOnExit>
            {piece.slots.map((slot, index) => {
              if (slot === 0) {
                return;
              }
              return (
                <List key={index} style={{ marginLeft: 32 }}>
                  <ListItem
                    button={true}
                    onClick={() => {
                      this.setState({ dialogOpen: true, selectedIndex: index });
                    }}
                    style={{ padding: 0 }}
                  >
                    <Typography variant="body2">{`Level ${slot}`}</Typography>
                    <ListItemText
                      primary={
                        decorations[piece.part] &&
                        decorations[piece.part][index].name !== ""
                          ? decorations[piece.part][index].name
                          : "Empty Slot"
                      }
                      secondary={
                        decorations[piece.part] &&
                        decorations[piece.part][index].name !== ""
                          ? decorations[piece.part][index].skill
                          : ""
                      }
                    />
                  </ListItem>
                </List>
              );
            })}
          </Collapse>
        ) : (
          ""
        )}
        <PickerDialog
          open={this.state.dialogOpen}
          onClose={() => {
            this.setState({ dialogOpen: false });
          }}
          selectedPart="decoration"
          //display only the relevant levels for decorations
          items={possibleDecorations.filter(deco => {
            if (piece) {
              return deco.level <= piece.slots[this.state.selectedIndex];
            }
            return false;
          })}
          handlePieceSelected={item => {
            this.setState({ dialogOpen: false });
            set.setDecoration(part, this.state.selectedIndex, item);
          }}
          handlePieceRemoved={() => {
            this.setState({ dialogOpen: false });
            set.removeDecoration(part, this.state.selectedIndex);
          }}
          secondaryTextProp="skill"
        />
      </div>
    );
  }
}

DecorationPartListItem.propTypes = {
  handleDecorationChanged: PropTypes.func,
  icon: PropTypes.string
};

export default DecorationPartListItem;
