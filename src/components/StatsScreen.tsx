import { Trophy, Star, CheckCircle, TrendingUp } from 'lucide-react';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';

interface StatsScreenProps {
  totalStarsEarned: number;
  currentStars: number;
  tasksCompleted: number;
  itemsOwned: number;
  streak: number;
}

export function StatsScreen({
  totalStarsEarned,
  currentStars,
  tasksCompleted,
  itemsOwned,
  streak,
}: StatsScreenProps) {
  const achievements = [
    { name: 'First Task!', description: 'Complete your first task', unlocked: tasksCompleted >= 1, emoji: '🎯' },
    { name: 'Star Collector', description: 'Earn 50 stars', unlocked: totalStarsEarned >= 50, emoji: '⭐' },
    { name: 'Shopping Spree', description: 'Buy 5 items', unlocked: itemsOwned >= 5, emoji: '🛍️' },
    { name: 'Weekly Warrior', description: 'Keep a 7-day streak', unlocked: streak >= 7, emoji: '🔥' },
    { name: 'Task Master', description: 'Complete 25 tasks', unlocked: tasksCompleted >= 25, emoji: '🏆' },
    { name: 'Home Designer', description: 'Own 10 items', unlocked: itemsOwned >= 10, emoji: '🏠' },
  ];

  const level = Math.floor(totalStarsEarned / 100) + 1;
  const progressToNextLevel = (totalStarsEarned % 100) / 100 * 100;

  return (
    <div className="flex-1 flex flex-col bg-gradient-to-b from-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-6 text-white">
        <h1 className="text-white">My Progress</h1>
        <p className="text-indigo-100 opacity-90">Track your amazing achievements!</p>
      </div>

      {/* Stats Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Level Card */}
          <Card className="p-6 bg-gradient-to-r from-purple-100 to-pink-100 border-purple-200">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-purple-900">Level {level}</h2>
                <p className="text-purple-700">Keep going to reach Level {level + 1}!</p>
              </div>
              <div className="text-5xl">🌟</div>
            </div>
            <Progress value={progressToNextLevel} className="h-3" />
            <p className="text-purple-700 mt-2">{100 - Math.floor(progressToNextLevel)} stars until next level</p>
          </Card>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard
              icon={<Star className="text-yellow-500" size={24} />}
              label="Total Stars"
              value={totalStarsEarned}
              bgColor="bg-yellow-50"
              borderColor="border-yellow-200"
            />
            <StatCard
              icon={<Star className="fill-yellow-400 text-yellow-400" size={24} />}
              label="Current Stars"
              value={currentStars}
              bgColor="bg-orange-50"
              borderColor="border-orange-200"
            />
            <StatCard
              icon={<CheckCircle className="text-green-500" size={24} />}
              label="Tasks Done"
              value={tasksCompleted}
              bgColor="bg-green-50"
              borderColor="border-green-200"
            />
            <StatCard
              icon={<TrendingUp className="text-blue-500" size={24} />}
              label="Day Streak"
              value={streak}
              bgColor="bg-blue-50"
              borderColor="border-blue-200"
            />
          </div>

          {/* Achievements */}
          <div>
            <h2 className="mb-4">Achievements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map((achievement, index) => (
                <Card
                  key={index}
                  className={`p-4 ${
                    achievement.unlocked
                      ? 'bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200'
                      : 'bg-gray-50 opacity-50'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">{achievement.emoji}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3>{achievement.name}</h3>
                        {achievement.unlocked && (
                          <Badge className="bg-green-500 text-white">✓</Badge>
                        )}
                      </div>
                      <p className="text-muted-foreground">{achievement.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  bgColor,
  borderColor,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  bgColor: string;
  borderColor: string;
}) {
  return (
    <Card className={`p-4 ${bgColor} border-2 ${borderColor}`}>
      <div className="flex flex-col items-center text-center space-y-2">
        {icon}
        <p className="text-muted-foreground">{label}</p>
        <p className="text-foreground">{value}</p>
      </div>
    </Card>
  );
}
