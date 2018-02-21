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
        let setCount = {};

        //keep track of how many slots are empty. If
        let emptyPieceSpots = 5;

        //go through each set and sum up the piece names in an object
        _.values(set.pieces).forEach(piece => {
          //the set that the piece belongs to
          let setPieceBelongsTo = piece.set;

          if (!setCount[setPieceBelongsTo]) {
            setCount[setPieceBelongsTo] = 0;
          }

          //increment the count for this particular set that it belongs to
          setCount[setPieceBelongsTo]++;

          //reduce the number of empty piece spots
          emptyPieceSpots--;
        });

        setCount.emptyPieceSpots = emptyPieceSpots;

        //console.log(setCount);

        //now go through all sets and figure out if there is a set bonus to be had
        for (let setBonus in setBonuses) {
          if (setBonuses.hasOwnProperty(setBonus)) {
            //pieces that count towards the bonus
            let piecesThatCount = 0;

            //check sets that satisfy set bonus requirements
            setBonuses[setBonus].sets.forEach(validSet => {
              //sum up from our existing set count any pieces that count
              if (setCount[validSet]) {
                piecesThatCount += setCount[validSet];
              }
            });

            //now check to see if we have enough pieces that count to get a
            //set bonus only in conjunction with the pieces we already have.
            //For example, we won't show a set bonus for 2 piece anja if we
            //only have 1 piece legiana
            if (piecesThatCount > 0) {
              //piecesThatCount - 1 because index starts from 0 for number of pieces owned
              let immediateBonus =
                setBonuses[setBonus].requirements[piecesThatCount - 1] !== null;

              set.bonuses = ["Anjanath Willpower"];

              return immediateBonus;
            } else {
              return false;
            }
          }
        }

        console.log(setCount);
      });
    }

    //if we have slot criteria, filter so only those that meet the criteria display
    // sets = sets.filter(set => {
    //   let levels = [0, 0, 0];

    //   for (let piece in set) {
    //     if (set.hasOwnProperty(piece)) {
    //       set.pieces[piece].slots.forEach((slot, index) => {
    //         switch (index) {
    //           case 0:
    //             levels[0]++;
    //             break;
    //           case 1:
    //             levels[1]++;
    //             break;
    //           case 2:
    //             levels[2]++;
    //             break;
    //         }
    //       });
    //     }
    //   }

    //   if (slotType === "level") {
    //     //iterate through and make sure each value is larger
    //     let valid = true;
    //     for (let i = 0; i < slotsWanted.length && valid === true; i++) {
    //       if (slotsWanted[i] > levels[i]) {
    //         return false;
    //       }
    //     }

    //     return true;
    //   } else {
    //     //sum up levels and compare with requested sum. Accept if sum from set is greater.
    //     let sum = levels[0] + levels[1] + levels[2];

    //     return sum >= slotsMinTotal;
    //   }
    // });

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
