import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black/30 backdrop-blur-sm border-t border-white/10 py-4 mt-auto">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex flex-col items-center justify-center">
          {/* Disclaimer Section */}
          <div className="max-w-xl text-center bg-black/20 rounded-lg p-3 backdrop-blur-sm border border-white/5">
            <h4 className="text-white/90 font-mihoyo-en text-[11px] uppercase tracking-wider mb-2 inline-block">
              Disclaimer
            </h4>
            <div className="space-y-2">
              <p className="text-white/70 text-[10px] leading-relaxed">
                This website is a non-commercial, educational project for
                learning and portfolio purposes. All game-related content
                (images, logos, designs) are property of HoYoverse.
              </p>
              <p className="text-white/60 text-[10px] leading-relaxed">
                Not affiliated with or endorsed by HoYoverse. For educational
                demonstration only.
              </p>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-white/40 text-[9px] mt-3 font-light tracking-wide">
            <p>© 2024 Traumerei | Website Project</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
