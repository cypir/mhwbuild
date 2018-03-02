import equipment from "../data/equipment.json";
import equipmentParts from "../data/equipment_part.json";
import Combinatrics from "js-combinatorics";
import _ from "lodash";
import setBonuses from "../data/set_bonus.json";

module.exports = {
  generateSets: skillsWanted => {
    let setsWithSkillsWanted = {};

    //iterate through all skills that the user wants
    skillsWanted.forEach(skillWanted => {
      //filter down equipment to only equipment that has the particular skill
      const relevantEquips = equipment.filter(equip => {
        //make sure at least one skill from this equipment piece has what the user wants
        return equip.skills.some(element => {
          return element.name.toLowerCase() === skillWanted.name.toLowerCase();
        });
      });

      console.log(relevantEquips);

      //for storing sets that match one skill criteria
      let categorizedByPart = {};

      //split the relevant equips into their equipment part categories
      equipmentParts.forEach(equipmentPart => {
        let equips = relevantEquips.filter(equip => {
          return equip.part === equipmentPart;
        });

        if (equips.length > 0) {
          categorizedByPart[equipmentPart] = equips;
        }
      });

      console.log(categorizedByPart);

      //need to do the cartesian product of each combination of equip parts
      //for example, if two pieces (arms and helmet), we need to do just arm,
      //just helmet and arm and helmet

      let categorizedByPartArray = _.values(categorizedByPart);
      //console.log(categorizedByPartArray);

      let indices = [];
      for (var i = 0; i < categorizedByPartArray.length; i++) {
        indices.push(i);
      }

      //get the power set for the indices of the array
      let powerSet = Combinatrics.power(indices).toArray();

      let allSets = [];

      //for each combination, get the arrays and do a cartesian product
      //we start at 1 because first item is empty set
      for (let i = 1; i < powerSet.length; i++) {
        let combination = powerSet[i];

        //we need to find the cartesian product of all combinations,
        //so for 2 pieces (head and arms), we have 0,1,01, which are
        //only head, only arm, head and arms
        let toFindProduct = [];

        combination.forEach(index => {
          toFindProduct.push(categorizedByPartArray[index]);
        });

        //then we use the spread operator to break the array of arrays into individual arrays
        let cp = Combinatrics.cartesianProduct(...toFindProduct);

        //use spread because its nested one level too deep
        allSets.push(...cp.toArray());
      }

      //sets that match the level criteria
      let criteriaSets = [];
      allSets.forEach(set => {
        //iterate through the set and figure out if we meet the minimum criteria
        let sum = 0;
        set.forEach(piece => {
          piece.skills.forEach(skill => {
            if (skill.name.toLowerCase() === skillWanted.name.toLowerCase()) {
              sum += skill.level;
            }
          });
        });

        if (sum >= skillWanted.level) {
          criteriaSets.push(set);
        }
      });

      const efficientCriteriaSets = [];

      //TODO we can't find efficient sets because it interferes if we want to do slot calculations
      //since it won't present us with all possible armors
      //now we need to do a check to see if the minimum number of pieces was used
      //to achieve the skill level threshold. To do this, we check to see if any subsets
      //are present in all sets. If a set contains a subset that is also valid, then by
      //definition it contains extraneous armor pieces.

      criteriaSets.forEach((possibleParentSet, index) => {
        var isParent = false;

        //we iterate until we figure out whether or not the possibleParentSet is in fact a parent set.
        for (let i = 0; i < criteriaSets.length && !isParent; i++) {
          //we do not compare to self
          if (i !== index) {
            let possibleChildSet = criteriaSets[i];

            let diff = _.differenceBy(
              possibleChildSet,
              possibleParentSet,
              "name"
            );

            if (diff.length === 0) {
              isParent = true;
            }
          }
        }

        //if the difference in length is 0, then possibleParentSet is
        //indeed a parent and we should skip it, as it is inefficient. That is, we could
        //have achieved a set that achieves the criteria in less pieces.
        //otherwise, the possibleParentSet is not a parent, so we push that in
        if (!isParent) {
          efficientCriteriaSets.push(possibleParentSet);
        }
      });

      //now we filter out the sets which don't meet the user's criteria
      //console.log(criteriaSets);
      setsWithSkillsWanted[skillWanted.name] = efficientCriteriaSets;
    });

    //after we get a list of all armors, we must now do a cartesian product to get
    //all possible combos that could yield the results we want. However,
    //some results will not make sense, like possibly two gauntlets. We must throw
    //these sets out
    let categorizedBySkillArray = _.values(setsWithSkillsWanted);

    //if any of the sets are empty, then there are no sets that satisfy the individual
    //skill requirement, so logically our result set will be empty. We cannot pass an
    //empty array into the cartesian product, because that will generate an error.
    let containsEmptySet =
      categorizedBySkillArray.some(item => {
        return item.length === 0;
      }) || categorizedBySkillArray.length === 0;

    //sets that match criteria
    let resultSets = [];

    //if each wanted skill level can be created individually, then we begin trying to combine
    //them. Otherwise, we just return an empty result set, as there is at least one skill
    //that cannot satisfied. For example, Affinity Sliding at level 3 is not possible from
    //equipment pieces alone.
    if (!containsEmptySet) {
      let cp = Combinatrics.cartesianProduct(
        ...categorizedBySkillArray
      ).toArray();

      //we iterate through the armor that satisfies each skill requirement
      cp.forEach(setWithSkills => {
        //we will convert this set back into an object with its individual types.
        //if there are any duplicates, it will be skipped
        let mappedSet = { pieces: {} };
        let duplicate = false;

        //continue loop as long as duplicate is not found
        //by duplicate, we mean that sometimes we will try to form a set with two
        //helmets for example. We need to remove these, as they are not valid sets.
        for (let i = 0; i < setWithSkills.length; i++) {
          //keeps track of how many pieces we have that are contributing to a set
          let setBonusCount = {};

          //keep track of how many empty are empty. This will be useful for suggestions.
          //TODO not implemented yet
          let emptyPieceSpots = 5;

          for (let k = 0; k < setWithSkills[i].length && !duplicate; k++) {
            let piece = setWithSkills[i][k];
            if (mappedSet.pieces[piece.part]) {
              //if the name is an exact match, then we don't worry about it.
              //could be the case if one piece has both skills that a user wants.
              //for example if we have gear that has both attack and defense boost,
              //it may try to create a set with two helmets with that piece, so
              //we just keep that helmet.
              if (
                piece.name.toLowerCase() !==
                mappedSet.pieces[piece.part].name.toLowerCase()
              ) {
                duplicate = true;
              }
            } else {
              if (!setBonusCount[piece.set]) {
                setBonusCount[piece.set] = 0;
              }
              //add to set bonus tracking
              setBonusCount[piece.set]++;

              //reduce the amount of free spots we have
              emptyPieceSpots--;

              //add this piece to the mapped set
              mappedSet.pieces[piece.part] = piece;
            }
          }

          //bonuses divided into immediate (intrinsic with the minimum) or possible
          //(with another piece, could have set bonus)
          mappedSet.bonuses = {
            immediate: [],
            possible: []
          };

          for (let setBonus in setBonuses) {
            if (setBonuses.hasOwnProperty(setBonus)) {
              //pieces that count towards the bonus
              let piecesThatCount = 0;

              //check sets that satisfy set bonus requirements
              setBonuses[setBonus].sets.forEach(validSet => {
                //sum up from our existing set count any pieces that count
                if (setBonusCount[validSet]) {
                  piecesThatCount += setBonusCount[validSet];
                }
              });

              //now check to see if we have enough pieces that count to get a
              //set bonus only in conjunction with the pieces we already have.
              if (piecesThatCount > 0) {
                //piecesThatCount - 1 because index starts from 0 for number of pieces owned
                let immediateBonus =
                  setBonuses[setBonus].requirements[piecesThatCount - 1] !==
                  null;

                if (immediateBonus) {
                  mappedSet.bonuses.immediate.push(
                    setBonuses[setBonus].requirements[piecesThatCount - 1]
                  );
                } else {
                  //check to see if there could possibly be a set
                }

                //mappedSet.bonuses =

                //set.bonuses = ["Anjanath Willpower"];
              }
            }
          }
        }

        //if we looked through the set and found no duplicate parts,
        //then this is a valid set that matches their criteria
        if (!duplicate) {
          resultSets.push(mappedSet);
        }
      });
    }
    return resultSets;
  },
  setBonus: set => {
    const bonuses = {
      immediate: [],
      possible: []
    };

    //the count of matching pieces in a given set
    let setBonusCount = {};

    //count the set bonus numbers
    _.values(set.pieces).forEach(piece => {
      if (!setBonusCount[piece.set]) {
        setBonusCount[piece.set] = 0;
      }
      setBonusCount[piece.set]++;
    });

    for (let setBonus in setBonuses) {
      if (setBonuses.hasOwnProperty(setBonus)) {
        //pieces that count towards the bonus
        let piecesThatCount = 0;

        //check sets that satisfy set bonus requirements
        setBonuses[setBonus].sets.forEach(validSet => {
          //sum up from our existing set count any pieces that count
          if (setBonusCount[validSet]) {
            piecesThatCount += setBonusCount[validSet];
          }
        });

        //now check to see if we have enough pieces that count to get a
        //set bonus only in conjunction with the pieces we already have.
        if (piecesThatCount > 0) {
          //piecesThatCount - 1 because index starts from 0 for number of pieces owned
          let immediateBonus =
            setBonuses[setBonus].requirements[piecesThatCount - 1] !== null;

          if (immediateBonus) {
            //we push because can have bonuses from multiple sets
            bonuses.immediate.push(
              setBonuses[setBonus].requirements[piecesThatCount - 1]
            );
          } else {
            //check to see if there could possibly be a set
          }

          //mappedSet.bonuses =

          //set.bonuses = ["Anjanath Willpower"];
        }
      }
    }

    return bonuses;
  },
  /**
   * Return the decorations for a set
   */
  decorations: set => {
    let decorations = {};
    //iterate through the pieces
    for (let part in set.pieces) {
      if (set.pieces.hasOwnProperty(part)) {
        let piece = set.pieces[part];

        decorations[part] = [];

        //iterate through the slots
        piece.slots.forEach(slotLevel => {
          //if we have a value, add slot info
          if (slotLevel > 0) {
            decorations[part].push({ name: "", level: slotLevel });
          } else {
            decorations[part].push({});
          }
        });
      }
    }

    return decorations;
  }
};
