"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FRAME_COUNT = 192;
const FRAME_PATH = (i: number) =>
  `/frames/frame_${String(i).padStart(4, "0")}.webp`;

// Frame where the video's baked-in "TELUGU NETWORK" title fully disappears.
// UI elements spawn after this point. Adjust if your video changes.
const TITLE_END_FRAME = 90;
const TITLE_END_FRACTION = TITLE_END_FRAME / FRAME_COUNT; // ~0.47

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [loadProgress, setLoadProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [scrollFraction, setScrollFraction] = useState(0);
  const frameIndexRef = useRef(0);
  const rafRef = useRef<number>(0);

  const uiVisible = loaded && scrollFraction >= TITLE_END_FRACTION;

  // Preload all frames
  useEffect(() => {
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = FRAME_PATH(i);
      img.onload = () => {
        loadedCount++;
        setLoadProgress(Math.floor((loadedCount / FRAME_COUNT) * 100));
        if (loadedCount === FRAME_COUNT) {
          setLoaded(true);
          drawFrame(0);
        }
      };
      images.push(img);
    }
    imagesRef.current = images;
  }, []);

  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const img = imagesRef.current[index];
    if (!img || !img.complete) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Cover mode
    const scale = Math.max(
      canvas.width / img.naturalWidth,
      canvas.height / img.naturalHeight
    );
    const w = img.naturalWidth * scale;
    const h = img.naturalHeight * scale;
    const x = (canvas.width - w) / 2;
    const y = (canvas.height - h) / 2;

    ctx.drawImage(img, x, y, w, h);
  }, []);

  // Scroll-driven frame animation
  useEffect(() => {
    if (!loaded) return;

    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const fraction = Math.max(0, Math.min(1, scrolled / sectionHeight));
      const newIndex = Math.min(
        FRAME_COUNT - 1,
        Math.floor(fraction * FRAME_COUNT)
      );

      setScrollFraction(fraction);

      if (newIndex !== frameIndexRef.current) {
        frameIndexRef.current = newIndex;
        cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => drawFrame(newIndex));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", () => drawFrame(frameIndexRef.current));
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [loaded, drawFrame]);

  // Staggered spawn animation variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring" as const, stiffness: 120, damping: 18 },
    },
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative"
      style={{ height: "400vh" }}
    >
      {/* Sticky viewport container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Canvas background */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ imageRendering: "auto" }}
        />

        {/* Dark overlay — fades in only when UI spawns */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-surface-900/50 via-surface-900/20 to-surface-900/90 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: uiVisible ? 1 : 0 }}
          transition={{ duration: 0.8 }}
        />

        {/* Loading indicator */}
        {!loaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-surface-900 z-20">
            <div className="w-64 h-3 bg-surface-700 border border-mc-green/30 overflow-hidden">
              <div
                className="h-full bg-mc-green transition-all duration-200"
                style={{ width: `${loadProgress}%` }}
              />
            </div>
            <p className="mt-4 font-[family-name:var(--font-vt323)] text-xl text-mc-green">
              Loading world... {loadProgress}%
            </p>
          </div>
        )}

        {/* Scroll indicator — visible BEFORE title disappears to encourage scrolling */}
        <AnimatePresence>
          {loaded && !uiVisible && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
            >
              <span className="font-[family-name:var(--font-vt323)] text-base text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                Scroll to explore
              </span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-5 h-8 border-2 border-white/40 rounded-full flex justify-center pt-1 shadow-[0_0_8px_rgba(0,0,0,0.5)]"
              >
                <div className="w-1 h-2 bg-mc-green rounded-full" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating pixel particles — only after UI spawns */}
        <AnimatePresence>
          {uiVisible && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0 overflow-hidden pointer-events-none"
            >
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-mc-green/30 animate-float"
                  style={{
                    left: `${(i * 5.1 + 2) % 100}%`,
                    top: `${(i * 7.3 + 5) % 100}%`,
                    animationDelay: `${(i * 0.7) % 5}s`,
                    animationDuration: `${3 + (i % 4)}s`,
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hero UI Content — spawns ONLY after video title disappears */}
        <AnimatePresence>
          {uiVisible && (
            <motion.div
              className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              {/* Server badge */}
              <motion.div variants={itemVariants} className="mb-6 md:mb-8">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-mc-green/10 border border-mc-green/20 font-[family-name:var(--font-vt323)] text-lg md:text-xl text-mc-green backdrop-blur-sm">
                  <span className="w-2 h-2 bg-mc-green rounded-full animate-pulse" />
                  Server Online — Java & Bedrock
                </span>
              </motion.div>

              {/* Main Title */}
              <motion.h1
                variants={{
                  hidden: { opacity: 0, scale: 0.7, y: 40 },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    transition: {
                      type: "spring" as const,
                      stiffness: 80,
                      damping: 15,
                      delay: 0.15,
                    },
                  },
                }}
                className="font-[family-name:var(--font-press-start)] text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-mc-green glow-green leading-relaxed md:leading-relaxed"
              >
                TELUGU
                <br />
                <span className="text-mc-gold glow-gold">NETWORK</span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                variants={itemVariants}
                className="mt-4 md:mt-6 font-[family-name:var(--font-vt323)] text-2xl md:text-3xl lg:text-4xl text-mc-gray"
              >
                The Ultimate Minecraft Experience
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                variants={itemVariants}
                className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-4"
              >
                <a
                  href="#join"
                  className="mc-btn mc-btn-primary !text-sm !px-8 !py-4"
                >
                  ⚔ Start Playing
                </a>
                <a
                  href="#gamemodes"
                  className="mc-btn mc-btn-gold !text-sm !px-8 !py-4"
                >
                  ★ Game Modes
                </a>
              </motion.div>

              {/* Player count */}
              <motion.div
                variants={itemVariants}
                className="mt-8 flex items-center gap-6 font-[family-name:var(--font-vt323)] text-xl text-mc-gray"
              >
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-mc-green rounded-full" />
                  247+ Players
                </span>
                <span className="w-px h-5 bg-mc-gray/30" />
                <span>99.9% Uptime</span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
