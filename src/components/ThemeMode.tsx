"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Theme = "cute" | "sassy";

interface ThemeContextType {
	theme: Theme;
	toggle: () => void;
	setTheme: (t: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
	const [theme, setTheme] = useState<Theme>("sassy");
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
		const saved = localStorage.getItem("theme");
		if (saved === "cute" || saved === "sassy") {
			setTheme(saved);
		}
	}, []);

	useEffect(() => {
		if (!mounted) return;

		const body = document.body;
		if (theme === "cute") body.classList.add("cute-mode");
		else body.classList.remove("cute-mode");

		// add a short transition helper class to enable CSS transitions
		body.classList.add("theme-transition");
		const id = window.setTimeout(() => body.classList.remove("theme-transition"), 380);

		localStorage.setItem("theme", theme);
		return () => window.clearTimeout(id);
	}, [theme, mounted]);

	const toggle = () => setTheme((p) => (p === "cute" ? "sassy" : "cute"));

	return (
		<ThemeContext.Provider value={{ theme, toggle, setTheme }}>
			{children}
		</ThemeContext.Provider>
	);
}

export function useTheme() {
	const ctx = useContext(ThemeContext);
	if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
	return ctx;
}

export function ThemeToggle({ className }: { className?: string }) {
	const { theme, toggle } = useTheme();
	const isCute = theme === "cute";

	return (
		<button
			onClick={toggle}
			className={`fixed top-4 right-4 z-[99999] px-4 py-2 font-black text-sm uppercase tracking-widest rounded-full hover:scale-110 transition-all shadow-lg text-white ${isCute ? "bg-pink-400" : "bg-black"} ${className ?? ""}`}
			style={{ pointerEvents: 'auto' }}
			aria-pressed={isCute}
		>
			{isCute ? "✨ Cute Mode" : "💅 Sassy Mode"}
		</button>
	);
}

export default ThemeProvider;

