"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "Home", href: "#hero" },
  { label: "Game Modes", href: "#gamemodes" },
  { label: "Features", href: "#features" },
  { label: "Join", href: "#join" },
  { label: "Community", href: "#community" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-surface-900/95 backdrop-blur-md border-b border-mc-green/10 shadow-[0_4px_30px_rgba(85,255,85,0.05)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between md:h-20">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-3 group">
            <div className="relative h-8 w-8 md:h-10 md:w-10">
              <div className="absolute inset-0 bg-mc-green/20 rounded group-hover:bg-mc-green/30 transition-colors" />
              <svg
                viewBox="0 0 32 32"
                className="relative w-full h-full"
                style={{ imageRendering: "pixelated" }}
              >
                <rect x="4" y="4" width="8" height="8" fill="#55FF55" />
                <rect x="12" y="4" width="8" height="8" fill="#00AA00" />
                <rect x="20" y="4" width="8" height="8" fill="#55FF55" />
                <rect x="4" y="12" width="8" height="8" fill="#00AA00" />
                <rect x="12" y="12" width="8" height="8" fill="#55FF55" />
                <rect x="20" y="12" width="8" height="8" fill="#00AA00" />
                <rect x="4" y="20" width="8" height="8" fill="#8B6914" />
                <rect x="12" y="20" width="8" height="8" fill="#7a5c12" />
                <rect x="20" y="20" width="8" height="8" fill="#8B6914" />
              </svg>
            </div>
            <span className="font-[family-name:var(--font-press-start)] text-[8px] md:text-[10px] text-mc-green tracking-wider">
              TELUGU
              <br />
              NETWORK
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-2 font-[family-name:var(--font-vt323)] text-lg text-mc-gray hover:text-mc-green transition-colors relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-mc-green group-hover:w-3/4 transition-all duration-300" />
              </a>
            ))}
            <a
              href="#join"
              className="mc-btn mc-btn-primary ml-4 !py-2 !px-5 !text-[10px]"
            >
              Play Now
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-mc-gray hover:text-mc-green transition-colors"
            aria-label="Toggle menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              {mobileOpen ? (
                <path
                  d="M6 6L18 18M6 18L18 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="square"
                />
              ) : (
                <>
                  <rect x="3" y="5" width="18" height="2" fill="currentColor" />
                  <rect x="3" y="11" width="18" height="2" fill="currentColor" />
                  <rect x="3" y="17" width="18" height="2" fill="currentColor" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-surface-900/98 backdrop-blur-xl border-t border-mc-green/10 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 font-[family-name:var(--font-vt323)] text-xl text-mc-gray hover:text-mc-green hover:bg-mc-green/5 transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
              <a
                href="#join"
                onClick={() => setMobileOpen(false)}
                className="mc-btn mc-btn-primary w-full mt-3 !text-[10px]"
              >
                Play Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
