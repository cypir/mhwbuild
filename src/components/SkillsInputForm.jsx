import React, { Component } from "react";
import PropTypes from "prop-types";
import skillNamesJson from "../data/skill_name.json";
import SkillAutocompleteField from "./SkillAutocompleteField";

const skillNames = Object.keys(skillNamesJson);

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
      skillsWanted: []
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
    return (
      <div>
        <button onClick={this.handleAddWantedSkill}>Add Another Skill</button>
        <form onSubmit={this.onSubmit}>
          {this.state.skillsWanted.map((skill, idx) => {
            return (
              <div key={idx}>
                {/* <input
                  value={skill.name}
                  onChange={this.handleSkillNameChange(idx)}
                /> */}
                <SkillAutocompleteField
                  handleSkillNameChange={this.handleSkillNameChange}
                  value={skill.name}
                  index={idx}
                />
                <input
                  value={skill.level}
                  onChange={this.handleSkillLevelChange(idx)}
                />
              </div>
            );
          })}
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

SkillsInputForm.propTypes = {
  onFormSave: PropTypes.func.isRequired
};

export default SkillsInputForm;
