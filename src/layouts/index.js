import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";

import Reboot from "material-ui/Reboot";
import "typeface-roboto";
import MainAppBar from "../components/MainAppBar";

import { withStyles } from "material-ui/styles";

const styles = theme => ({
  content: {
    marginTop: "16px",
    marginLeft: "150px",
    marginRight: "150px",

    [theme.breakpoints.down("sm")]: {
      marginLeft: "5px",
      marginRight: "5px"
    }
  }
});

const TemplateWrapper = ({ children, classes }) => (
  <div>
    <Reboot />
    <Helmet
      title="Monster Hunter World Build"
      meta={[
        {
          name: "description",
          content: "Build tools for monster hunter world"
        },
        {
          name: "keywords",
          content: "mhw, monster hunter world, build tools"
        }
      ]}
    />
    <MainAppBar />
    <div className={classes.content}>{children()}</div>
  </div>
);

TemplateWrapper.propTypes = {
  children: PropTypes.func
};

export default withStyles(styles)(TemplateWrapper);
