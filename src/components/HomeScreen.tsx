import { useState, useEffect, useRef } from 'react';
import { Star } from 'lucide-react';
import { Badge } from './ui/badge';

interface ShopItem {
  id: number;
  name: string;
  emoji: string;
  category: string;
  x?: number;
  y?: number;
}

interface FamilyMember {
  id: string;
  name: string;
  emoji: string;
  color: string;
}

interface HomeScreenProps {
  stars: number;
  items: ShopItem[];
  onUpdatePosition: (itemId: number, x: number, y: number) => void;
  familyMembers: FamilyMember[];
  currentUser: string;
  backgroundGradient?: string;
}

interface Character {
  id: string;
  emoji: string;
  x: number;
  y: number;
  name: string;
  color: string;
  isCurrentUser: boolean;
}

export function HomeScreen({ stars, items, onUpdatePosition, familyMembers, currentUser, backgroundGradient = 'from-amber-50 to-amber-100' }: HomeScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Initialize characters from family members plus parents
  const [characters, setCharacters] = useState<Character[]>(() => {
    const basePositions = [
      { x: 30, y: 60 },
      { x: 60, y: 50 },
      { x: 45, y: 70 },
    ];
    
    const familyCharacters = familyMembers.map((member, index) => ({
      id: member.id,
      emoji: member.emoji,
      x: basePositions[index % basePositions.length].x,
      y: basePositions[index % basePositions.length].y,
      name: member.name,
      color: member.color,
      isCurrentUser: member.id === currentUser,
    }));

    // Add parents
    const parents = [
      { id: 'mom', emoji: '👩', x: 70, y: 45, name: 'Mom', color: 'purple', isCurrentUser: false },
      { id: 'dad', emoji: '👨', x: 55, y: 75, name: 'Dad', color: 'orange', isCurrentUser: false },
    ];

    return [...familyCharacters, ...parents];
  });

  const [draggingItem, setDraggingItem] = useState<number | null>(null);

  // Update current user when it changes
  useEffect(() => {
    setCharacters(prev =>
      prev.map(char => ({
        ...char,
        isCurrentUser: char.id === currentUser,
      }))
    );
  }, [currentUser]);

  // Animate characters to move around randomly
  useEffect(() => {
    const interval = setInterval(() => {
      setCharacters(prev =>
        prev.map(char => ({
          ...char,
          x: Math.max(15, Math.min(80, char.x + (Math.random() - 0.5) * 20)),
          y: Math.max(40, Math.min(80, char.y + (Math.random() - 0.5) * 20)),
        }))
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleDragStart = (e: React.DragEvent, itemId: number) => {
    setDraggingItem(itemId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnd = () => {
    setDraggingItem(null);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (draggingItem === null || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    // Keep items within bounds
    const clampedX = Math.max(5, Math.min(90, x));
    const clampedY = Math.max(5, Math.min(90, y));

    onUpdatePosition(draggingItem, clampedX, clampedY);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  // Generate default positions for items that don't have positions yet
  const getItemPosition = (item: ShopItem, index: number) => {
    if (item.x !== undefined && item.y !== undefined) {
      return { x: item.x, y: item.y };
    }

    // Default positions based on category and index
    const positions: Record<string, { x: number; y: number }[]> = {
      furniture: [
        { x: 15, y: 45 },
        { x: 15, y: 60 },
        { x: 85, y: 45 },
        { x: 85, y: 60 },
      ],
      pets: [
        { x: 40, y: 55 },
        { x: 50, y: 65 },
      ],
      games: [
        { x: 20, y: 80 },
        { x: 30, y: 80 },
      ],
      toys: [
        { x: 70, y: 80 },
        { x: 80, y: 80 },
      ],
    };

    const categoryPositions = positions[item.category] || [{ x: 50, y: 50 }];
    const categoryItems = items.filter(i => i.category === item.category);
    const itemIndex = categoryItems.findIndex(i => i.id === item.id);
    
    return categoryPositions[itemIndex % categoryPositions.length];
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white flex-shrink-0">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-white">My Virtual Home</h1>
            <p className="text-purple-100 opacity-90">Drag items to arrange your room!</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2 flex items-center gap-2">
            <Star className="fill-yellow-300 text-yellow-300" size={24} />
            <span className="text-white">{stars}</span>
          </div>
        </div>
      </div>

      {/* Home View */}
      <div className="flex-1 bg-gradient-to-b from-sky-300 to-sky-200 overflow-hidden relative">
        <div className="h-full max-w-6xl mx-auto relative">
          {/* House Structure */}
          <div className="flex flex-col h-full">
            {/* Roof */}
            <div className="h-[15%] relative flex items-end justify-center">
              <div className="w-0 h-0 border-l-[200px] border-l-transparent border-r-[200px] border-r-transparent border-b-[80px] border-b-red-600"></div>
              <div className="absolute bottom-0 w-12 h-8 bg-gray-700 rounded-t-lg"></div>
            </div>

            {/* House Interior */}
            <div 
              ref={containerRef}
              className={`flex-1 bg-gradient-to-b ${backgroundGradient} mx-8 md:mx-16 relative border-8 border-amber-800 overflow-hidden`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              {/* Floor */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-white/30 pointer-events-none"></div>
              
              {/* Wood Floor Pattern */}
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/10 to-transparent pointer-events-none"></div>

              {/* Windows */}
              <div className="absolute top-4 left-8 w-20 h-20 bg-sky-200 border-4 border-amber-700 rounded-lg pointer-events-none">
                <div className="absolute inset-0 grid grid-cols-2 gap-1 p-1">
                  <div className="bg-sky-100/50"></div>
                  <div className="bg-sky-100/50"></div>
                  <div className="bg-sky-100/50"></div>
                  <div className="bg-sky-100/50"></div>
                </div>
              </div>
              <div className="absolute top-4 right-8 w-20 h-20 bg-sky-200 border-4 border-amber-700 rounded-lg pointer-events-none">
                <div className="absolute inset-0 grid grid-cols-2 gap-1 p-1">
                  <div className="bg-sky-100/50"></div>
                  <div className="bg-sky-100/50"></div>
                  <div className="bg-sky-100/50"></div>
                  <div className="bg-sky-100/50"></div>
                </div>
              </div>

              {/* Draggable Items */}
              {items.map((item, index) => {
                const position = getItemPosition(item, index);
                return (
                  <div
                    key={item.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, item.id)}
                    onDragEnd={handleDragEnd}
                    className={`absolute cursor-move hover:scale-110 transition-transform z-10 ${
                      draggingItem === item.id ? 'opacity-50' : ''
                    } ${item.category === 'pets' ? 'animate-bounce-slow' : 'animate-fade-in'}`}
                    style={{
                      left: `${position.x}%`,
                      top: `${position.y}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    <div className="text-5xl select-none">{item.emoji}</div>
                  </div>
                );
              })}

              {/* Characters Walking Around */}
              {characters.map(char => {
                const getBadgeColor = (color: string) => {
                  const colors: Record<string, string> = {
                    blue: 'bg-blue-500',
                    pink: 'bg-pink-500',
                    green: 'bg-green-500',
                    purple: 'bg-purple-500',
                    orange: 'bg-orange-500',
                  };
                  return colors[color] || 'bg-purple-500';
                };

                return (
                  <div
                    key={char.id}
                    className="absolute z-20 transition-all duration-[3000ms] ease-in-out pointer-events-none"
                    style={{
                      left: `${char.x}%`,
                      top: `${char.y}%`,
                    }}
                  >
                    <div className="relative">
                      <div className={`text-5xl animate-bounce-slow ${char.isCurrentUser ? 'scale-110' : ''}`}>
                        {char.emoji}
                      </div>
                      <div className={`absolute -bottom-2 left-1/2 -translate-x-1/2 text-xs ${getBadgeColor(char.color)} text-white px-2 py-0.5 rounded whitespace-nowrap ${
                        char.isCurrentUser ? 'ring-2 ring-yellow-400 ring-offset-2' : ''
                      }`}>
                        {char.isCurrentUser ? `${char.name} (You)` : char.name}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Empty State */}
              {items.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-center bg-white/80 backdrop-blur-sm p-8 rounded-2xl">
                    <div className="text-6xl mb-4">🏠</div>
                    <p className="text-muted-foreground">Your home is empty!</p>
                    <p className="text-muted-foreground">Complete tasks and visit the shop to decorate.</p>
                  </div>
                </div>
              )}
            </div>

            {/* Ground/Grass */}
            <div className="h-[10%] bg-green-600 border-t-4 border-green-700"></div>
          </div>
        </div>

        {/* Stats Badge */}
        {items.length > 0 && (
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
            <Badge className="bg-purple-500 text-white hover:bg-purple-600 px-4 py-2">
              🎉 {items.length} item{items.length !== 1 ? 's' : ''} in your home!
            </Badge>
          </div>
        )}
      </div>
    </div>
  );
}
