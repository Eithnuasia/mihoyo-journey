import { useState, useEffect, useRef } from "react";
import { useScroll, motion, useTransform } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "../../styles/utilities.css";
import { GAME_DATA } from "../../data/gamesConfig";
import HomeBackgroundPattern from "../../components/HomeBackgroundPattern";
import HomePageIndicator from "../../components/HomePageIndicator";
import HomeHeroSection from "../../components/HomeHeroSection";
import HomeAboutSection from "../../components/HomeAboutSection";
import HomeJourneySection from "../../components/HomeJourneySection";

// Memory cards - dipindahkan ke luar komponen
const MEMORY_CARDS = [
  { id: 1, title: "Memory #1" },
  { id: 2, title: "Memory #2" },
  { id: 3, title: "Memory #3" },
];

// Pemetaan ID memori ke judul game
const MEMORY_TO_GAME_MAP = {
  1: "Genshin Impact",
  2: "Honkai: Star Rail",
  3: "Zenless Zone Zero",
};

const Home = () => {
  const { scrollY } = useScroll();
  const [selectedGame, setSelectedGame] = useState("Genshin Impact");
  const [selectedMemory, setSelectedMemory] = useState(1);
  const [prevBackground, setPrevBackground] = useState("");
  const [isBackgroundTransitioning, setIsBackgroundTransitioning] =
    useState(false);
  const backgroundRef = useRef(null);
  const prevBackgroundRef = useRef(null);
  const carouselRef = useRef(null);

  // Parallax effect values
  const heroTextY = useTransform(scrollY, [0, 300], [0, 100]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 300], [1, 0.9]);

  // Preload background images
  useEffect(() => {
    GAME_DATA.forEach((game) => {
      const img = new Image();
      img.src = game.background;
    });
  }, []);

  // Handle background transition when game changes
  useEffect(() => {
    if (backgroundRef.current && prevBackgroundRef.current) {
      const currentBg = backgroundRef.current.style.backgroundImage;
      setPrevBackground(currentBg);
      setIsBackgroundTransitioning(true);

      // Reset transition state after animation completes
      const timer = setTimeout(() => {
        setIsBackgroundTransitioning(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [selectedGame]);

  // Handle memory card click
  const handleMemoryClick = (memoryId) => {
    if (memoryId === selectedMemory) return;
    setSelectedMemory(memoryId);
    setSelectedGame(MEMORY_TO_GAME_MAP[memoryId]);
  };

  // Calculate positions for carousel cards
  const getCardPosition = (cardId) => {
    if (cardId === selectedMemory) {
      return {
        transform: "scale(1.1)",
        left: "calc(50% - 70px)",
        zIndex: 3,
      };
    }

    if (
      cardId === selectedMemory - 1 ||
      (selectedMemory === 1 && cardId === 3)
    ) {
      return {
        transform: "scale(1)",
        left: "calc(50% - 160px)",
        zIndex: 2,
      };
    }

    if (
      cardId === selectedMemory + 1 ||
      (selectedMemory === 3 && cardId === 1)
    ) {
      return {
        transform: "scale(1)",
        left: "calc(50% + 30px)",
        zIndex: 2,
      };
    }

    return {
      transform: "scale(0.9)",
      left: cardId < selectedMemory ? "calc(50% - 280px)" : "calc(50% + 120px)",
      zIndex: 1,
    };
  };

  return (
    <div className="min-h-screen text-white font-mihoyo-en overflow-x-hidden hide-scrollbar relative">
      {/* Page Indicator */}
      <HomePageIndicator />

      {/* Hero Section with Parallax */}
      <HomeHeroSection />

      {/* About Section */}
      <HomeAboutSection setSelectedGame={setSelectedGame} />

      {/* Journey Section */}
      <HomeJourneySection
        selectedGame={selectedGame}
        selectedMemory={selectedMemory}
        setSelectedMemory={setSelectedMemory}
        setSelectedGame={setSelectedGame}
        prevBackground={prevBackground}
        backgroundRef={backgroundRef}
        prevBackgroundRef={prevBackgroundRef}
      />
    </div>
  );
};

export default Home;
