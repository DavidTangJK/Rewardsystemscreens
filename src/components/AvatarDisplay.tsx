import { useMemo } from "react";
import { createAvatar } from "@dicebear/core";
import { micah } from "@dicebear/collection";
import type { AvatarConfig } from "../data/avatar-options";

interface AvatarDisplayProps {
  config: AvatarConfig;
  size?: "small" | "compact" | "medium" | "between" | "large";
}

export function AvatarDisplay({
  config,
  size = "between",
}: AvatarDisplayProps) {
  const sizeMap = {
    small: 24,
    compact: 48,
    between: 64,
    medium: 96,
    large: 128,
  };

  const avatarSize = sizeMap[size];

  const avatarSvg = useMemo(() => {
    // FIX: Stringify the entire config object to create a unique, stable seed
    // This forces the DiceBear library to recognize the config has changed,
    // even for subtle updates like changing facial hair.
    const uniqueSeed = JSON.stringify(config);

    const avatar = createAvatar(micah, {
      size: avatarSize,
      seed: uniqueSeed, // Use the unique string seed
      ...config, // Pass the configuration options
    });

    return avatar.toString();
  }, [config, avatarSize]);

  return (
    <div
      style={{ width: `${avatarSize}px`, height: `${avatarSize}px` }}
      className="flex items-center justify-center"
      dangerouslySetInnerHTML={{ __html: avatarSvg }}
    />
  );
}
