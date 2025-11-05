import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ScrollArea } from './ui/scroll-area';
import { avatarOptions, type AvatarConfig, defaultAvatarConfig } from '../data/avatar-options';
import { AvatarDisplay } from './AvatarDisplay';
import { Shuffle, Save } from 'lucide-react';

interface AvatarCustomizerProps {
  isOpen: boolean;
  onClose: () => void;
  initialConfig?: AvatarConfig;
  onSave: (config: AvatarConfig) => void;
  userName: string;
}

export function AvatarCustomizer({ 
  isOpen, 
  onClose, 
  initialConfig = defaultAvatarConfig,
  onSave,
  userName 
}: AvatarCustomizerProps) {
  const [config, setConfig] = useState<AvatarConfig>(initialConfig);
  
  const handleRandomize = () => {
    const randomConfig: AvatarConfig = {
      top: [avatarOptions.topTypes[Math.floor(Math.random() * avatarOptions.topTypes.length)].id],
      accessories: [avatarOptions.accessoriesTypes[Math.floor(Math.random() * avatarOptions.accessoriesTypes.length)].id],
      hairColor: [avatarOptions.hairColors[Math.floor(Math.random() * avatarOptions.hairColors.length)].id],
      facialHair: [avatarOptions.facialHairTypes[Math.floor(Math.random() * avatarOptions.facialHairTypes.length)].id],
      facialHairColor: [avatarOptions.hairColors[Math.floor(Math.random() * avatarOptions.hairColors.length)].id],
      clothes: [avatarOptions.clotheTypes[Math.floor(Math.random() * avatarOptions.clotheTypes.length)].id],
      clothesColor: [avatarOptions.clotheColors[Math.floor(Math.random() * avatarOptions.clotheColors.length)].id],
      eyes: [avatarOptions.eyeTypes[Math.floor(Math.random() * avatarOptions.eyeTypes.length)].id],
      eyebrows: [avatarOptions.eyebrowTypes[Math.floor(Math.random() * avatarOptions.eyebrowTypes.length)].id],
      mouth: [avatarOptions.mouthTypes[Math.floor(Math.random() * avatarOptions.mouthTypes.length)].id],
      skin: [avatarOptions.skinColors[Math.floor(Math.random() * avatarOptions.skinColors.length)].id],
    };
    setConfig(randomConfig);
  };
  
  const handleSave = () => {
    onSave(config);
    onClose();
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[95vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Customize {userName}'s Avatar</DialogTitle>
          <DialogDescription>
            Create your unique character! Choose different features to make it your own.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col lg:flex-row gap-6 flex-1 overflow-hidden">
          {/* Preview - Sticky on desktop */}
          <div className="flex flex-col items-center gap-4 lg:w-1/3 shrink-0">
            <div className="bg-gradient-to-b from-purple-100 to-pink-100 p-8 rounded-2xl sticky top-0">
              <AvatarDisplay config={config} size="large" />
            </div>
            <Button 
              onClick={handleRandomize} 
              variant="outline" 
              className="w-full"
            >
              <Shuffle className="mr-2" size={16} />
              Randomize
            </Button>
          </div>
          
          {/* Customization Options - Scrollable */}
          <div className="flex-1 overflow-hidden lg:w-2/3">
            <Tabs defaultValue="body" className="h-full flex flex-col">
              <TabsList className="grid w-full grid-cols-4 shrink-0">
                <TabsTrigger value="body">Body</TabsTrigger>
                <TabsTrigger value="hair">Hair</TabsTrigger>
                <TabsTrigger value="face">Face</TabsTrigger>
                <TabsTrigger value="style">Style</TabsTrigger>
              </TabsList>
              
              <ScrollArea className="flex-1 mt-4 pr-4">
                {/* Body Tab */}
                <TabsContent value="body" className="mt-0 space-y-6 pb-4">
                  <div>
                    <h3 className="mb-3">Skin Tone</h3>
                    <div className="grid grid-cols-3 gap-3">
                      {avatarOptions.skinColors.map(tone => (
                        <button
                          key={tone.id}
                          onClick={() => setConfig({ ...config, skin: [tone.id] })}
                          className={`p-4 rounded-xl border-2 transition-all ${
                            config.skin?.[0] === tone.id
                              ? 'border-purple-500 bg-purple-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div 
                            className="w-12 h-12 rounded-full mx-auto mb-2 border border-gray-200"
                            style={{ backgroundColor: `#${tone.id}` }}
                          />
                          <p className="text-xs text-center">{tone.name}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                
                {/* Hair Tab */}
                <TabsContent value="hair" className="mt-0 space-y-6 pb-4">
                  <div>
                    <h3 className="mb-3">Hair & Hat Style</h3>
                    <div className="grid grid-cols-4 gap-3 max-h-96 overflow-y-auto pr-2">
                      {avatarOptions.topTypes.map(style => (
                        <button
                          key={style.id}
                          onClick={() => setConfig({ ...config, top: [style.id] })}
                          className={`p-3 rounded-xl border-2 transition-all ${
                            config.top?.[0] === style.id
                              ? 'border-purple-500 bg-purple-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="text-2xl mb-1">{style.emoji}</div>
                          <p className="text-xs text-center leading-tight">{style.name}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="mb-3">Hair Color</h3>
                    <div className="grid grid-cols-5 gap-3">
                      {avatarOptions.hairColors.map(color => (
                        <button
                          key={color.id}
                          onClick={() => setConfig({ ...config, hairColor: [color.id] })}
                          className={`p-3 rounded-xl border-2 transition-all ${
                            config.hairColor?.[0] === color.id
                              ? 'border-purple-500 bg-purple-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div 
                            className="w-10 h-10 rounded-full mx-auto mb-2 border border-gray-200"
                            style={{ backgroundColor: `#${color.id}` }}
                          />
                          <p className="text-xs text-center leading-tight">{color.name}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="mb-3">Facial Hair</h3>
                    <div className="grid grid-cols-3 gap-3">
                      {avatarOptions.facialHairTypes.map(facial => (
                        <button
                          key={facial.id}
                          onClick={() => setConfig({ ...config, facialHair: [facial.id] })}
                          className={`p-3 rounded-xl border-2 transition-all ${
                            config.facialHair?.[0] === facial.id
                              ? 'border-purple-500 bg-purple-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="text-2xl mb-1">{facial.emoji}</div>
                          <p className="text-xs text-center">{facial.name}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="mb-3">Facial Hair Color</h3>
                    <div className="grid grid-cols-5 gap-3">
                      {avatarOptions.hairColors.map(color => (
                        <button
                          key={color.id}
                          onClick={() => setConfig({ ...config, facialHairColor: [color.id] })}
                          className={`p-3 rounded-xl border-2 transition-all ${
                            config.facialHairColor?.[0] === color.id
                              ? 'border-purple-500 bg-purple-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div 
                            className="w-10 h-10 rounded-full mx-auto mb-2 border border-gray-200"
                            style={{ backgroundColor: `#${color.id}` }}
                          />
                          <p className="text-xs text-center leading-tight">{color.name}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                
                {/* Face Tab */}
                <TabsContent value="face" className="mt-0 space-y-6 pb-4">
                  <div>
                    <h3 className="mb-3">Eyes</h3>
                    <div className="grid grid-cols-4 gap-3">
                      {avatarOptions.eyeTypes.map(eye => (
                        <button
                          key={eye.id}
                          onClick={() => setConfig({ ...config, eyes: [eye.id] })}
                          className={`p-3 rounded-xl border-2 transition-all ${
                            config.eyes?.[0] === eye.id
                              ? 'border-purple-500 bg-purple-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="text-2xl mb-1">{eye.emoji}</div>
                          <p className="text-xs text-center">{eye.name}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="mb-3">Eyebrows</h3>
                    <div className="grid grid-cols-4 gap-3">
                      {avatarOptions.eyebrowTypes.map(eyebrow => (
                        <button
                          key={eyebrow.id}
                          onClick={() => setConfig({ ...config, eyebrows: [eyebrow.id] })}
                          className={`p-3 rounded-xl border-2 transition-all ${
                            config.eyebrows?.[0] === eyebrow.id
                              ? 'border-purple-500 bg-purple-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="text-2xl mb-1">{eyebrow.emoji}</div>
                          <p className="text-xs text-center leading-tight">{eyebrow.name}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="mb-3">Mouth</h3>
                    <div className="grid grid-cols-4 gap-3">
                      {avatarOptions.mouthTypes.map(mouth => (
                        <button
                          key={mouth.id}
                          onClick={() => setConfig({ ...config, mouth: [mouth.id] })}
                          className={`p-3 rounded-xl border-2 transition-all ${
                            config.mouth?.[0] === mouth.id
                              ? 'border-purple-500 bg-purple-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="text-2xl mb-1">{mouth.emoji}</div>
                          <p className="text-xs text-center">{mouth.name}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                
                {/* Style Tab */}
                <TabsContent value="style" className="mt-0 space-y-6 pb-4">
                  <div>
                    <h3 className="mb-3">Accessories</h3>
                    <div className="grid grid-cols-4 gap-3">
                      {avatarOptions.accessoriesTypes.map(acc => (
                        <button
                          key={acc.id}
                          onClick={() => setConfig({ ...config, accessories: [acc.id] })}
                          className={`p-3 rounded-xl border-2 transition-all ${
                            config.accessories?.[0] === acc.id
                              ? 'border-purple-500 bg-purple-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="text-2xl mb-1">{acc.emoji}</div>
                          <p className="text-xs text-center">{acc.name}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="mb-3">Clothes</h3>
                    <div className="grid grid-cols-4 gap-3">
                      {avatarOptions.clotheTypes.map(clothe => (
                        <button
                          key={clothe.id}
                          onClick={() => setConfig({ ...config, clothes: [clothe.id] })}
                          className={`p-3 rounded-xl border-2 transition-all ${
                            config.clothes?.[0] === clothe.id
                              ? 'border-purple-500 bg-purple-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="text-2xl mb-1">{clothe.emoji}</div>
                          <p className="text-xs text-center leading-tight">{clothe.name}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="mb-3">Clothes Color</h3>
                    <div className="grid grid-cols-5 gap-3">
                      {avatarOptions.clotheColors.map(color => (
                        <button
                          key={color.id}
                          onClick={() => setConfig({ ...config, clothesColor: [color.id] })}
                          className={`p-3 rounded-xl border-2 transition-all ${
                            config.clothesColor?.[0] === color.id
                              ? 'border-purple-500 bg-purple-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div 
                            className="w-10 h-10 rounded-full mx-auto mb-2 border border-gray-200"
                            style={{ backgroundColor: `#${color.id}` }}
                          />
                          <p className="text-xs text-center leading-tight">{color.name}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </ScrollArea>
            </Tabs>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 border-t shrink-0">
          <Button onClick={onClose} variant="outline" className="flex-1">
            Cancel
          </Button>
          <Button onClick={handleSave} className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500">
            <Save className="mr-2" size={16} />
            Save Avatar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
