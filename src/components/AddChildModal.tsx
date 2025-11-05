import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { SimpleAvatarCustomizer } from './SimpleAvatarCustomizer';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import type { AvatarConfig } from '../data/avatar-options';
import { defaultAvatarConfig } from '../data/avatar-options';
import { ScrollArea } from './ui/scroll-area';

interface AddChildModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (name: string, avatarConfig: AvatarConfig, color: string) => void;
  existingColors: string[];
}

const colors = [
  { id: 'blue', name: 'Blue', class: 'bg-blue-500', gradient: 'from-blue-500 to-cyan-500' },
  { id: 'pink', name: 'Pink', class: 'bg-pink-500', gradient: 'from-pink-500 to-rose-500' },
  { id: 'green', name: 'Green', class: 'bg-green-500', gradient: 'from-green-500 to-emerald-500' },
  { id: 'purple', name: 'Purple', class: 'bg-purple-500', gradient: 'from-purple-500 to-violet-500' },
  { id: 'orange', name: 'Orange', class: 'bg-orange-500', gradient: 'from-orange-500 to-yellow-500' },
  { id: 'red', name: 'Red', class: 'bg-red-500', gradient: 'from-red-500 to-orange-500' },
  { id: 'teal', name: 'Teal', class: 'bg-teal-500', gradient: 'from-teal-500 to-cyan-500' },
  { id: 'indigo', name: 'Indigo', class: 'bg-indigo-500', gradient: 'from-indigo-500 to-purple-500' },
];

type Step = 'name' | 'color' | 'avatar';

export function AddChildModal({ open, onClose, onAdd, existingColors }: AddChildModalProps) {
  const [step, setStep] = useState<Step>('name');
  const [name, setName] = useState('');
  const [avatarConfig, setAvatarConfig] = useState<AvatarConfig>(defaultAvatarConfig);
  const [selectedColor, setSelectedColor] = useState(() => {
    // Find first color not already taken
    return colors.find(c => !existingColors.includes(c.id))?.id || 'blue';
  });

  const handleClose = () => {
    setStep('name');
    setName('');
    setAvatarConfig(defaultAvatarConfig);
    onClose();
  };

  const handleAdd = () => {
    onAdd(name, avatarConfig, selectedColor);
    handleClose();
  };

  const availableColors = colors.filter(c => !existingColors.includes(c.id));

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>
            {step === 'name' && 'Add a New Child'}
            {step === 'color' && 'Choose a Color'}
            {step === 'avatar' && 'Create Avatar'}
          </DialogTitle>
          <DialogDescription>
            {step === 'name' && 'Enter the name of the child you want to add to the family.'}
            {step === 'color' && 'Select a unique color to represent this child in the app.'}
            {step === 'avatar' && 'Customize the avatar appearance for this child.'}
          </DialogDescription>
        </DialogHeader>

        {step === 'name' && (
          <div className="p-6 space-y-6">
            <div className="text-center">
              <div className="text-6xl mb-4">👋</div>
              <p className="text-muted-foreground">
                What's the child's name?
              </p>
            </div>
            <Input
              type="text"
              placeholder="Enter name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="text-center text-lg"
              autoFocus
              onKeyPress={(e) => {
                if (e.key === 'Enter' && name.trim()) {
                  setStep('color');
                }
              }}
            />
            <Button
              onClick={() => setStep('color')}
              disabled={!name.trim()}
              className="w-full"
            >
              Continue <ArrowRight className="ml-2" size={20} />
            </Button>
          </div>
        )}

        {step === 'color' && (
          <div className="p-6 space-y-6">
            <div className="text-center">
              <div className="text-6xl mb-4">🎨</div>
              <p className="text-muted-foreground">
                Pick a color for {name}
              </p>
              {availableColors.length < colors.length && (
                <p className="text-xs text-muted-foreground mt-2">
                  (Some colors are already taken)
                </p>
              )}
            </div>
            <div className="grid grid-cols-4 gap-4 max-w-lg mx-auto">
              {availableColors.map((color) => (
                <button
                  key={color.id}
                  onClick={() => setSelectedColor(color.id)}
                  className={`aspect-square rounded-xl ${color.class} transition-all hover:scale-110 ${
                    selectedColor === color.id
                      ? 'ring-4 ring-offset-4 ring-gray-900 scale-110'
                      : 'hover:ring-2 ring-offset-2 ring-gray-400'
                  }`}
                >
                  <div className="w-full h-full flex items-center justify-center">
                    {selectedColor === color.id && (
                      <span className="text-white text-3xl">✓</span>
                    )}
                  </div>
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => setStep('name')}
                variant="outline"
                className="flex-1"
              >
                <ArrowLeft className="mr-2" size={20} /> Back
              </Button>
              <Button onClick={() => setStep('avatar')} className="flex-1">
                Continue <ArrowRight className="ml-2" size={20} />
              </Button>
            </div>
          </div>
        )}

        {step === 'avatar' && (
          <>
            <ScrollArea className="flex-1 px-6">
              <div className="space-y-6 pb-4">
                <div className="text-center">
                  <div className="text-5xl mb-4">✨</div>
                  <p className="text-muted-foreground">
                    Create {name}'s avatar
                  </p>
                </div>
                <SimpleAvatarCustomizer
                  avatarConfig={avatarConfig}
                  onAvatarChange={setAvatarConfig}
                />
              </div>
            </ScrollArea>
            <div className="p-6 pt-4 border-t flex gap-3 flex-shrink-0">
              <Button
                onClick={() => setStep('color')}
                variant="outline"
                className="flex-1"
              >
                <ArrowLeft className="mr-2" size={20} /> Back
              </Button>
              <Button onClick={handleAdd} className="flex-1">
                Add {name}! <ArrowRight className="ml-2" size={20} />
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
