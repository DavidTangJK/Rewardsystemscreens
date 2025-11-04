export interface ShopItem {
  id: number;
  name: string;
  cost: number;
  category: 'furniture' | 'pets' | 'games' | 'toys';
  emoji: string;
  purchased: boolean;
  equipped: boolean;
  x?: number;
  y?: number;
}

export const initialShopItems: ShopItem[] = [
  // Furniture
  { id: 1, name: 'Cozy Bed', cost: 30, category: 'furniture', emoji: '🛏️', purchased: true, equipped: true },
  { id: 2, name: 'Study Desk', cost: 25, category: 'furniture', emoji: '🪑', purchased: true, equipped: true },
  { id: 3, name: 'Bookshelf', cost: 20, category: 'furniture', emoji: '📚', purchased: false, equipped: false },
  { id: 4, name: 'Bean Bag Chair', cost: 15, category: 'furniture', emoji: '🛋️', purchased: false, equipped: false },
  { id: 5, name: 'Lamp', cost: 10, category: 'furniture', emoji: '💡', purchased: true, equipped: true },
  { id: 6, name: 'Plant', cost: 12, category: 'furniture', emoji: '🪴', purchased: false, equipped: false },
  
  // Pets
  { id: 7, name: 'Cute Cat', cost: 40, category: 'pets', emoji: '🐱', purchased: true, equipped: false },
  { id: 8, name: 'Happy Dog', cost: 40, category: 'pets', emoji: '🐶', purchased: true, equipped: true },
  { id: 9, name: 'Fish Tank', cost: 30, category: 'pets', emoji: '🐠', purchased: false, equipped: false },
  { id: 10, name: 'Bunny', cost: 35, category: 'pets', emoji: '🐰', purchased: false, equipped: false },
  
  // Games
  { id: 11, name: 'Gaming Console', cost: 50, category: 'games', emoji: '🎮', purchased: false, equipped: false },
  { id: 12, name: 'Board Games', cost: 20, category: 'games', emoji: '🎲', purchased: true, equipped: true },
  { id: 13, name: 'Puzzle Set', cost: 15, category: 'games', emoji: '🧩', purchased: false, equipped: false },
  { id: 14, name: 'Card Games', cost: 10, category: 'games', emoji: '🃏', purchased: false, equipped: false },
  
  // Toys
  { id: 15, name: 'Toy Box', cost: 15, category: 'toys', emoji: '🧸', purchased: false, equipped: false },
  { id: 16, name: 'Art Supplies', cost: 18, category: 'toys', emoji: '🎨', purchased: false, equipped: false },
  { id: 17, name: 'Soccer Ball', cost: 12, category: 'toys', emoji: '⚽', purchased: true, equipped: true },
  { id: 18, name: 'Basketball', cost: 12, category: 'toys', emoji: '🏀', purchased: false, equipped: false },
];
