import React from "react";
import { withStyles } from "material-ui/styles";
import Card, { CardContent } from "material-ui/Card";
import Typography from "material-ui/Typography";
import Grid from "material-ui/Grid";
import SetSlotList from "../components/SetSlotList";
import EquipmentPartList from "../components/EquipmentPartList";
import SetSkillTotalsList from "../components/SetSkillTotalsList";
import WeaponListItem from "./WeaponListItem";

const styles = theme => ({
  flexContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "16px"
  },
  flexContainerClickable: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "16px",
    cursor: "pointer"
  }
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
 *
 * customizeable = enable link to customize
 */
const EquipmentSetCard = ({
  set,
  title,
  classes,
  clickable,
  handlePartClick,
  customizeFn
}) => {
  return (
    <div>
      <Card>
        <CardContent>
          <div
            className={
              customizeFn
                ? classes.flexContainerClickable
                : classes.flexContainer
            }
            onClick={() => {
              customizeFn ? customizeFn(set) : "";
            }}
          >
            <Typography
              variant="title"
              color={customizeFn ? "primary" : "default"}
            >
              {title}
            </Typography>
          </div>
          <Grid container spacing={8}>
            <Grid item xs={12} sm={5}>
              <Typography variant="subheading">
                <strong>Equipment Pieces</strong>
              </Typography>
              {//do not display weapon on planner page (which has customizeFn)
              !customizeFn ? <WeaponListItem set={set} /> : ""}
              <EquipmentPartList
                set={set}
                clickable={clickable}
                handlePartClick={handlePartClick}
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <Typography variant="subheading">
                <strong>Equipment Skill Totals</strong>
              </Typography>
              <SetSkillTotalsList set={set} />
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography variant="subheading">
                <strong>Slot Totals</strong>
              </Typography>
              <SetSlotList set={set} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default withStyles(styles)(EquipmentSetCard);
