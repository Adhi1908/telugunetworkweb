"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const MODES = [
  {
    title: "Survival",
    subtitle: "Classic Adventure",
    description:
      "Gather resources, build epic bases, trade with villagers, and survive the night. Our survival world features custom enchants, land claiming, and a thriving player economy.",
    color: "mc-green",
    glowClass: "glow-green",
    features: ["Custom Enchants", "Land Claims", "Player Shops", "McMMO Skills"],
    icon: (
      <svg viewBox="0 0 48 48" className="w-full h-full" style={{ imageRendering: "pixelated" }}>
        {/* Grass block icon */}
        <rect x="4" y="4" width="40" height="16" fill="#59C135" />
        <rect x="4" y="20" width="40" height="24" fill="#8B6914" />
        <rect x="12" y="8" width="8" height="4" fill="#4aad2b" />
        <rect x="28" y="10" width="6" height="4" fill="#4aad2b" />
        <rect x="8" y="24" width="6" height="6" fill="#7a5c12" />
        <rect x="20" y="28" width="8" height="8" fill="#9c7618" />
        <rect x="34" y="22" width="6" height="4" fill="#7a5c12" />
      </svg>
    ),
  },
  {
    title: "BedWars",
    subtitle: "Competitive PvP",
    description:
      "Protect your bed, destroy your enemies! Fast-paced team combat with resource gathering, bridge building, and intense PvP battles. Solo, Doubles, and 4v4v4v4 modes available.",
    color: "mc-red",
    glowClass: "glow-gold",
    features: ["Solo & Teams", "Custom Maps", "Leaderboards", "Seasonal Ranks"],
    icon: (
      <svg viewBox="0 0 48 48" className="w-full h-full" style={{ imageRendering: "pixelated" }}>
        {/* Sword icon */}
        <rect x="34" y="4" width="6" height="6" fill="#55FFFF" />
        <rect x="28" y="10" width="6" height="6" fill="#55FFFF" />
        <rect x="22" y="16" width="6" height="6" fill="#AAAAAA" />
        <rect x="16" y="22" width="6" height="6" fill="#AAAAAA" />
        <rect x="10" y="28" width="6" height="6" fill="#8B6914" />
        <rect x="4" y="34" width="6" height="6" fill="#8B6914" />
        <rect x="16" y="28" width="6" height="6" fill="#8B6914" />
        <rect x="4" y="28" width="6" height="6" fill="#8B6914" />
        <rect x="10" y="34" width="6" height="6" fill="#555555" />
      </svg>
    ),
  },
];

export default function GameModes() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="gamemodes" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-grid-pattern" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="inline-block px-4 py-1.5 mb-4 bg-mc-green/10 border border-mc-green/20 font-[family-name:var(--font-vt323)] text-lg text-mc-green">
            Choose Your Path
          </span>
          <h2 className="font-[family-name:var(--font-press-start)] text-xl md:text-3xl text-mc-white leading-relaxed">
            Game Modes
          </h2>
          <p className="mt-4 font-[family-name:var(--font-vt323)] text-2xl text-mc-gray max-w-2xl mx-auto">
            Two unique experiences, endless adventures. Pick your favorite
            or play them all!
          </p>
        </motion.div>

        {/* Mode Cards */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {MODES.map((mode, i) => (
            <motion.div
              key={mode.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
              className="group mc-card rounded-none p-6 md:p-8 transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(85,255,85,0.08)]"
            >
              {/* Icon + Title */}
              <div className="flex items-start gap-5">
                <div className="shrink-0 w-16 h-16 md:w-20 md:h-20 p-2 bg-surface-700/50 border border-mc-green/10 group-hover:border-mc-green/30 transition-colors">
                  {mode.icon}
                </div>
                <div>
                  <h3
                    className={`font-[family-name:var(--font-press-start)] text-sm md:text-base text-${mode.color} ${mode.glowClass}`}
                  >
                    {mode.title}
                  </h3>
                  <p className="mt-1 font-[family-name:var(--font-vt323)] text-xl text-mc-gray">
                    {mode.subtitle}
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="mt-5 text-sm md:text-base text-mc-gray/80 leading-relaxed">
                {mode.description}
              </p>

              {/* Features */}
              <div className="mt-6 flex flex-wrap gap-2">
                {mode.features.map((feat) => (
                  <span
                    key={feat}
                    className="px-3 py-1.5 bg-surface-700/50 border border-mc-green/10 font-[family-name:var(--font-vt323)] text-base text-mc-green/80"
                  >
                    {feat}
                  </span>
                ))}
              </div>

              {/* Play Button */}
              <div className="mt-8">
                <a
                  href="#join"
                  className={`mc-btn ${
                    i === 0 ? "mc-btn-primary" : "mc-btn-gold"
                  } w-full !text-[10px]`}
                >
                  Play {mode.title}
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
