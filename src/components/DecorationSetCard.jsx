import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Card, { CardActions, CardContent } from "material-ui/Card";
import Button from "material-ui/Button";
import Typography from "material-ui/Typography";
import ShareIcon from "material-ui-icons/Share";
import SkillTotalsList from "../components/SkillTotalsList";
import _ from "lodash";

import Grid from "material-ui/Grid";

import EquipmentPartList from "../components/EquipmentPartList";
import SetSkillTotalsList from "../components/SetSkillTotalsList";
import DecorationPartList from "../components/DecorationPartList";

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

          <DecorationPartList
            set={set}
            onDecorationChanged={onDecorationChanged}
            onDecorationRemoved={onDecorationRemoved}
          />

          <SkillTotalsList decoParts={set.decorations} />
        </CardContent>
      </Card>
    </div>
  );
};

export default withStyles(styles)(DecorationSetCard);
