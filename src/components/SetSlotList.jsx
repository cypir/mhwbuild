import React from "react";
import PropTypes from "prop-types";
import List, { ListItem, ListItemIcon, ListItemText } from "material-ui/List";

//breakdown by total number of slots and by sum of each level of slot
//data is stored like [3,2,2] meaning 1 level 3 slot and 2 level 2 slots
//we convert this to a list of level sums where [3,2,2] means 3 level 1,
//2 level 2, 2 level 3
const SetSlotList = ({ set }) => {
  let levels = [0, 0, 0];

  for (let piece in set.pieces) {
    if (set.pieces.hasOwnProperty(piece)) {
      //index is slot, value is level
      //index is level, value is amount
      //possible that slot doesn't exist (charm)
      if (set.pieces[piece].slots) {
        set.pieces[piece].slots.forEach(slot => {
          //slot is a gem slot that contains a variable level
          switch (slot) {
            case 1:
              levels[0]++;
              break;
            case 2:
              levels[1]++;
              break;
            case 3:
              levels[2]++;
              break;
          }
        });
      }
    }
  }

  return (
    <div>
      <List>
        {levels.map((numLevel, index) => {
          return (
            <ListItem key={index} style={{ padding: "4px" }}>
              <ListItemText primary={`Level ${index + 1}: ${numLevel}`} />
            </ListItem>
          );
        })}
        <ListItem>
          <ListItemText primary={`Total: ${_.sum(levels)}`} />
        </ListItem>
      </List>
    </div>
  );
};

SetSlotList.propTypes = {
  set: PropTypes.object
};

export default SetSlotList;
