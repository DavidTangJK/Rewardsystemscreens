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
      baseColor: [avatarOptions.skinColors[Math.floor(Math.random() * avatarOptions.skinColors.length)].id],
      backgroundColor: [avatarOptions.backgroundColors[Math.floor(Math.random() * avatarOptions.backgroundColors.length)].id],
      earringColor: [avatarOptions.earringColors[Math.floor(Math.random() * avatarOptions.earringColors.length)].id],
      earrings: [avatarOptions.earringTypes[Math.floor(Math.random() * avatarOptions.earringTypes.length)].id],
      eyebrows: [avatarOptions.eyebrowTypes[Math.floor(Math.random() * avatarOptions.eyebrowTypes.length)].id],
      eyes: [avatarOptions.eyeTypes[Math.floor(Math.random() * avatarOptions.eyeTypes.length)].id],
      glasses: [avatarOptions.glassesTypes[Math.floor(Math.random() * avatarOptions.glassesTypes.length)].id],
      glassesColor: [avatarOptions.glassesColors[Math.floor(Math.random() * avatarOptions.glassesColors.length)].id],
      hairColor: [avatarOptions.hairColors[Math.floor(Math.random() * avatarOptions.hairColors.length)].id],
      hair: [avatarOptions.hairStyles[Math.floor(Math.random() * avatarOptions.hairStyles.length)].id],
      mouth: [avatarOptions.mouthTypes[Math.floor(Math.random() * avatarOptions.mouthTypes.length)].id],
      nose: [avatarOptions.noseTypes[Math.floor(Math.random() * avatarOptions.noseTypes.length)].id],
      shirt: [avatarOptions.shirtTypes[Math.floor(Math.random() * avatarOptions.shirtTypes.length)].id],
      shirtColor: [avatarOptions.shirtColors[Math.floor(Math.random() * avatarOptions.shirtColors.length)].id],
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
            <Tabs defaultValue="face" className="h-full flex flex-col">
              <TabsList className="grid w-full grid-cols-4 shrink-0">
                <TabsTrigger value="face">Face</TabsTrigger>
                <TabsTrigger value="hair">Hair</TabsTrigger>
                <TabsTrigger value="style">Style</TabsTrigger>
                <TabsTrigger value="colors">Colors</TabsTrigger>
              </TabsList>
              
              <ScrollArea className="flex-1 mt-4 pr-4">
                {/* Face Tab */}
                <TabsContent value="face" className="mt-0 space-y-6 pb-4">
                  <div>
                    <h3 className="mb-3">Eyes</h3>
                    <div className="grid grid-cols-4 gap-3">
                      {avatarOptions.eyeTypes.map(eye => (
                        <button
                          key={eye.id}
                          onClick={() => setConfig({ ...config, eyes: [eye.id] })}
                          className={`p-4 rounded-xl border-2 transition-all ${
                            config.eyes?.[0] === eye.id
                              ? 'border-purple-500 bg-purple-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="text-3xl mb-1">{eye.emoji}</div>
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
                          className={`p-4 rounded-xl border-2 transition-all ${
                            config.eyebrows?.[0] === eyebrow.id
                              ? 'border-purple-500 bg-purple-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="text-3xl mb-1">{eyebrow.emoji}</div>
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
                          className={`p-4 rounded-xl border-2 transition-all ${
                            config.mouth?.[0] === mouth.id
                              ? 'border-purple-500 bg-purple-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="text-3xl mb-1">{mouth.emoji}</div>
                          <p className="text-xs text-center">{mouth.name}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="mb-3">Nose</h3>
                    <div className="grid grid-cols-3 gap-3">
                      {avatarOptions.noseTypes.map(nose => (
                        <button
                          key={nose.id}
                          onClick={() => setConfig({ ...config, nose: [nose.id] })}
                          className={`p-4 rounded-xl border-2 transition-all ${
                            config.nose?.[0] === nose.id
                              ? 'border-purple-500 bg-purple-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="text-3xl mb-1">{nose.emoji}</div>
                          <p className="text-xs text-center">{nose.name}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                
                {/* Hair Tab */}
                <TabsContent value="hair" className="mt-0 space-y-6 pb-4">
                  <div>
                    <h3 className="mb-3">Hair Style</h3>
                    <div className="grid grid-cols-4 gap-3">
                      {avatarOptions.hairStyles.map(style => (
                        <button
                          key={style.id}
                          onClick={() => setConfig({ ...config, hair: [style.id] })}
                          className={`p-4 rounded-xl border-2 transition-all ${
                            config.hair?.[0] === style.id
                              ? 'border-purple-500 bg-purple-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="text-3xl mb-1">{style.emoji}</div>
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
                          className={`p-4 rounded-xl border-2 transition-all ${
                            config.hairColor?.[0] === color.id
                              ? 'border-purple-500 bg-purple-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div 
                            className="w-10 h-10 rounded-full mx-auto mb-2 border border-gray-300"
                            style={{ backgroundColor: color.color }}
                          />
                          <p className="text-xs text-center leading-tight">{color.name}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                
                {/* Style Tab */}
                <TabsContent value="style" className="mt-0 space-y-6 pb-4">
                  <div>
                    <h3 className="mb-3">Glasses</h3>
                    <div className="grid grid-cols-3 gap-3">
                      {avatarOptions.glassesTypes.map(glasses => (
                        <button
                          key={glasses.id}
                          onClick={() => setConfig({ ...config, glasses: [glasses.id] })}
                          className={`p-4 rounded-xl border-2 transition-all ${
                            config.glasses?.[0] === glasses.id
                              ? 'border-purple-500 bg-purple-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="text-3xl mb-1">{glasses.emoji}</div>
                          <p className="text-xs text-center">{glasses.name}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="mb-3">Glasses Color</h3>
                    <div className="grid grid-cols-5 gap-3">
                      {avatarOptions.glassesColors.map(color => (
                        <button
                          key={color.id}
                          onClick={() => setConfig({ ...config, glassesColor: [color.id] })}
                          className={`p-4 rounded-xl border-2 transition-all ${
                            config.glassesColor?.[0] === color.id
                              ? 'border-purple-500 bg-purple-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div 
                            className="w-10 h-10 rounded-full mx-auto mb-2 border border-gray-300"
                            style={{ backgroundColor: color.color }}
                          />
                          <p className="text-xs text-center">{color.name}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="mb-3">Earrings</h3>
                    <div className="grid grid-cols-3 gap-3">
                      {avatarOptions.earringTypes.map(earring => (
                        <button
                          key={earring.id}
                          onClick={() => setConfig({ ...config, earrings: [earring.id] })}
                          className={`p-4 rounded-xl border-2 transition-all ${
                            config.earrings?.[0] === earring.id
                              ? 'border-purple-500 bg-purple-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="text-3xl mb-1">{earring.emoji}</div>
                          <p className="text-xs text-center">{earring.name}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="mb-3">Earring Color</h3>
                    <div className="grid grid-cols-5 gap-3">
                      {avatarOptions.earringColors.map(color => (
                        <button
                          key={color.id}
                          onClick={() => setConfig({ ...config, earringColor: [color.id] })}
                          className={`p-4 rounded-xl border-2 transition-all ${
                            config.earringColor?.[0] === color.id
                              ? 'border-purple-500 bg-purple-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div 
                            className="w-10 h-10 rounded-full mx-auto mb-2 border border-gray-300"
                            style={{ backgroundColor: color.color }}
                          />
                          <p className="text-xs text-center">{color.name}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="mb-3">Shirt</h3>
                    <div className="grid grid-cols-3 gap-3">
                      {avatarOptions.shirtTypes.map(shirt => (
                        <button
                          key={shirt.id}
                          onClick={() => setConfig({ ...config, shirt: [shirt.id] })}
                          className={`p-4 rounded-xl border-2 transition-all ${
                            config.shirt?.[0] === shirt.id
                              ? 'border-purple-500 bg-purple-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="text-3xl mb-1">{shirt.emoji}</div>
                          <p className="text-xs text-center">{shirt.name}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="mb-3">Shirt Color</h3>
                    <div className="grid grid-cols-5 gap-3">
                      {avatarOptions.shirtColors.map(color => (
                        <button
                          key={color.id}
                          onClick={() => setConfig({ ...config, shirtColor: [color.id] })}
                          className={`p-4 rounded-xl border-2 transition-all ${
                            config.shirtColor?.[0] === color.id
                              ? 'border-purple-500 bg-purple-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div 
                            className="w-10 h-10 rounded-full mx-auto mb-2 border border-gray-300"
                            style={{ backgroundColor: color.color }}
                          />
                          <p className="text-xs text-center leading-tight">{color.name}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                
                {/* Colors Tab */}
                <TabsContent value="colors" className="mt-0 space-y-6 pb-4">
                  <div>
                    <h3 className="mb-3">Skin Tone</h3>
                    <div className="grid grid-cols-3 gap-3">
                      {avatarOptions.skinColors.map(tone => (
                        <button
                          key={tone.id}
                          onClick={() => setConfig({ ...config, baseColor: [tone.id] })}
                          className={`p-4 rounded-xl border-2 transition-all ${
                            config.baseColor?.[0] === tone.id
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
                  
                  <div>
                    <h3 className="mb-3">Background Color</h3>
                    <div className="grid grid-cols-4 gap-3">
                      {avatarOptions.backgroundColors.map(bg => (
                        <button
                          key={bg.id}
                          onClick={() => setConfig({ ...config, backgroundColor: [bg.id] })}
                          className={`p-4 rounded-xl border-2 transition-all ${
                            config.backgroundColor?.[0] === bg.id
                              ? 'border-purple-500 bg-purple-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div 
                            className="w-12 h-12 rounded-xl mx-auto mb-2 border border-gray-200"
                            style={{ backgroundColor: bg.color }}
                          />
                          <p className="text-xs text-center">{bg.name}</p>
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
