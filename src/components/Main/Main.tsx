"use client";

import React, { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useTheme } from "../ThemeMode";

export default function Main({
  children,
  className,
  showFooter = true,
}: {
  children: ReactNode;
  className?: string;
  showFooter?: boolean;
}) {
  const { theme } = useTheme();
  const isCuteMode = theme === "cute";

  return (
    <div className={`flex flex-col min-h-screen ${isCuteMode ? "bg-gradient-to-br from-pink-100 via-purple-100 to-pink-200" : "bg-gradient-to-br from-pink-300 via-purple-300 to-yellow-200"} ${className ?? ""}`}>
      <a
        href="#main"
        className="sr-only focus:not-sr-only block p-2 m-2 rounded bg-black text-white"
      >
        Skip to content
      </a>

      <Header />

      <main id="main" className="flex-1 w-full">
        {children}
      </main>

      {showFooter && <Footer />}
    </div>
  );
}
