import calculate from "../util/calculate";
import { decorate, observable, action, computed } from "mobx";

/**
 * Manages the changes to the equipment set that we are focusing on
 */

class CustomEquipmentSetStore {
  bonuses = {
    immediate: []
  };
  pieces = {
    weapon: undefined,
    head: undefined,
    chest: undefined,
    arm: undefined,
    waist: undefined,
    leg: undefined,
    charm: undefined
  };
  decorations = {
    weapon: undefined,
    head: undefined,
    chest: undefined,
    arm: undefined,
    waist: undefined,
    leg: undefined,
    charm: undefined
  };

  setAll(set) {
    console.log(this.bonuses);
    console.log(set.bonuses);

    if (!set.bonuses) {
      this.bonuses = calculate.setBonus(this.completeSet);
    } else {
      this.bonuses = set.bonuses;
    }

    if (!set.pieces) {
      this.pieces = {};
    } else {
      this.pieces = Object.assign(this.pieces, set.pieces);
    }

    //initialize decorations if none
    if (!set.decorations) {
      this.decorations = calculate.decorations(this.completeSet);
    } else {
      this.decorations = set.decorations;
    }

    console.log(this.bonuses);

    //initialize if incoming set doesn't have proper structure

    console.log(this.bonuses);
  }

  get completeSet() {
    return {
      bonuses: this.bonuses,
      pieces: this.pieces,
      decorations: this.decorations
    };
  }

  get completeSetObj() {
    //raw object representation, not computed.
    return {
      bonuses: this.bonuses,
      pieces: this.pieces,
      decorations: this.decorations
    };
  }

  //set an individual piece. Action.
  setPiece(piece) {
    this.pieces[piece.part] = piece;

    //calculate set bonus
    this.bonuses = calculate.setBonus(this.completeSet);

    //calculate new decoration slot per piece
    this.decorations = calculate.singlePartDecoration(this.completeSet, piece);
    //console.log(this.pieces);
  }

  removePiece(piece) {
    //instead of delete, make a clone of the object without that key
    this.pieces[piece] = undefined;
    this.decorations[piece] = undefined;

    console.log(this.completeSet);

    //TODO make calculation part of a computed function
    this.bonuses = calculate.setBonus(this.completeSet);
  }

  setDecoration(part, index, decoration) {
    this.decorations[part][index] = decoration;
  }

  removeDecoration(part, index) {
    this.decorations[part][index] = { name: "", level: 0 };
  }
}

decorate(CustomEquipmentSetStore, {
  bonuses: observable,
  pieces: observable,
  decorations: observable,
  setPiece: action,
  removePiece: action,
  setDecoration: action,
  removeDecoration: action,
  completeSet: computed
});

export default CustomEquipmentSetStore;
