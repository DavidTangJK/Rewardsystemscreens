import { useState, useEffect } from "react";
import { Home, Users, Sparkles } from "lucide-react";
import { HomeScreen } from "./components/HomeScreen";
import { ShopScreen } from "./components/ShopScreen";
import { ReflectionScreen } from "./components/ReflectionScreen";
import { SocialScreen } from "./components/SocialScreen";
import { OnboardingFlow } from "./components/OnboardingFlow";
import { initialShopItems, type ShopItem } from "./data/shop-items";
import { toast, Toaster } from "sonner@2.0.3";
import confetti from "canvas-confetti";
import { defaultAvatarConfig, type AvatarConfig } from "./data/avatar-options";
import { momAvatar, dadAvatar } from "./data/avatars";

type Screen = "home" | "shop" | "reflect" | "social";

export default function App() {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useState("");
  const [currentScreen, setCurrentScreen] = useState<Screen>("home");
  const [stars, setStars] = useState(100);
  const [avatarConfig, setAvatarConfig] =
    useState<AvatarConfig>(defaultAvatarConfig);
  const [momAvatarConfig, setMomAvatarConfig] =
    useState<AvatarConfig>(momAvatar);
  const [dadAvatarConfig, setDadAvatarConfig] =
    useState<AvatarConfig>(dadAvatar);
  const [shopItems, setShopItems] = useState<ShopItem[]>(initialShopItems);
  const [pendingChildFromUrl, setPendingChildFromUrl] = useState<{
    id: string;
    name: string;
  } | null>(null);

  // Check URL query parameters and load child data
  useEffect(() => {
    const onboardingCompleted = localStorage.getItem("onboardingCompleted");
    const storedUserName = localStorage.getItem("userName");
    const storedAvatarConfig = localStorage.getItem("avatarConfig");
    const storedMomAvatarConfig = localStorage.getItem("momAvatarConfig");
    const storedDadAvatarConfig = localStorage.getItem("dadAvatarConfig");

    if (onboardingCompleted === "true") {
      setHasCompletedOnboarding(true);
      if (storedUserName) setUserName(storedUserName);
      if (storedAvatarConfig) setAvatarConfig(JSON.parse(storedAvatarConfig));
      if (storedMomAvatarConfig)
        setMomAvatarConfig(JSON.parse(storedMomAvatarConfig));
      if (storedDadAvatarConfig)
        setDadAvatarConfig(JSON.parse(storedDadAvatarConfig));
    }

    setIsLoading(false);
  }, []);

  const saveChildData = () => {
    const childDataKey = `child_${childId}`;
    const childData = {
      onboardingCompleted: hasCompletedOnboarding,
      userName,
      avatarConfig,
      momAvatarConfig,
      dadAvatarConfig,
      stars,
      shopItems,
    };
    localStorage.setItem(childDataKey, JSON.stringify(childData));
  };

  // Save child data whenever relevant state changes
  useEffect(() => {
    if (childId && hasCompletedOnboarding) {
      saveChildData();
    }
  }, [
    userName,
    avatarConfig,
    momAvatarConfig,
    dadAvatarConfig,
    stars,
    shopItems,
    hasCompletedOnboarding,
  ]);

  const handleOnboardingComplete = (data: {
    userName: string;
    avatarConfig: AvatarConfig;
    momAvatarConfig: AvatarConfig;
    dadAvatarConfig: AvatarConfig;
  }) => {
    setUserName(data.userName);
    setAvatarConfig(data.avatarConfig);
    setMomAvatarConfig(data.momAvatarConfig);
    setDadAvatarConfig(data.dadAvatarConfig);
    setHasCompletedOnboarding(true);

    // Save to localStorage
    localStorage.setItem("onboardingCompleted", "true");
    localStorage.setItem("userName", data.userName);
    localStorage.setItem("avatarConfig", JSON.stringify(data.avatarConfig));
    localStorage.setItem(
      "momAvatarConfig",
      JSON.stringify(data.momAvatarConfig)
    );
    localStorage.setItem(
      "dadAvatarConfig",
      JSON.stringify(data.dadAvatarConfig)
    );

    // Show welcome toast
    toast.success(`Welcome, ${data.userName}! 🎉`, {
      description: "Your virtual home is ready to explore!",
      duration: 4000,
    });

    // Trigger celebration confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#fbbf24", "#f59e0b", "#f97316", "#ec4899", "#a855f7"],
    });
  };

  const handleUpdateAvatar = (newAvatarConfig: AvatarConfig) => {
    setAvatarConfig(newAvatarConfig);
    localStorage.setItem("avatarConfig", JSON.stringify(newAvatarConfig));

    toast.success("Avatar updated!", {
      description: "Your avatar has been saved.",
      duration: 2000,
    });
  };

  const handleUpdateMomAvatar = (newAvatarConfig: AvatarConfig) => {
    setMomAvatarConfig(newAvatarConfig);
    localStorage.setItem("momAvatarConfig", JSON.stringify(newAvatarConfig));

    toast.success("Mom's avatar updated!", {
      description: "Mom's avatar has been saved.",
      duration: 2000,
    });
  };

  const handleUpdateDadAvatar = (newAvatarConfig: AvatarConfig) => {
    setDadAvatarConfig(newAvatarConfig);
    localStorage.setItem("dadAvatarConfig", JSON.stringify(newAvatarConfig));

    toast.success("Dad's avatar updated!", {
      description: "Dad's avatar has been saved.",
      duration: 2000,
    });
  };

  const handlePurchaseItem = (itemId: number) => {
    const item = shopItems.find((i) => i.id === itemId);
    if (item && !item.purchased && stars >= item.cost) {
      setShopItems((prevItems) => {
        // If purchasing a background, unequip all other backgrounds first
        if (item.category === "backgrounds") {
          return prevItems.map((i) =>
            i.id === itemId
              ? { ...i, purchased: true, equipped: true }
              : i.category === "backgrounds"
              ? { ...i, equipped: false }
              : i
          );
        }

        // For other items, just set purchased and equipped
        return prevItems.map((i) =>
          i.id === itemId ? { ...i, purchased: true, equipped: true } : i
        );
      });
      setStars((prev) => prev - item.cost);

      // Trigger confetti celebration
      const duration = 2000;
      const animationEnd = Date.now() + duration;
      const defaults = {
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        zIndex: 9999,
      };

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
          origin: {
            x: Math.random() * 0.4 + 0.3,
            y: Math.random() * 0.3 + 0.1,
          },
          colors: ["#fbbf24", "#f59e0b", "#f97316", "#ec4899", "#a855f7"],
        });
      }, 250);

      // Show success toast
      toast.success(`🎉 You got ${item.emoji} ${item.name}!`, {
        description:
          item.category === "backgrounds"
            ? "Your new background has been applied!"
            : "Check it out in your home!",
        duration: 3000,
      });
    }
  };

  const handleToggleEquip = (itemId: number) => {
    const item = shopItems.find((i) => i.id === itemId);
    if (!item || !item.purchased) return;

    setShopItems((prevItems) => {
      // If equipping a background, unequip all other backgrounds first
      if (item.category === "backgrounds" && !item.equipped) {
        return prevItems.map((i) =>
          i.id === itemId
            ? { ...i, equipped: true }
            : i.category === "backgrounds"
            ? { ...i, equipped: false }
            : i
        );
      }

      // For all other items (including pets), just toggle
      return prevItems.map((i) =>
        i.id === itemId ? { ...i, equipped: !i.equipped } : i
      );
    });
  };

  const equippedItems = shopItems.filter(
    (item) => item.equipped && item.category !== "backgrounds"
  );
  const equippedBackground = shopItems.find(
    (item) => item.equipped && item.category === "backgrounds"
  );

  const handleUpdateItemPosition = (
    itemId: number,
    gridX: number,
    gridY: number
  ) => {
    setShopItems((prevItems) =>
      prevItems.map((i) => (i.id === itemId ? { ...i, gridX, gridY } : i))
    );
  };

  const navItems = [
    { id: "home" as Screen, label: "Home", icon: Home },
    { id: "social" as Screen, label: "Friends", icon: Users },
    { id: "reflect" as Screen, label: "Reflect", icon: Sparkles },
  ];

  // Show loading state while checking onboarding status
  if (isLoading) {
    return (
      <div className="size-full flex items-center justify-center bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400">
        <div className="text-center space-y-4">
          <div className="text-6xl animate-bounce">🏠</div>
          <p className="text-white">Loading...</p>
        </div>
      </div>
    );
  }

  // Show onboarding if not completed
  if (!hasCompletedOnboarding) {
    return (
      <>
        <Toaster position="top-center" richColors />
        <OnboardingFlow
          onComplete={handleOnboardingComplete}
          initialUserName={userName}
        />
      </>
    );
  }

  return (
    <div className="size-full flex flex-col">
      <Toaster position="top-center" richColors />

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {currentScreen === "home" && (
          <HomeScreen
            stars={stars}
            items={equippedItems}
            onUpdatePosition={handleUpdateItemPosition}
            avatarConfig={avatarConfig}
            backgroundGradient={equippedBackground?.gradient}
            onOpenShop={() => setCurrentScreen("shop")}
          />
        )}
        {currentScreen === "shop" && (
          <ShopScreen
            stars={stars}
            items={shopItems}
            onPurchase={handlePurchaseItem}
            onToggleEquip={handleToggleEquip}
          />
        )}
        {currentScreen === "social" && (
          <SocialScreen
            avatarConfig={avatarConfig}
            onUpdateAvatar={handleUpdateAvatar}
            momAvatarConfig={momAvatarConfig}
            onUpdateMomAvatar={handleUpdateMomAvatar}
            dadAvatarConfig={dadAvatarConfig}
            onUpdateDadAvatar={handleUpdateDadAvatar}
          />
        )}
        {currentScreen === "reflect" && <ReflectionScreen />}
      </div>

      {/* Bottom Navigation */}
      <nav className="bg-white border-t border-border flex-shrink-0">
        <div className="grid grid-cols-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentScreen === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setCurrentScreen(item.id)}
                className={`flex flex-col items-center gap-1 py-3 transition-colors ${
                  isActive
                    ? "text-purple-600"
                    : "text-muted-foreground hover:text-foreground"
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
