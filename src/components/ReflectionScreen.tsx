import { useState } from 'react';
import { Sparkles, Calendar, Heart } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';

interface Reflection {
  id: number;
  date: string;
  content: string;
  tasksCompleted: number;
  starsEarned: number;
  mood?: string;
}

interface ReflectionScreenProps {
  currentUser: string;
  familyMembers: Array<{ id: string; name: string; color: string }>;
  tasksCompletedToday: number;
  starsEarnedToday: number;
}

export function ReflectionScreen({
  currentUser,
  familyMembers,
  tasksCompletedToday,
  starsEarnedToday,
}: ReflectionScreenProps) {
  const [reflections, setReflections] = useState<Reflection[]>([
    {
      id: 1,
      date: 'Monday, November 3, 2025',
      content: 'Today was great! I finished all my homework and helped mom with the dishes. I earned enough stars to buy the gaming console!',
      tasksCompleted: 5,
      starsEarned: 38,
      mood: '😊',
    },
    {
      id: 2,
      date: 'Sunday, November 2, 2025',
      content: 'I cleaned my room and it looks so much better now. Dad said he was proud of me!',
      tasksCompleted: 3,
      starsEarned: 25,
      mood: '🌟',
    },
  ]);

  const [newReflection, setNewReflection] = useState('');
  const [selectedMood, setSelectedMood] = useState<string>('');

  const moods = ['😊', '😄', '🌟', '💪', '🎉', '😌', '🤔', '😴'];

  const handleSubmitReflection = () => {
    if (!newReflection.trim()) return;

    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const newEntry: Reflection = {
      id: Date.now(),
      date: formattedDate,
      content: newReflection,
      tasksCompleted: tasksCompletedToday,
      starsEarned: starsEarnedToday,
      mood: selectedMood || undefined,
    };

    setReflections([newEntry, ...reflections]);
    setNewReflection('');
    setSelectedMood('');
  };

  const currentMember = familyMembers.find(m => m.id === currentUser);
  const colorClasses = {
    blue: 'from-blue-500 to-cyan-500',
    pink: 'from-pink-500 to-rose-500',
    green: 'from-green-500 to-emerald-500',
  };

  return (
    <div className="flex-1 flex flex-col bg-gradient-to-b from-purple-50 to-pink-50">
      {/* Header */}
      <div className={`bg-gradient-to-r ${colorClasses[currentMember?.color as keyof typeof colorClasses] || 'from-purple-500 to-pink-500'} p-6 text-white`}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-white">Daily Reflection</h1>
            <p className="text-white/90 opacity-90">How was your day today?</p>
          </div>
          <Sparkles className="text-white" size={32} />
        </div>
      </div>

      {/* Content */}
      <ScrollArea className="flex-1">
        <div className="p-6 max-w-4xl mx-auto space-y-6">
          {/* New Reflection Card */}
          <Card className="p-6 bg-white border-2 border-purple-200">
            <div className="flex items-center gap-2 mb-4">
              <Heart className="text-pink-500" size={24} />
              <h2 className="text-purple-900">Today's Reflection</h2>
            </div>

            {/* Task Summary */}
            <div className="flex gap-3 mb-4">
              <Badge className="bg-green-100 text-green-700 border-green-300">
                ✓ {tasksCompletedToday} tasks completed
              </Badge>
              <Badge className="bg-yellow-100 text-yellow-700 border-yellow-300">
                ⭐ {starsEarnedToday} stars earned
              </Badge>
            </div>

            {/* Mood Selector */}
            <div className="mb-4">
              <p className="text-muted-foreground mb-2">How are you feeling?</p>
              <div className="flex gap-2 flex-wrap">
                {moods.map(mood => (
                  <button
                    key={mood}
                    onClick={() => setSelectedMood(mood)}
                    className={`text-3xl p-2 rounded-lg transition-all ${
                      selectedMood === mood
                        ? 'bg-purple-200 scale-110'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    {mood}
                  </button>
                ))}
              </div>
            </div>

            {/* Reflection Input */}
            <Textarea
              placeholder="What did you accomplish today? How do you feel? What are you proud of?"
              value={newReflection}
              onChange={(e) => setNewReflection(e.target.value)}
              className="min-h-32 mb-4 text-base"
            />

            <Button
              onClick={handleSubmitReflection}
              disabled={!newReflection.trim()}
              className="w-full"
            >
              Save Reflection
            </Button>
          </Card>

          {/* Past Reflections */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="text-purple-600" size={24} />
              <h2 className="text-purple-900">Past Reflections</h2>
            </div>

            <div className="space-y-4">
              {reflections.length === 0 ? (
                <Card className="p-8 text-center bg-white/50">
                  <div className="text-6xl mb-4">📝</div>
                  <p className="text-muted-foreground">
                    No reflections yet. Start writing about your day!
                  </p>
                </Card>
              ) : (
                reflections.map((reflection) => (
                  <Card
                    key={reflection.id}
                    className="p-5 bg-white hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="text-purple-400" size={18} />
                        <p className="text-muted-foreground">{reflection.date}</p>
                      </div>
                      {reflection.mood && (
                        <div className="text-3xl">{reflection.mood}</div>
                      )}
                    </div>

                    <p className="text-foreground mb-3 leading-relaxed">
                      {reflection.content}
                    </p>

                    <div className="flex gap-2">
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">
                        ✓ {reflection.tasksCompleted} tasks
                      </Badge>
                      <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-300">
                        ⭐ {reflection.starsEarned} stars
                      </Badge>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
