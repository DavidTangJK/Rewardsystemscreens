export interface Friend {
  id: string;
  name: string;
  emoji: string;
  color: string;
  stars: number;
  items: FriendItem[];
  background: string;
}

export interface FriendItem {
  id: number;
  name: string;
  emoji: string;
  category: string;
  x: number;
  y: number;
}

export const sampleFriends: Friend[] = [
  {
    id: 'friend1',
    name: 'Emma',
    emoji: '👧',
    color: 'pink',
    stars: 85,
    background: 'from-pink-100 to-purple-200',
    items: [
      { id: 1, name: 'Cozy Bed', emoji: '🛏️', category: 'furniture', x: 20, y: 50 },
      { id: 2, name: 'Study Desk', emoji: '🪑', category: 'furniture', x: 75, y: 55 },
      { id: 3, name: 'Bookshelf', emoji: '📚', category: 'furniture', x: 80, y: 45 },
      { id: 4, name: 'Lamp', emoji: '💡', category: 'furniture', x: 25, y: 65 },
      { id: 5, name: 'Plant', emoji: '🪴', category: 'furniture', x: 70, y: 70 },
      { id: 6, name: 'Cute Cat', emoji: '🐱', category: 'pets', x: 45, y: 60 },
      { id: 7, name: 'Board Games', emoji: '🎲', category: 'games', x: 30, y: 75 },
      { id: 8, name: 'Art Supplies', emoji: '🎨', category: 'toys', x: 60, y: 80 },
    ],
  },
  {
    id: 'friend2',
    name: 'Liam',
    emoji: '👦',
    color: 'blue',
    stars: 120,
    background: 'from-cyan-100 to-blue-200',
    items: [
      { id: 1, name: 'Cozy Bed', emoji: '🛏️', category: 'furniture', x: 15, y: 48 },
      { id: 2, name: 'Study Desk', emoji: '🪑', category: 'furniture', x: 15, y: 62 },
      { id: 3, name: 'Bean Bag Chair', emoji: '🛋️', category: 'furniture', x: 85, y: 55 },
      { id: 4, name: 'Lamp', emoji: '💡', category: 'furniture', x: 85, y: 65 },
      { id: 5, name: 'Happy Dog', emoji: '🐶', category: 'pets', x: 50, y: 55 },
      { id: 6, name: 'Gaming Console', emoji: '🎮', category: 'games', x: 25, y: 78 },
      { id: 7, name: 'Soccer Ball', emoji: '⚽', category: 'toys', x: 40, y: 75 },
      { id: 8, name: 'Basketball', emoji: '🏀', category: 'toys', x: 70, y: 78 },
      { id: 9, name: 'Fish Tank', emoji: '🐠', category: 'pets', x: 75, y: 45 },
    ],
  },
  {
    id: 'friend3',
    name: 'Sophia',
    emoji: '👧',
    color: 'purple',
    stars: 95,
    background: 'from-green-100 to-emerald-200',
    items: [
      { id: 1, name: 'Cozy Bed', emoji: '🛏️', category: 'furniture', x: 18, y: 52 },
      { id: 2, name: 'Study Desk', emoji: '🪑', category: 'furniture', x: 82, y: 50 },
      { id: 3, name: 'Bookshelf', emoji: '📚', category: 'furniture', x: 82, y: 62 },
      { id: 4, name: 'Plant', emoji: '🪴', category: 'furniture', x: 20, y: 68 },
      { id: 5, name: 'Bunny', emoji: '🐰', category: 'pets', x: 35, y: 65 },
      { id: 6, name: 'Puzzle Set', emoji: '🧩', category: 'games', x: 55, y: 72 },
      { id: 7, name: 'Card Games', emoji: '🃏', category: 'games', x: 45, y: 78 },
    ],
  },
  {
    id: 'friend4',
    name: 'Noah',
    emoji: '👦',
    color: 'green',
    stars: 150,
    background: 'from-orange-100 to-pink-200',
    items: [
      { id: 1, name: 'Cozy Bed', emoji: '🛏️', category: 'furniture', x: 20, y: 45 },
      { id: 2, name: 'Study Desk', emoji: '🪑', category: 'furniture', x: 20, y: 60 },
      { id: 3, name: 'Bean Bag Chair', emoji: '🛋️', category: 'furniture', x: 80, y: 48 },
      { id: 4, name: 'Bookshelf', emoji: '📚', category: 'furniture', x: 80, y: 60 },
      { id: 5, name: 'Lamp', emoji: '💡', category: 'furniture', x: 25, y: 72 },
      { id: 6, name: 'Plant', emoji: '🪴', category: 'furniture', x: 75, y: 70 },
      { id: 7, name: 'Happy Dog', emoji: '🐶', category: 'pets', x: 45, y: 58 },
      { id: 8, name: 'Cute Cat', emoji: '🐱', category: 'pets', x: 55, y: 65 },
      { id: 9, name: 'Gaming Console', emoji: '🎮', category: 'games', x: 30, y: 80 },
      { id: 10, name: 'Board Games', emoji: '🎲', category: 'games', x: 50, y: 78 },
      { id: 11, name: 'Soccer Ball', emoji: '⚽', category: 'toys', x: 65, y: 80 },
      { id: 12, name: 'Art Supplies', emoji: '🎨', category: 'toys', x: 35, y: 68 },
    ],
  },
  {
    id: 'friend5',
    name: 'Olivia',
    emoji: '👧',
    color: 'orange',
    stars: 72,
    background: 'from-indigo-200 to-purple-300',
    items: [
      { id: 1, name: 'Cozy Bed', emoji: '🛏️', category: 'furniture', x: 15, y: 50 },
      { id: 2, name: 'Study Desk', emoji: '🪑', category: 'furniture', x: 85, y: 52 },
      { id: 3, name: 'Lamp', emoji: '💡', category: 'furniture', x: 18, y: 65 },
      { id: 4, name: 'Plant', emoji: '🪴', category: 'furniture', x: 82, y: 65 },
      { id: 5, name: 'Fish Tank', emoji: '🐠', category: 'pets', x: 50, y: 55 },
      { id: 6, name: 'Toy Box', emoji: '🧸', category: 'toys', x: 40, y: 75 },
      { id: 7, name: 'Card Games', emoji: '🃏', category: 'games', x: 60, y: 77 },
    ],
  },
];
