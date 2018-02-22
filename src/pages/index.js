import React from "react";
import Link from "gatsby-link";
import _ from "lodash";
import skills from "../data/skill_name.json";
import calculate from "../util/calculate";
import { withStyles } from "material-ui/styles";
import EquipmentSetList from "../components/EquipmentSetList";
import SkillsInputForm from "../components/SkillsInputForm";
import Typography from "material-ui/Typography";
import setBonuses from "../data/set_bonus.json";

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

  onFormSave = formInput => {
    const {
      skillsWanted,
      slotsWanted,
      slotType,
      slotsMinTotal,
      requireSetBonus
    } = formInput;

    let sets = calculate.generateSets(skillsWanted);

    //sort sets by fewest pieces of gear required
    sets.sort((setA, setB) => {
      return Object.keys(setA).length - Object.keys(setB).length;
    });

    //if we enforce set bonuses, we have to go through each set
    //and figure out if it contains the right pieces
    if (requireSetBonus) {
      sets = sets.filter(set => {
        return set.bonuses.immediate.length > 0;
      });
    }

    //if we have slot criteria, filter so only those that meet the criteria display
    sets = sets.filter(set => {
      let levels = [0, 0, 0];

      for (let piece in set.pieces) {
        if (set.pieces.hasOwnProperty(piece)) {
          //index is slot, value is level
          //index is level, value is amount
          set.pieces[piece].slots.forEach(slot => {
            //slot is a gem slot that contains a variable level
            switch (slot) {
              case 1:
                levels[0]++;
                break;
              case 2:
                levels[1]++;
                break;
              case 3:
                levels[2]++;
                break;
            }
          });
        }
      }

      if (slotType === "level") {
        //iterate through and make sure each value is larger
        let valid = true;
        for (let i = 0; i < slotsWanted.length && valid === true; i++) {
          if (slotsWanted[i] > levels[i]) {
            return false;
          }
        }

        return true;
      } else {
        //sum up levels and compare with requested sum. Accept if sum from set is greater.
        let sum = levels[0] + levels[1] + levels[2];

        return sum >= slotsMinTotal;
      }
    });

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
