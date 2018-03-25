import bowIcon from "../icons/1/weapons/bow.png";
import dualbladesIcon from "../icons/1/weapons/dualblades.png";
import greatswordIcon from "../icons/1/weapons/greatsword.png";
import gunlanceIcon from "../icons/1/weapons/gunlance.png";
import hammerIcon from "../icons/1/weapons/hammer.png";
import heavybowgunIcon from "../icons/1/weapons/heavybowgun.png";
import huntinghornIcon from "../icons/1/weapons/huntinghorn.png";
import lanceIcon from "../icons/1/weapons/lance.png";
import lightbowgunIcon from "../icons/1/weapons/lightbowgun.png";
import longswordIcon from "../icons/1/weapons/longsword.png";
import swordandshieldIcon from "../icons/1/weapons/swordandshield.png";
import insectglaiveIcon from "../icons/1/weapons/insectglaive.png";
import switchaxeIcon from "../icons/1/weapons/switchaxe.png";
import chargebladeIcon from "../icons/1/weapons/chargeblade.png";

export default {
  getWeapon: weaponType => {
    let imageSrc = null;
    let eng = null;

    switch (weaponType) {
      case "bow":
        imageSrc = bowIcon;
        eng = "Bow";
        break;
      case "dualblades":
        imageSrc = dualbladesIcon;
        eng = "Dual Blades";
        break;
      case "greatsword":
        imageSrc = greatswordIcon;
        eng = "Greatsword";
        break;
      case "gunlance":
        imageSrc = gunlanceIcon;
        eng = "Gun Lance";
        break;
      case "hammer":
        imageSrc = hammerIcon;
        eng = "Hammer";
        break;
      case "heavybowgun":
        imageSrc = heavybowgunIcon;
        eng = "Heavy Bow Gun";
        break;
      case "huntinghorn":
        imageSrc = huntinghornIcon;
        eng = "Hunting Horn";
        break;
      case "lance":
        imageSrc = lanceIcon;
        eng = "Lance";
        break;
      case "lightbowgun":
        imageSrc = lightbowgunIcon;
        eng = "Light Bow Gun";
        break;
      case "longsword":
        imageSrc = longswordIcon;
        eng = "Longsword";
        break;
      case "swordandshield":
        imageSrc = swordandshieldIcon;
        eng = "Sword and Shield";
        break;
      case "insectglaive":
        imageSrc = insectglaiveIcon;
        eng = "Insect Glaive";
        break;
      case "switchaxe":
        imageSrc = switchaxeIcon;
        eng = "Switch Axe";
        break;
      case "chargeblade":
        imageSrc = chargebladeIcon;
        eng = "Charge Blade";
        break;
    }

    return { imageSrc, eng };
  }
};
