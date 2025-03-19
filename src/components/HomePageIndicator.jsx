import { useState, useEffect } from "react";
import "../styles/PageIndicator.css";

const PageIndicator = () => {
  const [activeSection, setActiveSection] = useState(1);
  const [scrollDirection, setScrollDirection] = useState(null);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        setScrollDirection("down");
      } else if (currentScrollY < lastScrollY) {
        setScrollDirection("up");
      }
      setLastScrollY(currentScrollY);
    };

    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          switch (id) {
            case "home":
              setActiveSection(1);
              break;
            case "about":
              setActiveSection(2);
              break;
            case "journey":
              setActiveSection(3);
              break;
            default:
              break;
          }
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );
    sections.forEach((section) => observer.observe(section));
    window.addEventListener("scroll", handleScroll);

    return () => {
      sections.forEach((section) => observer.unobserve(section));
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const scrollToSection = (sectionNumber) => {
    let targetId;
    switch (sectionNumber) {
      case 1:
        targetId = "home";
        break;
      case 2:
        targetId = "about";
        break;
      case 3:
        targetId = "journey";
        break;
      default:
        return;
    }

    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      const windowHeight = window.innerHeight;
      const sectionHeight = targetSection.offsetHeight;
      const sectionTop = targetSection.offsetTop;
      const centerPosition = sectionTop - (windowHeight - sectionHeight) / 2;

      window.scrollTo({
        top: centerPosition,
        behavior: "smooth",
      });
    }
  };

  const handleArrowClick = (direction) => {
    const nextSection =
      direction === "up"
        ? Math.max(1, activeSection - 1)
        : Math.min(3, activeSection + 1);

    if (nextSection !== activeSection) {
      scrollToSection(nextSection);
    }
  };

  const getNumberStyle = (number) => {
    if (number === activeSection) {
      return {
        opacity: 1,
        transform: "translateY(0)",
        pointerEvents: "auto",
      };
    }

    const distance = number - activeSection;
    const direction = distance > 0 ? 1 : -1;
    const translateY =
      Math.abs(distance) === 1 ? `${direction * 100}%` : `${direction * 200}%`;

    return {
      opacity: Math.abs(distance) === 1 ? 0.3 : 0,
      transform: `translateY(${translateY})`,
      pointerEvents: "none",
    };
  };

  return (
    <div className="page-indicator">
      <div className="nav-arrow up" onClick={() => handleArrowClick("up")}>
        ▲
      </div>
      <div className="indicator-track relative h-[120px] flex flex-col items-center justify-center overflow-hidden">
        {[1, 2, 3].map((number) => (
          <div
            key={number}
            className={`indicator-number absolute transition-all duration-500 ease-in-out cursor-pointer ${
              number === activeSection ? "active" : ""
            }`}
            style={getNumberStyle(number)}
            onClick={() => scrollToSection(number)}
          >
            {String(number).padStart(2, "0")}
          </div>
        ))}
        <div className="indicator-line absolute left-1/2 w-[1px] h-12 bg-white/30 -translate-x-1/2"></div>
      </div>
      <div className="nav-arrow down" onClick={() => handleArrowClick("down")}>
        ▼
      </div>
    </div>
  );
};

export default PageIndicator;
