import React from "react";
import Link from "gatsby-link";
import _ from "lodash";
import skills from "../data/skill_name.json";
import calculate from "../util/calculate";
import { withStyles } from "material-ui/styles";
import EquipmentSetList from "../components/EquipmentSetList";
import SkillsInputForm from "../components/SkillsInputForm";

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
      matchingEquipmentSets: []
    };
  }

  onFormSave = skillsWanted => {
    let sets = calculate.generateSets(skillsWanted);
    this.setState({
      matchingEquipmentSets: sets
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <SkillsInputForm onFormSave={this.onFormSave} />
        Sets that match your criteria: <br />
        <EquipmentSetList
          matchingEquipmentSets={this.state.matchingEquipmentSets}
        />
      </div>
    );
  }
}

export default withStyles(styles)(IndexPage);
