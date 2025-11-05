export interface ShopItem {
  id: number;
  name: string;
  cost: number;
  category: 'furniture' | 'pets' | 'games' | 'toys' | 'backgrounds';
  emoji: string;
  purchased: boolean;
  equipped: boolean;
  gridX?: number; // Grid position (0-19)
  gridY?: number; // Grid position (0-14)
  gridWidth: number; // Width in grid cells
  gridHeight: number; // Height in grid cells
  gradient?: string; // For background items
}

export const initialShopItems: ShopItem[] = [
  // Furniture
  { id: 1, name: 'Cozy Bed', cost: 30, category: 'furniture', emoji: '🛏️', purchased: true, equipped: true, gridWidth: 3, gridHeight: 2 },
  { id: 2, name: 'Study Desk', cost: 25, category: 'furniture', emoji: '🪑', purchased: true, equipped: true, gridWidth: 2, gridHeight: 2 },
  { id: 3, name: 'Bookshelf', cost: 20, category: 'furniture', emoji: '📚', purchased: false, equipped: false, gridWidth: 2, gridHeight: 3 },
  { id: 4, name: 'Bean Bag Chair', cost: 15, category: 'furniture', emoji: '🛋️', purchased: false, equipped: false, gridWidth: 2, gridHeight: 2 },
  { id: 5, name: 'Lamp', cost: 10, category: 'furniture', emoji: '💡', purchased: true, equipped: true, gridWidth: 1, gridHeight: 2 },
  { id: 6, name: 'Plant', cost: 12, category: 'furniture', emoji: '🪴', purchased: false, equipped: false, gridWidth: 1, gridHeight: 2 },
  
  // Pets
  { id: 7, name: 'Cute Cat', cost: 40, category: 'pets', emoji: '🐱', purchased: true, equipped: false, gridWidth: 2, gridHeight: 2 },
  { id: 8, name: 'Happy Dog', cost: 40, category: 'pets', emoji: '🐶', purchased: true, equipped: true, gridWidth: 2, gridHeight: 2 },
  { id: 9, name: 'Fish Tank', cost: 30, category: 'pets', emoji: '🐠', purchased: false, equipped: false, gridWidth: 2, gridHeight: 2 },
  { id: 10, name: 'Bunny', cost: 35, category: 'pets', emoji: '🐰', purchased: false, equipped: false, gridWidth: 2, gridHeight: 2 },
  
  // Games
  { id: 11, name: 'Gaming Console', cost: 50, category: 'games', emoji: '🎮', purchased: false, equipped: false, gridWidth: 2, gridHeight: 2 },
  { id: 12, name: 'Board Games', cost: 20, category: 'games', emoji: '🎲', purchased: true, equipped: true, gridWidth: 2, gridHeight: 2 },
  { id: 13, name: 'Puzzle Set', cost: 15, category: 'games', emoji: '🧩', purchased: false, equipped: false, gridWidth: 2, gridHeight: 2 },
  { id: 14, name: 'Card Games', cost: 10, category: 'games', emoji: '🃏', purchased: false, equipped: false, gridWidth: 2, gridHeight: 2 },
  
  // Toys
  { id: 15, name: 'Toy Box', cost: 15, category: 'toys', emoji: '🧸', purchased: false, equipped: false, gridWidth: 2, gridHeight: 2 },
  { id: 16, name: 'Art Supplies', cost: 18, category: 'toys', emoji: '🎨', purchased: false, equipped: false, gridWidth: 2, gridHeight: 2 },
  { id: 17, name: 'Soccer Ball', cost: 12, category: 'toys', emoji: '⚽', purchased: true, equipped: true, gridWidth: 2, gridHeight: 2 },
  { id: 18, name: 'Basketball', cost: 12, category: 'toys', emoji: '🏀', purchased: false, equipped: false, gridWidth: 2, gridHeight: 2 },
  
  // Backgrounds (grid size not used for backgrounds)
  { id: 19, name: 'Cozy Default', cost: 0, category: 'backgrounds', emoji: '🏠', purchased: true, equipped: true, gridWidth: 1, gridHeight: 1, gradient: 'from-amber-50 to-amber-100' },
  { id: 20, name: 'Ocean Breeze', cost: 25, category: 'backgrounds', emoji: '🌊', purchased: false, equipped: false, gridWidth: 1, gridHeight: 1, gradient: 'from-cyan-100 to-blue-200' },
  { id: 21, name: 'Forest Retreat', cost: 25, category: 'backgrounds', emoji: '🌲', purchased: false, equipped: false, gridWidth: 1, gridHeight: 1, gradient: 'from-green-100 to-emerald-200' },
  { id: 22, name: 'Sunset Dreams', cost: 30, category: 'backgrounds', emoji: '🌅', purchased: false, equipped: false, gridWidth: 1, gridHeight: 1, gradient: 'from-orange-100 to-pink-200' },
  { id: 23, name: 'Purple Paradise', cost: 30, category: 'backgrounds', emoji: '💜', purchased: false, equipped: false, gridWidth: 1, gridHeight: 1, gradient: 'from-purple-100 to-pink-200' },
  { id: 24, name: 'Starry Night', cost: 35, category: 'backgrounds', emoji: '⭐', purchased: false, equipped: false, gridWidth: 1, gridHeight: 1, gradient: 'from-indigo-200 to-purple-300' },
  { id: 25, name: 'Rainbow Magic', cost: 40, category: 'backgrounds', emoji: '🌈', purchased: false, equipped: false, gridWidth: 1, gridHeight: 1, gradient: 'from-pink-100 via-yellow-100 to-cyan-100' },
];
