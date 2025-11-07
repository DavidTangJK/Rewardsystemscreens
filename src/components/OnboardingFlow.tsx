import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { SimpleAvatarCustomizer } from './SimpleAvatarCustomizer';
import { AvatarDisplay } from './AvatarDisplay';
import { defaultAvatarConfig, type AvatarConfig } from '../data/avatar-options';
import { Sparkles, Home, Users, Star } from 'lucide-react';

interface OnboardingFlowProps {
  onComplete: (data: {
    userName: string;
    avatarConfig: AvatarConfig;
    momAvatarConfig: AvatarConfig;
    dadAvatarConfig: AvatarConfig;
  }) => void;
  initialUserName?: string;
}

export function OnboardingFlow({ onComplete, initialUserName = '' }: OnboardingFlowProps) {
  const [step, setStep] = useState(1);
  const [userName, setUserName] = useState(initialUserName);
  const [avatarConfig, setAvatarConfig] = useState<AvatarConfig>(defaultAvatarConfig);
  const [momAvatarConfig, setMomAvatarConfig] = useState<AvatarConfig>({
    skinTone: '#f0c8a0',
    hairColor: '#6b4423',
    hairStyle: 'curly',
    eyeColor: '#4a3c27',
    outfit: 'casual',
    accessory: 'none',
  });
  const [dadAvatarConfig, setDadAvatarConfig] = useState<AvatarConfig>({
    skinTone: '#d4a574',
    hairColor: '#3d2817',
    hairStyle: 'short',
    eyeColor: '#2d2520',
    outfit: 'casual',
    accessory: 'glasses',
  });

  const handleNext = () => {
    if (step === 1 && userName.trim() === '') {
      return;
    }
    if (step < 4) {
      setStep(step + 1);
    } else {
      onComplete({ userName, avatarConfig, momAvatarConfig, dadAvatarConfig });
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="h-full flex items-center justify-center bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 p-4">
      <Card className="w-full max-w-2xl bg-white/95 backdrop-blur-sm shadow-2xl">
        {/* Progress Indicator */}
        <div className="flex gap-2 p-6 pb-3">
          {[1, 2, 3, 4].map(i => (
            <div
              key={i}
              className={`h-2 flex-1 rounded-full transition-all ${
                i <= step ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gray-200'
              }`}
            ></div>
          ))}
        </div>

        {/* Step 1: Welcome & Name */}
        {step === 1 && (
          <div className="p-6 space-y-6">
            <div className="text-center space-y-3">
              <div className="text-6xl">🏠✨</div>
              <h1 className="text-purple-600">Welcome to Your Virtual Home!</h1>
              <p className="text-gray-600">
                Complete tasks, earn stars, and decorate your own virtual home!
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">What's your name?</Label>
                <Input
                  id="name"
                  placeholder="Enter your name..."
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="text-center text-lg"
                  autoFocus
                />
              </div>

              <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-4 rounded-lg space-y-2">
                <div className="flex items-center gap-2 text-purple-700">
                  <Star className="fill-yellow-400 text-yellow-400" size={20} />
                  <span>Earn stars by completing tasks</span>
                </div>
                <div className="flex items-center gap-2 text-purple-700">
                  <Home size={20} />
                  <span>Use stars to buy furniture, pets, and decorations</span>
                </div>
                <div className="flex items-center gap-2 text-purple-700">
                  <Users size={20} />
                  <span>Visit your friends' homes for inspiration</span>
                </div>
                <div className="flex items-center gap-2 text-purple-700">
                  <Sparkles size={20} />
                  <span>Reflect on your day and track your progress</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                onClick={handleNext}
                disabled={userName.trim() === ''}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                Next
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Create Your Avatar */}
        {step === 2 && (
          <div className="p-6 space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-purple-600">Create Your Avatar</h2>
              <p className="text-gray-600">
                Customize your character - this is how you'll appear in your virtual home!
              </p>
            </div>

            <SimpleAvatarCustomizer
              avatarConfig={avatarConfig}
              onAvatarChange={setAvatarConfig}
            />

            <div className="flex justify-between pt-4">
              <Button onClick={handleBack} variant="outline">
                Back
              </Button>
              <Button
                onClick={handleNext}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                Next
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Create Mom's Avatar */}
        {step === 3 && (
          <div className="p-6 space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-purple-600">Create Mom's Avatar</h2>
              <p className="text-gray-600">
                Customize how Mom will appear in the app!
              </p>
            </div>

            <SimpleAvatarCustomizer
              avatarConfig={momAvatarConfig}
              onAvatarChange={setMomAvatarConfig}
            />

            <div className="flex justify-between pt-4">
              <Button onClick={handleBack} variant="outline">
                Back
              </Button>
              <Button
                onClick={handleNext}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                Next
              </Button>
            </div>
          </div>
        )}

        {/* Step 4: Create Dad's Avatar */}
        {step === 4 && (
          <div className="p-6 space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-purple-600">Create Dad's Avatar</h2>
              <p className="text-gray-600">
                Customize how Dad will appear in the app!
              </p>
            </div>

            <SimpleAvatarCustomizer
              avatarConfig={dadAvatarConfig}
              onAvatarChange={setDadAvatarConfig}
            />

            <div className="flex justify-between pt-4">
              <Button onClick={handleBack} variant="outline">
                Back
              </Button>
              <Button
                onClick={handleNext}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                Let's Go! 🎉
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
