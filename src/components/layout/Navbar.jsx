"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-sans",
        scrolled ? "bg-white/95 backdrop-blur-md shadow-sm py-4" : "bg-transparent py-6 text-white"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 z-50 relative group">
          <div className={cn("w-10 h-10 rounded bg-primary flex items-center justify-center text-white font-display font-bold text-xl transition-transform group-hover:scale-105", scrolled ? "bg-primary" : "bg-white text-primary")}>
            M
          </div>
          <span className={cn("font-display font-bold text-2xl tracking-tight", scrolled ? "text-primary" : "text-white")}>
            MaxRoof
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link key={link.name} href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-accent relative group",
                pathname === link.href 
                  ? "text-accent font-semibold" 
                  : scrolled ? "text-foreground" : "text-white/90"
              )}
            >
              {link.name}
              <span className={cn(
                "absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full",
                pathname === link.href ? "w-full" : ""
              )} />
            </Link>
          ))}
          <Link href="/contact">
            <Button 
              className={cn(
                "ml-4 font-semibold transition-transform hover:scale-105",
                scrolled ? "" : "bg-white text-primary hover:bg-white/90"
              )}
            >
              Get Quote
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden z-50 relative"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <X className={scrolled ? "text-foreground" : "text-white"} />
          ) : (
            <Menu className={scrolled ? "text-foreground" : "text-white"} />
          )}
        </button>

        {/* Mobile Nav Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-0 left-0 w-full h-screen bg-background flex flex-col items-center justify-center gap-8 md:hidden"
            >
              {NAV_LINKS.map((link) => (
                <Link key={link.name} href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "text-2xl font-display font-bold transition-colors hover:text-primary",
                    pathname === link.href ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <Link href="/contact">
                <Button size="lg" className="mt-4" onClick={() => setIsOpen(false)}>
                  Get a Free Quote <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
