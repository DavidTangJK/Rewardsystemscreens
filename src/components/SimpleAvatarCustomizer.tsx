import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { avatarOptions, type AvatarConfig } from '../data/avatar-options';
import { AvatarDisplay } from './AvatarDisplay';
import { Button } from './ui/button';
import { Shuffle } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';

// Helper to extract IDs from avatar options
const extractIds = (options: Array<{ id: string; [key: string]: any }>): string[] => 
  options.map(option => option.id);

const simpleOptions = {
  baseColor: extractIds(avatarOptions.skinColors),
  backgroundColor: extractIds(avatarOptions.backgroundColors),
  hair: extractIds(avatarOptions.hairStyles),
  hairColor: extractIds(avatarOptions.hairColors),
  eyes: extractIds(avatarOptions.eyeTypes),
  eyeShadowColor: extractIds(avatarOptions.eyeShadowColors),
  eyebrows: extractIds(avatarOptions.eyebrowTypes),
  mouth: extractIds(avatarOptions.mouthTypes),
  nose: extractIds(avatarOptions.noseTypes),
  ears: extractIds(avatarOptions.earTypes),
  facialHair: extractIds(avatarOptions.facialHairTypes),
  glasses: extractIds(avatarOptions.glassesTypes),
  glassesColor: extractIds(avatarOptions.glassesColors),
  earrings: extractIds(avatarOptions.earringTypes),
  earringColor: extractIds(avatarOptions.earringColors),
  shirt: extractIds(avatarOptions.shirtTypes),
  shirtColor: extractIds(avatarOptions.shirtColors),
};

interface SimpleAvatarCustomizerProps {
  avatarConfig: AvatarConfig;
  onAvatarChange: (config: AvatarConfig) => void;
}

export function SimpleAvatarCustomizer({ avatarConfig, onAvatarChange }: SimpleAvatarCustomizerProps) {
  const updateConfig = (key: keyof AvatarConfig, value: string[]) => {
    onAvatarChange({
      ...avatarConfig,
      [key]: value,
    });
  };

  const randomize = () => {
    const getRandomOption = (options: string[]) => {
      const randomIndex = Math.floor(Math.random() * options.length);
      return [options[randomIndex]];
    };

    const newConfig: AvatarConfig = {
      baseColor: getRandomOption(simpleOptions.baseColor),
      backgroundColor: getRandomOption(simpleOptions.backgroundColor),
      ears: getRandomOption(simpleOptions.ears),
      earringColor: getRandomOption(simpleOptions.earringColor),
      earrings: getRandomOption(simpleOptions.earrings),
      eyebrows: getRandomOption(simpleOptions.eyebrows),
      eyes: getRandomOption(simpleOptions.eyes),
      eyeShadowColor: getRandomOption(simpleOptions.eyeShadowColor),
      facialHair: getRandomOption(simpleOptions.facialHair),
      glasses: getRandomOption(simpleOptions.glasses),
      glassesColor: getRandomOption(simpleOptions.glassesColor),
      hairColor: getRandomOption(simpleOptions.hairColor),
      hair: getRandomOption(simpleOptions.hair),
      mouth: getRandomOption(simpleOptions.mouth),
      nose: getRandomOption(simpleOptions.nose),
      shirt: getRandomOption(simpleOptions.shirt),
      shirtColor: getRandomOption(simpleOptions.shirtColor),
    };

    onAvatarChange(newConfig);
  };

  const renderColorPicker = (
    label: string,
    key: keyof AvatarConfig,
    colors: string[]
  ) => (
    <div className="space-y-2">
      <label className="text-sm">{label}</label>
      <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
        {colors.map((color) => (
          <button
            key={color}
            onClick={() => updateConfig(key, [color])}
            className={`w-full aspect-square rounded-lg transition-all hover:scale-110 ${
              avatarConfig[key]?.[0] === color
                ? 'ring-2 ring-offset-2 ring-blue-500 scale-105'
                : ''
            }`}
            style={{ backgroundColor: `#${color}` }}
            title={color}
          />
        ))}
      </div>
    </div>
  );

  const renderOptionPicker = (
    label: string,
    key: keyof AvatarConfig,
    options: string[]
  ) => (
    <div className="space-y-2">
      <label className="text-sm">{label}</label>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => updateConfig(key, [option])}
            className={`px-3 py-2 rounded-lg border-2 text-sm transition-all hover:scale-105 ${
              avatarConfig[key]?.[0] === option
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            {option || 'None'}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Avatar Preview */}
      <div className="flex flex-col items-center space-y-4">
        <div className="w-32 h-32 md:w-40 md:h-40">
          <AvatarDisplay config={avatarConfig} size="lg" />
        </div>
        <Button onClick={randomize} variant="outline" size="sm">
          <Shuffle className="mr-2" size={16} />
          Randomize
        </Button>
      </div>

      {/* Customization Options */}
      <Tabs defaultValue="face" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="face">Face</TabsTrigger>
          <TabsTrigger value="hair">Hair</TabsTrigger>
          <TabsTrigger value="style">Style</TabsTrigger>
          <TabsTrigger value="colors">Colors</TabsTrigger>
        </TabsList>

        <ScrollArea className="h-[300px] md:h-[400px] mt-4">
          <div className="space-y-6 pr-4">
            <TabsContent value="face" className="space-y-4 mt-0">
              {renderOptionPicker('Eyes', 'eyes', simpleOptions.eyes)}
              {renderOptionPicker('Eyebrows', 'eyebrows', simpleOptions.eyebrows)}
              {renderOptionPicker('Nose', 'nose', simpleOptions.nose)}
              {renderOptionPicker('Mouth', 'mouth', simpleOptions.mouth)}
            </TabsContent>

            <TabsContent value="hair" className="space-y-4 mt-0">
              {renderOptionPicker('Hair Style', 'hair', simpleOptions.hair)}
              {renderColorPicker('Hair Color', 'hairColor', simpleOptions.hairColor)}
              {renderOptionPicker('Facial Hair', 'facialHair', simpleOptions.facialHair)}
            </TabsContent>

            <TabsContent value="style" className="space-y-4 mt-0">
              {renderOptionPicker('Glasses', 'glasses', simpleOptions.glasses)}
              {renderOptionPicker('Earrings', 'earrings', simpleOptions.earrings)}
              {renderOptionPicker('Shirt', 'shirt', simpleOptions.shirt)}
            </TabsContent>

            <TabsContent value="colors" className="space-y-4 mt-0">
              {renderColorPicker('Skin Tone', 'baseColor', simpleOptions.baseColor)}
              {renderColorPicker('Background', 'backgroundColor', simpleOptions.backgroundColor)}
              {renderColorPicker('Shirt Color', 'shirtColor', simpleOptions.shirtColor)}
              {renderColorPicker('Glasses Color', 'glassesColor', simpleOptions.glassesColor)}
            </TabsContent>
          </div>
        </ScrollArea>
      </Tabs>
    </div>
  );
}
