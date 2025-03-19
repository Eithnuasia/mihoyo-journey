import { useScroll } from "framer-motion";
import { useState, useEffect } from "react";
import "../styles/Navbar.css";

const NavLink = ({ href, text }) => (
  <li>
    <a
      href={href}
      className="text-white/70 hover:text-white transition-colors duration-300 text-sm font-mihoyo-en"
    >
      {text}
    </a>
  </li>
);

const Navbar = ({ isMuted, toggleMute }) => {
  const { scrollY } = useScroll();
  const [headerOpacity, setHeaderOpacity] = useState(0.8);

  useEffect(() => {
    return scrollY.onChange((latest) => {
      if (latest === 0) {
        setHeaderOpacity(1);
      } else {
        const newOpacity = Math.max(0.4, 0.8 - latest * 0.001);
        setHeaderOpacity(newOpacity);
      }
    });
  }, [scrollY]);

  return (
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
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <nav className="flex items-center">
          <ul className="flex space-x-10">
            <NavLink href="#home" text="Home" />
            <NavLink href="#about" text="About" />
            <NavLink href="#journey" text="Journey" />
          </ul>
        </nav>

        <button
          onClick={toggleMute}
          className={`w-8 h-8 flex items-center justify-center text-white hover:scale-110 transition-all duration-300 group relative audio-control-btn ${
            isMuted ? "muted" : ""
          }`}
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                clipRule="evenodd"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
              />
            </svg>
          )}
        </button>

        <div className="md:hidden absolute right-4">
          <button
            className="w-8 h-8 flex items-center justify-center text-white"
            aria-label="Menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
