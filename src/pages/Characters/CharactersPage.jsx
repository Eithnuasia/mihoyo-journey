/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
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
    heroBackground: "images/backgrounds/characters-main.png",
    cardBackground: "images/backgrounds/bg-card-gi.png",
  },
  {
    id: 2,
    image: "images/buttonimage/button2.png",
    title: "Honkai: Star Rail",
    heroBackground: "images/backgrounds/characters-main2.png",
    cardBackground: "images/backgrounds/bg-card-hsr.png",
  },
  {
    id: 3,
    image: "images/buttonimage/button3.png",
    title: "Zenless Zone Zero",
    heroBackground: "images/backgrounds/characters-main3.png",
    cardBackground: "images/backgrounds/bg-card-zzz.png",
  },
];

// Image loading strategy
const IMAGE_STRATEGY = {
  priority: ["heroBackground", "cardBackground"],
  secondary: ["image"],
};

// Enhanced skeleton loader with blur effect
const SkeletonLoader = () => (
  <div className="animate-pulse relative overflow-hidden">
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl w-full h-full absolute inset-0"></div>
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skeleton-shine"></div>
  </div>
);

const CharactersPage = () => {
  const [selectedCard, setSelectedCard] = useState(1);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [heroImageLoaded, setHeroImageLoaded] = useState(false);
  const [cardImageLoaded, setCardImageLoaded] = useState(false);
  const [cachedImages, setCachedImages] = useState(null);

  // Enhanced preload with caching
  const preloadImage = useCallback(
    (url) => {
      return new Promise((resolve, reject) => {
        // Check if image is cached in memory
        if (cachedImages?.[url]) {
          resolve(url);
          return;
        }

        const img = new Image();
        img.onload = () => {
          // Cache in memory
          setCachedImages((prev) => ({
            ...prev,
            [url]: true,
          }));
          resolve(url);
        };
        img.onerror = reject;
        img.src = url;
      });
    },
    [cachedImages]
  );

  // Optimized image preloading
  useEffect(() => {
    const loadImages = async () => {
      try {
        // Load priority images first
        const priorityImages = BUTTON_CARDS.flatMap((card) =>
          IMAGE_STRATEGY.priority.map((type) => getAssetPath(card[type]))
        );

        await Promise.all(priorityImages.map(preloadImage));

        // Then load secondary images
        const secondaryImages = BUTTON_CARDS.flatMap((card) =>
          IMAGE_STRATEGY.secondary.map((type) => getAssetPath(card[type]))
        );

        await Promise.all(secondaryImages.map(preloadImage));

        setImagesLoaded(true);
      } catch (error) {
        console.error("Failed to preload some images:", error);
        // Still set as loaded to prevent infinite loading state
        setImagesLoaded(true);
      }
    };

    loadImages();
  }, [preloadImage]);

  // Cache check on mount
  useEffect(() => {
    const cached = localStorage.getItem("cachedImages");
    if (cached) {
      setCachedImages(JSON.parse(cached));
    }
  }, []);

  // Cache update
  useEffect(() => {
    if (cachedImages) {
      localStorage.setItem("cachedImages", JSON.stringify(cachedImages));
    }
  }, [cachedImages]);

  const handleCardClick = (cardId) => {
    setSelectedCard(cardId);
  };

  const handlePrevClick = () => {
    setSelectedCard((prev) => (prev === 1 ? BUTTON_CARDS.length : prev - 1));
  };

  const handleNextClick = () => {
    setSelectedCard((prev) => (prev === BUTTON_CARDS.length ? 1 : prev + 1));
  };

  const currentHeroBackground = BUTTON_CARDS.find(
    (card) => card.id === selectedCard
  )?.heroBackground;

  const currentCardBackground = BUTTON_CARDS.find(
    (card) => card.id === selectedCard
  )?.cardBackground;

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
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full relative"
      >
        <div className="aspect-[16/9] relative overflow-hidden">
          {!heroImageLoaded && (
            <div className="absolute inset-0">
              <SkeletonLoader />
            </div>
          )}
          <motion.img
            key={currentHeroBackground}
            src={getAssetPath(currentHeroBackground)}
            alt="Characters Main"
            className={`w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-500 ${
              heroImageLoaded ? "opacity-100" : "opacity-0"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: heroImageLoaded ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            onLoad={() => setHeroImageLoaded(true)}
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
                      {!imagesLoaded && <SkeletonLoader />}
                      <img
                        src={getAssetPath(card.image)}
                        alt={card.title}
                        className={`w-full h-full rounded-xl object-contain transition-opacity duration-300 ${
                          imagesLoaded ? "opacity-100" : "opacity-0"
                        }`}
                        loading="eager"
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

      {/* Character Grid Section with Card Background */}
      <div className="relative">
        {!cardImageLoaded && (
          <div className="absolute inset-0">
            <SkeletonLoader />
          </div>
        )}
        <motion.img
          key={currentCardBackground}
          src={getAssetPath(currentCardBackground)}
          alt="Character Grid Background"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            cardImageLoaded ? "opacity-100" : "opacity-0"
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: cardImageLoaded ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          onLoad={() => setCardImageLoaded(true)}
        />
        <div className="relative z-10">
          <CharacterGrid selectedGame={currentGame} />
        </div>
      </div>
    </div>
  );
};

export default CharactersPage;
