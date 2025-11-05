import { useMemo } from 'react';
import { createAvatar } from '@dicebear/core';
import { micah } from '@dicebear/collection';
import type { AvatarConfig } from '../data/avatar-options';

interface AvatarDisplayProps {
  config: AvatarConfig;
  size?: 'small' | 'compact' | 'medium' | 'large';
}

export function AvatarDisplay({ config, size = 'medium' }: AvatarDisplayProps) {
  const sizeMap = {
    small: 24,
    compact: 48,
    medium: 96,
    large: 128,
  };
  
  const avatarSize = sizeMap[size];
  
  const avatarSvg = useMemo(() => {
    const avatar = createAvatar(micah, {
      size: avatarSize,
      seed: JSON.stringify(config),
      ...config,
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
