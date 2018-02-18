import equipment from "../data/equipment.json";
import equipmentParts from "../data/equipment_part.json";
import Combinatrics from "js-combinatorics";
import _ from "lodash";

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
        //indeed a parent and we should skip it, as it is inefficient.
        //otherwise, the possibleParentSet is not a parent, so we push that in
        if (!isParent) {
          efficientCriteriaSets.push(possibleParentSet);
        }
      });

      console.log(efficientCriteriaSets);

      //   //first we need to sort the sets in order of

      //   criteraSets.sort((a,b) => {
      //     if(set.length <)
      //   })

      //now we filter out the sets which don't meet the user's criteria
      //console.log(criteriaSets);
      setsWithSkillsWanted[skillWanted.name] = efficientCriteriaSets;
    });

    //after we get a list of all armors, we must now do a cartesian product to get
    //all possible combos that could yield the results we want. However,
    //some results will not make sense, like possibly two gauntlets. We must throw
    //these sets out
    let categorizedBySkillArray = _.values(setsWithSkillsWanted);
    let cp = Combinatrics.cartesianProduct(
      ...categorizedBySkillArray
    ).toArray();

    //remove any sets that have duplicate parts (two gloves, etc)
    let resultSets = [];

    //we iterate through the armor that satisfies each skill requirement
    cp.forEach(skillSet => {
      //we will convert this set back into an object with its individual types.
      //if there are any duplicates, it will be skipped
      let mappedSet = {};
      let duplicate = false;

      //continue loop as long as duplicate is not found
      for (let i = 0; i < skillSet.length; i++) {
        for (let k = 0; k < skillSet[i].length && !duplicate; k++) {
          let piece = skillSet[i][k];
          if (mappedSet[piece.part]) {
            //if the name is an exact match, then we don't worry about it.
            //could be the case if one piece has both skills that a user wants.
            if (
              piece.name.toLowerCase() !==
              mappedSet[piece.part].name.toLowerCase()
            ) {
              duplicate = true;
            }
          } else {
            //add this piece to the mapped set
            mappedSet[piece.part] = piece;
          }
        }
      }

      //if we looked through the set and found no duplicate parts,
      //then this is a valid set that matches their criteria
      if (!duplicate) {
        resultSets.push(mappedSet);
      }
    });

    return resultSets;
  }
};
