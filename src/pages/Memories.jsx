import { useEffect, useState, useRef } from "react";
import { getAssetPath } from "../utils/assetUtils";

const Memories = () => {
  const [images, setImages] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const particlesRef = useRef(null);

  // Game data configuration with updated counts
  const gameData = [
    {
      name: "Genshin Impact",
      code: "gi",
      folder: "genshin-impact",
      count: 10,
    },
    {
      name: "Honkai Star Rail",
      code: "hsr",
      folder: "honkai-star-rail",
      count: 8,
    },
    {
      name: "Zenless Zone Zero",
      code: "zzz",
      folder: "zenless-zone-zero",
      count: 12,
    },
  ];

  const categories = ["All", ...gameData.map((game) => game.name)];

  useEffect(() => {
    const imageArray = [];
    setIsLoading(true);

    // Generate image paths for each game
    gameData.forEach((game) => {
      for (let i = 1; i <= game.count; i++) {
        const paddedNumber = i.toString().padStart(2, "0");
        const basePath = `images/memories/${game.folder}/${game.code}-${paddedNumber}`;

        // Create separate paths for each format
        const imagePaths = {
          jpg: getAssetPath(`${basePath}.jpg`),
          jpeg: getAssetPath(`${basePath}.jpeg`),
          png: getAssetPath(`${basePath}.png`),
        };

        imageArray.push({
          paths: imagePaths,
          alt: `${game.name} Memory ${i}`,
          category: game.name,
          number: paddedNumber,
          currentPath: imagePaths.jpg, // Default start with jpg
        });
      }
    });

    setTimeout(() => {
      setImages(imageArray);
      setIsLoading(false);
    }, 800);
  }, []);

  // Particle effect animation
  useEffect(() => {
    if (!particlesRef.current) return;

    const canvas = particlesRef.current;
    const ctx = canvas.getContext("2d");

    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasDimensions();
    window.addEventListener("resize", setCanvasDimensions);

    const particlesArray = [];
    const numberOfParticles = 50;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.color = `rgba(255, 255, 255, ${Math.random() * 0.3})`;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        else if (this.x < 0) this.x = canvas.width;

        if (this.y > canvas.height) this.y = 0;
        else if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      particlesArray.length = 0;
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
      }
    };

    init();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesArray.forEach((particle) => {
        particle.update();
        particle.draw();
      });
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", setCanvasDimensions);
    };
  }, []);

  const handleImageError = (e, image) => {
    const { paths, currentPath } = image;
    const allPaths = Object.values(paths);
    const currentIndex = allPaths.indexOf(currentPath);

    if (currentIndex < allPaths.length - 1) {
      const nextPath = allPaths[currentIndex + 1];
      image.currentPath = nextPath;
      e.target.src = getAssetPath(nextPath);
    } else {
      console.error(`Failed to load image: ${image.alt}`);
      e.target.src = getAssetPath("images/placeholder.jpg");
      e.target.onerror = null;
    }
  };

  // Filter images based on active category
  const filteredImages =
    activeCategory === "All"
      ? images
      : images.filter((image) => image.category === activeCategory);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <canvas
        ref={particlesRef}
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ opacity: 0.6 }}
      />

      <div className="relative z-10 pt-24 pb-12">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-mihoyo text-white inline-block relative animate-pulse-subtle">
            My Journey
          </h1>
          <p className="text-white/60 mt-3 max-w-md mx-auto text-sm">
            A visual collection of moments from my gaming adventures
          </p>
        </div>

        <div className="w-[90%] mx-auto mb-10">
          <div className="flex justify-center flex-wrap gap-2 md:gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-[#FAEB02] text-black shadow-lg shadow-[#FAEB02]/30"
                    : "bg-white/10 text-white/70 hover:bg-white/20"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="w-[98%] mx-auto px-1">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center min-h-[50vh]">
              <div className="w-12 h-12 border-4 border-white/20 border-t-[#FAEB02] rounded-full animate-spin"></div>
              <p className="mt-4 text-white/60 text-sm">Loading memories...</p>
            </div>
          ) : (
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 2xl:columns-5 gap-3 space-y-3 [column-fill:_balance]">
              {filteredImages.length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <p className="text-white/60">
                    No memories found in this category.
                  </p>
                </div>
              ) : (
                filteredImages.map((image, index) => {
                  const animationDelay = `${(index % 10) * 0.1}s`;

                  return (
                    <div
                      key={index}
                      className="relative group break-inside-avoid mb-3 opacity-0 animate-fade-in"
                      style={{ animationDelay }}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300">
                        <img
                          src={getAssetPath(image.currentPath)}
                          alt={image.alt}
                          className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                          loading="lazy"
                          onError={(e) => handleImageError(e, image)}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

                        <div className="absolute inset-x-0 bottom-0 bg-black/60 backdrop-blur-sm p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                          <div className="flex items-center justify-between">
                            <p className="text-white text-sm font-mihoyo tracking-wider">
                              {image.category}
                            </p>
                            <span className="text-[#FAEB02] text-xs">
                              #{image.number}
                            </span>
                          </div>
                        </div>

                        {hoveredIndex === index && (
                          <button
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/30 backdrop-blur-sm rounded-full p-3 animate-scale-in"
                            aria-label="View memory"
                            onClick={() => {
                              // Handle image view/zoom functionality here
                            }}
                          >
                            <svg
                              className="w-6 h-6 text-white"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>

        {!isLoading && filteredImages.length > 0 && (
          <div className="flex justify-center mt-12">
            <div className="flex space-x-1">
              {[1, 2, 3].map((i) => (
                <span
                  key={i}
                  className={`w-8 h-1 rounded-full ${
                    i === 1 ? "bg-[#FAEB02]" : "bg-white/20"
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Animation styles remain unchanged
const animationStyles = `
  @keyframes pulse-subtle {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.85; }
  }
  
  @keyframes fade-in {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes scale-in {
    from { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
    to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
  }
  
  .animate-pulse-subtle {
    animation: pulse-subtle 3s ease-in-out infinite;
  }
  
  .animate-fade-in {
    animation: fade-in 0.6s ease-out forwards;
  }
  
  .animate-scale-in {
    animation: scale-in 0.3s ease-out forwards;
  }
`;

if (typeof document !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = animationStyles;
  document.head.appendChild(styleSheet);
}

export default Memories;
