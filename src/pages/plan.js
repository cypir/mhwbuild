import React from "react";
import { withStyles } from "@material-ui/core/styles";
import EquipmentSetList from "../components/EquipmentSetList";
import SkillsInputForm from "../components/SkillsInputForm";
import Typography from "@material-ui/core/Typography";
import Worker from "../util/file.worker.js";
import PromiseWorker from "promise-worker";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = theme => ({
  listHeader: {
    marginTop: "24px",
    marginBottom: "24px"
  },
  inProgress: {
    marginTop: 24,
    display: "flex",
    justifyContent: "center"
  }
});

class Plan extends React.Component {
  constructor() {
    super();
    this.state = {
      matchingEquipmentSets: [],
      loading: false,
      worker: null,
      //we want to hide this text before any search. But after, we should display it (0 results possible)
      didSearch: false
    };
  }

  onFormSave = async formInput => {
    const {
      skillsWanted,
      slotsWanted,
      slotType,
      slotsMinTotal,
      requireSetBonus,
      includeCharms
    } = formInput;

    this.setState({
      loading: true,
      matchingEquipmentSets: [],
      didSearch: true
    });

    //if we do another search before the other worker finishes, then terminate it.
    if (this.state.worker) {
      this.state.worker.terminate();
    }

    const worker = new Worker();
    const promiseWorker = new PromiseWorker(worker);

    //set the worker
    this.setState({ worker });

    //we use a webworker to perform the set generation, as it is very intensive
    let sets = await promiseWorker.postMessage({ skillsWanted, includeCharms });
    worker.terminate();

    this.setState({ worker: null });

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
              default:
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
      matchingEquipmentSets: sets,
      loading: false
    });
  };

  render() {
    const { classes, customEquipmentSetStore } = this.props;
    return (
      <div>
        <SkillsInputForm onFormSave={this.onFormSave} />
        {this.state.loading ? (
          <div className={classes.inProgress}>
            <CircularProgress className={classes.progress} size={50} />
          </div>
        ) : (
          <Typography variant="title" className={classes.listHeader}>
            {`${this.state.matchingEquipmentSets.length} Combinations Found`}
          </Typography>
        )}

        <EquipmentSetList
          matchingEquipmentSets={this.state.matchingEquipmentSets}
          customEquipmentSetStore={customEquipmentSetStore}
        />
      </div>
    );
  }
}

export default withStyles(styles)(Plan);
