import { useScroll } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import MainNavigationBar from "./MainNavigationBar";
import Footer from "../../components/Footer";
import HomeBackgroundPattern from "../../components/HomeBackgroundPattern";

// Audio playlist configuration
const AUDIO_PLAYLIST = ["/audio/bg.mp3", "/audio/bg2.mp3", "/audio/bg3.mp3"];
const MIN_HEADER_OPACITY = 0.4;
const DEFAULT_HEADER_OPACITY = 0.8;
const AUDIO_VOLUME = 0.6;

const MainLayout = ({ children, isMuted, toggleMute }) => {
  const { scrollY } = useScroll();
  const [headerOpacity, setHeaderOpacity] = useState(DEFAULT_HEADER_OPACITY);
  const audioRef = useRef(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  // Header scroll effect
  useEffect(() => {
    const handleScroll = (latest) => {
      const newOpacity =
        latest === 0
          ? 1
          : Math.max(
              MIN_HEADER_OPACITY,
              DEFAULT_HEADER_OPACITY - latest * 0.001
            );
      setHeaderOpacity(newOpacity);
    };

    return scrollY.onChange(handleScroll);
  }, [scrollY]);

  const playNextTrack = async (audio) => {
    const nextIndex = (currentTrackIndex + 1) % AUDIO_PLAYLIST.length;
    setCurrentTrackIndex(nextIndex);

    if (audio && !isMuted) {
      audio.src = AUDIO_PLAYLIST[nextIndex];
      audio.load();
      try {
        await audio.play();
      } catch (error) {
        console.error("Error playing next track:", error);
      }
    }
  };

  // Enhanced Audio control with playlist support
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = AUDIO_VOLUME;
    audio.muted = isMuted;

    const handleTrackEnd = () => playNextTrack(audio);
    audio.addEventListener("ended", handleTrackEnd);

    const initializeAudio = async () => {
      try {
        if (!isMuted) {
          await audio.play();
        } else {
          audio.pause();
        }
      } catch (error) {
        console.error("Error controlling audio:", error);
      }
    };

    initializeAudio();

    return () => {
      audio.removeEventListener("ended", handleTrackEnd);
      audio.pause();
    };
  }, [isMuted, currentTrackIndex]);

  return (
    <div className="min-h-screen text-white font-mihoyo-en overflow-x-hidden hide-scrollbar relative">
      {/* Background Music */}
      <audio
        ref={audioRef}
        preload="auto"
        src={AUDIO_PLAYLIST[currentTrackIndex]}
      />

      {/* Global Particle Background */}
      <HomeBackgroundPattern />

      {/* Header */}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor:
            scrollY.get() === 0
              ? `rgb(0, 0, 0)`
              : `rgba(0, 0, 0, ${headerOpacity})`,
          backdropFilter: scrollY.get() === 0 ? "none" : "blur(8px)",
        }}
      >
        <MainNavigationBar isMuted={isMuted} toggleMute={toggleMute} />
      </header>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;
