"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { LiveStream } from "@/app/api/live-streams/route";

const REFRESH_INTERVAL = 60_000; // Re-fetch every 60s (server caches for 3 min)

function formatViewers(count: string | undefined): string {
  if (!count) return "Live";
  const n = parseInt(count, 10);
  if (isNaN(n)) return "Live";
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K watching`;
  return `${n} watching`;
}

export default function LiveStreams() {
  const [streams, setStreams] = useState<LiveStream[]>([]);
  const [loading, setLoading] = useState(true);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const fetchStreams = async () => {
    try {
      const res = await fetch("/api/live-streams");
      const data = await res.json();
      setStreams(data.streams || []);
    } catch {
      // Silently fail — section just won't show
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStreams();
    const interval = setInterval(fetchStreams, REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  // Don't render anything if no streams or still loading with no data
  if (!loading && streams.length === 0) return null;
  if (loading && streams.length === 0) return null;

  return (
    <section className="relative py-24 md:py-32 overflow-hidden" ref={ref}>
      {/* Subtle red/live ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-mc-red/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 bg-mc-red/10 border border-mc-red/20 font-[family-name:var(--font-vt323)] text-lg text-mc-red">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mc-red opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-mc-red" />
            </span>
            Currently Live
          </span>
          <h2 className="font-[family-name:var(--font-press-start)] text-xl md:text-3xl text-mc-white leading-relaxed">
            Watch Now
          </h2>
          <p className="mt-4 font-[family-name:var(--font-vt323)] text-2xl text-mc-gray max-w-2xl mx-auto">
            Community members streaming on Telugu Network right now
          </p>
        </motion.div>

        {/* Stream Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {streams.map((stream, i) => (
            <motion.a
              key={stream.videoId}
              href={`https://www.youtube.com/watch?v=${stream.videoId}`}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
              className="group mc-card overflow-hidden hover:scale-[1.03] transition-all duration-300 hover:border-mc-red/40"
            >
              {/* Thumbnail */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={stream.thumbnail}
                  alt={stream.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  width={480}
                  height={270}
                />

                {/* LIVE badge */}
                <div className="absolute top-2 left-2 flex items-center gap-1.5 px-2 py-1 bg-mc-red/90 backdrop-blur-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
                  </span>
                  <span className="font-[family-name:var(--font-press-start)] text-[7px] text-white uppercase tracking-wider">
                    Live
                  </span>
                </div>

                {/* Viewer count */}
                {stream.viewers && (
                  <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 backdrop-blur-sm">
                    <span className="font-[family-name:var(--font-vt323)] text-sm text-white">
                      {formatViewers(stream.viewers)}
                    </span>
                  </div>
                )}

                {/* Play overlay on hover */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-colors duration-300">
                  <div className="w-12 h-12 flex items-center justify-center bg-mc-red/90 rounded-full opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300">
                    <svg
                      viewBox="0 0 24 24"
                      fill="white"
                      className="w-5 h-5 ml-0.5"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="p-4">
                <h3 className="font-[family-name:var(--font-vt323)] text-lg text-mc-white leading-tight line-clamp-2 group-hover:text-mc-red transition-colors">
                  {stream.title}
                </h3>
                <p className="mt-2 font-[family-name:var(--font-vt323)] text-base text-mc-gray/70">
                  {stream.channelTitle}
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
