import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const NavLink = ({ href, text }) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.querySelector(href);
      if (section) {
        const rect = section.getBoundingClientRect();
        setIsActive(rect.top <= 100 && rect.bottom >= 100);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [href]);

  const handleClick = (e) => {
    e.preventDefault();
  };

  return (
    <li>
      <a
        href={href}
        onClick={handleClick}
        className={`text-sm font-medium transition-all duration-300 hover:text-primary-500 ${
          isActive ? "text-primary-500" : "text-white"
        }`}
      >
        {text}
      </a>
    </li>
  );
};

NavLink.propTypes = {
  href: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default NavLink;
