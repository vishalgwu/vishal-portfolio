"use client";

import { Download } from "lucide-react";

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="no-print inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyber to-electric px-4 py-2 text-sm font-semibold text-white"
    >
      <Download className="h-4 w-4" /> Save as PDF
    </button>
  );
}
