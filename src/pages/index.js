import React, { Component } from "react";
import changelog from "../CHANGELOG";
import ReactMarkdown from "react-markdown";
import Typography from "@material-ui/core/Typography";

/**
 * Display a changelog
 */
class Index extends Component {
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

export default Index;
