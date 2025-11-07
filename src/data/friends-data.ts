import { AvatarConfig } from './avatar-options';

export interface Friend {
  id: string;
  name: string;
  emoji: string;
  color: string;
  stars: number;
  items: FriendItem[];
  background: string;
  avatarConfig?: AvatarConfig;
}

export interface FriendItem {
  id: number;
  name: string;
  emoji: string;
  category: string;
  gridX: number;
  gridY: number;
  gridWidth: number;
  gridHeight: number;
}

import { friendAvatars } from './avatars';

const GRID_COLS = 16;
const GRID_ROWS = 12;

export const sampleFriends: Friend[] = [
  {
    id: 'friend1',
    name: 'Emma',
    emoji: '👧',
    color: 'pink',
    stars: 85,
    background: 'from-pink-100 to-purple-200',
    avatarConfig: friendAvatars.friend1,
    items: [
      { id: 1, name: 'Cozy Bed', emoji: '🛏️', category: 'furniture', gridX: 1, gridY: 4, gridWidth: 3, gridHeight: 2 },
      { id: 2, name: 'Study Desk', emoji: '🪑', category: 'furniture', gridX: 11, gridY: 5, gridWidth: 2, gridHeight: 2 },
      { id: 3, name: 'Bookshelf', emoji: '📚', category: 'furniture', gridX: 13, gridY: 4, gridWidth: 2, gridHeight: 3 },
      { id: 4, name: 'Lamp', emoji: '💡', category: 'furniture', gridX: 2, gridY: 7, gridWidth: 1, gridHeight: 1 },
      { id: 5, name: 'Plant', emoji: '🪴', category: 'furniture', gridX: 10, gridY: 8, gridWidth: 1, gridHeight: 1 },
      { id: 6, name: 'Cute Cat', emoji: '🐱', category: 'pets', gridX: 6, gridY: 6, gridWidth: 2, gridHeight: 2 },
      { id: 7, name: 'Board Games', emoji: '🎲', category: 'games', gridX: 4, gridY: 9, gridWidth: 2, gridHeight: 1 },
      { id: 8, name: 'Art Supplies', emoji: '🎨', category: 'toys', gridX: 8, gridY: 9, gridWidth: 2, gridHeight: 1 },
    ],
  },
  {
    id: 'friend2',
    name: 'Liam',
    emoji: '👦',
    color: 'blue',
    stars: 120,
    background: 'from-cyan-100 to-blue-200',
    avatarConfig: friendAvatars.friend2,
    items: [
      { id: 1, name: 'Cozy Bed', emoji: '🛏️', category: 'furniture', gridX: 1, gridY: 4, gridWidth: 3, gridHeight: 2 },
      { id: 2, name: 'Study Desk', emoji: '🪑', category: 'furniture', gridX: 1, gridY: 7, gridWidth: 2, gridHeight: 2 },
      { id: 3, name: 'Bean Bag Chair', emoji: '🛋️', category: 'furniture', gridX: 12, gridY: 5, gridWidth: 2, gridHeight: 2 },
      { id: 4, name: 'Lamp', emoji: '💡', category: 'furniture', gridX: 13, gridY: 8, gridWidth: 1, gridHeight: 1 },
      { id: 5, name: 'Happy Dog', emoji: '🐶', category: 'pets', gridX: 7, gridY: 5, gridWidth: 2, gridHeight: 2 },
      { id: 6, name: 'Gaming Console', emoji: '🎮', category: 'games', gridX: 3, gridY: 9, gridWidth: 2, gridHeight: 1 },
      { id: 7, name: 'Soccer Ball', emoji: '⚽', category: 'toys', gridX: 6, gridY: 9, gridWidth: 1, gridHeight: 1 },
      { id: 8, name: 'Basketball', emoji: '🏀', category: 'toys', gridX: 10, gridY: 9, gridWidth: 1, gridHeight: 1 },
      { id: 9, name: 'Fish Tank', emoji: '🐠', category: 'pets', gridX: 11, gridY: 3, gridWidth: 2, gridHeight: 2 },
    ],
  },
  {
    id: 'friend3',
    name: 'Sophia',
    emoji: '👧',
    color: 'purple',
    stars: 95,
    background: 'from-green-100 to-emerald-200',
    avatarConfig: friendAvatars.friend3,
    items: [
      { id: 1, name: 'Cozy Bed', emoji: '🛏️', category: 'furniture', gridX: 1, gridY: 5, gridWidth: 3, gridHeight: 2 },
      { id: 2, name: 'Study Desk', emoji: '🪑', category: 'furniture', gridX: 12, gridY: 4, gridWidth: 2, gridHeight: 2 },
      { id: 3, name: 'Bookshelf', emoji: '📚', category: 'furniture', gridX: 12, gridY: 7, gridWidth: 2, gridHeight: 3 },
      { id: 4, name: 'Plant', emoji: '🪴', category: 'furniture', gridX: 2, gridY: 8, gridWidth: 1, gridHeight: 1 },
      { id: 5, name: 'Bunny', emoji: '🐰', category: 'pets', gridX: 5, gridY: 7, gridWidth: 2, gridHeight: 2 },
      { id: 6, name: 'Puzzle Set', emoji: '🧩', category: 'games', gridX: 8, gridY: 8, gridWidth: 2, gridHeight: 1 },
      { id: 7, name: 'Card Games', emoji: '🃏', category: 'games', gridX: 6, gridY: 9, gridWidth: 2, gridHeight: 1 },
    ],
  },
  {
    id: 'friend4',
    name: 'Noah',
    emoji: '👦',
    color: 'green',
    stars: 150,
    background: 'from-orange-100 to-pink-200',
    avatarConfig: friendAvatars.friend4,
    items: [
      { id: 1, name: 'Cozy Bed', emoji: '🛏️', category: 'furniture', gridX: 1, gridY: 3, gridWidth: 3, gridHeight: 2 },
      { id: 2, name: 'Study Desk', emoji: '🪑', category: 'furniture', gridX: 1, gridY: 6, gridWidth: 2, gridHeight: 2 },
      { id: 3, name: 'Bean Bag Chair', emoji: '🛋️', category: 'furniture', gridX: 12, gridY: 4, gridWidth: 2, gridHeight: 2 },
      { id: 4, name: 'Bookshelf', emoji: '📚', category: 'furniture', gridX: 12, gridY: 6, gridWidth: 2, gridHeight: 3 },
      { id: 5, name: 'Lamp', emoji: '💡', category: 'furniture', gridX: 3, gridY: 8, gridWidth: 1, gridHeight: 1 },
      { id: 6, name: 'Plant', emoji: '🪴', category: 'furniture', gridX: 11, gridY: 9, gridWidth: 1, gridHeight: 1 },
      { id: 7, name: 'Happy Dog', emoji: '🐶', category: 'pets', gridX: 6, gridY: 5, gridWidth: 2, gridHeight: 2 },
      { id: 8, name: 'Cute Cat', emoji: '🐱', category: 'pets', gridX: 8, gridY: 7, gridWidth: 2, gridHeight: 2 },
      { id: 9, name: 'Gaming Console', emoji: '🎮', category: 'games', gridX: 4, gridY: 9, gridWidth: 2, gridHeight: 1 },
      { id: 10, name: 'Board Games', emoji: '🎲', category: 'games', gridX: 7, gridY: 9, gridWidth: 2, gridHeight: 1 },
      { id: 11, name: 'Soccer Ball', emoji: '⚽', category: 'toys', gridX: 10, gridY: 9, gridWidth: 1, gridHeight: 1 },
      { id: 12, name: 'Art Supplies', emoji: '🎨', category: 'toys', gridX: 5, gridY: 3, gridWidth: 2, gridHeight: 1 },
    ],
  },
  {
    id: 'friend5',
    name: 'Olivia',
    emoji: '👧',
    color: 'orange',
    stars: 72,
    background: 'from-indigo-200 to-purple-300',
    avatarConfig: friendAvatars.friend5,
    items: [
      { id: 1, name: 'Cozy Bed', emoji: '🛏️', category: 'furniture', gridX: 1, gridY: 4, gridWidth: 3, gridHeight: 2 },
      { id: 2, name: 'Study Desk', emoji: '🪑', category: 'furniture', gridX: 12, gridY: 5, gridWidth: 2, gridHeight: 2 },
      { id: 3, name: 'Lamp', emoji: '💡', category: 'furniture', gridX: 2, gridY: 7, gridWidth: 1, gridHeight: 1 },
      { id: 4, name: 'Plant', emoji: '🪴', category: 'furniture', gridX: 12, gridY: 8, gridWidth: 1, gridHeight: 1 },
      { id: 5, name: 'Fish Tank', emoji: '🐠', category: 'pets', gridX: 7, gridY: 5, gridWidth: 2, gridHeight: 2 },
      { id: 6, name: 'Toy Box', emoji: '🧸', category: 'toys', gridX: 5, gridY: 9, gridWidth: 2, gridHeight: 1 },
      { id: 7, name: 'Card Games', emoji: '🃏', category: 'games', gridX: 8, gridY: 9, gridWidth: 2, gridHeight: 1 },
    ],
  },
];
