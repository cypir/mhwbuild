import React, { Component } from "react";
import PropTypes from "prop-types";

import { withStyles } from "material-ui/styles";
import TextField from "material-ui/TextField";
import Paper from "material-ui/Paper";
import { MenuItem } from "material-ui/Menu";
import Downshift from "downshift";

import skillNamesJson from "../data/skill_name.json";
const skillNames = Object.keys(skillNamesJson);

const renderInput = inputProps => {
  const { InputProps, classes, ref, ...other } = inputProps;

  return (
    <TextField
      {...other}
      fullWidth
      inputRef={ref}
      InputProps={{
        classes: {
          input: classes.input
        },
        ...InputProps
      }}
    />
  );
};

const renderSuggestion = params => {
  const {
    suggestion,
    index,
    itemProps,
    highlightedIndex,
    selectedItem
  } = params;
  const isHighlighted = highlightedIndex === index;
  const isSelected = selectedItem === suggestion;

  return (
    <MenuItem
      {...itemProps}
      key={suggestion}
      selected={isHighlighted}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400
      }}
    >
      {suggestion}
    </MenuItem>
  );
};

const getSuggestions = inputValue => {
  let count = 0;

  return skillNames.filter(suggestion => {
    const keep =
      (!inputValue ||
        suggestion.toLowerCase().includes(inputValue.toLowerCase())) &&
      count < 5;

    if (keep) {
      count += 1;
    }

    return keep;
  });
};

const styles = {
  container: {
    flexGrow: 1
  }
};

const SkillAutocompleteField = props => {
  const { classes } = props;

  return (
    <Downshift onInputValueChange={props.handleSkillNameChange(props.index)}>
      {({
        getInputProps,
        getItemProps,
        isOpen,
        inputValue,
        selectedItem,
        highlightedIndex,
        onInputValueChange
      }) => (
        <div>
          {renderInput({
            classes,
            InputProps: getInputProps({
              placeholder: "Search for a skill",
              id: "integration-downshift"
            })
          })}
          {isOpen ? (
            <Paper square>
              {getSuggestions(inputValue).map((suggestion, index) =>
                renderSuggestion({
                  suggestion,
                  index,
                  itemProps: getItemProps({ item: suggestion }),
                  highlightedIndex,
                  selectedItem
                })
              )}
            </Paper>
          ) : null}
        </div>
      )}
    </Downshift>
  );
};

SkillAutocompleteField.propTypes = {
  handleSkillNameChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired
};

export default withStyles(styles)(SkillAutocompleteField);
