export interface AvatarConfig {
  baseColor?: string[];
  ears?: string[];
  earringColor?: string[];
  earrings?: string[];
  eyebrows?: string[];
  eyes?: string[];
  eyeShadowColor?: string[];
  facialHair?: string[];
  glasses?: string[];
  glassesColor?: string[];
  hairColor?: string[];
  hair?: string[];
  mouth?: string[];
  nose?: string[];
  shirt?: string[];
  shirtColor?: string[];
}

export const avatarOptions = {
  // Skin tones
  skinColors: [
    { id: "ffdbb4", name: "Pale", emoji: "🤍" },
    { id: "edb98a", name: "Light", emoji: "🧡" },
    { id: "fd9841", name: "Tanned", emoji: "🧡" },
    { id: "d08b5b", name: "Brown", emoji: "🤎" },
    { id: "ae5d29", name: "Dark Brown", emoji: "🤎" },
    { id: "614335", name: "Deep", emoji: "🖤" },
  ],

  // Hair styles
  hairStyles: [
    { id: "dannyPhantom", name: "Danny", emoji: "✨" },
    { id: "dougFunny", name: "Doug", emoji: "🎨" },
    { id: "fonze", name: "Fonze", emoji: "😎" },
    { id: "full", name: "Full", emoji: "🌊" },
    { id: "mrClean", name: "Bald", emoji: "✨" },
    { id: "mrT", name: "Mr T", emoji: "💪" },
    { id: "pixie", name: "Pixie", emoji: "🧚" },
    { id: "turban", name: "Turban", emoji: "👳" },
  ],

  // Hair colors
  hairColors: [
    { id: "2c1b18", name: "Black", color: "#2c1b18" },
    { id: "4a312c", name: "Dark Brown", color: "#4a312c" },
    { id: "724133", name: "Brown", color: "#724133" },
    { id: "a55728", name: "Auburn", color: "#a55728" },
    { id: "b58143", name: "Blonde", color: "#b58143" },
    { id: "d6b370", name: "Golden", color: "#d6b370" },
    { id: "c93305", name: "Red", color: "#c93305" },
    { id: "f59797", name: "Pink", color: "#f59797" },
    { id: "6c4ba6", name: "Purple", color: "#6c4ba6" },
    { id: "4a90e2", name: "Blue", color: "#4a90e2" },
    { id: "78c251", name: "Green", color: "#78c251" },
  ],

  // Eyes
  eyeTypes: [
    { id: "eyesShadow", name: "Shadow", emoji: "😊" },
    { id: "round", name: "Round", emoji: "😮" },
    { id: "smiling", name: "Smiling", emoji: "😄" },
  ],

  // Eye Shadow Colors
  eyeShadowColors: [
    { id: "", name: "None", color: "#ffffff" },
    { id: "000000", name: "Black", color: "#000000" },
    { id: "a55728", name: "Brown", color: "#a55728" },
    { id: "4a90e2", name: "Blue", color: "#4a90e2" },
    { id: "78c251", name: "Green", color: "#78c251" },
    { id: "6c4ba6", name: "Purple", color: "#6c4ba6" },
    { id: "f59797", name: "Pink", color: "#f59797" },
  ],

  // Eyebrows
  eyebrowTypes: [
    { id: "down", name: "Down", emoji: "😔" },
    { id: "eyelashesDown", name: "Lashes Down", emoji: "😢" },
    { id: "eyelashesUp", name: "Lashes Up", emoji: "😊" },
    { id: "up", name: "Up", emoji: "😃" },
  ],

  // Mouth
  mouthTypes: [
    { id: "frown", name: "Frown", emoji: "☹️" },
    { id: "laughing", name: "Laughing", emoji: "😆" },
    { id: "nervous", name: "Nervous", emoji: "😬" },
    { id: "pucker", name: "Pucker", emoji: "😗" },
    { id: "sad", name: "Sad", emoji: "😢" },
    { id: "smile", name: "Smile", emoji: "😊" },
    { id: "smirk", name: "Smirk", emoji: "😏" },
    { id: "surprised", name: "Surprised", emoji: "😲" },
  ],

  // Nose
  noseTypes: [
    { id: "curve", name: "Curve", emoji: "👃" },
    { id: "pointed", name: "Pointed", emoji: "👃" },
    { id: "tound", name: "Tound", emoji: "👃" },
  ],

  // Ears
  earTypes: [
    { id: "attached", name: "Attached", emoji: "👂" },
    { id: "detached", name: "Detached", emoji: "👂" },
  ],

  // Facial Hair
  facialHairTypes: [
    { id: "", name: "None", emoji: "·" },
    { id: "beard", name: "Beard", emoji: "🧔" },
    { id: "scruff", name: "Scruff", emoji: "🧔" },
  ],

  // Glasses
  glassesTypes: [
    { id: "", name: "None", emoji: "·" },
    { id: "round", name: "Round", emoji: "👓" },
    { id: "square", name: "Square", emoji: "🤓" },
  ],

  // Glasses colors
  glassesColors: [
    { id: "000000", name: "Black", color: "#000000" },
    { id: "4a90e2", name: "Blue", color: "#4a90e2" },
    { id: "c93305", name: "Red", color: "#c93305" },
    { id: "6c4ba6", name: "Purple", color: "#6c4ba6" },
    { id: "f59797", name: "Pink", color: "#f59797" },
  ],

  // Earrings
  earringTypes: [
    { id: "", name: "None", emoji: "·" },
    { id: "hoop", name: "Hoop", emoji: "⭕" },
    { id: "stud", name: "Stud", emoji: "💎" },
  ],

  // Earring colors
  earringColors: [
    { id: "ffd700", name: "Gold", color: "#ffd700" },
    { id: "c0c0c0", name: "Silver", color: "#c0c0c0" },
    { id: "4a90e2", name: "Blue", color: "#4a90e2" },
    { id: "c93305", name: "Red", color: "#c93305" },
    { id: "6c4ba6", name: "Purple", color: "#6c4ba6" },
  ],

  // Shirts
  shirtTypes: [
    { id: "collared", name: "Collared", emoji: "👔" },
    { id: "crew", name: "Crew", emoji: "👕" },
    { id: "open", name: "Open", emoji: "🧥" },
  ],

  // Shirt colors
  shirtColors: [
    { id: "262e33", name: "Black", color: "#262e33" },
    { id: "ffffff", name: "White", color: "#ffffff" },
    { id: "65c9ff", name: "Sky Blue", color: "#65c9ff" },
    { id: "5199e4", name: "Blue", color: "#5199e4" },
    { id: "25557c", name: "Navy", color: "#25557c" },
    { id: "a7ffc4", name: "Mint", color: "#a7ffc4" },
    { id: "78c251", name: "Green", color: "#78c251" },
    { id: "ffdeb5", name: "Peach", color: "#ffdeb5" },
    { id: "ffafb9", name: "Rose", color: "#ffafb9" },
    { id: "ff488e", name: "Pink", color: "#ff488e" },
    { id: "ff5c5c", name: "Red", color: "#ff5c5c" },
    { id: "6c4ba6", name: "Purple", color: "#6c4ba6" },
    { id: "ffffb1", name: "Yellow", color: "#ffffb1" },
  ],
};

export const defaultAvatarConfig: AvatarConfig = {
  baseColor: ["edb98a"],
  ears: ["attached"],
  earringColor: ["ffd700"],
  earrings: [""],
  eyebrows: ["up"],
  eyes: ["round"],
  eyeShadowColor: [""],
  facialHair: [""],
  glasses: [""],
  glassesColor: ["000000"],
  hairColor: ["724133"],
  hair: ["full"],
  mouth: ["smile"],
  nose: ["curve"],
  shirt: ["crew"],
  shirtColor: ["5199e4"],
};
