"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

interface CounterProps {
  end: number;
  suffix?: string;
  duration?: number;
}

function AnimatedCounter({ end, suffix = "", duration = 2 }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = end / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [inView, end, duration]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

const STATS = [
  {
    value: 247,
    suffix: "+",
    label: "Active Players",
    icon: "👤",
    color: "text-mc-green",
  },
  {
    value: 99,
    suffix: ".9%",
    label: "Server Uptime",
    icon: "⚡",
    color: "text-mc-gold",
  },
  {
    value: 15,
    suffix: "+",
    label: "Custom Worlds",
    icon: "🌍",
    color: "text-mc-aqua",
  },
  {
    value: 500,
    suffix: "+",
    label: "Discord Members",
    icon: "💬",
    color: "text-mc-light-purple",
  },
];

export default function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative py-16 md:py-20">
      <div className="grass-divider" />
      <div className="dirt-divider" />

      <div
        className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-20"
        ref={ref}
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="mc-card p-6 md:p-8 text-center group hover:scale-105 transition-transform duration-300"
            >
              <div className="text-3xl mb-3">{stat.icon}</div>
              <div
                className={`font-[family-name:var(--font-press-start)] text-lg md:text-2xl ${stat.color}`}
              >
                <AnimatedCounter
                  end={stat.value}
                  suffix={stat.suffix}
                  duration={1.5}
                />
              </div>
              <div className="mt-2 font-[family-name:var(--font-vt323)] text-lg md:text-xl text-mc-gray">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="dirt-divider" />
      <div className="grass-divider" />
    </section>
  );
}
