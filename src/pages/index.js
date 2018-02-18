import React from "react";
import Link from "gatsby-link";
import equipment from "../data/equipment.json";
import equipmentParts from "../data/equipment_part.json";
import Combinatrics from "js-combinatorics";
import _ from "lodash";

export default class IndexPage extends React.Component {
  constructor() {
    super();
    this.state = {
      skillsWanted: [
        { name: "Fire Resistance", level: 1},
        { name: "Heat Guard", level: 1 },
        { name: "Sleep Attack", level: 1 }
      ]
    };

    let setsWithSkillsWanted = {};

    //iterate through all skills that the user wants
    this.state.skillsWanted.forEach(skillWanted => {
      //filter down equipment to only equipment that has the particular skill
      const relevantEquips = equipment.filter(equip => {
        //make sure at least one skill from this equipment piece has what the user wants
        return equip.skills.some(element => {
          return element.name === skillWanted.name;
        });
      });

      console.log(relevantEquips);

      //for storing sets that match one skill criteria
      let categorizedByPart = {};

      //split the relevant equips into their equipment part categories
      equipmentParts.forEach(equipmentPart => {
        let equips = relevantEquips.filter(equip => {
          console.log(equip)
          console.log(equipmentPart)
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
        let efficientSum = true
        set.forEach(piece => {
          piece.skills.forEach(skill => {
            if (skill.name === skillWanted.name) {
              //we check to make sure the sum was less than the 
              //requested level. If it is equal or above, this set
              //is adding extraneous skill points, which is inefficient
              if(sum < skillWanted.level){
                //need to add the equipment's skill level to sum
                sum += skill.level;
              }else{
                efficientSum = false
              }              
            }
          });
        });

        if (sum >= skillWanted.level && efficientSum) {
          criteriaSets.push(set);
        }
      });

      //now we filter out the sets which don't meet the user's criteria
      //console.log(criteriaSets);
      setsWithSkillsWanted[skillWanted.name] = criteriaSets;
    });

    //after we get a list of all armors, we must now do a cartesian product to get
    //all possible combos that could yield the results we want. However,
    //some results will not make sense, like possibly two gauntlets. We must throw
    //these sets out
    let categorizedBySkillArray = _.values(setsWithSkillsWanted);
    console.log(categorizedBySkillArray)
    let cp = Combinatrics.cartesianProduct(
      ...categorizedBySkillArray
    ).toArray();

    console.log(cp);

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
            if (piece.name !== mappedSet[piece.part].name) {
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

    console.log(resultSets);
  }

  render() {
    return (
      <div>
        <h1>Hi people</h1>
        <p>Welcome to your new Gatsby site.</p>
        <p>Now go build something great.</p>
        <Link to="/page-2/">Go to page 2</Link>
      </div>
    );
  }
}
