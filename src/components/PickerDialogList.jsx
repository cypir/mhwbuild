import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import skillformat from "../util/skillformat";

const styles = theme => ({
  filter: {
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2
  }
});

class PickerDialogList extends Component {
  constructor() {
    super();
    this.state = {
      filter: ""
    };
  }

  filterByItemName = item => {
    return item.name.toLowerCase().includes(this.state.filter.toLowerCase());
  };

  render() {
    const {
      classes,
      items,
      handlePieceSelected,
      secondaryTextProp,
      filterFn
    } = this.props;
    return (
      <div>
        <div className={classes.filter}>
          <TextField
            label="Filter"
            fullWidth
            value={this.state.filter}
            onChange={e => {
              this.setState({ filter: e.target.value });
            }}
            type="text"
          />
        </div>
        <List>
          {items
            .filter(
              filterFn
                ? item => {
                    return filterFn(item, this.state.filter);
                  }
                : this.filterByItemName
            )
            .map(item => {
              return (
                <div key={item.name}>
                  <ListItem
                    button
                    onClick={e => {
                      //if we have a callback for handling a piece selection, use that
                      handlePieceSelected(item);
                      this.setState({ filter: "" });
                    }}
                  >
                    <ListItemText
                      primary={item.name}
                      secondary={
                        //if we have a secondary prop derived from data, use it. Otherwise, use format function.
                        secondaryTextProp
                          ? item[secondaryTextProp]
                          : skillformat.skillSecondaryDisplayPlanner(item)
                      }
                    />
                  </ListItem>
                  <Divider />
                </div>
              );
            })}
        </List>
      </div>
    );
  }
}

export default withStyles(styles)(PickerDialogList);
