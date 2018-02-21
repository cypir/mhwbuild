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
import AddIcon from "material-ui-icons/Add";

import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from "material-ui/ExpansionPanel";
import ExpandMoreIcon from "material-ui-icons/ExpandMore";

import Typography from "material-ui/Typography";
import SearchIcon from "material-ui-icons/Search";

import { FormGroup, FormControlLabel } from "material-ui/Form";
import Checkbox from "material-ui/Checkbox";

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
        // {
        //   name: "",
        //   level: 1,
        //   id: nanoid(),
        //   ui: { nameError: "", levelError: "" }
        // }
      ]
    };
  }

  handleAddWantedSkill = e => {
    //console.log(this.state);
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
    console.log(index);
    console.log(this.state);
    this.setState(
      {
        skillsWanted: [
          ...this.state.skillsWanted.slice(0, index),
          ...this.state.skillsWanted.slice(index + 1)
        ]
      },
      () => {
        console.log(this.state);
      }
    );
  };

  onSubmit = e => {
    e.preventDefault();
    console.log(this.state);

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

      console.log(skill.level);

      if (isNaN(skill.level) || skill.level === "" || skill.level < 1) {
        skill.ui.levelError = "Skill level must be greater than 0";
        return (errorFound = true);
      } else {
        skill.ui.levelError = "";
      }
    });

    this.setState({ skillsWanted: copy });

    if (!errorFound) {
      this.props.onFormSave(this.state.skillsWanted);
    }
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
            <div>
              <FormGroup row>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Has Set Bonus"
                />
              </FormGroup>
            </div>
            <div className={classes.slotsSection}>
              <Typography variant="title">Decoration Slots</Typography>
              <Grid container spacing={8}>
                <Grid item xs={4}>
                  <TextField label="# Level 1" fullWidth type="number" />
                </Grid>
                <Grid item xs={4}>
                  <TextField label="# Level 2" fullWidth type="number" />
                </Grid>
                <Grid item xs={4}>
                  <TextField label="# Level 3" fullWidth type="number" />
                </Grid>
              </Grid>
            </div>
            <div className={classes.skillsHeader}>
              <Typography variant="title">Skills</Typography>
              <IconButton
                color="primary"
                aria-label="Add"
                className={classes.addButton}
                onClick={this.handleAddWantedSkill}
              >
                <AddIcon />
              </IconButton>
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
                          label="Skill Level"
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
