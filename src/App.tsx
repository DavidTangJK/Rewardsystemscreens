import { useState, useEffect } from "react";
import { Home, Users, Sparkles, ListTodo } from "lucide-react";
import { HomeScreen } from "./components/HomeScreen";
import { ShopScreen } from "./components/ShopScreen";
import { ReflectionScreen } from "./components/ReflectionScreen";
import { SocialScreen } from "./components/SocialScreen";
import { OnboardingFlow } from "./components/OnboardingFlow";
import { initialShopItems, type ShopItem } from "./data/shop-items";
import { toast, Toaster } from "sonner";
import confetti from "canvas-confetti";
import { defaultAvatarConfig, type AvatarConfig } from "./data/avatar-options";
import { momAvatar, dadAvatar } from "./data/avatars";

type Screen = "home" | "shop" | "reflect" | "social";
const GRID_COLS = 13;
const GRID_ROWS = 10;
interface TempShopItem {
  id: number;
  name: string;
  category: string;
  gridX?: number;
  gridY?: number;
  gridWidth: number;
  gridHeight: number;
  equipped: boolean;
}
const isValidPosition = (
  newItem: TempShopItem,
  existingItems: TempShopItem[],
  gridX: number,
  gridY: number
) => {
  // Check bounds
  if (
    gridX < 0 ||
    gridY < 0 ||
    gridX + newItem.gridWidth > GRID_COLS ||
    gridY + newItem.gridHeight > GRID_ROWS
  ) {
    return false;
  }

  // Check for overlaps with other items (ALL items now prevent overlap)
  for (const item of existingItems) {
    // Skip check for the item itself
    if (item.id === newItem.id) continue;

    if (item.gridX === undefined || item.gridY === undefined) continue;

    const itemRight = (item.gridX || 0) + item.gridWidth;
    const itemBottom = (item.gridY || 0) + item.gridHeight;
    const newRight = gridX + newItem.gridWidth;
    const newBottom = gridY + newItem.gridHeight;

    // Check if rectangles overlap (collision detected)
    if (
      gridX < itemRight &&
      newRight > (item.gridX || 0) &&
      gridY < itemBottom &&
      newBottom > (item.gridY || 0)
    ) {
      return false;
    }
  }

  return true;
};
const findRandomValidPosition = (
  newItem: TempShopItem,
  existingItems: TempShopItem[]
) => {
  const MAX_ATTEMPTS = 50;

  for (let i = 0; i < MAX_ATTEMPTS; i++) {
    const maxGridX = Math.max(0, GRID_COLS - newItem.gridWidth);
    const maxGridY = Math.max(0, GRID_ROWS - newItem.gridHeight);

    const candidateX = Math.floor(Math.random() * (maxGridX + 1));
    const candidateY = Math.floor(Math.random() * (maxGridY + 1));

    if (isValidPosition(newItem, existingItems, candidateX, candidateY)) {
      return { gridX: candidateX, gridY: candidateY };
    }
  }

  return { gridX: 0, gridY: 0 };
};

export default function App() {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const [childId, setChildId] = useState<string>("");
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
  const [shareToken, setShareToken] = useState<string | null>(null);

  // Check URL query parameters and load child data
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlChildId = params.get("child_id");
    const urlChildName = params.get("child_name");
    const urlShareToken = params.get("share_token");
    if (urlShareToken) {
      setShareToken(urlShareToken);
    }

    //localStorage.clear(); // Clear localStorage for testing purposes

    // Determine which child to load
    let loadChildId =
      urlChildId || localStorage.getItem("currentChildId") || "default";

    // If URL has child_id, set it as the current child
    if (urlChildId) {
      localStorage.setItem("currentChildId", urlChildId);
      setChildId(urlChildId);
    } else {
      setChildId(loadChildId);
    }

    // Try to load child data from localStorage
    const childDataKey = `child_${loadChildId}`;
    const storedChildData = localStorage.getItem(childDataKey);

    if (storedChildData) {
      // Child exists, load their data
      try {
        const childData = JSON.parse(storedChildData);
        let currentShopItems: TempShopItem[] = (childData.shopItems ||
          initialShopItems) as TempShopItem[];

        const cleanedShopItems = currentShopItems.map((item) => {
          if (
            item.equipped &&
            (item.gridX === undefined || item.gridY === undefined)
          ) {
            console.warn(
              `Equipped item "${item.name}" is missing coordinates. Finding random spot.`
            );

            // Find a random valid position based on the current items on screen
            const { gridX, gridY } = findRandomValidPosition(
              item,
              currentShopItems
            );

            return {
              ...item,
              gridX: gridX, // Assigned random valid X
              gridY: gridY, // Assigned random valid Y
            } as ShopItem;
          }
          return item as ShopItem;
        });
        setHasCompletedOnboarding(childData.onboardingCompleted || false);
        setUserName(childData.userName || "");
        setAvatarConfig(childData.avatarConfig || defaultAvatarConfig);
        setMomAvatarConfig(childData.momAvatarConfig || momAvatar);
        setDadAvatarConfig(childData.dadAvatarConfig || dadAvatar);
        setStars(childData.stars || 100);
        setShopItems(cleanedShopItems);
      } catch (error) {
        console.error("Error loading child data:", error);
      }
    } else if (urlChildId && urlChildName) {
      // New child from URL parameters - start onboarding with prefilled name
      setUserName(urlChildName);
      setHasCompletedOnboarding(false);
    } else {
      // Check legacy localStorage for backwards compatibility
      const onboardingCompleted = localStorage.getItem("onboardingCompleted");
      const storedUserName = localStorage.getItem("userName");
      const storedAvatarConfig = localStorage.getItem("avatarConfig");
      const storedMomAvatarConfig = localStorage.getItem("momAvatarConfig");
      const storedDadAvatarConfig = localStorage.getItem("dadAvatarConfig");

      if (onboardingCompleted === "true") {
        // Migrate legacy data to new child-based system
        const legacyData = {
          onboardingCompleted: true,
          userName: storedUserName || "",
          avatarConfig: storedAvatarConfig
            ? JSON.parse(storedAvatarConfig)
            : defaultAvatarConfig,
          momAvatarConfig: storedMomAvatarConfig
            ? JSON.parse(storedMomAvatarConfig)
            : momAvatar,
          dadAvatarConfig: storedDadAvatarConfig
            ? JSON.parse(storedDadAvatarConfig)
            : dadAvatar,
          stars: 100,
          shopItems: initialShopItems,
        };

        localStorage.setItem(
          `child_${loadChildId}`,
          JSON.stringify(legacyData)
        );

        setHasCompletedOnboarding(true);
        setUserName(legacyData.userName);
        setAvatarConfig(legacyData.avatarConfig);
        setMomAvatarConfig(legacyData.momAvatarConfig);
        setDadAvatarConfig(legacyData.dadAvatarConfig);

        // Clean up legacy localStorage keys
        localStorage.removeItem("onboardingCompleted");
        localStorage.removeItem("userName");
        localStorage.removeItem("avatarConfig");
        localStorage.removeItem("momAvatarConfig");
        localStorage.removeItem("dadAvatarConfig");
      }
    }

    setIsLoading(false);
  }, []);

  // Save child data whenever relevant state changes
  useEffect(() => {
    if (childId && hasCompletedOnboarding) {
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
    }
  }, [
    childId,
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

    // Save to child-specific localStorage
    const childDataKey = `child_${childId}`;
    const initialItemsWithPositions = (initialShopItems as TempShopItem[]).map(
      (item) => {
        // Check if item is initially equipped AND missing coordinates
        if (
          item.equipped &&
          (item.gridX === undefined || item.gridY === undefined)
        ) {
          // Find a random valid position based on the whole initial list
          const { gridX, gridY } = findRandomValidPosition(
            item,
            initialShopItems as TempShopItem[]
          );
          return {
            ...item,
            gridX: gridX,
            gridY: gridY,
          } as ShopItem;
        }
        return item as ShopItem;
      }
    );
    setShopItems(initialItemsWithPositions);
    const childData = {
      onboardingCompleted: true,
      userName: data.userName,
      avatarConfig: data.avatarConfig,
      momAvatarConfig: data.momAvatarConfig,
      dadAvatarConfig: data.dadAvatarConfig,
      stars: 100,
      shopItems: initialShopItems,
    };
    localStorage.setItem(childDataKey, JSON.stringify(childData));

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

    toast.success("Avatar updated!", {
      description: "Your avatar has been saved.",
      duration: 2000,
    });
  };

  const handleUpdateMomAvatar = (newAvatarConfig: AvatarConfig) => {
    setMomAvatarConfig(newAvatarConfig);

    toast.success("Mom's avatar updated!", {
      description: "Mom's avatar has been saved.",
      duration: 2000,
    });
  };

  const handleUpdateDadAvatar = (newAvatarConfig: AvatarConfig) => {
    setDadAvatarConfig(newAvatarConfig);

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
      const isEquipping = !item.equipped;
      const isBackground = item.category === "backgrounds";
      const DEFAULT_BG_ID = 19; // Assuming Cozy Default is ID 19 from shop-items.ts

      if (isBackground) {
        // CASE 1: Item is currently equipped (User wants to UNEQUIP/deactivate)
        if (item.equipped) {
          // Prevent UNEQUIPPING the Cozy Default background
          if (item.id === DEFAULT_BG_ID) {
            return prevItems;
          }

          // If any *custom* background is unequipped, force default to be equipped instead.
          return prevItems.map((i) => {
            if (i.id === itemId) {
              return { ...i, equipped: false } as ShopItem; // Unequip the clicked custom one
            }
            if (i.id === DEFAULT_BG_ID) {
              return { ...i, equipped: true } as ShopItem; // Force default back ON
            }
            return i;
          });
        }

        // CASE 2: Item is NOT equipped (User wants to EQUIP/ACTIVATE)
        // This is the path for both first-time equip and switching from another custom BG.
        return prevItems.map((i) => {
          if (i.category === "backgrounds") {
            // Equip only the item they clicked
            if (i.id === itemId) {
              return { ...i, equipped: true } as ShopItem;
            }
            // Unequip all other backgrounds (including the default)
            return { ...i, equipped: false } as ShopItem;
          }
          return i;
        });
      }

      // Logic for all other non-background items (remains unchanged)
      return prevItems.map((i) => {
        if (i.id === itemId) {
          if (isEquipping && (i.gridX === undefined || i.gridY === undefined)) {
            const { gridX, gridY } = findRandomValidPosition(
              i as TempShopItem,
              prevItems as TempShopItem[]
            );

            return {
              ...i,
              equipped: !i.equipped,
              gridX: gridX,
              gridY: gridY,
            } as ShopItem;
          }

          return {
            ...i,
            equipped: !i.equipped,
          } as ShopItem;
        }
        return i;
      });
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
  const EXTERNAL_REDIRECT_BASE = "https://task.csun.site/kids/"; // Base URL
  const finalRedirectUrl = shareToken
    ? `${EXTERNAL_REDIRECT_BASE}${shareToken}`
    : EXTERNAL_REDIRECT_BASE;
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
            momAvatarConfig={momAvatarConfig}
            dadAvatarConfig={dadAvatarConfig}
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
        <div className="grid grid-cols-4">
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
          <a
            href={finalRedirectUrl} // <-- CHANGE THIS TO YOUR DESIRED URL
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-1 py-3 transition-colors text-muted-foreground hover:text-foreground"
          >
            <ListTodo size={24} className="text-pink-600" />
            <span className="text-xs">Tasks</span>
          </a>
        </div>
      </nav>
    </div>
  );
}
