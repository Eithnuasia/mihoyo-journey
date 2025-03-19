import { Link } from "react-router-dom";
import "../../styles/Navbar.css";

const VolumeIcon = ({ isMuted }) =>
  isMuted ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className="w-4 h-4"
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
      className="w-4 h-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
      />
    </svg>
  );

const MenuIcon = () => (
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
);

const NavigationLink = ({ to, text }) => (
  <li>
    <Link
      to={to}
      className="text-white/70 hover:text-white transition-colors duration-300 text-sm font-mihoyo-en"
    >
      {text}
    </Link>
  </li>
);

const NAVIGATION_LINKS = [
  { to: "/", text: "Home" },
  { to: "/characters", text: "Characters" },
  { to: "/memories", text: "Journey" },
];

const MainNavigationBar = ({ isMuted, toggleMute }) => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
      <nav className="flex items-center">
        <ul className="flex space-x-10">
          {NAVIGATION_LINKS.map((link) => (
            <NavigationLink key={link.to} {...link} />
          ))}
        </ul>
      </nav>

      <div className="flex items-center gap-4">
        <button
          onClick={toggleMute}
          className={`w-8 h-8 flex items-center justify-center text-white hover:scale-110 transition-all duration-300 group relative audio-control-btn ${
            isMuted ? "muted" : ""
          } bg-black/50 backdrop-blur-sm rounded-full border border-white/20 hover:border-[#8B5CF6]/50`}
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          <VolumeIcon isMuted={isMuted} />
        </button>

        <div className="md:hidden">
          <button
            className="w-8 h-8 flex items-center justify-center text-white"
            aria-label="Menu"
          >
            <MenuIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainNavigationBar;
