import React, { Component } from "react";
import PropTypes from "prop-types";
import skillNamesJson from "../data/skill_name.json";
import SkillAutocompleteField from "./SkillAutocompleteField";
import TextField from "material-ui/TextField";
import Grid from "material-ui/Grid";
import Button from "material-ui/Button";
import { withStyles } from "material-ui/styles";

const skillNames = Object.keys(skillNamesJson);

const styles = theme => ({
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end"
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
      skillsWanted: [{ name: "", level: 1 }]
    };
  }

  handleAddWantedSkill = e => {
    //console.log(this.state);
    this.setState({
      skillsWanted: [...this.state.skillsWanted, { name: "", level: 1 }]
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
        return { ...this.state.skillsWanted[idx], level: evt.target.value };
      })
    });
  };

  onSubmit = e => {
    e.preventDefault();
    console.log(this.state);
    this.props.onFormSave(this.state.skillsWanted);
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          {this.state.skillsWanted.map((skill, index) => {
            return (
              <div key={index}>
                <Grid container spacing={8}>
                  <Grid item xs={12} sm={9} key={index}>
                    <SkillAutocompleteField
                      handleSkillNameChange={this.handleSkillNameChange}
                      value={skill.name}
                      index={index}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3} key={`${index}_level`}>
                    <TextField
                      label="Skill Level"
                      fullWidth
                      value={skill.level}
                      onChange={this.handleSkillLevelChange(index)}
                    />
                  </Grid>
                </Grid>
              </div>
            );
          })}
          <div className={classes.buttonContainer}>
            <Button color="primary" onClick={this.handleAddWantedSkill}>
              Add Another Skill
            </Button>
            <Button color="primary" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

SkillsInputForm.propTypes = {
  onFormSave: PropTypes.func.isRequired
};

export default withStyles(styles)(SkillsInputForm);
