import { useState, useEffect } from 'react';
import { Home, ListTodo, ShoppingBag, Sparkles, Users, Lock } from 'lucide-react';
import { HomeScreen } from './components/HomeScreen';
import { TasksScreen } from './components/TasksScreen';
import { ShopScreen } from './components/ShopScreen';
import { ReflectionScreen } from './components/ReflectionScreen';
import { SocialScreen } from './components/SocialScreen';
import { initialShopItems, type ShopItem } from './data/shop-items';
import { getFamilyMembers, createFamilyMember } from './utils/api';
import { toast, Toaster } from 'sonner@2.0.3';
import confetti from 'canvas-confetti';
import type { AvatarConfig } from './data/avatar-options';

type Screen = 'home' | 'tasks' | 'shop' | 'reflect' | 'social';

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
  assignedTo: string; // family member id
  deadline?: string; // Optional deadline time (e.g., "8:00 AM", "6:00 PM")
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('tasks');
  const [stars, setStars] = useState(50);
  const [totalStarsEarned, setTotalStarsEarned] = useState(150);
  const [tasksCompleted, setTasksCompleted] = useState(12);
  
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
  const [isLoadingMembers, setIsLoadingMembers] = useState(true);

  const [currentUser, setCurrentUser] = useState<string>('');

  // Load family members from database
  useEffect(() => {
    const loadFamilyMembers = async () => {
      try {
        const members = await getFamilyMembers();
        
        // If no members exist, initialize with default members
        if (members.length === 0) {
          const defaultMembers = [
            { id: 'alex', name: 'Alex', emoji: '🧒', color: 'blue' },
            { id: 'emma', name: 'Emma', emoji: '👧', color: 'pink' },
            { id: 'ryan', name: 'Ryan', emoji: '👦', color: 'green' },
          ];
          
          // Create default members in database
          for (const member of defaultMembers) {
            await createFamilyMember(member);
          }
          
          setFamilyMembers(defaultMembers);
          setCurrentUser(defaultMembers[0].id);
        } else {
          setFamilyMembers(members);
          setCurrentUser(members[0].id);
        }
      } catch (error) {
        console.error('Failed to load family members:', error);
        // Fallback to hardcoded data if database fails
        const fallbackMembers = [
          { id: 'alex', name: 'Alex', emoji: '🧒', color: 'blue' },
          { id: 'emma', name: 'Emma', emoji: '👧', color: 'pink' },
          { id: 'ryan', name: 'Ryan', emoji: '👦', color: 'green' },
        ];
        setFamilyMembers(fallbackMembers);
        setCurrentUser(fallbackMembers[0].id);
      } finally {
        setIsLoadingMembers(false);
      }
    };
    
    loadFamilyMembers();
  }, []);
  
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: 'Make Your Bed', description: 'Start your day right!', stars: 5, completed: false, category: 'daily', assignedTo: 'alex', deadline: '9:00 AM' },
    { id: 2, title: 'Brush Your Teeth', description: 'Morning and night', stars: 5, completed: false, category: 'daily', assignedTo: 'alex', deadline: '8:30 PM' },
    { id: 3, title: 'Complete Homework', description: 'Finish all assignments', stars: 10, completed: false, category: 'daily', assignedTo: 'alex', deadline: '5:00 PM' },
    { id: 4, title: 'Help with Dishes', description: 'Clean up after meals', stars: 8, completed: false, category: 'daily', assignedTo: 'emma', deadline: '7:00 PM' },
    { id: 5, title: 'Read for 20 Minutes', description: 'Choose any book you like', stars: 10, completed: false, category: 'daily', assignedTo: 'emma', deadline: '8:00 PM' },
    { id: 11, title: 'Feed the Pet', description: 'Give food and water', stars: 5, completed: false, category: 'daily', assignedTo: 'ryan', deadline: '6:00 PM' },
    { id: 12, title: 'Take Out Trash', description: 'Empty all trash bins', stars: 8, completed: false, category: 'daily', assignedTo: 'ryan', deadline: '7:30 PM' },
    { id: 6, title: 'Clean Your Room', description: 'Organize and tidy up', stars: 15, completed: false, category: 'weekly', assignedTo: 'alex', deadline: 'Saturday 2:00 PM' },
    { id: 7, title: 'Help with Laundry', description: 'Fold and put away clothes', stars: 12, completed: false, category: 'weekly', assignedTo: 'emma', deadline: 'Sunday 3:00 PM' },
    { id: 8, title: 'Practice Instrument', description: '30 minutes of practice', stars: 15, completed: false, category: 'weekly', assignedTo: 'ryan', deadline: 'Friday 4:00 PM' },
    { id: 9, title: 'Learn Something New', description: 'Try a new skill or hobby', stars: 20, completed: false, category: 'bonus', assignedTo: 'alex' },
    { id: 10, title: 'Help a Sibling', description: 'Be kind and helpful', stars: 15, completed: false, category: 'bonus', assignedTo: 'emma' },
  ]);

  const [shopItems, setShopItems] = useState<ShopItem[]>(initialShopItems);

  const handleToggleTask = (taskId: number) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    setTasks(prevTasks =>
      prevTasks.map(t =>
        t.id === taskId ? { ...t, completed: !t.completed } : t
      )
    );
    
    // If completing the task, add stars; if uncompleting, subtract stars
    if (!task.completed) {
      setStars(prev => prev + task.stars);
      setTotalStarsEarned(prev => prev + task.stars);
      setTasksCompleted(prev => prev + 1);
    } else {
      setStars(prev => Math.max(0, prev - task.stars));
      setTotalStarsEarned(prev => Math.max(0, prev - task.stars));
      setTasksCompleted(prev => Math.max(0, prev - 1));
    }
  };

  const handlePurchaseItem = (itemId: number) => {
    const item = shopItems.find(i => i.id === itemId);
    if (item && !item.purchased && stars >= item.cost) {
      setShopItems(prevItems => {
        // If purchasing a background, unequip all other backgrounds first
        if (item.category === 'backgrounds') {
          return prevItems.map(i =>
            i.id === itemId
              ? { ...i, purchased: true, equipped: true }
              : i.category === 'backgrounds'
              ? { ...i, equipped: false }
              : i
          );
        }
        
        // For other items, just set purchased and equipped
        return prevItems.map(i =>
          i.id === itemId ? { ...i, purchased: true, equipped: true } : i
        );
      });
      setStars(prev => prev - item.cost);
      
      // Trigger confetti celebration
      const duration = 2000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          clearInterval(interval);
          return;
        }

        const particleCount = 50 * (timeLeft / duration);
        
        confetti({
          ...defaults,
          particleCount,
          origin: { x: Math.random() * 0.4 + 0.3, y: Math.random() * 0.3 + 0.1 },
          colors: ['#fbbf24', '#f59e0b', '#f97316', '#ec4899', '#a855f7'],
        });
      }, 250);
      
      // Show success toast
      toast.success(`🎉 You got ${item.emoji} ${item.name}!`, {
        description: item.category === 'backgrounds' 
          ? 'Your new background has been applied!' 
          : 'Check it out in your home!',
        duration: 3000,
      });
    }
  };

  const handleToggleEquip = (itemId: number) => {
    const item = shopItems.find(i => i.id === itemId);
    if (!item || !item.purchased) return;

    setShopItems(prevItems => {
      // If equipping a background, unequip all other backgrounds first
      if (item.category === 'backgrounds' && !item.equipped) {
        return prevItems.map(i =>
          i.id === itemId
            ? { ...i, equipped: true }
            : i.category === 'backgrounds'
            ? { ...i, equipped: false }
            : i
        );
      }
      
      // For all other items (including pets), just toggle
      return prevItems.map(i =>
        i.id === itemId ? { ...i, equipped: !i.equipped } : i
      );
    });
  };

  const equippedItems = shopItems.filter(item => item.equipped && item.category !== 'backgrounds');
  const equippedBackground = shopItems.find(item => item.equipped && item.category === 'backgrounds');

  const handleUpdateItemPosition = (itemId: number, gridX: number, gridY: number) => {
    setShopItems(prevItems =>
      prevItems.map(i =>
        i.id === itemId ? { ...i, gridX, gridY } : i
      )
    );
  };

  const handleUpdateAvatar = (userId: string, avatarConfig: AvatarConfig) => {
    setFamilyMembers(prevMembers =>
      prevMembers.map(member =>
        member.id === userId ? { ...member, avatarConfig } : member
      )
    );
    
    toast.success('🎨 Avatar updated!', {
      description: 'Your new look is saved!',
      duration: 2000,
    });
  };

  // Check if current user has completed all their assigned daily tasks
  const hasCompletedAllTasks = () => {
    const userDailyTasks = tasks.filter(task => task.assignedTo === currentUser && task.category === 'daily');
    if (userDailyTasks.length === 0) return true; // No daily tasks assigned
    return userDailyTasks.every(task => task.completed);
  };

  // Handle navigation with lock check
  const handleNavigation = (screenId: Screen) => {
    const lockedScreens: Screen[] = ['home', 'social'];
    
    if (lockedScreens.includes(screenId) && !hasCompletedAllTasks()) {
      const currentUserName = familyMembers.find(m => m.id === currentUser)?.name || 'You';
      toast.error(`🔒 ${currentUserName} need${currentUserName === 'You' ? '' : 's'} to complete all daily tasks first!`, {
        description: 'Finish your daily tasks to unlock this tab.',
        duration: 3000,
      });
      return;
    }
    
    setCurrentScreen(screenId);
  };

  const navItems = [
    { id: 'home' as Screen, label: 'Home', icon: Home, lockable: true },
    { id: 'tasks' as Screen, label: 'Tasks', icon: ListTodo, lockable: false },
    { id: 'social' as Screen, label: 'Friends', icon: Users, lockable: true },
    { id: 'reflect' as Screen, label: 'Reflect', icon: Sparkles, lockable: false },
  ];

  // Show loading state while fetching family members
  if (isLoadingMembers) {
    return (
      <div className="size-full flex items-center justify-center bg-gradient-to-b from-purple-500 to-pink-500">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">🏠</div>
          <p className="text-white">Loading your family...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="size-full flex flex-col">
      <Toaster position="top-center" richColors />
      
      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {currentScreen === 'home' && (
          <HomeScreen 
            stars={stars} 
            items={equippedItems} 
            onUpdatePosition={handleUpdateItemPosition}
            familyMembers={familyMembers}
            currentUser={currentUser}
            backgroundGradient={equippedBackground?.gradient}
            onOpenShop={() => setCurrentScreen('shop')}
          />
        )}
        {currentScreen === 'tasks' && (
          <TasksScreen 
            tasks={tasks} 
            onToggleTask={handleToggleTask}
            currentUser={currentUser}
            familyMembers={familyMembers}
            onUserChange={setCurrentUser}
            onUpdateAvatar={handleUpdateAvatar}
          />
        )}
        {currentScreen === 'shop' && <ShopScreen stars={stars} items={shopItems} onPurchase={handlePurchaseItem} onToggleEquip={handleToggleEquip} />}
        {currentScreen === 'social' && <SocialScreen />}
        {currentScreen === 'reflect' && (
          <ReflectionScreen
            currentUser={currentUser}
            familyMembers={familyMembers}
            tasksCompletedToday={tasks.filter(t => t.completed && t.assignedTo === currentUser).length}
            starsEarnedToday={tasks.filter(t => t.completed && t.assignedTo === currentUser).reduce((sum, t) => sum + t.stars, 0)}
          />
        )}
      </div>

      {/* Bottom Navigation */}
      <nav className="bg-white border-t border-border">
        <div className="grid grid-cols-4">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = currentScreen === item.id;
            const isLocked = item.lockable && !hasCompletedAllTasks();
            
            return (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.id)}
                className={`flex flex-col items-center gap-1 py-3 transition-colors relative ${
                  isActive
                    ? 'text-purple-600'
                    : isLocked
                    ? 'text-muted-foreground/40'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <div className="relative">
                  <Icon size={24} className={isLocked ? 'opacity-40' : ''} />
                  {isLocked && (
                    <div className="absolute -top-1 -right-1 bg-red-500 rounded-full p-0.5">
                      <Lock size={12} className="text-white" />
                    </div>
                  )}
                </div>
                <span className="text-xs">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
