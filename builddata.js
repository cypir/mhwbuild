/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const fs = require("fs");
const path = require(`path`);
const possibleSkillNames = require("./src/data/skill_name.json");
const setBonus = require("./src/data/set_bonus.json");
const possibleEquipmentParts = require("./src/data/equipment_part.json");

//before build, we need to parse through all the json files
//and generate a single database of equipment
const equipmentFiles = fs.readdirSync(path.resolve(`src/data/equipment`));

const output = [];

//go through each registered piece of equipment
equipmentFiles.forEach(filename => {
  const file = fs.readFileSync(path.resolve(`src/data/equipment/${filename}`));
  const equipment = JSON.parse(file);

  equipment.pieces.forEach(piece => {
    //check the piece's skills to see if they're all valid skill names
    piece.skills.forEach(skill => {
      if (!possibleSkillNames[skill.name]) {
        throw Error(`${skill.name} is an invalid skill name in ${filename}`);
      }
    });

    //check to see that equipment parts are valid
    const validPart = possibleEquipmentParts.includes(piece.part);
    if (!validPart) {
      throw Error(`${piece.part} is an invalid part in ${filename}`);
    }

    //TODO do extra validation if needed

    //flatten the data structure. End result is an array of individual pieces
    //that we can easily filter through
    const flattened = {
      ...piece,
      rank: equipment.rank,
      bonuses: equipment.bonuses,
      set: equipment.set
    };

    output.push(flattened);
  });
});

//we write charms to the equipment object now
//now proceed to write charms file
const charmFiles = fs.readdirSync(path.resolve(`src/data/charm`));

charmFiles.forEach(filename => {
  const file = fs.readFileSync(path.resolve(`src/data/charm/${filename}`));

  const charm = JSON.parse(file);
  charm.part = "charm";
  charm.slots = [];
  charm.set = "";
  output.push(charm);
});

//write the flattened output to disk
fs.writeFileSync(`src/data/equipment.json`, JSON.stringify(output, null, 2));

//now we get decorations
const decorations = [];
const decorationFiles = fs.readdirSync(path.resolve(`src/data/decoration`));
decorationFiles.forEach(filename => {
  const file = fs.readFileSync(path.resolve(`src/data/decoration/${filename}`));
  const decoration = JSON.parse(file);

  decorations.push(decoration);
});

fs.writeFileSync(
  `src/data/decoration.json`,
  JSON.stringify(decorations, null, 2)
);
