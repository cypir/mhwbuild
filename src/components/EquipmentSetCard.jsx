import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Card, { CardActions, CardContent } from "material-ui/Card";
import Button from "material-ui/Button";
import Typography from "material-ui/Typography";
import ShareIcon from "material-ui-icons/Share";

import _ from "lodash";

import Grid from "material-ui/Grid";

import SlotList from "../components/SlotList";
import EquipmentPartList from "../components/EquipmentPartList";
import SkillTotalsList from "../components/SkillTotalsList";

const styles = theme => ({
  flexContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "16px"
  }
  // share: {
  //   justifyContent: "flex-end",
  //   marginTop: "16px"
  // },
  // header: {
  //   justifyContent: "flex-start",
  //   marginTop: "16px"
  // }
});

/**
 * Component that displays a set.
 *
 * Is used in both the calculator and the set planner. If clickable is passed in, then
 * we know it is used for the set planner, so the list items for each piece must be
 * clickable.
 *
 * We then render children in the event where we'd like to extend this list
 * (for example, with the creator we need charms)
 */
const EquipmentSetCard = ({
  set,
  title,
  classes,
  clickable,
  handlePartClick
}) => {
  return (
    <div>
      <Card>
        <CardContent>
          <div className={classes.flexContainer}>
            <Typography variant="title">{title}</Typography>
          </div>
          <Grid container spacing={8}>
            <Grid item xs={12} sm={5}>
              <Typography variant="subheading">Equipment Pieces</Typography>
              <EquipmentPartList
                set={set}
                clickable={clickable}
                handlePartClick={handlePartClick}
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <Typography variant="subheading">Skill Totals</Typography>
              <SkillTotalsList set={set} />
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography variant="subheading">Slot Totals</Typography>
              <SlotList set={set} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default withStyles(styles)(EquipmentSetCard);
