import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";

import "normalize.css";
import Header from "../components/Header";
import "typeface-roboto";
import MainAppBar from "../components/MainAppBar";

import { withStyles } from "material-ui/styles";

const styles = {
  content: {
    marginTop: "30px",
    marginLeft: "50px",
    marginRight: "50px"
  }
};

const TemplateWrapper = ({ children, classes }) => (
  <div>
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
