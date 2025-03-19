/* eslint-disable no-unused-vars */
import { useScroll, motion, useTransform } from "framer-motion";
import { getCssAssetPath } from "../utils/assetUtils";
import "../styles/HeroSection.css";

const HeroSection = () => {
  const { scrollY } = useScroll();
  const heroTextY = useTransform(scrollY, [0, 300], [0, 100]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 300], [1, 0.9]);

  return (
    <section id="home" className="hero-section">
      <div
        className="hero-background"
        style={{
          backgroundImage: getCssAssetPath("images/backgrounds/GI.png"),
          backgroundColor: "transparent",
        }}
      ></div>
      <motion.div
        className="hero-content"
        style={{
          y: heroTextY,
          opacity: heroOpacity,
          scale: heroScale,
        }}
      >
        <h1 className="hero-title">Welcome to My Journey</h1>
        <p className="hero-subtitle">Explore the world of HoYoverse games</p>
      </motion.div>
    </section>
  );
};

export default HeroSection;
