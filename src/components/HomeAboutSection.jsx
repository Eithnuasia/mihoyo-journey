import { motion } from "framer-motion";
import { GAME_DATA } from "../data/gamesConfig";
import "../styles/AboutSection.css";
import { useState } from "react";

const StatCard = ({ number, label }) => (
  <motion.div
    className="stat-card"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
  >
    <span className="text-3xl text-white mb-2">{number}</span>
    <span className="text-sm text-white/70">{label}</span>
  </motion.div>
);

const GameShowcase = () => {
  const duplicatedGames = [...GAME_DATA, ...GAME_DATA];
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="game-showcase-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="game-showcase-header">
        <h4 className="text-2xl text-white text-center w-full">Games</h4>
      </div>
      <div
        className="game-showcase-scroll"
        style={{ animationPlayState: isHovered ? "paused" : "running" }}
      >
        <div className="game-showcase-track">
          {duplicatedGames.map((game, index) => (
            <div
              key={`${game.title}-${index}`}
              className="game-showcase-item"
              style={{
                backgroundImage: `url(${game.background})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "200px",
                width: "100%",
                borderRadius: "12px",
                marginBottom: "16px",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const AboutSection = () => {
  return (
    <section
      id="about"
      className="min-h-screen relative flex items-center justify-center py-16 px-4 overflow-hidden"
    >
      <div className="container max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 mt-8">
          <motion.div
            className="inline-block"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="text-4xl font-normal text-center text-white font-mihoyo-en z-10">
              About
            </h3>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div
            className="space-y-8 max-w-xl mx-auto text-center md:text-left"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-xl text-white leading-relaxed">
              Welcome to my personal Mihoyo journey, where I share my adventures
              through the captivating universes created by miHoYo (now
              HoYoverse).
            </p>

            <div className="grid grid-cols-3 gap-4">
              <StatCard number="100+" label="Hours Played" />
              <StatCard number="3" label="Games Explored" />
              <StatCard number="1000+" label="Achievements" />
            </div>

            <p className="text-lg text-white leading-relaxed">
              Each game offers unique experiences and unforgettable memories
              that have shaped my gaming journey. Join me as I explore these
              wonderful worlds and share the moments that made them special.
            </p>
          </motion.div>

          <GameShowcase />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
