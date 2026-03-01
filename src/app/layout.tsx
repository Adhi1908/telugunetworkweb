import type { Metadata } from "next";
import { Inter, Press_Start_2P, VT323 } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const pressStart = Press_Start_2P({
  variable: "--font-press-start",
  weight: "400",
  subsets: ["latin"],
});

const vt323 = VT323({
  variable: "--font-vt323",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TELUGU NETWORK | Minecraft Server",
  description:
    "Join TELUGU NETWORK — the ultimate Minecraft server experience. Survival, BedWars, PvP and more. Play with the Telugu gaming community!",
  keywords: [
    "Minecraft",
    "Telugu",
    "Minecraft Server",
    "Telugu Network",
    "Survival",
    "BedWars",
    "PvP",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${pressStart.variable} ${vt323.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
