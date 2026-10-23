import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Caveat, JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const sans = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const hand = Caveat({ subsets: ["latin"], variable: "--font-hand", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  title: "Vishal Fulsundar | AI Systems & Data Science Engineer",
  description:
    "Vishal Fulsundar's channel: AI systems and data science projects, watchable like videos and presented like a profile.",
  openGraph: {
    title: "Vishal Fulsundar | AI Systems & Data Science Engineer",
    description: "Agentic AI, RAG, LLM infrastructure, deep learning and data science projects.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a66c2",
  width: "device-width",
  initialScale: 1,
};

const themeScript = `try{var t=localStorage.getItem('vf-theme')||'light';document.documentElement.classList.toggle('dark',t==='dark')}catch(e){}`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sans.variable} ${display.variable} ${hand.variable} ${mono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen bg-bg font-sans text-ink antialiased">{children}</body>
    </html>
  );
}
