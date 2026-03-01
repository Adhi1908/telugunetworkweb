"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const STEPS = [
  {
    step: "01",
    title: "Launch Minecraft",
    description: "Open Minecraft Java Edition (1.20+) or Bedrock Edition on your device.",
  },
  {
    step: "02",
    title: "Add Server",
    description:
      'Go to Multiplayer → Add Server. Enter the server name as "Telugu Network".',
  },
  {
    step: "03",
    title: "Enter IP Address",
    description: "Paste the server IP address shown below into the Server Address field.",
  },
  {
    step: "04",
    title: "Join & Play!",
    description: "Click Join Server and start your adventure. See you in-game!",
  },
];

const SERVER_IP = "play.telugunetwork.net";

export default function HowToJoin() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [copied, setCopied] = useState(false);

  const copyIP = async () => {
    try {
      await navigator.clipboard.writeText(SERVER_IP);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      const el = document.createElement("textarea");
      el.value = SERVER_IP;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section id="join" className="relative py-24 md:py-32 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-mc-green/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 mb-4 bg-mc-aqua/10 border border-mc-aqua/20 font-[family-name:var(--font-vt323)] text-lg text-mc-aqua">
            Ready to Play?
          </span>
          <h2 className="font-[family-name:var(--font-press-start)] text-xl md:text-3xl text-mc-white leading-relaxed">
            How to Join
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
              className="mc-card p-5 relative group"
            >
              {/* Step number */}
              <div className="font-[family-name:var(--font-press-start)] text-3xl text-mc-green/15 absolute top-3 right-4">
                {step.step}
              </div>
              <div className="relative">
                <div className="w-8 h-8 flex items-center justify-center bg-mc-green/10 border border-mc-green/30 mb-4">
                  <span className="font-[family-name:var(--font-press-start)] text-[8px] text-mc-green">
                    {step.step}
                  </span>
                </div>
                <h3 className="font-[family-name:var(--font-press-start)] text-[10px] text-mc-white mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-mc-gray/80 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Server IP Box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 md:mt-16"
        >
          <div className="mc-card p-6 md:p-8 text-center max-w-2xl mx-auto border-mc-green/30 hover:border-mc-green/50 transition-colors">
            <p className="font-[family-name:var(--font-vt323)] text-xl text-mc-gray mb-4">
              Server IP Address
            </p>

            {/* IP Display */}
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <div className="px-6 py-4 bg-surface-900 border-2 border-mc-green/30">
                <span className="font-[family-name:var(--font-press-start)] text-sm md:text-lg text-mc-green glow-green tracking-widest">
                  {SERVER_IP}
                </span>
              </div>
              <button
                onClick={copyIP}
                className={`mc-btn ${copied ? "mc-btn-primary" : ""
                  } !py-4 !px-6 !text-[10px] transition-all`}
              >
                {copied ? "✓ Copied!" : "Copy IP"}
              </button>
            </div>

            {/* Editions */}
            <div className="mt-6 flex items-center justify-center gap-4 font-[family-name:var(--font-vt323)] text-lg text-mc-gray">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-mc-green" />
                Java Edition
              </span>
              <span className="w-px h-4 bg-mc-gray/30" />
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-mc-aqua" />
                Bedrock Edition
              </span>
            </div>

            <p className="mt-3 font-[family-name:var(--font-vt323)] text-base text-mc-gray/60">
              Version 1.20+ supported
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
