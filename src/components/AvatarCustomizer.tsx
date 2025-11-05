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
      topType: avatarOptions.topTypes[Math.floor(Math.random() * avatarOptions.topTypes.length)].id,
      accessoriesType: avatarOptions.accessoriesTypes[Math.floor(Math.random() * avatarOptions.accessoriesTypes.length)].id,
      hairColor: avatarOptions.hairColors[Math.floor(Math.random() * avatarOptions.hairColors.length)].id,
      facialHairType: avatarOptions.facialHairTypes[Math.floor(Math.random() * avatarOptions.facialHairTypes.length)].id,
      facialHairColor: avatarOptions.hairColors[Math.floor(Math.random() * avatarOptions.hairColors.length)].id,
      clotheType: avatarOptions.clotheTypes[Math.floor(Math.random() * avatarOptions.clotheTypes.length)].id,
      clotheColor: avatarOptions.clotheColors[Math.floor(Math.random() * avatarOptions.clotheColors.length)].id,
      eyeType: avatarOptions.eyeTypes[Math.floor(Math.random() * avatarOptions.eyeTypes.length)].id,
      eyebrowType: avatarOptions.eyebrowTypes[Math.floor(Math.random() * avatarOptions.eyebrowTypes.length)].id,
      mouthType: avatarOptions.mouthTypes[Math.floor(Math.random() * avatarOptions.mouthTypes.length)].id,
      skinColor: avatarOptions.skinColors[Math.floor(Math.random() * avatarOptions.skinColors.length)].id,
    };
    setConfig(randomConfig);
  };
  
  const handleSave = () => {
    onSave(config);
    onClose();
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Customize {userName}'s Avatar</DialogTitle>
          <DialogDescription>
            Create your unique character! Choose different features to make it your own.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col md:flex-row gap-6 flex-1 overflow-hidden">
          {/* Preview */}
          <div className="flex flex-col items-center gap-4 md:w-1/3">
            <div className="bg-gradient-to-b from-purple-100 to-pink-100 p-8 rounded-2xl">
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
          
          {/* Customization Options */}
          <div className="flex-1 overflow-hidden md:w-2/3">
            <Tabs defaultValue="body" className="h-full flex flex-col">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="body">Body</TabsTrigger>
                <TabsTrigger value="hair">Hair</TabsTrigger>
                <TabsTrigger value="face">Face</TabsTrigger>
                <TabsTrigger value="style">Style</TabsTrigger>
              </TabsList>
              
              <ScrollArea className="flex-1 mt-4">
                {/* Body Tab */}
                <TabsContent value="body" className="mt-0">
                  <div className="space-y-4">
                    <div>
                      <h3 className="mb-3">Skin Tone</h3>
                      <div className="grid grid-cols-3 gap-3">
                        {avatarOptions.skinColors.map(tone => (
                          <button
                            key={tone.id}
                            onClick={() => setConfig({ ...config, skinColor: tone.id })}
                            className={`p-4 rounded-xl border-2 transition-all ${
                              config.skinColor === tone.id
                                ? 'border-purple-500 bg-purple-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <div 
                              className="w-12 h-12 rounded-full mx-auto mb-2"
                              style={{ backgroundColor: tone.color }}
                            />
                            <p className="text-xs text-center">{tone.name}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                {/* Hair Tab */}
                <TabsContent value="hair" className="mt-0">
                  <div className="space-y-4">
                    <div>
                      <h3 className="mb-3">Hair Style</h3>
                      <div className="grid grid-cols-4 gap-3">
                        {avatarOptions.topTypes.map(style => (
                          <button
                            key={style.id}
                            onClick={() => setConfig({ ...config, topType: style.id })}
                            className={`p-4 rounded-xl border-2 transition-all ${
                              config.topType === style.id
                                ? 'border-purple-500 bg-purple-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <div className="text-3xl mb-1">{style.emoji}</div>
                            <p className="text-xs text-center">{style.name}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="mb-3">Hair Color</h3>
                      <div className="grid grid-cols-4 gap-3">
                        {avatarOptions.hairColors.map(color => (
                          <button
                            key={color.id}
                            onClick={() => setConfig({ ...config, hairColor: color.id })}
                            className={`p-4 rounded-xl border-2 transition-all ${
                              config.hairColor === color.id
                                ? 'border-purple-500 bg-purple-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <div 
                              className="w-8 h-8 rounded-full mx-auto mb-2 border-2 border-gray-300"
                              style={{ backgroundColor: color.color }}
                            />
                            <p className="text-xs text-center">{color.name}</p>
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
                            onClick={() => setConfig({ ...config, facialHairType: facial.id })}
                            className={`p-4 rounded-xl border-2 transition-all ${
                              config.facialHairType === facial.id
                                ? 'border-purple-500 bg-purple-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <div className="text-3xl mb-1">{facial.emoji}</div>
                            <p className="text-xs text-center">{facial.name}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="mb-3">Facial Hair Color</h3>
                      <div className="grid grid-cols-4 gap-3">
                        {avatarOptions.hairColors.map(color => (
                          <button
                            key={color.id}
                            onClick={() => setConfig({ ...config, facialHairColor: color.id })}
                            className={`p-4 rounded-xl border-2 transition-all ${
                              config.facialHairColor === color.id
                                ? 'border-purple-500 bg-purple-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <div 
                              className="w-8 h-8 rounded-full mx-auto mb-2 border-2 border-gray-300"
                              style={{ backgroundColor: color.color }}
                            />
                            <p className="text-xs text-center">{color.name}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                {/* Face Tab */}
                <TabsContent value="face" className="mt-0">
                  <div className="space-y-4">
                    <div>
                      <h3 className="mb-3">Eyes</h3>
                      <div className="grid grid-cols-4 gap-3">
                        {avatarOptions.eyeTypes.map(eye => (
                          <button
                            key={eye.id}
                            onClick={() => setConfig({ ...config, eyeType: eye.id })}
                            className={`p-4 rounded-xl border-2 transition-all ${
                              config.eyeType === eye.id
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
                            onClick={() => setConfig({ ...config, eyebrowType: eyebrow.id })}
                            className={`p-4 rounded-xl border-2 transition-all ${
                              config.eyebrowType === eyebrow.id
                                ? 'border-purple-500 bg-purple-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <div className="text-3xl mb-1">{eyebrow.emoji}</div>
                            <p className="text-xs text-center">{eyebrow.name}</p>
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
                            onClick={() => setConfig({ ...config, mouthType: mouth.id })}
                            className={`p-4 rounded-xl border-2 transition-all ${
                              config.mouthType === mouth.id
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
                  </div>
                </TabsContent>
                
                {/* Style Tab */}
                <TabsContent value="style" className="mt-0">
                  <div className="space-y-4">
                    <div>
                      <h3 className="mb-3">Accessories</h3>
                      <div className="grid grid-cols-4 gap-3">
                        {avatarOptions.accessoriesTypes.map(acc => (
                          <button
                            key={acc.id}
                            onClick={() => setConfig({ ...config, accessoriesType: acc.id })}
                            className={`p-4 rounded-xl border-2 transition-all ${
                              config.accessoriesType === acc.id
                                ? 'border-purple-500 bg-purple-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <div className="text-3xl mb-1">{acc.emoji}</div>
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
                            onClick={() => setConfig({ ...config, clotheType: clothe.id })}
                            className={`p-4 rounded-xl border-2 transition-all ${
                              config.clotheType === clothe.id
                                ? 'border-purple-500 bg-purple-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <div className="text-3xl mb-1">{clothe.emoji}</div>
                            <p className="text-xs text-center">{clothe.name}</p>
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
                            onClick={() => setConfig({ ...config, clotheColor: color.id })}
                            className={`p-4 rounded-xl border-2 transition-all ${
                              config.clotheColor === color.id
                                ? 'border-purple-500 bg-purple-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <div 
                              className="w-8 h-8 rounded-full mx-auto mb-2 border-2 border-gray-300"
                              style={{ backgroundColor: color.color }}
                            />
                            <p className="text-xs text-center">{color.name}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </ScrollArea>
            </Tabs>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 border-t">
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
