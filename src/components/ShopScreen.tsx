import { Star, Lock } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import type { ShopItem } from '../data/shop-items';

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
            <TabsList className="grid w-full grid-cols-4 mb-6">
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
  canAfford,
  onPurchase,
  onToggleEquip,
}: {
  item: ShopItem;
  canAfford: boolean;
  onPurchase: (id: number) => void;
  onToggleEquip: (id: number) => void;
}) {
  return (
    <Card className={`p-4 ${item.equipped ? 'bg-purple-50 border-purple-300' : item.purchased ? 'bg-gray-50' : 'bg-white'}`}>
      <div className="flex flex-col items-center text-center space-y-3">
        <div className="text-6xl">{item.emoji}</div>
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
              {item.equipped ? 'Remove from Room' : 'Add to Room'}
            </Button>
          </>
        ) : (
          <>
            <div className="flex items-center gap-1 bg-yellow-100 px-3 py-1 rounded-lg">
              <Star className="fill-yellow-400 text-yellow-400" size={16} />
              <span className="text-yellow-700">{item.cost}</span>
            </div>
            
            <Button
              onClick={() => onPurchase(item.id)}
              disabled={!canAfford}
              className="w-full"
              variant={canAfford ? 'default' : 'secondary'}
            >
              {canAfford ? (
                'Buy Now'
              ) : (
                <>
                  <Lock size={16} className="mr-2" />
                  Need {item.cost - (canAfford ? 0 : item.cost)} more
                </>
              )}
            </Button>
          </>
        )}
      </div>
    </Card>
  );
}
