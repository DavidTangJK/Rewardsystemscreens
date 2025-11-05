export interface AvatarConfig {
  topType: string;
  accessoriesType: string;
  hairColor: string;
  facialHairType: string;
  facialHairColor: string;
  clotheType: string;
  clotheColor: string;
  eyeType: string;
  eyebrowType: string;
  mouthType: string;
  skinColor: string;
}

export const avatarOptions = {
  // Skin tones
  skinColors: [
    { id: 'Tanned', name: 'Tanned', color: '#FD9841' },
    { id: 'Yellow', name: 'Yellow', color: '#F8D25C' },
    { id: 'Pale', name: 'Pale', color: '#FFDBB4' },
    { id: 'Light', name: 'Light', color: '#EDB98A' },
    { id: 'Brown', name: 'Brown', color: '#D08B5B' },
    { id: 'DarkBrown', name: 'Dark Brown', color: '#AE5D29' },
    { id: 'Black', name: 'Black', color: '#614335' },
  ],
  
  // Hair/Top types
  topTypes: [
    { id: 'NoHair', name: 'Bald', emoji: '🙂' },
    { id: 'Eyepatch', name: 'Eyepatch', emoji: '🏴‍☠️' },
    { id: 'Hat', name: 'Hat', emoji: '🎩' },
    { id: 'Hijab', name: 'Hijab', emoji: '🧕' },
    { id: 'Turban', name: 'Turban', emoji: '👳' },
    { id: 'WinterHat1', name: 'Winter Hat', emoji: '🧢' },
    { id: 'WinterHat2', name: 'Winter Hat 2', emoji: '🎿' },
    { id: 'WinterHat3', name: 'Winter Hat 3', emoji: '⛷️' },
    { id: 'WinterHat4', name: 'Beanie', emoji: '🏂' },
    { id: 'LongHairBigHair', name: 'Big Hair', emoji: '💁' },
    { id: 'LongHairBob', name: 'Bob', emoji: '💇' },
    { id: 'LongHairBun', name: 'Bun', emoji: '🥰' },
    { id: 'LongHairCurly', name: 'Curly', emoji: '🌀' },
    { id: 'LongHairCurvy', name: 'Curvy', emoji: '🌊' },
    { id: 'LongHairDreads', name: 'Dreads', emoji: '🎸' },
    { id: 'LongHairFrida', name: 'Frida', emoji: '🌺' },
    { id: 'LongHairFro', name: 'Fro', emoji: '☁️' },
    { id: 'LongHairFroBand', name: 'Fro Band', emoji: '🎯' },
    { id: 'LongHairNotTooLong', name: 'Not Too Long', emoji: '😊' },
    { id: 'LongHairShavedSides', name: 'Shaved Sides', emoji: '⚡' },
    { id: 'LongHairMiaWallace', name: 'Mia Wallace', emoji: '🎬' },
    { id: 'LongHairStraight', name: 'Straight', emoji: '💫' },
    { id: 'LongHairStraight2', name: 'Straight 2', emoji: '✨' },
    { id: 'LongHairStraightStrand', name: 'Straight Strand', emoji: '🌟' },
    { id: 'ShortHairDreads01', name: 'Short Dreads 1', emoji: '🎵' },
    { id: 'ShortHairDreads02', name: 'Short Dreads 2', emoji: '🎶' },
    { id: 'ShortHairFrizzle', name: 'Frizzle', emoji: '⚡' },
    { id: 'ShortHairShaggyMullet', name: 'Shaggy Mullet', emoji: '🎸' },
    { id: 'ShortHairShortCurly', name: 'Short Curly', emoji: '😄' },
    { id: 'ShortHairShortFlat', name: 'Short Flat', emoji: '😌' },
    { id: 'ShortHairShortRound', name: 'Short Round', emoji: '🙂' },
    { id: 'ShortHairShortWaved', name: 'Short Waved', emoji: '〰️' },
    { id: 'ShortHairSides', name: 'Sides', emoji: '✂️' },
    { id: 'ShortHairTheCaesar', name: 'Caesar', emoji: '🏛️' },
    { id: 'ShortHairTheCaesarSidePart', name: 'Caesar Side', emoji: '👑' },
  ],
  
  // Hair colors
  hairColors: [
    { id: 'Auburn', name: 'Auburn', color: '#A55728' },
    { id: 'Black', name: 'Black', color: '#2C1B18' },
    { id: 'Blonde', name: 'Blonde', color: '#B58143' },
    { id: 'BlondeGolden', name: 'Golden Blonde', color: '#D6B370' },
    { id: 'Brown', name: 'Brown', color: '#724133' },
    { id: 'BrownDark', name: 'Dark Brown', color: '#4A312C' },
    { id: 'PastelPink', name: 'Pastel Pink', color: '#F59797' },
    { id: 'Blue', name: 'Blue', color: '#4A90E2' },
    { id: 'Platinum', name: 'Platinum', color: '#ECDCBF' },
    { id: 'Red', name: 'Red', color: '#C93305' },
    { id: 'SilverGray', name: 'Silver Gray', color: '#E8E1E1' },
  ],
  
  // Accessories
  accessoriesTypes: [
    { id: 'Blank', name: 'None', emoji: '·' },
    { id: 'Kurt', name: 'Kurt', emoji: '🕶️' },
    { id: 'Prescription01', name: 'Glasses 1', emoji: '👓' },
    { id: 'Prescription02', name: 'Glasses 2', emoji: '🤓' },
    { id: 'Round', name: 'Round', emoji: '⭕' },
    { id: 'Sunglasses', name: 'Sunglasses', emoji: '😎' },
    { id: 'Wayfarers', name: 'Wayfarers', emoji: '🕶️' },
  ],
  
  // Facial hair
  facialHairTypes: [
    { id: 'Blank', name: 'None', emoji: '·' },
    { id: 'BeardMedium', name: 'Medium Beard', emoji: '🧔' },
    { id: 'BeardLight', name: 'Light Beard', emoji: '🧔‍♂️' },
    { id: 'BeardMagestic', name: 'Majestic', emoji: '🧙' },
    { id: 'MoustacheFancy', name: 'Fancy Mustache', emoji: '🥸' },
    { id: 'MoustacheMagnum', name: 'Magnum', emoji: '👨' },
  ],
  
  // Clothes
  clotheTypes: [
    { id: 'BlazerShirt', name: 'Blazer', emoji: '👔' },
    { id: 'BlazerSweater', name: 'Sweater', emoji: '🧥' },
    { id: 'CollarSweater', name: 'Collar Sweater', emoji: '👕' },
    { id: 'GraphicShirt', name: 'Graphic Tee', emoji: '👕' },
    { id: 'Hoodie', name: 'Hoodie', emoji: '🧥' },
    { id: 'Overall', name: 'Overall', emoji: '👖' },
    { id: 'ShirtCrewNeck', name: 'Crew Neck', emoji: '👔' },
    { id: 'ShirtScoopNeck', name: 'Scoop Neck', emoji: '👚' },
    { id: 'ShirtVNeck', name: 'V-Neck', emoji: '👕' },
  ],
  
  // Clothe colors
  clotheColors: [
    { id: 'Black', name: 'Black', color: '#262E33' },
    { id: 'Blue01', name: 'Blue 1', color: '#65C9FF' },
    { id: 'Blue02', name: 'Blue 2', color: '#5199E4' },
    { id: 'Blue03', name: 'Blue 3', color: '#25557C' },
    { id: 'Gray01', name: 'Gray 1', color: '#E6E6E6' },
    { id: 'Gray02', name: 'Gray 2', color: '#929598' },
    { id: 'Heather', name: 'Heather', color: '#3C4F5C' },
    { id: 'PastelBlue', name: 'Pastel Blue', color: '#B1E2FF' },
    { id: 'PastelGreen', name: 'Pastel Green', color: '#A7FFC4' },
    { id: 'PastelOrange', name: 'Pastel Orange', color: '#FFDEB5' },
    { id: 'PastelRed', name: 'Pastel Red', color: '#FFAFB9' },
    { id: 'PastelYellow', name: 'Pastel Yellow', color: '#FFFFB1' },
    { id: 'Pink', name: 'Pink', color: '#FF488E' },
    { id: 'Red', name: 'Red', color: '#FF5C5C' },
    { id: 'White', name: 'White', color: '#FFFFFF' },
  ],
  
  // Eyes
  eyeTypes: [
    { id: 'Close', name: 'Closed', emoji: '😌' },
    { id: 'Cry', name: 'Crying', emoji: '😢' },
    { id: 'Default', name: 'Default', emoji: '😊' },
    { id: 'Dizzy', name: 'Dizzy', emoji: '😵' },
    { id: 'EyeRoll', name: 'Eye Roll', emoji: '🙄' },
    { id: 'Happy', name: 'Happy', emoji: '😄' },
    { id: 'Hearts', name: 'Hearts', emoji: '😍' },
    { id: 'Side', name: 'Side', emoji: '👀' },
    { id: 'Squint', name: 'Squint', emoji: '😑' },
    { id: 'Surprised', name: 'Surprised', emoji: '😮' },
    { id: 'Wink', name: 'Wink', emoji: '😉' },
    { id: 'WinkWacky', name: 'Wink Wacky', emoji: '🤪' },
  ],
  
  // Eyebrows
  eyebrowTypes: [
    { id: 'Angry', name: 'Angry', emoji: '😠' },
    { id: 'AngryNatural', name: 'Angry Natural', emoji: '😤' },
    { id: 'Default', name: 'Default', emoji: '🙂' },
    { id: 'DefaultNatural', name: 'Natural', emoji: '😊' },
    { id: 'FlatNatural', name: 'Flat', emoji: '😐' },
    { id: 'RaisedExcited', name: 'Excited', emoji: '😃' },
    { id: 'RaisedExcitedNatural', name: 'Excited Natural', emoji: '🤗' },
    { id: 'SadConcerned', name: 'Sad', emoji: '😟' },
    { id: 'SadConcernedNatural', name: 'Sad Natural', emoji: '😞' },
    { id: 'UnibrowNatural', name: 'Unibrow', emoji: '🤨' },
    { id: 'UpDown', name: 'Up Down', emoji: '🤔' },
    { id: 'UpDownNatural', name: 'Up Down Natural', emoji: '🧐' },
  ],
  
  // Mouths
  mouthTypes: [
    { id: 'Concerned', name: 'Concerned', emoji: '😟' },
    { id: 'Default', name: 'Default', emoji: '🙂' },
    { id: 'Disbelief', name: 'Disbelief', emoji: '😲' },
    { id: 'Eating', name: 'Eating', emoji: '😋' },
    { id: 'Grimace', name: 'Grimace', emoji: '😬' },
    { id: 'Sad', name: 'Sad', emoji: '😢' },
    { id: 'ScreamOpen', name: 'Scream', emoji: '😱' },
    { id: 'Serious', name: 'Serious', emoji: '😐' },
    { id: 'Smile', name: 'Smile', emoji: '😊' },
    { id: 'Tongue', name: 'Tongue', emoji: '😛' },
    { id: 'Twinkle', name: 'Twinkle', emoji: '✨' },
    { id: 'Vomit', name: 'Vomit', emoji: '🤮' },
  ],
};

export const defaultAvatarConfig: AvatarConfig = {
  topType: 'ShortHairShortFlat',
  accessoriesType: 'Blank',
  hairColor: 'Brown',
  facialHairType: 'Blank',
  facialHairColor: 'Brown',
  clotheType: 'Hoodie',
  clotheColor: 'Blue03',
  eyeType: 'Happy',
  eyebrowType: 'Default',
  mouthType: 'Smile',
  skinColor: 'Light',
};
