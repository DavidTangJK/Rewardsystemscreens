import { useMemo } from 'react';
import { createAvatar } from '@dicebear/core';
import { avataaars } from '@dicebear/collection';
import type { AvatarConfig } from '../data/avatar-options';

interface AvatarDisplayProps {
  config: AvatarConfig;
  size?: 'small' | 'medium' | 'large';
}

export function AvatarDisplay({ config, size = 'medium' }: AvatarDisplayProps) {
  const sizeMap = {
    small: 64,
    medium: 96,
    large: 128,
  };
  
  const avatarSize = sizeMap[size];
  
  const avatarSvg = useMemo(() => {
    const avatar = createAvatar(avataaars, {
      size: avatarSize,
      seed: JSON.stringify(config), // Use config as seed for consistency
      // Map our config to DiceBear options
      ...config,
    });
    
    return avatar.toString();
  }, [config, avatarSize]);
  
  return (
    <div 
      style={{ width: `${avatarSize}px`, height: `${avatarSize}px` }}
      dangerouslySetInnerHTML={{ __html: avatarSvg }}
    />
  );
}
