import Avatar from 'avataaars';
import type { AvatarConfig } from '../data/avatar-options';

interface AvatarDisplayProps {
  config: AvatarConfig;
  size?: 'small' | 'medium' | 'large';
}

export function AvatarDisplay({ config, size = 'medium' }: AvatarDisplayProps) {
  const sizeMap = {
    small: '64px',
    medium: '96px',
    large: '128px',
  };
  
  const avatarSize = sizeMap[size];
  
  return (
    <div style={{ width: avatarSize, height: avatarSize }}>
      <Avatar
        style={{ width: '100%', height: '100%' }}
        avatarStyle='Circle'
        topType={config.topType as any}
        accessoriesType={config.accessoriesType as any}
        hairColor={config.hairColor as any}
        facialHairType={config.facialHairType as any}
        facialHairColor={config.facialHairColor as any}
        clotheType={config.clotheType as any}
        clotheColor={config.clotheColor as any}
        eyeType={config.eyeType as any}
        eyebrowType={config.eyebrowType as any}
        mouthType={config.mouthType as any}
        skinColor={config.skinColor as any}
      />
    </div>
  );
}
