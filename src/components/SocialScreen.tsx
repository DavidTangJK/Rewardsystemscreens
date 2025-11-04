import { useState } from 'react';
import { Star } from 'lucide-react';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { sampleFriends, Friend } from '../data/friends-data';

export function SocialScreen() {
  const [selectedFriend, setSelectedFriend] = useState<Friend>(sampleFriends[0]);

  const handleFriendChange = (friendId: string) => {
    const friend = sampleFriends.find(f => f.id === friendId);
    if (friend) {
      setSelectedFriend(friend);
    }
  };

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
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-6 text-white flex-shrink-0">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-white">Friends' Homes</h1>
            <p className="text-blue-100 opacity-90">Visit your friends' virtual homes!</p>
          </div>
          <div className="flex items-center gap-2">
            <Select value={selectedFriend.id} onValueChange={handleFriendChange}>
              <SelectTrigger className={`w-[180px] ${getBadgeColor(selectedFriend.color)} text-white border-2 border-white/40 hover:bg-white/10`}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {sampleFriends.map(friend => (
                  <SelectItem key={friend.id} value={friend.id}>
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{friend.emoji}</span>
                      <span>{friend.name}</span>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Star className="fill-yellow-400 text-yellow-400" size={12} />
                        <span>{friend.stars}</span>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Friend's Home View */}
      <div className="h-[80vh] bg-gradient-to-b from-sky-300 to-sky-200 overflow-hidden relative">
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
              className={`flex-1 bg-gradient-to-b ${selectedFriend.background} mx-8 md:mx-16 relative border-8 border-amber-800 overflow-hidden`}
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

              {/* Items */}
              {selectedFriend.items.map((item) => (
                <div
                  key={item.id}
                  className={`absolute z-10 ${item.category === 'pets' ? 'animate-bounce-slow' : ''}`}
                  style={{
                    left: `${item.x}%`,
                    top: `${item.y}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <div className="text-5xl select-none pointer-events-none">{item.emoji}</div>
                </div>
              ))}

              {/* Friend Character */}
              <div
                className="absolute z-20 pointer-events-none"
                style={{
                  left: '50%',
                  top: '60%',
                }}
              >
                <div className="relative">
                  <div className="text-5xl animate-bounce-slow">
                    {selectedFriend.emoji}
                  </div>
                  <div className={`absolute -bottom-2 left-1/2 -translate-x-1/2 text-xs ${getBadgeColor(selectedFriend.color)} text-white px-2 py-0.5 rounded whitespace-nowrap`}>
                    {selectedFriend.name}
                  </div>
                </div>
              </div>

              {/* View-Only Overlay Message */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 z-30">
                <Badge className="bg-blue-500 text-white hover:bg-blue-600 px-4 py-2">
                  👀 Viewing {selectedFriend.name}'s Home
                </Badge>
              </div>
            </div>

            {/* Ground/Grass */}
            <div className="h-[10%] bg-green-600 border-t-4 border-green-700"></div>
          </div>
        </div>

        {/* Stats Info */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
          <Card className="bg-white/90 backdrop-blur-sm p-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Star className="fill-yellow-400 text-yellow-400" size={20} />
                <span>{selectedFriend.stars} Stars</span>
              </div>
              <div className="w-px h-6 bg-gray-300"></div>
              <div>
                {selectedFriend.items.length} items
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
