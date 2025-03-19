/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { useState } from "react";
import "../../styles/CharactersPage.css";
import CharacterGrid from "../../components/Characters/CharacterGrid";
import { getAssetPath } from "../../utils/assetUtils";

// Konstanta untuk style yang sering digunakan
const ARROW_BUTTON_CLASSES =
  "absolute top-1/2 -translate-y-1/2 z-40 w-12 h-12 flex items-center justify-center bg-black/20 hover:bg-black/40 rounded-full text-white/90 hover:text-white transition-all duration-300 backdrop-blur-sm";

// Komponen untuk tombol navigasi
const NavigationButton = ({ direction, onClick, children }) => (
  <button
    onClick={onClick}
    className={`${ARROW_BUTTON_CLASSES} ${
      direction === "prev" ? "left-[30%]" : "right-[30%]"
    }`}
    aria-label={`${direction === "prev" ? "Previous" : "Next"} card`}
  >
    {children}
  </button>
);

// Konstanta untuk style kartu
const CARD_POSITIONS = {
  center: "scale-100 opacity-100 z-30",
  side: "scale-50 opacity-70 z-20",
  hidden: "scale-50 opacity-0 pointer-events-none",
};

const BUTTON_CARDS = [
  {
    id: 1,
    image: "images/buttonimage/button1.png",
    title: "Genshin Impact",
    background: "images/backgrounds/bg-card-gi.png",
  },
  {
    id: 2,
    image: "images/buttonimage/button2.png",
    title: "Honkai: Star Rail",
    background: "images/backgrounds/bg-card-hsr.png",
  },
  {
    id: 3,
    image: "images/buttonimage/button3.png",
    title: "Zenless Zone Zero",
    background: "images/backgrounds/bg-card-zzz.png",
  },
];

const CharactersPage = () => {
  const [selectedCard, setSelectedCard] = useState(1);

  const handleCardClick = (cardId) => {
    setSelectedCard(cardId);
  };

  const handlePrevClick = () => {
    setSelectedCard((prev) => (prev === 1 ? BUTTON_CARDS.length : prev - 1));
  };

  const handleNextClick = () => {
    setSelectedCard((prev) => (prev === BUTTON_CARDS.length ? 1 : prev + 1));
  };

  const currentBackground = BUTTON_CARDS.find(
    (card) => card.id === selectedCard
  )?.background;

  const currentGame = BUTTON_CARDS.find(
    (card) => card.id === selectedCard
  )?.title;

  const getCardPosition = (cardId) => {
    const baseStyles = "absolute transition-all duration-500 cursor-pointer";
    const centerX = "left-1/2 -translate-x-1/2";

    if (cardId === selectedCard) {
      return `${baseStyles} ${centerX} ${CARD_POSITIONS.center}`;
    }

    // Previous card
    if (
      (selectedCard === 1 && cardId === BUTTON_CARDS.length) ||
      cardId === selectedCard - 1
    ) {
      return `${baseStyles} left-[20%] -translate-x-1/2 ${CARD_POSITIONS.side}`;
    }

    // Next card
    if (
      (selectedCard === BUTTON_CARDS.length && cardId === 1) ||
      cardId === selectedCard + 1
    ) {
      return `${baseStyles} left-[80%] -translate-x-1/2 ${CARD_POSITIONS.side}`;
    }

    return `${baseStyles} ${centerX} ${CARD_POSITIONS.hidden}`;
  };

  return (
    <div className="min-h-screen">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full relative"
      >
        <div className="aspect-[16/9] relative overflow-hidden">
          <motion.img
            key={currentBackground}
            src={getAssetPath(currentBackground)}
            alt="Characters Main"
            className="w-full h-full object-cover absolute top-0 left-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />

          <div className="absolute inset-0 flex items-center justify-center translate-y-[31%]">
            <div className="w-full max-w-[1800px] mx-auto px-4">
              <div className="relative flex items-center justify-center h-full">
                <NavigationButton direction="prev" onClick={handlePrevClick}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </NavigationButton>

                <div className="relative w-full flex items-center justify-center">
                  {BUTTON_CARDS.map((card) => (
                    <motion.div
                      key={card.id}
                      className={getCardPosition(card.id)}
                      onClick={() => handleCardClick(card.id)}
                      initial={false}
                      style={{
                        width: "clamp(400px, 40vw, 800px)",
                        height: "clamp(400px, 40vh, 700px)",
                        position: "absolute",
                      }}
                    >
                      <img
                        src={getAssetPath(card.image)}
                        alt={card.title}
                        className="w-full h-full rounded-xl object-contain"
                        loading="lazy"
                      />
                    </motion.div>
                  ))}
                </div>

                <NavigationButton direction="next" onClick={handleNextClick}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </NavigationButton>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <CharacterGrid selectedGame={currentGame} />
    </div>
  );
};

export default CharactersPage;
