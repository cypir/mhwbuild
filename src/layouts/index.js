import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";

import Header from "../components/Header";
import "typeface-roboto";

const TemplateWrapper = ({ children }) => (
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
    <Header />
    <div
      style={{
        margin: "0 auto",
        maxWidth: 960,
        padding: "0px 1.0875rem 1.45rem",
        paddingTop: 0
      }}
    >
      {children()}
    </div>
  </div>
);

TemplateWrapper.propTypes = {
  children: PropTypes.func
};

export default TemplateWrapper;
