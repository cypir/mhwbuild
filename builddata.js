/**
 * This does basic validation of data along with flattening the data into
 * single objects.
 */
const fs = require("fs");
const path = require(`path`);
const setBonus = require("./src/data/set_bonus.json");
const possibleEquipmentParts = require("./src/data/equipment_part.json");

//generate skills json db
const skills = {};
const skillFiles = fs.readdirSync(path.resolve(`src/data/skill`));
skillFiles.forEach(filename => {
  const file = fs.readFileSync(path.resolve(`src/data/skill/${filename}`));
  const skill = JSON.parse(file);

  skills[skill.name] = skill;
});

fs.writeFileSync(`src/data/skill.json`, JSON.stringify(skills, null, 2));

const output = [];

//generate equipment json db
const equipmentFiles = fs.readdirSync(path.resolve(`src/data/equipment`));

//go through each registered piece of equipment
equipmentFiles.forEach(filename => {
  const file = fs.readFileSync(path.resolve(`src/data/equipment/${filename}`));
  const equipment = JSON.parse(file);

  equipment.pieces.forEach(piece => {
    //check the piece's skills to see if they're all valid skill names
    piece.skills.forEach(skill => {
      if (!skills[skill.name]) {
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
