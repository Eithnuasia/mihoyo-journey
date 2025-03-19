/* eslint-disable no-unused-vars */
import { useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  GAME_DATA,
  MEMORY_CARDS,
  MEMORY_TO_GAME_MAP,
} from "../data/gamesConfig";
import "../styles/JourneySection.css";
import "../styles/UIComponents.css";
import { getCssAssetPath } from "../utils/assetUtils";

const getCardPosition = (cardId, selectedMemory) => {
  if (cardId === selectedMemory) {
    return {
      transform: "scale(1.1)",
      left: "calc(50% - 70px)",
      zIndex: 3,
    };
  }

  // Left position
  if (cardId === selectedMemory - 1 || (selectedMemory === 1 && cardId === 3)) {
    return {
      transform: "scale(1)",
      left: "calc(50% - 160px)",
      zIndex: 2,
    };
  }

  // Right position
  if (cardId === selectedMemory + 1 || (selectedMemory === 3 && cardId === 1)) {
    return {
      transform: "scale(1)",
      left: "calc(50% + 30px)",
      zIndex: 2,
    };
  }

  // Hidden positions
  return {
    transform: "scale(0.9)",
    left: cardId < selectedMemory ? "calc(50% - 280px)" : "calc(50% + 120px)",
    zIndex: 1,
  };
};

const JourneySection = ({
  selectedGame,
  selectedMemory,
  setSelectedMemory,
  setSelectedGame,
  prevBackground,
  backgroundRef,
  prevBackgroundRef,
}) => {
  const carouselRef = useRef(null);
  const currentGame =
    GAME_DATA.find((game) => game.title === selectedGame) || GAME_DATA[1];

  const handleMemoryClick = (memoryId) => {
    if (memoryId === selectedMemory) return;
    setSelectedMemory(memoryId);
    setSelectedGame(MEMORY_TO_GAME_MAP[memoryId]);
  };

  const handleViewMoreClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <section id="journey" className="py-24 relative flex flex-col">
      <h2 className="text-4xl font-normal mb-12 text-center text-white font-mihoyo-en z-10">
        Journey
      </h2>

      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <div
          ref={backgroundRef}
          className="absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000"
          style={{
            backgroundImage: getCssAssetPath(
              `images/backgrounds/${
                selectedMemory === 1
                  ? "genshin-impact"
                  : selectedMemory === 2
                  ? "honkai-star-rail"
                  : "zenless-zone-zero"
              }.png`
            ),
            filter: "brightness(0.7)",
          }}
        ></div>

        <div
          ref={prevBackgroundRef}
          className="absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000"
          style={{
            backgroundImage: prevBackground,
            filter: "brightness(0.7)",
            opacity: 0,
          }}
        ></div>

        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70 z-1"></div>
      </div>

      <div className="relative z-10 flex flex-col items-start justify-center px-0 py-16 h-[400px] transition-transform duration-500 max-w-7xl mx-auto w-full">
        <h3 className="text-3xl md:text-4xl font-normal mb-3 text-white font-mihoyo-en transition-all duration-500 ease-in-out game-title">
          {selectedGame}
        </h3>
        <p className="text-base text-white/80 max-w-md font-mihoyo-en transition-all duration-500 ease-in-out mb-4">
          Explore your journey in {selectedGame} and relive the adventure.
        </p>

        <Link
          to="/memories"
          onClick={handleViewMoreClick}
          className="view-more-btn px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white border border-white/30 font-mihoyo-en text-base hover:bg-white/20 transition-all duration-300 flex items-center gap-2"
          aria-label={`View more about ${selectedGame}`}
        >
          View More
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </Link>
      </div>

      <div className="relative z-10 px-4 mb-12">
        <div
          ref={carouselRef}
          className="carousel-container max-w-2xl mx-auto relative h-[120px]"
        >
          {MEMORY_CARDS.map((memory) => {
            const gameTitle = MEMORY_TO_GAME_MAP[memory.id];
            const gameData =
              GAME_DATA.find((game) => game.title === gameTitle) || currentGame;

            return (
              <motion.div
                key={memory.id}
                className={`memory-card absolute w-[140px] h-[80px] md:w-[160px] md:h-[90px] rounded-lg overflow-hidden cursor-pointer transition-all duration-500 perspective-card ${
                  memory.id === selectedMemory ? "active" : ""
                }`}
                style={getCardPosition(memory.id, selectedMemory)}
                onClick={() => handleMemoryClick(memory.id)}
                whileHover={{
                  scale: memory.id === selectedMemory ? 1.12 : 1.1,
                  rotateY: 5,
                  rotateX: -5,
                  z: 30,
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: 1,
                  scale: memory.id === selectedMemory ? 1.1 : 1,
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="card-content">
                  <div className="card-front">
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{
                        backgroundImage: getCssAssetPath(
                          `images/backgrounds/${
                            memory.id === 1
                              ? "genshin-impact"
                              : memory.id === 2
                              ? "honkai-star-rail"
                              : "zenless-zone-zero"
                          }.png`
                        ),
                        filter: "brightness(0.9)",
                      }}
                    />
                    <div className="absolute inset-0 bg-black/30 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default JourneySection;
