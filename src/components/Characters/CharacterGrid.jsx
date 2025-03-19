/* eslint-disable no-unused-vars */
import { motion, AnimatePresence } from "framer-motion";
import "../../styles/CharacterGrid.css";
import { CHARACTERS_BY_GAME } from "../../data/charactersData";

const CharacterCard = ({ character, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="character-card group cursor-pointer w-full max-w-sm mx-auto"
    >
      <div className="relative overflow-hidden rounded-xl backdrop-blur-sm border border-white/10 h-[600px] flex flex-col">
        <div className="flex-1 relative overflow-hidden bg-black">
          <img
            src={character.image}
            alt={character.name}
            className="absolute inset-0 w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <div
          className="p-6 backdrop-blur-sm relative text-center"
          style={{
            backgroundImage: `url("/images/patterns/pattern-dark.png")`,
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            backgroundBlendMode: "overlay",
            backgroundSize: "200px",
            backgroundRepeat: "repeat",
          }}
        >
          <div className="relative z-10">
            <h3 className="text-xl font-medium text-white mb-1">
              {character.name}
            </h3>
            <p className="text-sm text-white/70">{character.role}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const getBackgroundImage = (selectedGame) => {
  const backgrounds = {
    "Genshin Impact": "/images/backgrounds/bg-card-gi.png",
    "Honkai: Star Rail": "/images/backgrounds/bg-card-hsr.png",
    "Zenless Zone Zero": "/images/backgrounds/bg-card-zzz.png",
  };
  return backgrounds[selectedGame];
};

const CharacterGrid = ({ selectedGame }) => {
  const characters = CHARACTERS_BY_GAME[selectedGame] || [];
  const backgroundImage = getBackgroundImage(selectedGame);

  return (
    <section className="relative min-h-screen">
      {/* Background Image with transition */}
      <motion.div
        key={backgroundImage}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url("${backgroundImage}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          zIndex: 1,
        }}
      />

      {/* Content with higher z-index */}
      <div className="max-w-7xl mx-auto relative z-10 h-full flex items-center py-32">
        <div className="w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 max-w-[1600px] mx-auto px-4">
            <AnimatePresence mode="wait">
              {characters.map((character, index) => (
                <CharacterCard
                  key={character.id}
                  character={character}
                  index={index}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CharacterGrid;
