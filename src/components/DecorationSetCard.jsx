import React from "react";
import { withStyles } from "material-ui/styles";
import Card, { CardContent } from "material-ui/Card";
import Typography from "material-ui/Typography";
import SkillTotalsList from "../components/SkillTotalsList";
import Grid from "material-ui/Grid";
import DecorationPartList from "../components/DecorationPartList";
import { observer } from "mobx-react";

const styles = theme => ({
  flexContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "16px"
  }
});

/**
 * Card that displays the dynamically generated list of decoration slots.
 * This is restricted to the number of decorations that an equipment set provides.
 *
 * Dynamically generate the card based on the set
 */
const DecorationSetCard = ({
  set,
  title,
  classes,
  onDecorationChanged,
  onDecorationRemoved
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
              <Typography variant="subheading">
                <strong>Deocrations</strong>
              </Typography>
              <DecorationPartList
                set={set}
                onDecorationChanged={onDecorationChanged}
                onDecorationRemoved={onDecorationRemoved}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="subheading">
                <strong>Decoration Skill Totals</strong>
              </Typography>
              <SkillTotalsList decoParts={set.decorations} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default withStyles(styles)(DecorationSetCard);
