"use client";

import React, { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function Main({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex flex-col min-h-screen ${className ?? ""}`}>
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

      <Footer />
    </div>
  );
}
