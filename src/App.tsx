import { useState, useEffect } from 'react';
import { Home, ShoppingBag, Sparkles, Users, Plus } from 'lucide-react';
import { HomeScreen } from './components/HomeScreen';
import { ShopScreen } from './components/ShopScreen';
import { ReflectionScreen } from './components/ReflectionScreen';
import { SocialScreen } from './components/SocialScreen';
import { OnboardingFlow } from './components/OnboardingFlow';
import { AddChildModal } from './components/AddChildModal';
import { initialShopItems, type ShopItem } from './data/shop-items';
import { getFamilyChildren, createChild, updateChild, wipeDatabase, getOrCreateFamily } from './utils/api';
import { toast, Toaster } from 'sonner@2.0.3';
import confetti from 'canvas-confetti';
import type { AvatarConfig } from './data/avatar-options';
import { Button } from './components/ui/button';

type Screen = 'home' | 'shop' | 'reflect' | 'social';

interface Child {
  id: string;
  name: string;
  emoji: string;
  color: string;
  avatarConfig?: AvatarConfig;
  familyId: string;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [stars, setStars] = useState(0);
  const [totalStarsEarned, setTotalStarsEarned] = useState(0);
  
  const [children, setChildren] = useState<Child[]>([]);
  const [isLoadingChildren, setIsLoadingChildren] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showAddChild, setShowAddChild] = useState(false);
  const [pendingChildFromUrl, setPendingChildFromUrl] = useState<{ id: string; name: string } | null>(null);
  const [familyId, setFamilyId] = useState<string>('default-family');

  const [currentUser, setCurrentUser] = useState<string>('');

  // Load children from database
  useEffect(() => {
    const loadChildren = async () => {
      try {
        // Wipe database on first load (development)
        await wipeDatabase();
        
        // Check URL parameters for child_id and child_name
        const urlParams = new URLSearchParams(window.location.search);
        const childId = urlParams.get('child_id');
        const childName = urlParams.get('child_name');
        const urlFamilyId = urlParams.get('family_id') || 'default-family';
        
        setFamilyId(urlFamilyId);
        
        // Ensure family exists
        await getOrCreateFamily(urlFamilyId);
        
        // Load children in this family
        const familyChildren = await getFamilyChildren(urlFamilyId);
        
        // If URL has child_id, check if it exists
        if (childId && childName) {
          const childExists = familyChildren.some(c => c.id === childId);
          
          if (!childExists) {
            // Child doesn't exist, prepare for onboarding
            setPendingChildFromUrl({ id: childId, name: childName });
            setShowOnboarding(true);
            setIsLoadingChildren(false);
            
            toast.info(`👋 Welcome ${childName}!`, {
              description: "Let's set up your account!",
              duration: 4000,
            });
            
            return;
          } else {
            // Child exists, set as current user
            setChildren(familyChildren);
            setCurrentUser(childId);
            setIsLoadingChildren(false);
            
            toast.success(`🎉 Welcome back, ${childName}!`, {
              description: 'Loading your tasks...',
              duration: 3000,
            });
            
            return;
          }
        }
        
        // Normal flow: no URL parameters
        if (familyChildren.length === 0) {
          setShowOnboarding(true);
        } else {
          setChildren(familyChildren);
          setCurrentUser(familyChildren[0].id);
        }
      } catch (error) {
        console.error('Failed to load children:', error);
        // Show onboarding if database fails
        setShowOnboarding(true);
      } finally {
        setIsLoadingChildren(false);
      }
    };
    
    loadChildren();
  }, []);

  const [shopItems, setShopItems] = useState<ShopItem[]>(initialShopItems);

  const handleOnboardingComplete = async (name: string, avatarConfig: AvatarConfig, color: string) => {
    // Use ID from URL if available, otherwise generate from name
    const childId = pendingChildFromUrl?.id || name.toLowerCase().replace(/\s+/g, '-');
    
    const newChild = {
      id: childId,
      name,
      color,
      avatarConfig,
    };

    try {
      await createChild(familyId, newChild);
      
      // Load all children in family
      const familyChildren = await getFamilyChildren(familyId);
      
      setChildren(familyChildren);
      setCurrentUser(childId);
      setShowOnboarding(false);
      setPendingChildFromUrl(null);
      
      // Clear URL parameters
      window.history.replaceState({}, '', window.location.pathname);
      
      // Give them 100 starting stars
      setStars(100);
      
      toast.success(`🎉 Welcome ${name}!`, {
        description: 'Your account has been created. Start decorating your home!',
        duration: 5000,
      });
      
      // Celebration confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#fbbf24', '#f59e0b', '#f97316', '#ec4899', '#a855f7'],
      });
    } catch (error) {
      console.error('Failed to create child:', error);
      toast.error('Failed to create account. Please try again.');
    }
  };

  const handleAddChild = async (name: string, avatarConfig: AvatarConfig, color: string) => {
    const childId = name.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now();
    
    const newChild = {
      id: childId,
      name,
      color,
      avatarConfig,
    };

    try {
      await createChild(familyId, newChild);
      const familyChildren = await getFamilyChildren(familyId);
      setChildren(familyChildren);
      
      toast.success(`🎉 ${name} has been added!`, {
        description: 'Welcome to the family!',
        duration: 3000,
      });
    } catch (error) {
      console.error('Failed to add child:', error);
      toast.error('Failed to add child. Please try again.');
    }
  };

  const handleUpdateAvatar = async (userId: string, avatarConfig: AvatarConfig) => {
    try {
      await updateChild(userId, { avatarConfig });
      
      // Update local state
      setChildren(prev => prev.map(child =>
        child.id === userId ? { ...child, avatarConfig } : child
      ));
      
      toast.success('Avatar updated!', {
        description: 'Your avatar has been saved.',
        duration: 2000,
      });
    } catch (error) {
      console.error('Failed to update avatar:', error);
      toast.error('Failed to update avatar. Please try again.');
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

  const navItems = [
    { id: 'home' as Screen, label: 'Home', icon: Home },
    { id: 'social' as Screen, label: 'Friends', icon: Users },
    { id: 'reflect' as Screen, label: 'Reflect', icon: Sparkles },
  ];

  // Show onboarding
  if (showOnboarding) {
    return <OnboardingFlow onComplete={handleOnboardingComplete} defaultName={pendingChildFromUrl?.name} />;
  }

  // Show loading state while fetching children
  if (isLoadingChildren) {
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
            familyMembers={children}
            currentUser={currentUser}
            backgroundGradient={equippedBackground?.gradient}
            onOpenShop={() => setCurrentScreen('shop')}
          />
        )}
        {currentScreen === 'shop' && <ShopScreen stars={stars} items={shopItems} onPurchase={handlePurchaseItem} onToggleEquip={handleToggleEquip} />}
        {currentScreen === 'social' && (
          <SocialScreen 
            currentUser={currentUser}
            familyMembers={children}
            onUserChange={setCurrentUser}
            onUpdateAvatar={handleUpdateAvatar}
          />
        )}
        {currentScreen === 'reflect' && (
          <ReflectionScreen
            currentUser={currentUser}
            familyMembers={children}
          />
        )}
      </div>

      {/* Bottom Navigation */}
      <nav className="bg-white border-t border-border flex-shrink-0">
        <div className="grid grid-cols-3">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = currentScreen === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setCurrentScreen(item.id)}
                className={`flex flex-col items-center gap-1 py-3 transition-colors ${
                  isActive
                    ? 'text-purple-600'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon size={24} />
                <span className="text-xs">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Floating Add Child Button */}
      {children.length > 0 && (
        <Button
          onClick={() => setShowAddChild(true)}
          className="fixed bottom-20 right-4 md:bottom-24 md:right-8 rounded-full w-14 h-14 shadow-lg z-50"
          size="icon"
        >
          <Plus size={24} />
        </Button>
      )}

      {/* Add Child Modal */}
      <AddChildModal
        open={showAddChild}
        onClose={() => setShowAddChild(false)}
        onAdd={handleAddChild}
        existingColors={children.map(c => c.color)}
      />
    </div>
  );
}
