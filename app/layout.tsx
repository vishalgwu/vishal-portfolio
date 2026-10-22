import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const title = "Vishal Fulsundar | AI Systems & Data Science Engineer";
const description =
  "Portfolio of Vishal Fulsundar: agentic RAG, LLM memory governance, hallucination research, MLOps and LLMOps, and production data science. M.S. Data Science, George Washington University.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: "profile" },
  icons: { icon: `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/icon.svg` },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-paper font-sans text-ink antialiased">{children}</body>
    </html>
  );
}
