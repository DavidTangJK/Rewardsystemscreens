import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  avatarOptions,
  type AvatarConfig,
  defaultAvatarConfig,
} from "../data/avatar-options";
import { AvatarDisplay } from "./AvatarDisplay";
import { Shuffle, Save } from "lucide-react";

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
  initialConfig,
  onSave,
  userName,
}: AvatarCustomizerProps) {
  // Initialize config with all properties to avoid undefined issues
  const [config, setConfig] = useState<AvatarConfig>(() => ({
    ...defaultAvatarConfig,
    ...initialConfig,
  }));

  // Update config when initialConfig changes
  useEffect(() => {
    if (initialConfig) {
      setConfig({
        ...defaultAvatarConfig,
        ...initialConfig,
      });
    }
  }, [initialConfig]);

  // Base config for previews - neutral look
  const previewBaseConfig: AvatarConfig = {
    baseColor: ["edb98a"],
    ears: ["attached"],
    earringColor: ["ffd700"],
    earrings: [""],
    eyebrows: ["up"],
    eyes: ["eyeShadow"],
    eyeShadowColor: [""],
    facialHair: [""],
    glasses: [""],
    glassesColor: ["000000"],
    hairColor: ["724133"],
    hair: ["full"],
    mouth: ["smile"],
    nose: ["curve"],
    shirt: ["crew"],
    shirtColor: ["5199e4"],
  };

  const handleRandomize = () => {
    const randomConfig: AvatarConfig = {
      baseColor: [
        avatarOptions.skinColors[
          Math.floor(Math.random() * avatarOptions.skinColors.length)
        ].id,
      ],
      ears: [
        avatarOptions.earTypes[
          Math.floor(Math.random() * avatarOptions.earTypes.length)
        ].id,
      ],
      earringColor: [
        avatarOptions.earringColors[
          Math.floor(Math.random() * avatarOptions.earringColors.length)
        ].id,
      ],
      earrings: [
        avatarOptions.earringTypes[
          Math.floor(Math.random() * avatarOptions.earringTypes.length)
        ].id,
      ],
      eyebrows: [
        avatarOptions.eyebrowTypes[
          Math.floor(Math.random() * avatarOptions.eyebrowTypes.length)
        ].id,
      ],
      eyes: [
        avatarOptions.eyeTypes[
          Math.floor(Math.random() * avatarOptions.eyeTypes.length)
        ].id,
      ],
      eyeShadowColor: [
        avatarOptions.eyeShadowColors[
          Math.floor(Math.random() * avatarOptions.eyeShadowColors.length)
        ].id,
      ],
      facialHair: [
        avatarOptions.facialHairTypes[
          Math.floor(Math.random() * avatarOptions.facialHairTypes.length)
        ].id,
      ],
      glasses: [
        avatarOptions.glassesTypes[
          Math.floor(Math.random() * avatarOptions.glassesTypes.length)
        ].id,
      ],
      glassesColor: [
        avatarOptions.glassesColors[
          Math.floor(Math.random() * avatarOptions.glassesColors.length)
        ].id,
      ],
      hairColor: [
        avatarOptions.hairColors[
          Math.floor(Math.random() * avatarOptions.hairColors.length)
        ].id,
      ],
      hair: [
        avatarOptions.hairStyles[
          Math.floor(Math.random() * avatarOptions.hairStyles.length)
        ].id,
      ],
      mouth: [
        avatarOptions.mouthTypes[
          Math.floor(Math.random() * avatarOptions.mouthTypes.length)
        ].id,
      ],
      nose: [
        avatarOptions.noseTypes[
          Math.floor(Math.random() * avatarOptions.noseTypes.length)
        ].id,
      ],
      shirt: [
        avatarOptions.shirtTypes[
          Math.floor(Math.random() * avatarOptions.shirtTypes.length)
        ].id,
      ],
      shirtColor: [
        avatarOptions.shirtColors[
          Math.floor(Math.random() * avatarOptions.shirtColors.length)
        ].id,
      ],
    };
    setConfig(randomConfig);
  };

  const handleSave = () => {
    onSave(config);
    onClose();
  };

  const updateConfig = (key: keyof AvatarConfig, value: string[]) => {
    setConfig((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] w-full lg:max-w-7xl h-[95vh] flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b shrink-0">
          <DialogTitle className="text-2xl">
            Customize {userName}'s Avatar
          </DialogTitle>
          <DialogDescription>
            Create your unique character! Choose different features to make it
            your own.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0 p-6">
          {/* Preview - Larger and sticky */}
          <div className="flex flex-col items-center gap-4 lg:w-1/4 shrink-0">
            <div className="bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 p-12 rounded-3xl shadow-lg border-4 border-white">
              <div className="scale-150 origin-center">
                <AvatarDisplay config={config} size="large" />
              </div>
            </div>
            <Button
              onClick={handleRandomize}
              variant="outline"
              className="w-full"
              size="lg"
            >
              <Shuffle className="mr-2" size={20} />
              Randomize
            </Button>
          </div>

          {/* Customization Options - Scrollable */}
          <div className="flex-1 min-h-0 lg:w-3/4 flex flex-col">
            <Tabs defaultValue="face" className="flex-1 flex flex-col min-h-0">
              <TabsList className="grid w-full grid-cols-4 shrink-0 h-12 text-base mb-4">
                <TabsTrigger value="face" className="text-base">
                  Face
                </TabsTrigger>
                <TabsTrigger value="hair" className="text-base">
                  Hair
                </TabsTrigger>
                <TabsTrigger value="style" className="text-base">
                  Style
                </TabsTrigger>
                <TabsTrigger value="colors" className="text-base">
                  Colors
                </TabsTrigger>
              </TabsList>

              {/* Face Tab */}
              <TabsContent
                value="face"
                className="flex-1 overflow-y-auto pr-3 mt-0 space-y-8"
              >
                <div>
                  <h3 className="mb-4 text-xl sticky top-0 bg-white py-2 z-10">
                    Eyes
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {avatarOptions.eyeTypes.map((eye) => (
                      <button
                        key={eye.id}
                        onClick={() => updateConfig("eyes", [eye.id])}
                        className={`p-4 rounded-2xl border-2 transition-all hover:scale-105 ${
                          config.eyes?.[0] === eye.id
                            ? "border-purple-500 bg-purple-50 shadow-lg"
                            : "border-gray-200 hover:border-purple-300 bg-white"
                        }`}
                      >
                        <div className="mb-2 flex justify-center">
                          <AvatarDisplay
                            config={{ ...previewBaseConfig, eyes: [eye.id] }}
                            size="medium"
                          />
                        </div>
                        <p className="text-sm text-center">{eye.name}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="mb-4 text-xl sticky top-0 bg-white py-2 z-10">
                    Eye Shadow
                  </h3>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                    {avatarOptions.eyeShadowColors.map((shadow) => (
                      <button
                        key={shadow.id || "none"}
                        onClick={() =>
                          updateConfig("eyeShadowColor", [shadow.id])
                        }
                        className={`p-3 rounded-2xl border-2 transition-all hover:scale-105 ${
                          config.eyeShadowColor?.[0] === shadow.id
                            ? "border-purple-500 bg-purple-50 shadow-lg"
                            : "border-gray-200 hover:border-purple-300 bg-white"
                        }`}
                      >
                        <div
                          className="w-14 h-14 rounded-full mx-auto mb-2 border-2 border-gray-300 shadow-sm"
                          style={{ backgroundColor: shadow.color }}
                        />
                        <p className="text-xs text-center">{shadow.name}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="mb-4 text-xl sticky top-0 bg-white py-2 z-10">
                    Eyebrows
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {avatarOptions.eyebrowTypes.map((eyebrow) => (
                      <button
                        key={eyebrow.id}
                        onClick={() => updateConfig("eyebrows", [eyebrow.id])}
                        className={`p-4 rounded-2xl border-2 transition-all hover:scale-105 ${
                          config.eyebrows?.[0] === eyebrow.id
                            ? "border-purple-500 bg-purple-50 shadow-lg"
                            : "border-gray-200 hover:border-purple-300 bg-white"
                        }`}
                      >
                        <div className="mb-2 flex justify-center">
                          <AvatarDisplay
                            config={{
                              ...previewBaseConfig,
                              eyebrows: [eyebrow.id],
                            }}
                            size="medium"
                          />
                        </div>
                        <p className="text-sm text-center leading-tight">
                          {eyebrow.name}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="mb-4 text-xl sticky top-0 bg-white py-2 z-10">
                    Mouth
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {avatarOptions.mouthTypes.map((mouth) => (
                      <button
                        key={mouth.id}
                        onClick={() => updateConfig("mouth", [mouth.id])}
                        className={`p-4 rounded-2xl border-2 transition-all hover:scale-105 ${
                          config.mouth?.[0] === mouth.id
                            ? "border-purple-500 bg-purple-50 shadow-lg"
                            : "border-gray-200 hover:border-purple-300 bg-white"
                        }`}
                      >
                        <div className="mb-2 flex justify-center">
                          <AvatarDisplay
                            config={{ ...previewBaseConfig, mouth: [mouth.id] }}
                            size="medium"
                          />
                        </div>
                        <p className="text-sm text-center">{mouth.name}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="mb-4 text-xl sticky top-0 bg-white py-2 z-10">
                    Nose
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {avatarOptions.noseTypes.map((nose) => (
                      <button
                        key={nose.id}
                        onClick={() => updateConfig("nose", [nose.id])}
                        className={`p-4 rounded-2xl border-2 transition-all hover:scale-105 ${
                          config.nose?.[0] === nose.id
                            ? "border-purple-500 bg-purple-50 shadow-lg"
                            : "border-gray-200 hover:border-purple-300 bg-white"
                        }`}
                      >
                        <div className="mb-2 flex justify-center">
                          <AvatarDisplay
                            config={{ ...previewBaseConfig, nose: [nose.id] }}
                            size="medium"
                          />
                        </div>
                        <p className="text-sm text-center">{nose.name}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="mb-4 text-xl sticky top-0 bg-white py-2 z-10">
                    Ears
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {avatarOptions.earTypes.map((ear) => (
                      <button
                        key={ear.id}
                        onClick={() => updateConfig("ears", [ear.id])}
                        className={`p-4 rounded-2xl border-2 transition-all hover:scale-105 ${
                          config.ears?.[0] === ear.id
                            ? "border-purple-500 bg-purple-50 shadow-lg"
                            : "border-gray-200 hover:border-purple-300 bg-white"
                        }`}
                      >
                        <div className="mb-2 flex justify-center">
                          <AvatarDisplay
                            config={{ ...previewBaseConfig, ears: [ear.id] }}
                            size="medium"
                          />
                        </div>
                        <p className="text-sm text-center">{ear.name}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pb-6">
                  <h3 className="mb-4 text-xl sticky top-0 bg-white py-2 z-10">
                    Facial Hair
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {avatarOptions.facialHairTypes.map((facial) => (
                      <button
                        key={facial.id || "none"}
                        onClick={() => updateConfig("facialHair", [facial.id])}
                        className={`p-4 rounded-2xl border-2 transition-all hover:scale-105 ${
                          config.facialHair?.[0] === facial.id
                            ? "border-purple-500 bg-purple-50 shadow-lg"
                            : "border-gray-200 hover:border-purple-300 bg-white"
                        }`}
                      >
                        <div className="mb-2 flex justify-center">
                          <AvatarDisplay
                            config={{
                              ...previewBaseConfig,
                              facialHair: [facial.id],
                            }}
                            size="medium"
                          />
                        </div>
                        <p className="text-sm text-center">{facial.name}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* Hair Tab */}
              <TabsContent
                value="hair"
                className="flex-1 overflow-y-auto pr-3 mt-0 space-y-8"
              >
                <div>
                  <h3 className="mb-4 text-xl sticky top-0 bg-white py-2 z-10">
                    Hair Style
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {avatarOptions.hairStyles.map((style) => (
                      <button
                        key={style.id}
                        onClick={() => updateConfig("hair", [style.id])}
                        className={`p-4 rounded-2xl border-2 transition-all hover:scale-105 ${
                          config.hair?.[0] === style.id
                            ? "border-purple-500 bg-purple-50 shadow-lg"
                            : "border-gray-200 hover:border-purple-300 bg-white"
                        }`}
                      >
                        <div className="mb-2 flex justify-center">
                          <AvatarDisplay
                            config={{ ...previewBaseConfig, hair: [style.id] }}
                            size="medium"
                          />
                        </div>
                        <p className="text-sm text-center leading-tight">
                          {style.name}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pb-6">
                  <h3 className="mb-4 text-xl sticky top-0 bg-white py-2 z-10">
                    Hair Color
                  </h3>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
                    {avatarOptions.hairColors.map((color) => (
                      <button
                        key={color.id}
                        onClick={() => updateConfig("hairColor", [color.id])}
                        className={`p-3 rounded-2xl border-2 transition-all hover:scale-105 ${
                          config.hairColor?.[0] === color.id
                            ? "border-purple-500 bg-purple-50 shadow-lg"
                            : "border-gray-200 hover:border-purple-300 bg-white"
                        }`}
                      >
                        <div
                          className="w-14 h-14 rounded-full mx-auto mb-2 border-2 border-gray-300 shadow-sm"
                          style={{ backgroundColor: color.color }}
                        />
                        <p className="text-xs text-center leading-tight">
                          {color.name}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* Style Tab */}
              <TabsContent
                value="style"
                className="flex-1 overflow-y-auto pr-3 mt-0 space-y-8"
              >
                <div>
                  <h3 className="mb-4 text-xl sticky top-0 bg-white py-2 z-10">
                    Glasses
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {avatarOptions.glassesTypes.map((glasses) => (
                      <button
                        key={glasses.id || "none"}
                        onClick={() => updateConfig("glasses", [glasses.id])}
                        className={`p-4 rounded-2xl border-2 transition-all hover:scale-105 ${
                          config.glasses?.[0] === glasses.id
                            ? "border-purple-500 bg-purple-50 shadow-lg"
                            : "border-gray-200 hover:border-purple-300 bg-white"
                        }`}
                      >
                        <div className="mb-2 flex justify-center">
                          <AvatarDisplay
                            config={{
                              ...previewBaseConfig,
                              glasses: [glasses.id],
                            }}
                            size="medium"
                          />
                        </div>
                        <p className="text-sm text-center">{glasses.name}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="mb-4 text-xl sticky top-0 bg-white py-2 z-10">
                    Glasses Color
                  </h3>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                    {avatarOptions.glassesColors.map((color) => (
                      <button
                        key={color.id}
                        onClick={() => updateConfig("glassesColor", [color.id])}
                        className={`p-3 rounded-2xl border-2 transition-all hover:scale-105 ${
                          config.glassesColor?.[0] === color.id
                            ? "border-purple-500 bg-purple-50 shadow-lg"
                            : "border-gray-200 hover:border-purple-300 bg-white"
                        }`}
                      >
                        <div
                          className="w-14 h-14 rounded-full mx-auto mb-2 border-2 border-gray-300 shadow-sm"
                          style={{ backgroundColor: color.color }}
                        />
                        <p className="text-xs text-center">{color.name}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="mb-4 text-xl sticky top-0 bg-white py-2 z-10">
                    Earrings
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {avatarOptions.earringTypes.map((earring) => (
                      <button
                        key={earring.id || "none"}
                        onClick={() => updateConfig("earrings", [earring.id])}
                        className={`p-4 rounded-2xl border-2 transition-all hover:scale-105 ${
                          config.earrings?.[0] === earring.id
                            ? "border-purple-500 bg-purple-50 shadow-lg"
                            : "border-gray-200 hover:border-purple-300 bg-white"
                        }`}
                      >
                        <div className="mb-2 flex justify-center">
                          <AvatarDisplay
                            config={{
                              ...previewBaseConfig,
                              earrings: [earring.id],
                            }}
                            size="medium"
                          />
                        </div>
                        <p className="text-sm text-center">{earring.name}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="mb-4 text-xl sticky top-0 bg-white py-2 z-10">
                    Earring Color
                  </h3>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                    {avatarOptions.earringColors.map((color) => (
                      <button
                        key={color.id}
                        onClick={() => updateConfig("earringColor", [color.id])}
                        className={`p-3 rounded-2xl border-2 transition-all hover:scale-105 ${
                          config.earringColor?.[0] === color.id
                            ? "border-purple-500 bg-purple-50 shadow-lg"
                            : "border-gray-200 hover:border-purple-300 bg-white"
                        }`}
                      >
                        <div
                          className="w-14 h-14 rounded-full mx-auto mb-2 border-2 border-gray-300 shadow-sm"
                          style={{ backgroundColor: color.color }}
                        />
                        <p className="text-xs text-center">{color.name}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="mb-4 text-xl sticky top-0 bg-white py-2 z-10">
                    Shirt Style
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {avatarOptions.shirtTypes.map((shirt) => (
                      <button
                        key={shirt.id}
                        onClick={() => updateConfig("shirt", [shirt.id])}
                        className={`p-4 rounded-2xl border-2 transition-all hover:scale-105 ${
                          config.shirt?.[0] === shirt.id
                            ? "border-purple-500 bg-purple-50 shadow-lg"
                            : "border-gray-200 hover:border-purple-300 bg-white"
                        }`}
                      >
                        <div className="mb-2 flex justify-center">
                          <AvatarDisplay
                            config={{ ...previewBaseConfig, shirt: [shirt.id] }}
                            size="medium"
                          />
                        </div>
                        <p className="text-sm text-center">{shirt.name}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pb-6">
                  <h3 className="mb-4 text-xl sticky top-0 bg-white py-2 z-10">
                    Shirt Color
                  </h3>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
                    {avatarOptions.shirtColors.map((color) => (
                      <button
                        key={color.id}
                        onClick={() => updateConfig("shirtColor", [color.id])}
                        className={`p-3 rounded-2xl border-2 transition-all hover:scale-105 ${
                          config.shirtColor?.[0] === color.id
                            ? "border-purple-500 bg-purple-50 shadow-lg"
                            : "border-gray-200 hover:border-purple-300 bg-white"
                        }`}
                      >
                        <div
                          className="w-14 h-14 rounded-full mx-auto mb-2 border-2 border-gray-300 shadow-sm"
                          style={{ backgroundColor: color.color }}
                        />
                        <p className="text-xs text-center leading-tight">
                          {color.name}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* Colors Tab */}
              <TabsContent
                value="colors"
                className="flex-1 overflow-y-auto pr-3 mt-0 space-y-8"
              >
                <div>
                  <h3 className="mb-4 text-xl sticky top-0 bg-white py-2 z-10">
                    Skin Tone
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {avatarOptions.skinColors.map((tone) => (
                      <button
                        key={tone.id}
                        onClick={() => updateConfig("baseColor", [tone.id])}
                        className={`p-4 rounded-2xl border-2 transition-all hover:scale-105 ${
                          config.baseColor?.[0] === tone.id
                            ? "border-purple-500 bg-purple-50 shadow-lg"
                            : "border-gray-200 hover:border-purple-300 bg-white"
                        }`}
                      >
                        <div
                          className="w-16 h-16 rounded-full mx-auto mb-3 border-2 border-gray-200 shadow-md"
                          style={{ backgroundColor: `#${tone.id}` }}
                        />
                        <p className="text-sm text-center">{tone.name}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 px-6 py-4 border-t shrink-0 bg-gray-50">
          <Button
            onClick={onClose}
            variant="outline"
            className="flex-1"
            size="lg"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500"
            size="lg"
          >
            <Save className="mr-2" size={20} />
            Save Avatar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
