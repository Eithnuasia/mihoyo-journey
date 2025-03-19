import { useEffect } from "react";

const FontLoader = () => {
  useEffect(() => {
    // Daftar font yang akan dimuat
    const fonts = [
      { family: "MihoyoFont-EN", url: "/fonts/en-us.ttf" },
      { family: "MihoyoFont-ID", url: "/fonts/id-id.ttf" },
      { family: "MihoyoFont-JP", url: "/fonts/ja-jp.ttf" },
    ];

    // Muat font menggunakan FontFace API
    Promise.all(
      fonts.map((font) => {
        const fontFace = new FontFace(
          font.family,
          `url(${import.meta.env.BASE_URL}${
            font.url.startsWith("/") ? font.url.slice(1) : font.url
          })`
        );
        return fontFace.load();
      })
    )
      .then((loadedFonts) => {
        loadedFonts.forEach((font) => {
          document.fonts.add(font);
        });
        console.log("Fonts loaded successfully");
      })
      .catch((error) => {
        console.error("Error loading fonts:", error);
      });
  }, []);

  return null; // Komponen ini tidak merender apapun
};

export default FontLoader;
