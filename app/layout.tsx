import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Inter, JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vishal Fulsundar | AI Systems & Data Science Engineer",
  description:
    "Cinematic portfolio of Vishal Fulsundar: agentic RAG, LLM memory governance, hallucination research, and production ML systems.",
  openGraph: {
    title: "Vishal Fulsundar | AI Systems & Data Science Engineer",
    description:
      "Agentic AI, RAG, LLM infrastructure, deep learning and data science projects, browsable Netflix-style.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#07090e",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${bricolage.variable} ${jakarta.variable} ${inter.variable} ${jetbrains.variable}`}>
      <body className="min-h-screen bg-obsidian font-sans text-slate-200 antialiased">
        {children}
      </body>
    </html>
  );
}
