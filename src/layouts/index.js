import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";

import "normalize.css";
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
    {children()}
  </div>
);

TemplateWrapper.propTypes = {
  children: PropTypes.func
};

export default TemplateWrapper;
