import { useState } from 'react';
import { Sparkles, Calendar, Heart, Smile } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

interface Reflection {
  id: number;
  date: string;
  content: string;
  mood?: string;
}

export function ReflectionScreen() {
  const [reflections, setReflections] = useState<Reflection[]>([
    {
      id: 1,
      date: 'Monday, November 3, 2025',
      content: 'Today was great! I decorated my room and it looks amazing! I put the sofa next to the gaming console.',
      mood: '😊',
    },
    {
      id: 2,
      date: 'Sunday, November 2, 2025',
      content: 'I bought a cute pet for my virtual home! It looks so happy bouncing around.',
      mood: '🌟',
    },
  ]);

  const [newReflection, setNewReflection] = useState('');
  const [selectedMood, setSelectedMood] = useState<string>('');
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);

  // Comprehensive list of face emojis
  const faceEmojis = [
    '😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃', '😉', '😊',
    '😇', '🥰', '😍', '🤩', '😘', '😗', '😚', '😙', '😋', '😛', '😜', '🤪',
    '😝', '🤑', '🤗', '🤭', '🤫', '🤔', '🤐', '🤨', '😐', '😑', '😶', '😏',
    '😒', '🙄', '😬', '🤥', '😌', '😔', '😪', '🤤', '😴', '😷', '🤒', '🤕',
    '🤢', '🤮', '🤧', '🥵', '🥶', '🥴', '😵', '🤯', '🤠', '🥳', '😎', '🤓',
    '🧐', '😕', '😟', '🙁', '☹️', '😮', '😯', '😲', '😳', '🥺', '😦', '😧',
    '😨', '😰', '😥', '😢', '😭', '😱', '😖', '😣', '😞', '😓', '😩', '😫',
    '🥱', '😤', '😡', '😠', '🤬', '😈', '👿', '💀', '☠️', '💩', '🤡', '👹',
    '👺', '👻', '👽', '👾', '🤖', '😺', '😸', '😹', '😻', '😼', '😽', '🙀',
    '😿', '😾',
  ];

  const reflectionTemplates = [
    { value: 'template1', label: 'I decorated my room and it looks amazing!' },
    { value: 'template2', label: 'I tried my best today and I\'m proud of myself.' },
    { value: 'template3', label: 'I helped someone today and it made me happy.' },
    { value: 'template4', label: 'I learned something new and interesting.' },
    { value: 'template5', label: 'I stayed focused and got my work done.' },
    { value: 'template6', label: 'I was kind to others today.' },
    { value: 'template7', label: 'Today was challenging but I kept going.' },
    { value: 'template8', label: 'I made progress on my goals today.' },
  ];

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
      mood: selectedMood || undefined,
    };

    setReflections([newEntry, ...reflections]);
    setNewReflection('');
    setSelectedMood('');
  };

  return (
    <div className="flex-1 flex flex-col bg-gradient-to-b from-purple-50 to-pink-50 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 md:p-6 text-white flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <h1 className="text-white truncate">Daily Reflection</h1>
            <p className="text-white/90 opacity-90 text-sm md:text-base">How was your day today?</p>
          </div>
          <Sparkles className="text-white flex-shrink-0 ml-2" size={28} />
        </div>
      </div>

      {/* Content */}
      <ScrollArea className="flex-1">
        <div className="p-4 md:p-6 max-w-4xl mx-auto space-y-4 md:space-y-6 pb-6">
          {/* New Reflection Card */}
          <Card className="p-4 md:p-6 bg-white border-2 border-purple-200">
            <div className="flex items-center gap-2 mb-3 md:mb-4">
              <Heart className="text-pink-500 flex-shrink-0" size={20} />
              <h2 className="text-purple-900 text-base md:text-lg">Today's Reflection</h2>
            </div>

            {/* Mood Selector */}
            <div className="mb-3 md:mb-4">
              <p className="text-muted-foreground mb-2 text-sm">How are you feeling?</p>
              <Popover open={isEmojiPickerOpen} onOpenChange={setIsEmojiPickerOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left h-auto py-2 md:py-3"
                  >
                    {selectedMood ? (
                      <span className="text-2xl md:text-3xl mr-2">{selectedMood}</span>
                    ) : (
                      <Smile className="mr-2 flex-shrink-0" size={18} />
                    )}
                    <span className="text-muted-foreground text-sm md:text-base truncate">
                      {selectedMood ? 'Change your mood' : 'Pick a mood emoji'}
                    </span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[calc(100vw-2rem)] max-w-[320px] p-2 md:p-3" align="start">
                  <ScrollArea className="h-48 md:h-64">
                    <div className="grid grid-cols-6 md:grid-cols-8 gap-1 md:gap-2 p-1 md:p-2">
                      {faceEmojis.map(emoji => (
                        <button
                          key={emoji}
                          onClick={() => {
                            setSelectedMood(emoji);
                            setIsEmojiPickerOpen(false);
                          }}
                          className={`text-xl md:text-2xl p-1.5 md:p-2 rounded-lg transition-all hover:bg-purple-100 ${
                            selectedMood === emoji
                              ? 'bg-purple-200 ring-2 ring-purple-400'
                              : 'bg-gray-50 hover:scale-110'
                          }`}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </ScrollArea>
                </PopoverContent>
              </Popover>
            </div>

            {/* Template Selector */}
            <div className="mb-3 md:mb-4">
              <p className="text-muted-foreground mb-2 text-sm">Quick reflection (optional)</p>
              <Select
                value=""
                onValueChange={(value) => {
                  const template = reflectionTemplates.find(t => t.value === value);
                  if (template) {
                    setNewReflection(template.label);
                  }
                }}
              >
                <SelectTrigger className="w-full text-sm md:text-base">
                  <SelectValue placeholder="Choose a quick reflection..." />
                </SelectTrigger>
                <SelectContent>
                  {reflectionTemplates.map(template => (
                    <SelectItem key={template.value} value={template.value} className="text-sm">
                      {template.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Reflection Input */}
            <Textarea
              placeholder="Write about your day, or choose a quick reflection above..."
              value={newReflection}
              onChange={(e) => setNewReflection(e.target.value)}
              className="min-h-24 md:min-h-32 mb-3 md:mb-4 text-sm md:text-base"
            />

            <Button
              onClick={handleSubmitReflection}
              disabled={!newReflection.trim()}
              className="w-full text-sm md:text-base"
            >
              Save Reflection
            </Button>
          </Card>

          {/* Past Reflections */}
          <div>
            <div className="flex items-center gap-2 mb-3 md:mb-4">
              <Calendar className="text-purple-600 flex-shrink-0" size={20} />
              <h2 className="text-purple-900 text-base md:text-lg">Past Reflections</h2>
            </div>

            <div className="space-y-3 md:space-y-4">
              {reflections.length === 0 ? (
                <Card className="p-6 md:p-8 text-center bg-white/50">
                  <div className="text-5xl md:text-6xl mb-3 md:mb-4">📝</div>
                  <p className="text-muted-foreground text-sm md:text-base">
                    No reflections yet. Start writing about your day!
                  </p>
                </Card>
              ) : (
                reflections.map((reflection) => (
                  <Card
                    key={reflection.id}
                    className="p-4 md:p-5 bg-white hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-2 md:mb-3 gap-2">
                      <div className="flex items-center gap-1.5 md:gap-2 min-w-0 flex-1">
                        <Calendar className="text-purple-400 flex-shrink-0" size={16} />
                        <p className="text-muted-foreground text-xs md:text-sm truncate">{reflection.date}</p>
                      </div>
                      {reflection.mood && (
                        <div className="text-2xl md:text-3xl flex-shrink-0">{reflection.mood}</div>
                      )}
                    </div>

                    <p className="text-foreground leading-relaxed text-sm md:text-base">
                      {reflection.content}
                    </p>
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
