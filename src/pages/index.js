import React from "react";
import Link from "gatsby-link";
import _ from "lodash";
import skills from "../data/skill_name.json";
import calculate from "../util/calculate";
import { withStyles } from "material-ui/styles";
import EquipmentSetList from "../components/EquipmentSetList";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  }
});

class IndexPage extends React.Component {
  constructor() {
    super();
    this.state = {
      skillsWanted: [],
      matchingEquipmentSets: []
    };
  }

  handleAddWantedSkill = e => {
    //console.log(this.state);
    this.setState({
      skillsWanted: [...this.state.skillsWanted, { name: "", level: 1 }]
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    let sets = calculate.generateSets(this.state.skillsWanted);
    this.setState({
      matchingEquipmentSets: sets
    });
    console.log(sets);
  };

  handleSkillNameChange = idx => evt => {
    this.setState({
      skillsWanted: this.state.skillsWanted.map((item, index) => {
        if (index !== idx) {
          // This isn't the item we care about - keep it as-is
          return item;
        }
        // Otherwise, this is the one we want - return an updated value
        return { ...this.state.skillsWanted[idx], name: evt.target.value };
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

  render() {
    const { classes } = this.props;
    return (
      <div>
        <button onClick={this.handleAddWantedSkill}>Add Another Skill</button>
        <form onSubmit={this.handleSubmit}>
          {this.state.skillsWanted.map((skill, idx) => {
            return (
              <div key={idx}>
                <input
                  value={skill.name}
                  onChange={this.handleSkillNameChange(idx)}
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
        Sets that match your criteria: <br />
        <EquipmentSetList
          matchingEquipmentSets={this.state.matchingEquipmentSets}
        />
      </div>
    );
  }
}

export default withStyles(styles)(IndexPage);
