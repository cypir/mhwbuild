import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Card, { CardActions, CardContent } from "material-ui/Card";
import Button from "material-ui/Button";
import Typography from "material-ui/Typography";

/**
 * Component that displays a set
 */
const EquipmentSetDisplay = ({ set, index }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="title">Equipment Set {index}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};

export default EquipmentSetDisplay;
