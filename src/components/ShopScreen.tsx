import { Star, Lock } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import type { ShopItem } from '../data/shop-items';
import { useState } from 'react';
import { motion } from 'motion/react';

interface ShopScreenProps {
  stars: number;
  items: ShopItem[];
  onPurchase: (itemId: number) => void;
  onToggleEquip: (itemId: number) => void;
}

export function ShopScreen({ stars, items, onPurchase, onToggleEquip }: ShopScreenProps) {
  const categories = [
    { value: 'furniture', label: '🪑 Furniture' },
    { value: 'pets', label: '🐾 Pets' },
    { value: 'games', label: '🎮 Games' },
    { value: 'toys', label: '🧸 Toys' },
    { value: 'backgrounds', label: '🎨 Backgrounds' },
  ];

  return (
    <div className="flex-1 flex flex-col bg-gradient-to-b from-yellow-50 to-orange-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-pink-500 p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-white">Star Shop</h1>
            <p className="text-orange-100 opacity-90">Exchange your stars for awesome items!</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl px-5 py-3 flex items-center gap-2">
            <Star className="fill-yellow-300 text-yellow-300" size={28} />
            <span className="text-white">{stars}</span>
          </div>
        </div>
      </div>

      {/* Shop Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-6xl mx-auto">
          <Tabs defaultValue="furniture" className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-6">
              {categories.map(cat => (
                <TabsTrigger key={cat.value} value={cat.value}>
                  {cat.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {categories.map(cat => (
              <TabsContent key={cat.value} value={cat.value}>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {items
                    .filter(item => item.category === cat.value)
                    .map(item => (
                      <ShopItemCard
                        key={item.id}
                        item={item}
                        stars={stars}
                        canAfford={stars >= item.cost}
                        onPurchase={onPurchase}
                        onToggleEquip={onToggleEquip}
                      />
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  );
}

function ShopItemCard({
  item,
  stars,
  canAfford,
  onPurchase,
  onToggleEquip,
}: {
  item: ShopItem;
  stars: number;
  canAfford: boolean;
  onPurchase: (id: number) => void;
  onToggleEquip: (id: number) => void;
}) {
  const [isPurchasing, setIsPurchasing] = useState(false);
  
  const handlePurchase = (id: number) => {
    setIsPurchasing(true);
    onPurchase(id);
    setTimeout(() => setIsPurchasing(false), 2000);
  };
  
  return (
    <Card className={`p-4 transition-all duration-300 ${item.equipped ? 'bg-purple-50 border-purple-300' : item.purchased ? 'bg-gray-50' : 'bg-white'}`}>
      <div className="flex flex-col items-center text-center space-y-3">
        {item.category === 'backgrounds' && item.gradient ? (
          <motion.div 
            className={`w-full h-20 rounded-lg bg-gradient-to-br ${item.gradient} flex items-center justify-center text-4xl border-2 border-gray-200`}
            animate={isPurchasing ? {
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0],
            } : {}}
            transition={{ duration: 0.6 }}
          >
            {item.emoji}
          </motion.div>
        ) : (
          <motion.div 
            className="text-6xl"
            animate={isPurchasing ? {
              scale: [1, 1.3, 1],
              rotate: [0, 15, -15, 0],
            } : {}}
            transition={{ duration: 0.6 }}
          >
            {item.emoji}
          </motion.div>
        )}
        <h3>{item.name}</h3>
        
        {item.purchased ? (
          <>
            {item.equipped ? (
              <Badge className="bg-purple-500 text-white">In Room ✓</Badge>
            ) : (
              <Badge variant="outline" className="border-gray-400 text-gray-600">Owned</Badge>
            )}
            
            <Button
              onClick={() => onToggleEquip(item.id)}
              className="w-full"
              variant={item.equipped ? 'outline' : 'default'}
            >
              {item.category === 'backgrounds' 
                ? (item.equipped ? 'Applied ✓' : 'Apply Background')
                : (item.equipped ? 'Remove from Room' : 'Add to Room')
              }
            </Button>
          </>
        ) : (
          <>
            <div className="flex items-center gap-1 bg-yellow-100 px-3 py-1 rounded-lg">
              <Star className="fill-yellow-400 text-yellow-400" size={16} />
              <span className="text-yellow-700">{item.cost}</span>
            </div>
            
            <Button
              onClick={() => handlePurchase(item.id)}
              disabled={!canAfford}
              className="w-full"
              variant={canAfford ? 'default' : 'secondary'}
            >
              {canAfford ? (
                'Buy Now'
              ) : (
                <>
                  <Lock size={16} className="mr-2" />
                  Need {item.cost - stars} more
                </>
              )}
            </Button>
          </>
        )}
      </div>
    </Card>
  );
}
