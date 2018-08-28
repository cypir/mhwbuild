import React, { Component } from "react";
import EquipmentSetCard from "../components/EquipmentSetCard";
import DecorationSetCard from "../components/DecorationSetCard";
import PickerDialog from "../components/PickerDialog";
import { withStyles } from "@material-ui/core/styles";
import equipment from "../data/equipment.json";
import ShareDialog from "../components/ShareDialog";

import axios from "axios";
import SummaryCard from "../components/SummaryCard";
import qs from "qs";

import { withRouter } from "react-router-dom";
import { observer } from "mobx-react";
import CreatorToolbar from "../components/CreatorToolbar";

const styles = theme => ({
  equipmentSetCard: {
    marginBottom: "24px"
  }
});

class Create extends Component {
  constructor(props) {
    super(props);

    this.state = {
      setName: "Equipment Set",
      dialogOpen: false,
      selectedPart: "",
      shareDialogOpen: false
    };
  }

  onShareClick = () => {
    this.setState({ shareDialogOpen: true });
  };

  onClearClick = () => {
    this.props.customEquipmentSetStore.initialize();
  };

  componentDidMount() {
    //parse qs. Skip first character which is the question mark
    let { id } = qs.parse(this.props.location.search.substring(1));

    if (!id) {
      return;
    }

    var self = this;

    //convert qs to set. We use goo.gl url shortener ids
    axios
      .get(
        `https://www.googleapis.com/urlshortener/v1/url?key=AIzaSyAYTNlLf0WnrtaGuTCTuR8AFF4Xs_fmSnA&shortUrl=http://goo.gl/${id}`
      )
      .then(function(response) {
        //get the last index
        let longUrl = response.data.longUrl;

        let parsedSet = qs.parse(longUrl.substring(longUrl.indexOf("?") + 1), {
          decoder: function(str, defaultDecoder) {
            //if not the empty string and is a number
            if (str !== "" && !isNaN(str)) {
              return parseInt(str, 10);
            }
            //otherwise return the string
            return defaultDecoder(str);
          }
        });

        //when we recreate the state, make sure to restore any empty arrays (qs removes empty arrays)
        self.props.customEquipmentSetStore.setAll(parsedSet);

        self.setState({
          setName: "Custom Set",
          dialogOpen: false,
          selectedPart: "",
          shareDialogOpen: false
        });
      });
  }

  handlePartClick = part => {
    this.setState({ selectedPart: part, dialogOpen: true });
  };

  handlePieceSelected = piece => {
    this.props.customEquipmentSetStore.setPiece(piece);
    this.setState({
      dialogOpen: false
    });
  };

  //piece is just the string of the part (but called piece because its equipped)
  handlePieceRemoved = piece => {
    this.props.customEquipmentSetStore.removePiece(piece);
    this.setState({
      dialogOpen: false
    });
  };

  /**
   * copy build url to clipboard
   */
  closeShareDialog = toCopy => {
    this.setState({ shareDialogOpen: false });
  };

  render() {
    const { classes, customEquipmentSetStore } = this.props;
    return (
      <div style={{ marginBottom: 24 }}>
        <CreatorToolbar
          onShareClick={this.onShareClick}
          onClearClick={this.onClearClick}
        />
        <div className={classes.equipmentSetCard}>
          <EquipmentSetCard
            set={customEquipmentSetStore}
            title={this.state.setName}
            clickable={true}
            handlePartClick={this.handlePartClick}
          />
        </div>
        <DecorationSetCard
          set={customEquipmentSetStore}
          onDecorationChanged={this.onDecorationChanged}
          onDecorationRemoved={this.onDecorationRemoved}
          title="Decoration Set"
        />
        <SummaryCard set={customEquipmentSetStore} />
        <PickerDialog
          open={this.state.dialogOpen}
          onClose={() => {
            this.setState({ dialogOpen: false });
          }}
          selectedPart={this.state.selectedPart}
          handlePieceSelected={this.handlePieceSelected}
          handlePieceRemoved={this.handlePieceRemoved}
          items={equipment.filter(
            equip => equip.part === this.state.selectedPart
          )}
          filterFn={(item, filter) => {
            let skillMatch = item.skills.some(skill => {
              return skill.name.toLowerCase().includes(filter.toLowerCase());
            });

            let itemNameMatch = item.name
              .toLowerCase()
              .includes(filter.toLowerCase());

            return skillMatch || itemNameMatch;
          }}
        />
        {/* <ShareDialog
          open={this.state.shareDialogOpen}
          onClose={() => {
            this.closeShareDialog(false);
          }}
          set={customEquipmentSetStore}
        /> */}
      </div>
    );
  }
}

Create.propTypes = {};

export default withRouter(withStyles(styles)(observer(Create)));
