import React, { Component } from "react";
import PropTypes from "prop-types";
import Card, { CardContent } from "material-ui/Card";
import List, { ListItem, ListItemText } from "material-ui/List";
import Typography from "material-ui/Typography";
import { observer } from "mobx-react";
import { withStyles } from "material-ui/styles";

const styles = theme => ({
  listItem: {
    padding: 4
  }
});

const SummaryStats = ({ set, classes }) => {
  return (
    <Card>
      <CardContent>
        <div>
          <Typography variant="title">Stat Summary</Typography>
        </div>
        <List>
          <ListItem className={classes.listItem}>
            <ListItemText primary={`Max Attack: 157`} />
          </ListItem>
          <ListItem className={classes.listItem}>
            <ListItemText primary={`Affinity: 157`} />
          </ListItem>
          <ListItem className={classes.listItem}>
            <ListItemText primary={`Element: 157`} />
          </ListItem>
          <ListItem className={classes.listItem}>
            <ListItemText primary={`Defense: 157`} />
          </ListItem>
          <ListItem className={classes.listItem} style={{ marginTop: 24 }}>
            <ListItemText primary={`Vs. Fire: 157`} />
          </ListItem>
          <ListItem className={classes.listItem}>
            <ListItemText primary={`Vs. Water: 157`} />
          </ListItem>
          <ListItem className={classes.listItem}>
            <ListItemText primary={`Vs. Thunder: 157`} />
          </ListItem>
          <ListItem className={classes.listItem}>
            <ListItemText primary={`Vs. Ice: 157`} />
          </ListItem>
          <ListItem className={classes.listItem}>
            <ListItemText primary={`Vs. Dragon: 157`} />
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
};

SummaryStats.propTypes = {};

export default withStyles(styles)(SummaryStats);
