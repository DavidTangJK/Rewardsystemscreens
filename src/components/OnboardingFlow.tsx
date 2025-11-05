import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { SimpleAvatarCustomizer } from './SimpleAvatarCustomizer';
import { Home, ListTodo, ShoppingBag, Sparkles, Users, ArrowRight, Star } from 'lucide-react';
import type { AvatarConfig } from '../data/avatar-options';
import { defaultAvatarConfig } from '../data/avatar-options';

interface OnboardingFlowProps {
  onComplete: (name: string, avatarConfig: AvatarConfig, color: string) => void;
}

type OnboardingStep = 'welcome' | 'name' | 'avatar' | 'color' | 'tour-tasks' | 'tour-home' | 'tour-shop' | 'tour-reflect' | 'tour-social' | 'complete';

const colors = [
  { id: 'blue', name: 'Blue', class: 'bg-blue-500', gradient: 'from-blue-500 to-cyan-500' },
  { id: 'pink', name: 'Pink', class: 'bg-pink-500', gradient: 'from-pink-500 to-rose-500' },
  { id: 'green', name: 'Green', class: 'bg-green-500', gradient: 'from-green-500 to-emerald-500' },
  { id: 'purple', name: 'Purple', class: 'bg-purple-500', gradient: 'from-purple-500 to-violet-500' },
  { id: 'orange', name: 'Orange', class: 'bg-orange-500', gradient: 'from-orange-500 to-yellow-500' },
];

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [step, setStep] = useState<OnboardingStep>('welcome');
  const [name, setName] = useState('');
  const [avatarConfig, setAvatarConfig] = useState<AvatarConfig>(defaultAvatarConfig);
  const [selectedColor, setSelectedColor] = useState('blue');

  const handleNext = () => {
    const stepOrder: OnboardingStep[] = [
      'welcome',
      'name',
      'color',
      'avatar',
      'tour-tasks',
      'tour-home',
      'tour-shop',
      'tour-reflect',
      'tour-social',
      'complete',
    ];
    const currentIndex = stepOrder.indexOf(step);
    if (currentIndex < stepOrder.length - 1) {
      setStep(stepOrder[currentIndex + 1]);
    }
  };

  const handleComplete = () => {
    onComplete(name, avatarConfig, selectedColor);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 flex items-center justify-center p-4">
      <AnimatePresence mode="wait">
        {step === 'welcome' && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="max-w-2xl w-full"
          >
            <Card className="p-8 md:p-12 text-center space-y-6 bg-white/90 backdrop-blur">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="text-8xl"
              >
                🌟
              </motion.div>
              <h1 className="text-white bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Welcome to TaskStars!
              </h1>
              <p className="text-muted-foreground text-lg">
                Complete tasks, earn stars, and decorate your amazing virtual home!
              </p>
              <p className="text-muted-foreground">
                Let's get started by creating your character
              </p>
              <Button onClick={handleNext} size="lg" className="mt-6">
                Let's Go! <ArrowRight className="ml-2" size={20} />
              </Button>
            </Card>
          </motion.div>
        )}

        {step === 'name' && (
          <motion.div
            key="name"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="max-w-2xl w-full"
          >
            <Card className="p-8 md:p-12 space-y-6 bg-white/90 backdrop-blur">
              <div className="text-center space-y-4">
                <div className="text-6xl">👋</div>
                <h2>What's your name?</h2>
                <p className="text-muted-foreground">
                  This is how you'll be known in TaskStars
                </p>
              </div>
              <Input
                type="text"
                placeholder="Enter your name..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="text-center text-xl p-6"
                autoFocus
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && name.trim()) {
                    handleNext();
                  }
                }}
              />
              <Button
                onClick={handleNext}
                disabled={!name.trim()}
                className="w-full"
                size="lg"
              >
                Continue <ArrowRight className="ml-2" size={20} />
              </Button>
            </Card>
          </motion.div>
        )}

        {step === 'color' && (
          <motion.div
            key="color"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="max-w-2xl w-full"
          >
            <Card className="p-8 md:p-12 space-y-6 bg-white/90 backdrop-blur">
              <div className="text-center space-y-4">
                <div className="text-6xl">🎨</div>
                <h2>Pick Your Color</h2>
                <p className="text-muted-foreground">
                  This will be your special color throughout the app
                </p>
              </div>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
                {colors.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => setSelectedColor(color.id)}
                    className={`aspect-square rounded-2xl ${color.class} transition-all hover:scale-110 ${
                      selectedColor === color.id
                        ? 'ring-4 ring-offset-4 ring-gray-900 scale-110'
                        : 'hover:ring-2 ring-offset-2 ring-gray-400'
                    }`}
                  >
                    <div className="w-full h-full flex items-center justify-center">
                      {selectedColor === color.id && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="text-white text-3xl"
                        >
                          ✓
                        </motion.div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
              <Button onClick={handleNext} className="w-full" size="lg">
                Continue <ArrowRight className="ml-2" size={20} />
              </Button>
            </Card>
          </motion.div>
        )}

        {step === 'avatar' && (
          <motion.div
            key="avatar"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="max-w-4xl w-full"
          >
            <Card className="p-6 md:p-8 space-y-6 bg-white/90 backdrop-blur max-h-[90vh] overflow-y-auto">
              <div className="text-center space-y-2">
                <div className="text-5xl">✨</div>
                <h2>Create Your Avatar</h2>
                <p className="text-muted-foreground">
                  Customize your character the way you like!
                </p>
              </div>
              <SimpleAvatarCustomizer
                avatarConfig={avatarConfig}
                onAvatarChange={setAvatarConfig}
              />
              <Button onClick={handleNext} className="w-full" size="lg">
                Looking Good! Let's Continue <ArrowRight className="ml-2" size={20} />
              </Button>
            </Card>
          </motion.div>
        )}

        {step === 'tour-tasks' && (
          <TourCard
            icon={<ListTodo size={48} />}
            title="Tasks Screen"
            description="This is where you'll see all your tasks. Complete them to earn stars!"
            gradient="from-green-500 to-emerald-500"
            features={[
              'Daily tasks that reset every day',
              'Weekly tasks for bigger challenges',
              'Bonus tasks for extra stars',
              'Track deadlines to stay organized',
            ]}
            onNext={handleNext}
          />
        )}

        {step === 'tour-home' && (
          <TourCard
            icon={<Home size={48} />}
            title="Home Screen"
            description="Your virtual home where you can see your family and place items you've bought!"
            gradient="from-blue-500 to-cyan-500"
            features={[
              'See your animated family members',
              'Drag and drop items anywhere',
              'Customize your space',
              'Change backgrounds',
            ]}
            onNext={handleNext}
          />
        )}

        {step === 'tour-shop' && (
          <TourCard
            icon={<ShoppingBag size={48} />}
            title="Star Shop"
            description="Spend your hard-earned stars on cool furniture, pets, games, and toys!"
            gradient="from-orange-500 to-pink-500"
            features={[
              'Buy furniture for your room',
              'Adopt virtual pets',
              'Get fun games and toys',
              'Unlock special backgrounds',
            ]}
            onNext={handleNext}
          />
        )}

        {step === 'tour-reflect' && (
          <TourCard
            icon={<Sparkles size={48} />}
            title="Daily Reflection"
            description="Think about your day and write down your thoughts and feelings!"
            gradient="from-purple-500 to-pink-500"
            features={[
              'Write about your day',
              'Pick your mood emoji',
              'Use quick reflection templates',
              'See your past reflections',
            ]}
            onNext={handleNext}
          />
        )}

        {step === 'tour-social' && (
          <TourCard
            icon={<Users size={48} />}
            title="Social Screen"
            description="See how your siblings are doing and celebrate together!"
            gradient="from-pink-500 to-rose-500"
            features={[
              'View sibling progress',
              'See family leaderboard',
              'Send encouragement',
              'Stay motivated together',
            ]}
            onNext={handleNext}
          />
        )}

        {step === 'complete' && (
          <motion.div
            key="complete"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="max-w-2xl w-full"
          >
            <Card className="p-8 md:p-12 text-center space-y-6 bg-white/90 backdrop-blur">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: 'reverse',
                }}
                className="text-8xl"
              >
                🎉
              </motion.div>
              <h1 className="text-white bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                You're All Set, {name}!
              </h1>
              <p className="text-muted-foreground text-lg">
                Start completing tasks and earning stars today!
              </p>
              <div className="flex items-center justify-center gap-2 text-yellow-500">
                <Star className="fill-yellow-500" size={24} />
                <span className="text-2xl">Let's earn some stars!</span>
                <Star className="fill-yellow-500" size={24} />
              </div>
              <Button onClick={handleComplete} size="lg" className="mt-6">
                Start My Journey! <ArrowRight className="ml-2" size={20} />
              </Button>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function TourCard({
  icon,
  title,
  description,
  gradient,
  features,
  onNext,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
  features: string[];
  onNext: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="max-w-2xl w-full"
    >
      <Card className="p-8 md:p-12 space-y-6 bg-white/90 backdrop-blur">
        <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white mx-auto`}>
          {icon}
        </div>
        <div className="text-center space-y-4">
          <h2>{title}</h2>
          <p className="text-muted-foreground text-lg">{description}</p>
        </div>
        <div className="space-y-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-3"
            >
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-sm mt-0.5">
                ✓
              </div>
              <p className="text-muted-foreground">{feature}</p>
            </motion.div>
          ))}
        </div>
        <Button onClick={onNext} className="w-full" size="lg">
          Next <ArrowRight className="ml-2" size={20} />
        </Button>
      </Card>
    </motion.div>
  );
}
