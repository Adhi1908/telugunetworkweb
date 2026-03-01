"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const SOCIALS = [
  {
    name: "Discord",
    description: "Join our Discord for updates, events, and to chat with the community.",
    members: "500+",
    color: "#5865F2",
    href: "https://discord.telugunetwork.net",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    description: "Watch server highlights, tutorials, and event recaps on our channel.",
    members: "1K+",
    color: "#FF0000",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

export default function Community() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="community" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 mb-4 bg-mc-light-purple/10 border border-mc-light-purple/20 font-[family-name:var(--font-vt323)] text-lg text-mc-light-purple">
            Join the Community
          </span>
          <h2 className="font-[family-name:var(--font-press-start)] text-xl md:text-3xl text-mc-white leading-relaxed">
            Connect With Us
          </h2>
          <p className="mt-4 font-[family-name:var(--font-vt323)] text-2xl text-mc-gray max-w-2xl mx-auto">
            Be part of the Telugu gaming family. Follow us everywhere!
          </p>
        </motion.div>

        {/* Social Cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {SOCIALS.map((social, i) => (
            <motion.a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
              className="mc-card p-6 group cursor-pointer hover:scale-[1.04] transition-all duration-300 text-center"
              style={
                {
                  "--social-color": social.color,
                } as React.CSSProperties
              }
            >
              <div
                className="inline-flex p-4 mb-4 transition-colors"
                style={{
                  background: `${social.color}15`,
                  border: `1px solid ${social.color}30`,
                  color: social.color,
                }}
              >
                {social.icon}
              </div>
              <h3 className="font-[family-name:var(--font-press-start)] text-xs text-mc-white">
                {social.name}
              </h3>
              <p className="mt-1 font-[family-name:var(--font-vt323)] text-lg" style={{ color: social.color }}>
                {social.members} members
              </p>
              <p className="mt-3 text-sm text-mc-gray/70 leading-relaxed">
                {social.description}
              </p>
              <div
                className="mt-4 mc-btn w-full !text-[9px] !py-2"
                style={{
                  borderColor: `${social.color} transparent transparent ${social.color}`,
                  background: `${social.color}20`,
                  color: social.color,
                }}
              >
                Follow
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
