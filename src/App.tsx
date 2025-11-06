import { useState } from 'react';
import { Home, Users, Sparkles } from 'lucide-react';
import { HomeScreen } from './components/HomeScreen';
import { ShopScreen } from './components/ShopScreen';
import { ReflectionScreen } from './components/ReflectionScreen';
import { SocialScreen } from './components/SocialScreen';
import { initialShopItems, type ShopItem } from './data/shop-items';
import { toast, Toaster } from 'sonner@2.0.3';
import confetti from 'canvas-confetti';
import { defaultAvatarConfig, type AvatarConfig } from './data/avatar-options';
import { momAvatar, dadAvatar } from './data/avatars';

type Screen = 'home' | 'shop' | 'reflect' | 'social';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [stars, setStars] = useState(100);
  const [avatarConfig, setAvatarConfig] = useState<AvatarConfig>(defaultAvatarConfig);
  const [momAvatarConfig, setMomAvatarConfig] = useState<AvatarConfig>(momAvatar);
  const [dadAvatarConfig, setDadAvatarConfig] = useState<AvatarConfig>(dadAvatar);
  const [shopItems, setShopItems] = useState<ShopItem[]>(initialShopItems);

  const handleUpdateAvatar = (newAvatarConfig: AvatarConfig) => {
    setAvatarConfig(newAvatarConfig);
    
    toast.success('Avatar updated!', {
      description: 'Your avatar has been saved.',
      duration: 2000,
    });
  };

  const handleUpdateMomAvatar = (newAvatarConfig: AvatarConfig) => {
    setMomAvatarConfig(newAvatarConfig);
    
    toast.success('Mom\'s avatar updated!', {
      description: 'Mom\'s avatar has been saved.',
      duration: 2000,
    });
  };

  const handleUpdateDadAvatar = (newAvatarConfig: AvatarConfig) => {
    setDadAvatarConfig(newAvatarConfig);
    
    toast.success('Dad\'s avatar updated!', {
      description: 'Dad\'s avatar has been saved.',
      duration: 2000,
    });
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
            avatarConfig={avatarConfig}
            backgroundGradient={equippedBackground?.gradient}
            onOpenShop={() => setCurrentScreen('shop')}
          />
        )}
        {currentScreen === 'shop' && <ShopScreen stars={stars} items={shopItems} onPurchase={handlePurchaseItem} onToggleEquip={handleToggleEquip} />}
        {currentScreen === 'social' && (
          <SocialScreen 
            avatarConfig={avatarConfig}
            onUpdateAvatar={handleUpdateAvatar}
            momAvatarConfig={momAvatarConfig}
            onUpdateMomAvatar={handleUpdateMomAvatar}
            dadAvatarConfig={dadAvatarConfig}
            onUpdateDadAvatar={handleUpdateDadAvatar}
          />
        )}
        {currentScreen === 'reflect' && (
          <ReflectionScreen />
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

    </div>
  );
}
