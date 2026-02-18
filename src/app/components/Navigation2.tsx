"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";


export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="flex items-center justify-between px-6 py-3 md:py-4 shadow-sm max-w-5xl mx-auto w-full bg-white dark:bg-[var(--background)] dark:border-b dark:border-[var(--foreground)] sticky top-4 z-50">
      {/* Logo */}
      <Link href="/" className="z-[60]">
        <img 
          src="/images/logo.svg" 
          alt="Logo"
          className="h-8"
        />
      </Link>

      {/* Mobile Menu Overlay */}
      <nav
        id="menu"
        className={`fixed md:relative top-0 left-0 h-screen md:h-auto overflow-hidden flex-col md:flex-row flex items-center justify-center md:justify-start gap-8 text-gray-400 dark:text-[var(--foreground)] text-sm font-mono transition-all duration-500 ease-in-out z-50 bg-white/95  backdrop-blur-md md:bg-transparent md:backdrop-blur-none
          ${menuOpen ? "w-full opacity-100" : "w-0 opacity-0 md:w-auto md:opacity-100"} 
        `}
      >
        <Link className="hover:text-[#67e242] transition-colors" href="/about" onClick={() => setMenuOpen(false)}>
          About
        </Link>
        <Link className="hover:text-[#67e242] transition-colors" href="../#projects" onClick={() => setMenuOpen(false)}>
          Projects
        </Link>
        <Link className="hover:text-[#67e242] transition-colors" href="/contact" onClick={() => setMenuOpen(false)}>
          Contact
        </Link>
        <Link className="hover:text-[#67e242] transition-colors" href="https://wanchanlin.webflow.io/" onClick={() => setMenuOpen(false)}>
          Design Site
        </Link>
        
        {/* Mobile Sign up (inside menu) */}
        {/* <Link className="md:hidden bg-indigo-600 text-white px-8 py-3 rounded-full text-base font-medium" href="#">
          Sign up
        </Link> */}
      </nav>

      {/* Right Side Actions */}
      <div className="flex items-center space-x-4 z-[60]">
        <ThemeToggle />
        
       

        {/* Custom Animated Hamburger Toggle */}
        <button 
          onClick={toggleMenu}
          className="md:hidden p-2 focus:outline-none"
          aria-label="Toggle Menu"
        >
          <span className="relative block w-6 h-5">
            {/* Top Bar */}
            <span
              className={`absolute left-0 top-0 w-6 h-0.5  dark:bg-[var(--foreground)]  transition-all duration-300 ease-in-out ${
                menuOpen ? "rotate-45 translate-y-2" : "translate-y-0"
              }`}
            />
            {/* Middle Bar */}
            <span
              className={`absolute left-0 top-2 w-6 h-0.5  dark:bg-[var(--foreground)]  transition-all duration-300 ease-in-out ${
                menuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            {/* Bottom Bar */}
            <span
              className={`absolute left-0 top-4 w-6 h-0.5  dark:bg-[var(--foreground)] transform transition-all duration-300 ease-in-out ${
                menuOpen ? "-rotate-45 -translate-y-2" : "translate-y-0"
              }`}
            />
          </span>
        </button>
      </div>
    </header>
  );
}