"use client";

const FOOTER_LINKS = [
  {
    title: "Server",
    links: [
      { label: "Game Modes", href: "#gamemodes" },
      { label: "Features", href: "#features" },
      { label: "How to Join", href: "#join" },
      { label: "Server Rules", href: "#" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Discord", href: "#" },
      { label: "YouTube", href: "#" },
      { label: "Instagram", href: "#" },
      { label: "Forums", href: "#" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "FAQ", href: "#" },
      { label: "Report a Bug", href: "#" },
      { label: "Ban Appeal", href: "#" },
      { label: "Contact Staff", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-mc-green/10">
      <div className="grass-divider" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid md:grid-cols-5 gap-8 md:gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative h-8 w-8">
                <svg
                  viewBox="0 0 32 32"
                  className="w-full h-full"
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
              <span className="font-[family-name:var(--font-press-start)] text-[8px] text-mc-green">
                TELUGU NETWORK
              </span>
            </div>
            <p className="text-sm text-mc-gray/60 leading-relaxed max-w-xs">
              The ultimate Telugu Minecraft community. Join hundreds of players
              in an epic gaming experience with custom features, events, and a
              welcoming community.
            </p>

            {/* Server IP in footer */}
            <div className="mt-4 inline-flex items-center gap-2 px-3 py-2 bg-surface-700/50 border border-mc-green/10">
              <span className="w-2 h-2 bg-mc-green rounded-full animate-pulse" />
              <span className="font-[family-name:var(--font-vt323)] text-base text-mc-green">
                play.telugunetwork.net
              </span>
            </div>
          </div>

          {/* Links */}
          {FOOTER_LINKS.map((section) => (
            <div key={section.title}>
              <h4 className="font-[family-name:var(--font-press-start)] text-[9px] text-mc-gold mb-4">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="font-[family-name:var(--font-vt323)] text-lg text-mc-gray/60 hover:text-mc-green transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-6 border-t border-mc-green/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-[family-name:var(--font-vt323)] text-base text-mc-gray/40">
            © {new Date().getFullYear()} Telugu Network. Not affiliated with
            Mojang Studios.
          </p>
          <p className="font-[family-name:var(--font-vt323)] text-base text-mc-gray/30">
            Made with ❤ for the Telugu Gaming Community
          </p>
        </div>
      </div>
    </footer>
  );
}
