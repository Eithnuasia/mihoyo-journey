import { getAssetPath } from "../utils/assetUtils";

export const CHARACTERS_BY_GAME = {
  "Genshin Impact": [
    {
      id: 1,
      name: "Neuvillette",
      image: getAssetPath("images/characters/gi/neuvillette.png"),
      role: "The Dragon Sovoreign",
      game: "Genshin Impact",
    },
    {
      id: 2,
      name: "Arlecchino",
      image: getAssetPath("images/characters/gi/arlecchino.png"),
      role: "The Knave",
      game: "Genshin Impact",
    },
    {
      id: 3,
      name: "Xiao",
      image: getAssetPath("images/characters/gi/xiao.png"),
      role: "The Last Yaksha",
      game: "Genshin Impact",
    },
  ],
  "Honkai: Star Rail": [
    {
      id: 4,
      name: "The Herta",
      image: getAssetPath("images/characters/hsr/herta.png"),
      role: "Emanator of Erudition",
      game: "Honkai: Star Rail",
    },
    {
      id: 5,
      name: "Acheron",
      image: getAssetPath("images/characters/hsr/acheron.png"),
      role: "Emananator of Nihility",
      game: "Honkai: Star Rail",
    },
    {
      id: 6,
      name: "Firefly",
      image: getAssetPath("images/characters/hsr/firefly.png"),
      role: "The Stellaron Hunter",
      game: "Honkai: Star Rail",
    },
  ],
  "Zenless Zone Zero": [
    {
      id: 7,
      name: "Hoshimi Miyabi",
      image: getAssetPath("images/characters/zzz/miyabi.png"),
      role: "The Youngest Void Hunter",
      game: "Zenless Zone Zero",
    },
    {
      id: 8,
      name: "Evelyn",
      image: getAssetPath("images/characters/zzz/evelyn.png"),
      role: "Stars of Lyra",
      game: "Zenless Zone Zero",
    },
    {
      id: 9,
      name: "Ellen Joe",
      image: getAssetPath("images/characters/zzz/ellen.png"),
      role: "Victoria Housekeeping Co.",
      game: "Zenless Zone Zero",
    },
  ],
};
