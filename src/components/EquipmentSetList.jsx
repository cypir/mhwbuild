import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import EquipmentSetCard from "./EquipmentSetCard";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import { observer } from "mobx-react";

const styles = theme => ({
  showMoreContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "8px"
  }
});

class EquipmentSetList extends Component {
  constructor() {
    super();
    this.state = {
      lastIndex: 30
    };
  }

  handleShowMore = () => {
    const { matchingEquipmentSets } = this.props;

    this.setState({
      lastIndex:
        matchingEquipmentSets.length > this.state.lastIndex
          ? this.state.lastIndex + 30
          : matchingEquipmentSets.length
    });
  };

  render() {
    const {
      matchingEquipmentSets,
      classes,
      customEquipmentSetStore
    } = this.props;
    //to paginate, first we slice into pages of 30
    //keep track of the page number and enable show more.
    const paginated = matchingEquipmentSets.slice(
      0,
      matchingEquipmentSets.length > this.state.lastIndex
        ? this.state.lastIndex
        : matchingEquipmentSets.length
    );
    return (
      <div>
        <Grid container spacing={8}>
          {paginated.map((set, index) => {
            return (
              <Grid item xs={12} key={index}>
                <EquipmentSetCard
                  key={index}
                  set={set}
                  title={`Equipment Set ${index + 1}`}
                  customizeFn={() => {
                    //first we set the custom equipment set
                    customEquipmentSetStore.setAll(set);
                    //then we navigate to customize
                    this.props.history.push("/create");
                  }}
                />
              </Grid>
            );
          })}
        </Grid>
        {this.state.lastIndex < matchingEquipmentSets.length ? (
          <div className={classes.showMoreContainer}>
            <Button color="primary" onClick={this.handleShowMore}>
              Show More
            </Button>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

EquipmentSetList.propTypes = {};

export default withRouter(withStyles(styles)(observer(EquipmentSetList)));
