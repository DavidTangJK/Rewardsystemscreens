import { useState } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { sampleFriends, Friend } from '../data/friends-data';

export function SocialScreen() {
  const [selectedFriend, setSelectedFriend] = useState<Friend>(sampleFriends[0]);

  const currentIndex = sampleFriends.findIndex(f => f.id === selectedFriend.id);
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < sampleFriends.length - 1;

  const goToPrevious = () => {
    if (hasPrevious) {
      setSelectedFriend(sampleFriends[currentIndex - 1]);
    }
  };

  const goToNext = () => {
    if (hasNext) {
      setSelectedFriend(sampleFriends[currentIndex + 1]);
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
            <div className={`${getBadgeColor(selectedFriend.color)} text-white px-4 py-2 rounded-xl flex items-center gap-2`}>
              <span className="text-2xl">{selectedFriend.emoji}</span>
              <span>{selectedFriend.name}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Friends List */}
      <div className="bg-white border-b p-4 flex-shrink-0">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            {sampleFriends.map(friend => (
              <button
                key={friend.id}
                onClick={() => setSelectedFriend(friend)}
                className={`flex-shrink-0 transition-all ${
                  selectedFriend.id === friend.id
                    ? 'scale-110'
                    : 'opacity-60 hover:opacity-100'
                }`}
              >
                <Card className={`p-3 ${
                  selectedFriend.id === friend.id
                    ? `${getBadgeColor(friend.color)} text-white`
                    : 'bg-gray-50'
                }`}>
                  <div className="flex flex-col items-center gap-1">
                    <div className="text-3xl">{friend.emoji}</div>
                    <div className="text-xs whitespace-nowrap">{friend.name}</div>
                    <div className="flex items-center gap-1 text-xs">
                      <Star className={`${
                        selectedFriend.id === friend.id 
                          ? 'fill-yellow-200 text-yellow-200' 
                          : 'fill-yellow-400 text-yellow-400'
                      }`} size={12} />
                      <span>{friend.stars}</span>
                    </div>
                  </div>
                </Card>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Friend's Home View */}
      <div className="h-[80vh] bg-gradient-to-b from-sky-300 to-sky-200 overflow-hidden relative">
        <div className="h-full max-w-6xl mx-auto relative">
          {/* Navigation Arrows */}
          {hasPrevious && (
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-50 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all hover:scale-110"
            >
              <ChevronLeft size={24} />
            </button>
          )}
          
          {hasNext && (
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-50 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all hover:scale-110"
            >
              <ChevronRight size={24} />
            </button>
          )}

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
