import React, { Component } from "react";
import PropTypes from "prop-types";
import changelog from "../CHANGELOG";
import ReactMarkdown from "react-markdown";
import Typography from "material-ui/Typography";

/**
 * Display a changelog
 */
class Index extends Component {
  constructor() {
    super();
    console.log(changelog);
  }

  render() {
    return (
      <div>
        <Typography>
          <ReactMarkdown source={changelog} />
        </Typography>
      </div>
    );
  }
}

Index.propTypes = {};

export default Index;
