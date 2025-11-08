import { useState, useEffect } from "react";
import { Star, UserCircle } from "lucide-react";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { Button } from "./ui/button";

const GRID_COLS = 13;
const GRID_ROWS = 10;
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { sampleFriends, Friend } from "../data/friends-data";
import { AvatarDisplay } from "./AvatarDisplay";
import { SimpleAvatarCustomizer } from "./SimpleAvatarCustomizer";
import type { AvatarConfig } from "../data/avatar-options";

interface SocialScreenProps {
  avatarConfig: AvatarConfig;
  onUpdateAvatar: (avatarConfig: AvatarConfig) => void;
  momAvatarConfig: AvatarConfig;
  onUpdateMomAvatar: (avatarConfig: AvatarConfig) => void;
  dadAvatarConfig: AvatarConfig;
  onUpdateDadAvatar: (avatarConfig: AvatarConfig) => void;
}

type EditingAvatar = "user" | "mom" | "dad" | null;

export function SocialScreen({
  avatarConfig,
  onUpdateAvatar,
  momAvatarConfig,
  onUpdateMomAvatar,
  dadAvatarConfig,
  onUpdateDadAvatar,
}: SocialScreenProps) {
  const [selectedFriend, setSelectedFriend] = useState<Friend>(
    sampleFriends[0]
  );
  const [editingAvatar, setEditingAvatar] = useState<EditingAvatar>(null);
  const [tempAvatarConfig, setTempAvatarConfig] =
    useState<AvatarConfig>(avatarConfig);

  // Update tempAvatarConfig when editingAvatar changes
  useEffect(() => {
    if (editingAvatar === "mom") {
      setTempAvatarConfig(momAvatarConfig);
    } else if (editingAvatar === "dad") {
      setTempAvatarConfig(dadAvatarConfig);
    } else if (editingAvatar === "user") {
      setTempAvatarConfig(avatarConfig);
    }
  }, [editingAvatar, avatarConfig, momAvatarConfig, dadAvatarConfig]);

  const handleFriendChange = (friendId: string) => {
    const friend = sampleFriends.find((f) => f.id === friendId);
    if (friend) {
      setSelectedFriend(friend);
    }
  };

  const handleOpenEditor = (type: EditingAvatar) => {
    setEditingAvatar(type);
  };

  const handleSaveAvatar = () => {
    if (editingAvatar === "mom") {
      onUpdateMomAvatar(tempAvatarConfig);
    } else if (editingAvatar === "dad") {
      onUpdateDadAvatar(tempAvatarConfig);
    } else {
      onUpdateAvatar(tempAvatarConfig);
    }
    setEditingAvatar(null);
  };

  const handleCancelEdit = () => {
    setEditingAvatar(null);
  };

  const getAvatarName = () => {
    if (editingAvatar === "mom") {
      return "Mom's Avatar";
    } else if (editingAvatar === "dad") {
      return "Dad's Avatar";
    } else {
      return "My Avatar";
    }
  };

  const getBadgeColor = (color: string) => {
    const colors: Record<string, string> = {
      blue: "bg-blue-500",
      pink: "bg-pink-500",
      green: "bg-green-500",
      purple: "bg-purple-500",
      orange: "bg-orange-500",
    };
    return colors[color] || "bg-purple-500";
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header - Compact */}
      <div className="bg-gradient-to-r from-cyan-500 to-blue-500 px-2 md:px-3 py-2 text-white flex-shrink-0">
        {/* Friend Selector */}
        <div className="flex items-center gap-1 md:gap-2 mb-2">
          <p className="text-blue-100 opacity-90 text-xs md:text-sm flex-shrink-0">
            Visit:
          </p>
          <Select value={selectedFriend.id} onValueChange={handleFriendChange}>
            <SelectTrigger
              className={`w-[140px] h-8 ${getBadgeColor(
                selectedFriend.color
              )} text-white border-2 border-white/40 hover:bg-white/10 text-xs md:text-sm`}
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {sampleFriends.map((friend) => (
                <SelectItem key={friend.id} value={friend.id}>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 flex items-center justify-center">
                      {friend.avatarConfig ? (
                        <AvatarDisplay
                          config={friend.avatarConfig}
                          size="small"
                        />
                      ) : (
                        <span className="text-lg">{friend.emoji}</span>
                      )}
                    </div>
                    <span>{friend.name}</span>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Star
                        className="fill-yellow-400 text-yellow-400"
                        size={12}
                      />
                      <span>{friend.stars}</span>
                    </div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Edit Avatar Buttons - Responsive Layout */}
        <div className="flex flex-col sm:flex-row items-stretch gap-1 md:gap-1.5">
          <Button
            onClick={() => handleOpenEditor("user")}
            className="bg-white/20 hover:bg-white/30 text-white border border-white/40 sm:flex-1 h-7 md:h-8 text-[10px] md:text-xs px-1 md:px-2"
            size="sm"
          >
            <div className="w-4 h-4 mr-1">
              <AvatarDisplay config={avatarConfig} size="small" />
            </div>
            <span className="truncate">Edit My Avatar</span>
          </Button>
          <Button
            onClick={() => handleOpenEditor("mom")}
            className="bg-white/20 hover:bg-white/30 text-white border border-white/40 sm:flex-1 h-7 md:h-8 text-[10px] md:text-xs px-1 md:px-2"
            size="sm"
          >
            <div className="w-4 h-4 mr-1">
              <AvatarDisplay config={momAvatarConfig} size="small" />
            </div>
            <span className="truncate">Edit Mom's Avatar</span>
          </Button>
          <Button
            onClick={() => handleOpenEditor("dad")}
            className="bg-white/20 hover:bg-white/30 text-white border border-white/40 sm:flex-1 h-7 md:h-8 text-[10px] md:text-xs px-1 md:px-2"
            size="sm"
          >
            <div className="w-4 h-4 mr-1">
              <AvatarDisplay config={dadAvatarConfig} size="small" />
            </div>
            <span className="truncate">Edit Dad's Avatar</span>
          </Button>
        </div>
      </div>

      {/* Friend's Home View - Takes up remaining space (at least 70% of screen) */}
      <div className="h-[80vh] bg-gradient-to-b from-sky-300 to-sky-200 overflow-hidden relative">
        <div className="h-full max-w-6xl mx-auto relative">
          {/* House Structure */}
          <div className="flex flex-col h-full">
            {/* Roof */}
            <div className="h-[15%] relative flex items-end justify-center">
              <div className="w-0 h-0 border-l-[200px] border-l-transparent border-r-[200px] border-r-transparent border-b-[80px] border-b-red-600"></div>
              <div className="absolute bottom-0 w-12 h-8 bg-gray-700 rounded-t-lg"></div>
            </div>

            {/* House Interior */}
            <div
              className={`flex-1 bg-gradient-to-b ${selectedFriend.background} mx-8 md:mx-16 relative border-8 border-amber-800 overflow-hidden`}
            >
              {/* Floor */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-white/30 pointer-events-none"></div>

              {/* Wood Floor Pattern */}
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/10 to-transparent pointer-events-none"></div>

              {/* Items - Grid Based */}
              {selectedFriend.items.map((item) => {
                const scaleFactor = Math.max(item.gridWidth, item.gridHeight);
                return (
                  <div
                    key={item.id}
                    className={`absolute z-10 flex items-center justify-center pointer-events-none ${
                      item.category === "pets" ? "animate-bounce-slow" : ""
                    }`}
                    style={{
                      left: `${(item.gridX / GRID_COLS) * 100}%`,
                      top: `${(item.gridY / GRID_ROWS) * 100}%`,
                      width: `${(item.gridWidth / GRID_COLS) * 100}%`,
                      height: `${(item.gridHeight / GRID_ROWS) * 100}%`,
                    }}
                  >
                    <div
                      className="select-none flex items-center justify-center w-full h-full"
                      style={{
                        fontSize: `${Math.min(scaleFactor * 2, 4)}rem`,
                      }}
                    >
                      {item.emoji}
                    </div>
                  </div>
                );
              })}

              {/* Friend Character */}
              <div
                className="absolute z-20 pointer-events-none"
                style={{
                  left: "50%",
                  top: "60%",
                }}
              >
                <div className="relative">
                  <div className="animate-bounce-slow">
                    {selectedFriend.avatarConfig ? (
                      <AvatarDisplay
                        config={selectedFriend.avatarConfig}
                        size="compact"
                      />
                    ) : (
                      <div className="text-4xl">{selectedFriend.emoji}</div>
                    )}
                  </div>
                  <div
                    className={`absolute -bottom-2 left-1/2 -translate-x-1/2 text-xs ${getBadgeColor(
                      selectedFriend.color
                    )} text-white px-2 py-0.5 rounded whitespace-nowrap`}
                  >
                    {selectedFriend.name}
                  </div>
                </div>
              </div>

              {/* View-Only Overlay Message */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 z-30">
                <Badge className="bg-blue-500 text-white hover:bg-blue-600 px-4 py-2">
                  👀 Viewing {selectedFriend.name}'s Home
                </Badge>
              </div>
            </div>

            {/* Ground/Grass */}
            <div className="h-[10%] bg-green-600 border-t-4 border-green-700"></div>
          </div>
        </div>

        {/* Stats Info */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
          <Card className="bg-white/90 backdrop-blur-sm p-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Star className="fill-yellow-400 text-yellow-400" size={20} />
                <span>{selectedFriend.stars} Stars</span>
              </div>
              <div className="w-px h-6 bg-gray-300"></div>
              <div>{selectedFriend.items.length} items</div>
            </div>
          </Card>
        </div>
      </div>

      {/* Avatar Customizer Dialog */}
      <Dialog
        open={editingAvatar !== null}
        onOpenChange={(open) => !open && handleCancelEdit()}
      >
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>Customize {getAvatarName()}</DialogTitle>
            <DialogDescription>
              Choose different features to personalize this avatar.
            </DialogDescription>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto px-1">
            <SimpleAvatarCustomizer
              avatarConfig={tempAvatarConfig}
              onAvatarChange={setTempAvatarConfig}
            />
          </div>

          <div className="flex gap-3 pt-4 border-t">
            <Button
              onClick={handleCancelEdit}
              variant="outline"
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveAvatar}
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              Save Avatar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
