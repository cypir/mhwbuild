import React, { Component } from "react";
import PropTypes from "prop-types";
import EquipmentSetCard from "../components/EquipmentSetCard";
import DecorationSetCard from "../components/DecorationSetCard";
import PickerDialog from "../components/PickerDialog";
import Button from "material-ui/Button";
import { withStyles } from "material-ui/styles";
import { navigateTo } from "gatsby-link";

import querystring from "query-string";
import calculate from "../util/calculate";
import equipment from "../data/equipment.json";
import ShareDialog from "../components/ShareDialog";

import ShareIcon from "material-ui-icons/Share";

import axios from "axios";
import CreateGrandTotalCard from "../components/CreateGrandTotalCard";
import qs from "qs";

const styles = theme => ({
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "16px"
  },
  equipmentSetCard: {
    marginBottom: "24px"
  }
});

class Planner extends Component {
  constructor(props) {
    super(props);

    this.state = {
      set: {
        bonuses: {
          immediate: []
        },
        pieces: {},
        decorations: {}
      },
      setName: "Equipment Set",
      dialogOpen: false,
      selectedPart: "",
      shareDialogOpen: false
    };
  }

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
              return parseInt(str);
            }
            //otherwise return the string
            return defaultDecoder(str);
          }
        });

        //when we recreate the state, make sure to restore any empty arrays (qs removes empty arrays)
        if (!parsedSet.bonuses) {
          parsedSet.bonuses = {
            immediate: []
          };
        }

        if (!parsedSet.pieces) {
          parsedSet.pieces = {};
        }

        if (!parsedSet.decorations) {
          parsedSet.decorations = {};
        }

        self.setState({
          parsedSet,
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
    let newSet = {
      ...this.state.set,
      pieces: {
        ...this.state.set.pieces,
        [piece.part]: piece
      }
    };

    //calculate set bonus
    let bonuses = calculate.setBonus(newSet);
    newSet.bonuses = bonuses;

    //calculate new decoration slot per piece
    newSet.decorations = calculate.singlePartDecoration(newSet, piece);

    //save a copy to internal state
    this.setState({
      set: newSet,
      dialogOpen: false
    });
  };

  //piece is just the string of the part (but called piece because its equipped)
  handlePieceRemoved = piece => {
    //get existing qs
    let qs = querystring.parse(this.props.location.search);

    //set the piece name in the qs
    delete qs[piece];

    //set qs to the proper route
    navigateTo(`${this.props.location.pathname}?${querystring.stringify(qs)}`);

    const pieces = { ...this.state.set.pieces };
    delete pieces[piece];

    this.setState({
      set: {
        ...this.state.set,
        pieces
      },
      dialogOpen: false
    });
  };

  /**
   * copy build url to clipboard
   */
  closeShareDialog = toCopy => {
    this.setState({ shareDialogOpen: false });
  };

  onDecorationChanged = (part, index, decoration) => {
    //clone existing decorations for part
    let newDeco = [...this.state.set.decorations[part]];

    //update decoration
    newDeco[index] = decoration;

    //update state with new part
    this.setState({
      set: {
        ...this.state.set,
        decorations: {
          ...this.state.set.decorations,
          [part]: newDeco
        }
      }
    });
  };

  onDecorationRemoved = (part, index) => {
    //clone existing decorations for part
    let newDeco = [...this.state.set.decorations[part]];

    //update decoration
    newDeco[index] = { name: "", level: 0 };

    //update state with new part
    this.setState({
      set: {
        ...this.state.set,
        decorations: {
          ...this.state.set.decorations,
          [part]: newDeco
        }
      }
    });
  };

  render() {
    const { classes, location } = this.props;
    return (
      <div style={{ marginBottom: 24 }}>
        <div className={classes.buttonContainer}>
          <Button
            color="primary"
            onClick={() => {
              this.setState({ shareDialogOpen: true });
            }}
          >
            <ShareIcon />Share this build
          </Button>
        </div>
        <div className={classes.equipmentSetCard}>
          <EquipmentSetCard
            set={this.state.set}
            title={this.state.setName}
            clickable={true}
            handlePartClick={this.handlePartClick}
          />
        </div>
        <DecorationSetCard
          set={this.state.set}
          onDecorationChanged={this.onDecorationChanged}
          onDecorationRemoved={this.onDecorationRemoved}
          title="Decoration Set"
        />
        <CreateGrandTotalCard set={this.state.set} />
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
        />
        <ShareDialog
          open={this.state.shareDialogOpen}
          onClose={() => {
            this.closeShareDialog(false);
          }}
          set={this.state.set}
        />
      </div>
    );
  }
}

Planner.propTypes = {};

export default withStyles(styles)(Planner);
