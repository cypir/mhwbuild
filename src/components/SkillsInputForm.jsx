import React, { Component } from "react";
import PropTypes from "prop-types";
import skillNamesJson from "../data/skill_name.json";
import SkillAutocompleteField from "./SkillAutocompleteField";
import TextField from "material-ui/TextField";
import Grid from "material-ui/Grid";
import Button from "material-ui/Button";
import { withStyles } from "material-ui/styles";
import IconButton from "material-ui/IconButton";
import DeleteIcon from "material-ui-icons/Delete";
import nanoid from "nanoid";
import AddIcon from "material-ui-icons/AddCircleOutline";

import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from "material-ui/ExpansionPanel";
import ExpandMoreIcon from "material-ui-icons/ExpandMore";

import Typography from "material-ui/Typography";
import SearchIcon from "material-ui-icons/Search";

import { FormGroup, FormControlLabel } from "material-ui/Form";
import Checkbox from "material-ui/Checkbox";
import Tooltip from "material-ui/Tooltip";

import Radio, { RadioGroup } from "material-ui/Radio";
import { FormLabel, FormControl, FormHelperText } from "material-ui/Form";

const skillNames = Object.keys(skillNamesJson);

const styles = theme => ({
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "16px"
  },
  fieldContainer: {
    marginTop: "8px"
  },
  expansionDetails: {
    display: "block",

    [theme.breakpoints.down("sm")]: {
      paddingLeft: "8px",
      paddingRight: "8px"
    }
  },
  expansionHeader: {
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "8px",
      paddingRight: "8px"
    }
  },
  skillsHeader: {
    display: "flex"
  },
  addButton: {
    marginTop: "-13px"
  },
  slotsSection: {
    marginTop: "16px",
    marginBottom: "16px"
  }
});

/**
 * Auto complete, dynamically generated form.
 * State is kept in this component. Accepts a callback function on save
 * with the result. This is to prevent the main UI from updating with every
 * input change to the the form due to updating the state.
 */
class SkillsInputForm extends Component {
  constructor() {
    super();
    this.state = {
      skillsWanted: [
        {
          name: "",
          level: 1,
          id: nanoid(),
          ui: { nameError: "", levelError: "" }
        }
      ],
      slotsWanted: [0, 0, 0],
      slotsMinTotal: 0,
      slotType: "minTotal",
      requireSetBonus: false
    };
  }

  handleAddWantedSkill = e => {
    this.setState({
      skillsWanted: [
        ...this.state.skillsWanted,
        {
          name: "",
          level: 1,
          id: nanoid(),
          ui: { nameError: "", levelError: "" }
        }
      ]
    });
  };

  handleSkillNameChange = idx => value => {
    this.setState({
      skillsWanted: this.state.skillsWanted.map((item, index) => {
        if (index !== idx) {
          // This isn't the item we care about - keep it as-is
          return item;
        }
        // Otherwise, this is the one we want - return an updated value
        return { ...this.state.skillsWanted[idx], name: value };
      })
    });
  };

  handleSkillLevelChange = idx => evt => {
    this.setState({
      skillsWanted: this.state.skillsWanted.map((item, index) => {
        if (index !== idx) {
          // This isn't the item we care about - keep it as-is
          return item;
        }
        // Otherwise, this is the one we want - return an updated value
        return {
          ...this.state.skillsWanted[idx],
          level: parseInt(evt.target.value)
        };
      })
    });
  };

  handleDeleteWantedSkill = index => event => {
    this.setState({
      skillsWanted: [
        ...this.state.skillsWanted.slice(0, index),
        ...this.state.skillsWanted.slice(index + 1)
      ]
    });
  };

  onSubmit = e => {
    e.preventDefault();

    let errorFound = false;
    var self = this;

    let copy = [...this.state.skillsWanted];

    //iterate through and do validations against the skill names
    copy.forEach(skill => {
      //compare name
      if (!skillNamesJson[skill.name]) {
        skill.ui.nameError = "Skill name must be valid";
        return (errorFound = true);
      } else {
        skill.ui.nameError = "";
      }

      if (isNaN(skill.level) || skill.level === "" || skill.level < 1) {
        skill.ui.levelError = "Skill level must be greater than 0";
        return (errorFound = true);
      } else {
        skill.ui.levelError = "";
      }
    });

    this.setState({ skillsWanted: copy });

    if (!errorFound) {
      this.props.onFormSave(this.state);
    }
  };

  handleSlotChanged = index => e => {
    const slotsWanted = this.state.slotsWanted.slice();
    slotsWanted[index] = parseInt(e.target.value);

    this.setState({ slotsWanted });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <ExpansionPanel defaultExpanded>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            className={classes.expansionHeader}
          >
            <Typography variant="title">Search Criteria</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.expansionDetails}>
            <div className={classes.skillsHeader}>
              <Tooltip
                placement="top-start"
                title="Add a new skill and skill level criteria for set results."
              >
                <Typography variant="title">Skill Requirements</Typography>
              </Tooltip>
            </div>
            <form onSubmit={this.onSubmit} style={{ width: "100%" }}>
              {this.state.skillsWanted.map((skill, index) => {
                return (
                  <div key={skill.id} className={classes.fieldContainer}>
                    <Grid container spacing={8}>
                      <Grid item xs={6} sm={9}>
                        <SkillAutocompleteField
                          handleSkillNameChange={this.handleSkillNameChange}
                          index={index}
                          errorText={skill.ui.nameError}
                        />
                      </Grid>
                      <Grid item xs={4} sm={2} key={`${index}_level`}>
                        <TextField
                          error={skill.ui.levelError !== ""}
                          label="Level"
                          fullWidth
                          value={skill.level}
                          onChange={this.handleSkillLevelChange(index)}
                          type="number"
                          helperText={skill.ui.levelError}
                        />
                      </Grid>
                      <Grid item xs={2} sm={1} key={`${index}_delete`}>
                        <IconButton
                          aria-label="Delete"
                          onClick={this.handleDeleteWantedSkill(index)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </div>
                );
              })}
              <Button
                color="primary"
                onClick={this.handleAddWantedSkill}
                style={{
                  visibility:
                    this.state.skillsWanted.length > 2 ? "hidden" : "visible"
                }}
              >
                <AddIcon />
                Add Skill Requirement
              </Button>

              <div className={classes.slotsSection}>
                <Typography variant="title">Decoration Slots</Typography>
                <FormControl component="fieldset" required>
                  <RadioGroup
                    aria-label="slotType"
                    name="slotType"
                    row={true}
                    value={this.state.slotType}
                    onChange={(event, value) => {
                      this.setState({ slotType: value });
                    }}
                  >
                    <FormControlLabel
                      value="minTotal"
                      control={<Radio />}
                      label="by minimum total"
                    />
                    <FormControlLabel
                      value="level"
                      control={<Radio />}
                      label="by level"
                    />
                  </RadioGroup>
                </FormControl>
                {this.state.slotType === "minTotal" ? (
                  <div id="by-min-total">
                    <TextField
                      label="Minimum number of decoration slots that a set should have
                  total."
                      fullWidth
                      type="number"
                      onChange={e => {
                        this.setState({ slotsMinTotal: e.target.value });
                      }}
                      value={this.state.slotsMinTotal}
                    />
                  </div>
                ) : (
                  <div id="by-level">
                    <Typography variant="caption">
                      Minimum number of decoration slots that a set should have
                      per decoration level. Leave at 0 to skip this criteria.
                      The filter is applied after minimizing on skill critieria.
                    </Typography>
                    <div style={{ marginTop: "8px" }}>
                      <Grid container spacing={8}>
                        {this.state.slotsWanted.map((slot, index) => {
                          return (
                            <Grid item xs={4} key={index}>
                              <TextField
                                label={`# Level ${index + 1}`}
                                fullWidth
                                type="number"
                                onChange={this.handleSlotChanged(index)}
                                value={this.state.slotsWanted[index]}
                              />
                            </Grid>
                          );
                        })}
                      </Grid>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <Tooltip
                  placement="top-start"
                  title="Filters for sets that have one or more set bonuses."
                >
                  <FormGroup row>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={this.state.requireSetBonus}
                          onChange={(e, checked) => {
                            this.setState({ requireSetBonus: checked });
                          }}
                        />
                      }
                      label="Has Set Bonus"
                    />
                  </FormGroup>
                </Tooltip>
              </div>
              <div className={classes.buttonContainer}>
                <Button color="primary" type="submit">
                  <SearchIcon />
                  Search
                </Button>
              </div>
            </form>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}

SkillsInputForm.propTypes = {
  onFormSave: PropTypes.func.isRequired
};

export default withStyles(styles)(SkillsInputForm);
