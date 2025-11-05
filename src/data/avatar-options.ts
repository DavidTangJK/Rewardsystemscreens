export interface AvatarConfig {
  top?: string[];
  accessories?: string[];
  hairColor?: string[];
  facialHair?: string[];
  facialHairColor?: string[];
  clothes?: string[];
  clothesColor?: string[];
  eyes?: string[];
  eyebrows?: string[];
  mouth?: string[];
  skin?: string[];
}

export const avatarOptions = {
  // Skin tones
  skinColors: [
    { id: 'ffdbb4', name: 'Pale' },
    { id: 'edb98a', name: 'Light' },
    { id: 'fd9841', name: 'Tanned' },
    { id: 'd08b5b', name: 'Brown' },
    { id: 'ae5d29', name: 'Dark Brown' },
    { id: '614335', name: 'Black' },
  ],
  
  // Hair/Top types
  topTypes: [
    { id: 'bigHair', name: 'Big Hair', emoji: '💁' },
    { id: 'bob', name: 'Bob', emoji: '💇' },
    { id: 'bun', name: 'Bun', emoji: '🥰' },
    { id: 'curly', name: 'Curly', emoji: '🌀' },
    { id: 'curvy', name: 'Curvy', emoji: '🌊' },
    { id: 'dreads', name: 'Dreads', emoji: '🎸' },
    { id: 'frida', name: 'Frida', emoji: '🌺' },
    { id: 'fro', name: 'Fro', emoji: '☁️' },
    { id: 'froBand', name: 'Fro Band', emoji: '🎯' },
    { id: 'frizzle', name: 'Frizzle', emoji: '⚡' },
    { id: 'hat', name: 'Hat', emoji: '🎩' },
    { id: 'longButNotTooLong', name: 'Not Too Long', emoji: '😊' },
    { id: 'miaWallace', name: 'Mia Wallace', emoji: '🎬' },
    { id: 'shaggy', name: 'Shaggy', emoji: '🎸' },
    { id: 'shaggyMullet', name: 'Shaggy Mullet', emoji: '🎸' },
    { id: 'shavedSides', name: 'Shaved Sides', emoji: '⚡' },
    { id: 'shortCurly', name: 'Short Curly', emoji: '😄' },
    { id: 'shortDreads01', name: 'Short Dreads 1', emoji: '🎵' },
    { id: 'shortDreads02', name: 'Short Dreads 2', emoji: '🎶' },
    { id: 'shortFlat', name: 'Short Flat', emoji: '😌' },
    { id: 'shortRound', name: 'Short Round', emoji: '🙂' },
    { id: 'shortWaved', name: 'Short Waved', emoji: '〰️' },
    { id: 'sides', name: 'Sides', emoji: '✂️' },
    { id: 'straight01', name: 'Straight 1', emoji: '💫' },
    { id: 'straight02', name: 'Straight 2', emoji: '✨' },
    { id: 'straightAndStrand', name: 'Straight Strand', emoji: '🌟' },
    { id: 'theCaesar', name: 'Caesar', emoji: '🏛️' },
    { id: 'theCaesarAndSidePart', name: 'Caesar Side', emoji: '👑' },
    { id: 'turban', name: 'Turban', emoji: '👳' },
    { id: 'winterHat01', name: 'Winter Hat 1', emoji: '🧢' },
    { id: 'winterHat02', name: 'Winter Hat 2', emoji: '🎿' },
    { id: 'winterHat03', name: 'Winter Hat 3', emoji: '⛷️' },
    { id: 'winterHat04', name: 'Beanie', emoji: '🏂' },
  ],
  
  // Hair colors
  hairColors: [
    { id: '2c1b18', name: 'Black' },
    { id: '4a312c', name: 'Dark Brown' },
    { id: '724133', name: 'Brown' },
    { id: 'a55728', name: 'Auburn' },
    { id: 'b58143', name: 'Blonde' },
    { id: 'd6b370', name: 'Golden' },
    { id: 'c93305', name: 'Red' },
    { id: 'f59797', name: 'Pink' },
    { id: '4a90e2', name: 'Blue' },
    { id: 'ecdcbf', name: 'Platinum' },
    { id: 'e8e1e1', name: 'Silver' },
  ],
  
  // Accessories
  accessoriesTypes: [
    { id: 'none', name: 'None', emoji: '·' },
    { id: 'eyepatch', name: 'Eyepatch', emoji: '🏴‍☠️' },
    { id: 'kurt', name: 'Kurt', emoji: '🕶️' },
    { id: 'prescription01', name: 'Glasses 1', emoji: '👓' },
    { id: 'prescription02', name: 'Glasses 2', emoji: '🤓' },
    { id: 'round', name: 'Round', emoji: '⭕' },
    { id: 'sunglasses', name: 'Sunglasses', emoji: '😎' },
    { id: 'wayfarers', name: 'Wayfarers', emoji: '🕶️' },
  ],
  
  // Facial hair
  facialHairTypes: [
    { id: 'none', name: 'None', emoji: '·' },
    { id: 'beardLight', name: 'Light Beard', emoji: '🧔‍♂️' },
    { id: 'beardMedium', name: 'Medium Beard', emoji: '🧔' },
    { id: 'beardMajestic', name: 'Majestic', emoji: '🧙' },
    { id: 'moustacheFancy', name: 'Fancy Mustache', emoji: '🥸' },
    { id: 'moustacheMagnum', name: 'Magnum', emoji: '👨' },
  ],
  
  // Clothes
  clotheTypes: [
    { id: 'blazerAndShirt', name: 'Blazer', emoji: '👔' },
    { id: 'blazerAndSweater', name: 'Sweater', emoji: '🧥' },
    { id: 'collarAndSweater', name: 'Collar Sweater', emoji: '👕' },
    { id: 'graphicShirt', name: 'Graphic Tee', emoji: '👕' },
    { id: 'hoodie', name: 'Hoodie', emoji: '🧥' },
    { id: 'overall', name: 'Overall', emoji: '👖' },
    { id: 'shirtCrewNeck', name: 'Crew Neck', emoji: '👔' },
    { id: 'shirtScoopNeck', name: 'Scoop Neck', emoji: '👚' },
    { id: 'shirtVNeck', name: 'V-Neck', emoji: '👕' },
  ],
  
  // Clothe colors
  clotheColors: [
    { id: '262e33', name: 'Black' },
    { id: '65c9ff', name: 'Sky Blue' },
    { id: '5199e4', name: 'Blue' },
    { id: '25557c', name: 'Navy' },
    { id: 'e6e6e6', name: 'Light Gray' },
    { id: '929598', name: 'Gray' },
    { id: '3c4f5c', name: 'Heather' },
    { id: 'b1e2ff', name: 'Baby Blue' },
    { id: 'a7ffc4', name: 'Mint' },
    { id: 'ffdeb5', name: 'Peach' },
    { id: 'ffafb9', name: 'Rose' },
    { id: 'ffffb1', name: 'Yellow' },
    { id: 'ff488e', name: 'Pink' },
    { id: 'ff5c5c', name: 'Red' },
    { id: 'ffffff', name: 'White' },
  ],
  
  // Eyes
  eyeTypes: [
    { id: 'close', name: 'Closed', emoji: '😌' },
    { id: 'cry', name: 'Crying', emoji: '😢' },
    { id: 'default', name: 'Default', emoji: '😊' },
    { id: 'dizzy', name: 'Dizzy', emoji: '😵' },
    { id: 'eyeRoll', name: 'Eye Roll', emoji: '🙄' },
    { id: 'happy', name: 'Happy', emoji: '😄' },
    { id: 'hearts', name: 'Hearts', emoji: '😍' },
    { id: 'side', name: 'Side', emoji: '👀' },
    { id: 'squint', name: 'Squint', emoji: '😑' },
    { id: 'surprised', name: 'Surprised', emoji: '😮' },
    { id: 'wink', name: 'Wink', emoji: '😉' },
    { id: 'winkWacky', name: 'Wink Wacky', emoji: '🤪' },
  ],
  
  // Eyebrows
  eyebrowTypes: [
    { id: 'angry', name: 'Angry', emoji: '😠' },
    { id: 'angryNatural', name: 'Angry Natural', emoji: '😤' },
    { id: 'default', name: 'Default', emoji: '🙂' },
    { id: 'defaultNatural', name: 'Natural', emoji: '😊' },
    { id: 'flatNatural', name: 'Flat', emoji: '😐' },
    { id: 'frownNatural', name: 'Frown', emoji: '😟' },
    { id: 'raisedExcited', name: 'Excited', emoji: '😃' },
    { id: 'raisedExcitedNatural', name: 'Excited Natural', emoji: '🤗' },
    { id: 'sadConcerned', name: 'Sad', emoji: '😟' },
    { id: 'sadConcernedNatural', name: 'Sad Natural', emoji: '😞' },
    { id: 'unibrowNatural', name: 'Unibrow', emoji: '🤨' },
    { id: 'upDown', name: 'Up Down', emoji: '🤔' },
    { id: 'upDownNatural', name: 'Up Down Natural', emoji: '🧐' },
  ],
  
  // Mouths
  mouthTypes: [
    { id: 'concerned', name: 'Concerned', emoji: '😟' },
    { id: 'default', name: 'Default', emoji: '🙂' },
    { id: 'disbelief', name: 'Disbelief', emoji: '😲' },
    { id: 'eating', name: 'Eating', emoji: '😋' },
    { id: 'grimace', name: 'Grimace', emoji: '😬' },
    { id: 'sad', name: 'Sad', emoji: '😢' },
    { id: 'scream', name: 'Scream', emoji: '😱' },
    { id: 'serious', name: 'Serious', emoji: '😐' },
    { id: 'smile', name: 'Smile', emoji: '😊' },
    { id: 'tongue', name: 'Tongue', emoji: '😛' },
    { id: 'twinkle', name: 'Twinkle', emoji: '✨' },
    { id: 'vomit', name: 'Vomit', emoji: '🤮' },
  ],
};

export const defaultAvatarConfig: AvatarConfig = {
  top: ['shortFlat'],
  accessories: ['none'],
  hairColor: ['724133'],
  facialHair: ['none'],
  facialHairColor: ['724133'],
  clothes: ['hoodie'],
  clothesColor: ['25557c'],
  eyes: ['happy'],
  eyebrows: ['default'],
  mouth: ['smile'],
  skin: ['edb98a'],
};
