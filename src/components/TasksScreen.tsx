import { CheckCircle2, Circle, Star, Users, Clock, Palette } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { AvatarCustomizer } from './AvatarCustomizer';
import { AvatarDisplay } from './AvatarDisplay';
import type { AvatarConfig } from '../data/avatar-options';

interface FamilyMember {
  id: string;
  name: string;
  emoji: string;
  color: string;
  avatarConfig?: AvatarConfig;
}

interface Task {
  id: number;
  title: string;
  description: string;
  stars: number;
  completed: boolean;
  category: 'daily' | 'weekly' | 'bonus';
  assignedTo: string;
  deadline?: string;
}

interface TasksScreenProps {
  tasks: Task[];
  onToggleTask: (taskId: number) => void;
  currentUser: string;
  familyMembers: FamilyMember[];
  onUserChange: (userId: string) => void;
  onUpdateAvatar?: (userId: string, avatarConfig: AvatarConfig) => void;
}

export function TasksScreen({ tasks, onToggleTask, currentUser, familyMembers, onUserChange, onUpdateAvatar }: TasksScreenProps) {
  const [showAllTasks, setShowAllTasks] = useState(true);
  const [isAvatarCustomizerOpen, setIsAvatarCustomizerOpen] = useState(false);
  
  // Filter tasks based on view preference
  const visibleTasks = showAllTasks ? tasks : tasks.filter(t => t.assignedTo === currentUser);
  
  const dailyTasks = visibleTasks.filter(t => t.category === 'daily');
  const weeklyTasks = visibleTasks.filter(t => t.category === 'weekly');
  const bonusTasks = visibleTasks.filter(t => t.category === 'bonus');
  
  // Only count current user's tasks for confetti
  const myDailyTasks = tasks.filter(t => t.category === 'daily' && t.assignedTo === currentUser);
  const previousCompletedCount = useRef(myDailyTasks.filter(t => t.completed).length);

  const currentMember = familyMembers.find(m => m.id === currentUser);

  // Check if all daily tasks are completed and trigger confetti
  useEffect(() => {
    const completedMyDailyTasks = myDailyTasks.filter(t => t.completed).length;
    const allMyDailyTasksComplete = myDailyTasks.length > 0 && completedMyDailyTasks === myDailyTasks.length;
    
    // Only trigger confetti if we just completed all tasks (not on initial render or unchecking)
    if (allMyDailyTasksComplete && completedMyDailyTasks > previousCompletedCount.current) {
      // Trigger confetti celebration!
      const duration = 3000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

      function randomInRange(min: number, max: number) {
        return Math.random() * (max - min) + min;
      }

      const interval: NodeJS.Timeout = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        
        // Launch confetti from different positions
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          colors: ['#9333ea', '#ec4899', '#f59e0b', '#3b82f6', '#10b981'],
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          colors: ['#9333ea', '#ec4899', '#f59e0b', '#3b82f6', '#10b981'],
        });
      }, 250);
    }

    previousCompletedCount.current = completedMyDailyTasks;
  }, [myDailyTasks]);

  const allMyDailyTasksComplete = myDailyTasks.length > 0 && myDailyTasks.every(t => t.completed);

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; border: string; text: string; badge: string }> = {
      blue: { bg: 'bg-blue-50', border: 'border-blue-300', text: 'text-blue-700', badge: 'bg-blue-500' },
      pink: { bg: 'bg-pink-50', border: 'border-pink-300', text: 'text-pink-700', badge: 'bg-pink-500' },
      green: { bg: 'bg-green-50', border: 'border-green-300', text: 'text-green-700', badge: 'bg-green-500' },
      purple: { bg: 'bg-purple-50', border: 'border-purple-300', text: 'text-purple-700', badge: 'bg-purple-500' },
      orange: { bg: 'bg-orange-50', border: 'border-orange-300', text: 'text-orange-700', badge: 'bg-orange-500' },
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="flex-1 flex flex-col bg-gradient-to-b from-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-6 text-white">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-white">Family Tasks</h1>
          <div className="flex items-center gap-2">
            <Button
              onClick={() => setIsAvatarCustomizerOpen(true)}
              variant="ghost"
              size="sm"
              className="bg-white/20 hover:bg-white/30 text-white"
            >
              <Palette size={16} className="mr-2" />
              Customize Avatar
            </Button>
            <Select value={currentUser} onValueChange={onUserChange}>
              <SelectTrigger className="w-[160px] bg-white/20 border-white/30 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {familyMembers.map(member => (
                  <SelectItem key={member.id} value={member.id}>
                    <div className="flex items-center gap-2">
                      <span>{member.emoji}</span>
                      <span>{member.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <p className="text-blue-100 opacity-90">Complete tasks to earn stars!</p>
      </div>
      
      {/* Avatar Customizer Dialog */}
      {onUpdateAvatar && currentMember && (
        <AvatarCustomizer
          isOpen={isAvatarCustomizerOpen}
          onClose={() => setIsAvatarCustomizerOpen(false)}
          initialConfig={currentMember.avatarConfig}
          onSave={(config) => onUpdateAvatar(currentUser, config)}
          userName={currentMember.name}
        />
      )}

      {/* Filter Toggle */}
      <div className="bg-white border-b border-border p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users size={20} className="text-muted-foreground" />
            <span className="text-muted-foreground">View:</span>
          </div>
          <div className="flex gap-2">
            <Button
              variant={showAllTasks ? 'default' : 'outline'}
              size="sm"
              onClick={() => setShowAllTasks(true)}
            >
              All Family Tasks
            </Button>
            <Button
              variant={!showAllTasks ? 'default' : 'outline'}
              size="sm"
              onClick={() => setShowAllTasks(false)}
            >
              Just Mine
            </Button>
          </div>
        </div>
      </div>

      {/* Celebration Banner */}
      {allMyDailyTasksComplete && (
        <div className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 p-4 text-white text-center animate-pulse">
          <div className="flex items-center justify-center gap-2">
            <span className="text-2xl">🎉</span>
            <p className="text-white">Amazing job {currentMember?.name}! You finished all your daily tasks!</p>
            <span className="text-2xl">🌟</span>
          </div>
        </div>
      )}

      {/* Tasks List */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Daily Tasks */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-blue-600">Daily Tasks</h2>
              <Badge variant="outline" className="border-blue-300 text-blue-600">
                {dailyTasks.filter(t => t.completed).length}/{dailyTasks.length}
              </Badge>
            </div>
            <div className="space-y-3">
              {dailyTasks.map(task => (
                <TaskCard 
                  key={task.id} 
                  task={task} 
                  onToggle={onToggleTask}
                  currentUser={currentUser}
                  familyMembers={familyMembers}
                  getColorClasses={getColorClasses}
                />
              ))}
            </div>
          </div>

          {/* Weekly Tasks */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-purple-600">Weekly Tasks</h2>
              <Badge variant="outline" className="border-purple-300 text-purple-600">
                {weeklyTasks.filter(t => t.completed).length}/{weeklyTasks.length}
              </Badge>
            </div>
            <div className="space-y-3">
              {weeklyTasks.map(task => (
                <TaskCard 
                  key={task.id} 
                  task={task} 
                  onToggle={onToggleTask}
                  currentUser={currentUser}
                  familyMembers={familyMembers}
                  getColorClasses={getColorClasses}
                />
              ))}
            </div>
          </div>

          {/* Bonus Tasks */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-pink-600">Bonus Tasks</h2>
              <Badge variant="outline" className="border-pink-300 text-pink-600">
                Extra Stars!
              </Badge>
            </div>
            <div className="space-y-3">
              {bonusTasks.map(task => (
                <TaskCard 
                  key={task.id} 
                  task={task} 
                  onToggle={onToggleTask}
                  currentUser={currentUser}
                  familyMembers={familyMembers}
                  getColorClasses={getColorClasses}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TaskCard({ 
  task, 
  onToggle,
  currentUser,
  familyMembers,
  getColorClasses
}: { 
  task: Task; 
  onToggle: (id: number) => void;
  currentUser: string;
  familyMembers: FamilyMember[];
  getColorClasses: (color: string) => { bg: string; border: string; text: string; badge: string };
}) {
  const assignedMember = familyMembers.find(m => m.id === task.assignedTo);
  const isMyTask = task.assignedTo === currentUser;
  const colorClasses = assignedMember ? getColorClasses(assignedMember.color) : getColorClasses('blue');
  
  return (
    <Card className={`p-4 transition-all ${
      task.completed 
        ? 'bg-green-50 border-green-200' 
        : isMyTask 
        ? `${colorClasses.bg} ${colorClasses.border} border-2`
        : 'bg-white opacity-70 border-dashed'
    }`}>
      <div className="flex items-center gap-4">
        <button
          onClick={() => onToggle(task.id)}
          className="flex-shrink-0"
          disabled={!isMyTask}
        >
          {task.completed ? (
            <CheckCircle2 className="text-green-500 hover:text-green-600 transition-colors" size={32} />
          ) : (
            <Circle className={`${isMyTask ? 'text-gray-300 hover:text-blue-400' : 'text-gray-200'} transition-colors`} size={32} />
          )}
        </button>
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <h3 className={task.completed ? 'text-green-700 line-through' : ''}>{task.title}</h3>
            {assignedMember && (
              <Badge 
                className={`${colorClasses.badge} text-white text-xs`}
              >
                {assignedMember.emoji} {assignedMember.name}
              </Badge>
            )}
            {!isMyTask && (
              <Badge variant="outline" className="text-xs border-gray-300 text-gray-500">
                View Only
              </Badge>
            )}
            {task.deadline && (
              <Badge 
                variant="outline" 
                className="text-xs border-orange-400 text-orange-700 bg-orange-50 flex items-center gap-1"
              >
                <Clock size={12} />
                {task.deadline}
              </Badge>
            )}
          </div>
          <p className={`text-muted-foreground ${task.completed ? 'line-through' : ''}`}>{task.description}</p>
        </div>

        <div className="flex items-center gap-1 bg-yellow-100 px-3 py-2 rounded-lg">
          <Star className="fill-yellow-400 text-yellow-400" size={20} />
          <span className="text-yellow-700">{task.stars}</span>
        </div>
      </div>
    </Card>
  );
}
