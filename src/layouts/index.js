import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";

import Reboot from "material-ui/Reboot";
import Header from "../components/Header";
import "typeface-roboto";
import MainAppBar from "../components/MainAppBar";

import { withStyles } from "material-ui/styles";

const styles = theme => ({
  content: {
    marginTop: "30px",
    marginLeft: "50px",
    marginRight: "50px",

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
      title="Monster Hunter World Build Creator"
      meta={[
        {
          name: "description",
          content: "Build creator for monster hunter world"
        },
        {
          name: "keywords",
          content: "mhw, monster hunter world, build creator, "
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
