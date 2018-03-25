import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";

import List, { ListItem, ListItemText } from "material-ui/List";
import Divider from "material-ui/Divider";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import IconButton from "material-ui/IconButton";
import Typography from "material-ui/Typography";
import CloseIcon from "material-ui-icons/Close";
import Slide from "material-ui/transitions/Slide";
import TextField from "material-ui/TextField";
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

  render() {
    const {
      classes,
      items,
      handlePieceSelected,
      secondaryTextProp,
      set
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
            .filter(item =>
              item.name.toLowerCase().includes(this.state.filter.toLowerCase())
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
