module.exports = {
  skillSecondaryDisplay: (part, set) => {
    const piece = set.pieces[part];

    //if this piece exists, then get skills
    if (piece) {
      let buffer = "";
      piece.skills.forEach(skill => {
        buffer += `${skill.name} +${skill.level} / `;
      });

      return buffer.substring(0, buffer.length - 3);
    }
  },
  skillSecondaryDisplayPlanner: equipment => {
    let buffer = "";
    if (equipment.skills) {
      equipment.skills.forEach(skill => {
        buffer += `${skill.name} +${skill.level} / `;
      });

      return buffer.substring(0, buffer.length - 3);
    }

    return "";
  }
};
