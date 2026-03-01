"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const FEATURES = [
  {
    title: "Anti-Cheat",
    description:
      "Advanced cheat detection keeps gameplay fair for everyone. No hackers, no exploiters — just pure skill.",
    icon: (
      <svg viewBox="0 0 32 32" className="w-8 h-8" style={{ imageRendering: "pixelated" }}>
        <rect x="12" y="2" width="8" height="4" fill="#FF5555" />
        <rect x="8" y="6" width="16" height="4" fill="#FF5555" />
        <rect x="6" y="10" width="20" height="12" fill="#FF5555" />
        <rect x="12" y="14" width="8" height="4" fill="#FFFFFF" />
        <rect x="8" y="22" width="16" height="4" fill="#FF5555" />
        <rect x="12" y="26" width="8" height="4" fill="#FF5555" />
      </svg>
    ),
    color: "mc-red",
  },
  {
    title: "Custom Plugins",
    description:
      "Unique gameplay mechanics you won't find anywhere else. Custom-coded features made exclusively for Telugu Network.",
    icon: (
      <svg viewBox="0 0 32 32" className="w-8 h-8" style={{ imageRendering: "pixelated" }}>
        <rect x="6" y="4" width="20" height="4" fill="#AA00AA" />
        <rect x="4" y="8" width="24" height="16" fill="#AA00AA" />
        <rect x="8" y="12" width="4" height="4" fill="#FF55FF" />
        <rect x="14" y="12" width="4" height="4" fill="#FF55FF" />
        <rect x="20" y="12" width="4" height="4" fill="#FF55FF" />
        <rect x="8" y="18" width="16" height="2" fill="#FF55FF" />
        <rect x="6" y="24" width="20" height="4" fill="#AA00AA" />
      </svg>
    ),
    color: "mc-light-purple",
  },
  {
    title: "Weekly Events",
    description:
      "Build competitions, PvP tournaments, treasure hunts, and surprise events every week with exclusive rewards.",
    icon: (
      <svg viewBox="0 0 32 32" className="w-8 h-8" style={{ imageRendering: "pixelated" }}>
        <rect x="12" y="2" width="8" height="4" fill="#FFAA00" />
        <rect x="8" y="6" width="16" height="4" fill="#FFAA00" />
        <rect x="10" y="10" width="12" height="8" fill="#FFAA00" />
        <rect x="12" y="18" width="8" height="4" fill="#FFAA00" />
        <rect x="8" y="22" width="16" height="4" fill="#FFAA00" />
        <rect x="14" y="10" width="4" height="4" fill="#FFFF55" />
      </svg>
    ),
    color: "mc-gold",
  },
  {
    title: "Friendly Community",
    description:
      "A welcoming Telugu gaming community. Make friends, join teams, and be part of something awesome.",
    icon: (
      <svg viewBox="0 0 32 32" className="w-8 h-8" style={{ imageRendering: "pixelated" }}>
        <rect x="4" y="6" width="8" height="8" fill="#55FF55" />
        <rect x="2" y="16" width="12" height="10" fill="#55FF55" />
        <rect x="20" y="6" width="8" height="8" fill="#55FFFF" />
        <rect x="18" y="16" width="12" height="10" fill="#55FFFF" />
        <rect x="12" y="10" width="8" height="6" fill="#FFAA00" />
        <rect x="10" y="18" width="12" height="8" fill="#FFAA00" />
      </svg>
    ),
    color: "mc-green",
  },
  {
    title: "24/7 Online",
    description:
      "Our servers never sleep. High-performance hardware with 99.9% uptime, low latency, and zero lag.",
    icon: (
      <svg viewBox="0 0 32 32" className="w-8 h-8" style={{ imageRendering: "pixelated" }}>
        <rect x="4" y="4" width="24" height="18" fill="#555555" />
        <rect x="6" y="6" width="20" height="14" fill="#1a1a2e" />
        <rect x="10" y="10" width="4" height="6" fill="#55FF55" />
        <rect x="16" y="8" width="4" height="8" fill="#55FF55" />
        <rect x="8" y="24" width="16" height="4" fill="#555555" />
        <rect x="6" y="28" width="20" height="2" fill="#7F7F7F" />
      </svg>
    ),
    color: "mc-aqua",
  },
  {
    title: "Ranks & Rewards",
    description:
      "Progress through unique ranks, unlock perks, earn cosmetics, and show off your achievements to the server.",
    icon: (
      <svg viewBox="0 0 32 32" className="w-8 h-8" style={{ imageRendering: "pixelated" }}>
        <rect x="12" y="2" width="8" height="4" fill="#FFAA00" />
        <rect x="8" y="6" width="4" height="8" fill="#FFAA00" />
        <rect x="20" y="6" width="4" height="8" fill="#FFAA00" />
        <rect x="10" y="14" width="12" height="4" fill="#FFAA00" />
        <rect x="14" y="8" width="4" height="6" fill="#4AEDD9" />
        <rect x="10" y="20" width="4" height="8" fill="#FFAA00" />
        <rect x="18" y="20" width="4" height="8" fill="#FFAA00" />
      </svg>
    ),
    color: "mc-gold",
  },
];

export default function Features() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="features" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-50" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="inline-block px-4 py-1.5 mb-4 bg-mc-gold/10 border border-mc-gold/20 font-[family-name:var(--font-vt323)] text-lg text-mc-gold">
            Why Choose Us
          </span>
          <h2 className="font-[family-name:var(--font-press-start)] text-xl md:text-3xl text-mc-white leading-relaxed">
            Server Features
          </h2>
          <p className="mt-4 font-[family-name:var(--font-vt323)] text-2xl text-mc-gray max-w-2xl mx-auto">
            Everything you need for the ultimate Minecraft experience
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
              className="mc-card p-6 group hover:scale-[1.03] transition-all duration-300"
            >
              <div
                className={`inline-flex p-3 bg-${feature.color}/10 border border-${feature.color}/20 mb-4 group-hover:border-${feature.color}/40 transition-colors`}
              >
                {feature.icon}
              </div>
              <h3
                className={`font-[family-name:var(--font-press-start)] text-xs text-${feature.color}`}
              >
                {feature.title}
              </h3>
              <p className="mt-3 text-sm text-mc-gray/80 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
