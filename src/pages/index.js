import React from "react";
import Link from "gatsby-link";
import _ from "lodash";
import skills from "../data/skill_name.json";
import calculate from "../util/calculate";
import { withStyles } from "material-ui/styles";
import EquipmentSetList from "../components/EquipmentSetList";
import SkillsInputForm from "../components/SkillsInputForm";
import Typography from "material-ui/Typography";

const styles = theme => ({
  listHeader: {
    marginTop: "24px",
    marginBottom: "24px"
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
        <Typography variant="title" className={classes.listHeader}>
          {`${this.state.matchingEquipmentSets.length} Combinations Found`}
        </Typography>
        <EquipmentSetList
          matchingEquipmentSets={this.state.matchingEquipmentSets}
        />
      </div>
    );
  }
}

export default withStyles(styles)(IndexPage);
