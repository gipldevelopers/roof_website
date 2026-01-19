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
        "bg-light-brown shadow-sm border-b border-gray-200/50"
      )}
    >
      {/* Decorative Top Border */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo with unique design */}
          {/* Logo with interactive effect */}
          <Link href="/" className="flex items-center z-50 relative group group/logo">
            <img 
              src="/logo/6f48a7af-3abc-49b9-8548-aa14faedb439-removebg-preview.png" 
              alt="Roofy Logo" 
              className="h-10 md:h-12 w-auto transition-all duration-300 group-hover/logo:scale-105"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link, index) => (
              <Link 
                key={link.name} 
                href={link.href}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg group",
                  pathname === link.href 
                    ? "text-primary" 
                    : "text-foreground/70 hover:text-foreground"
                )}
              >
                <span className="relative z-10">{link.name}</span>
                {/* Hover background effect */}
                <motion.div
                  className="absolute inset-0 bg-primary/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={false}
                />
                {/* Active indicator */}
                {pathname === link.href && (
                  <motion.div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"
                    layoutId="activeIndicator"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {/* Underline animation */}
                <span className={cn(
                  "absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-3/4",
                  pathname === link.href ? "w-3/4" : ""
                )} />
              </Link>
            ))}
            
            {/* CTA Button with unique design */}
            <Link href="/contact" className="ml-2">
              <Button className="group/btn">
                <span className="relative z-10 flex items-center gap-1.5">
                  Get Quote
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                </span>
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden z-50 relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6 text-foreground" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6 text-foreground" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 w-80 max-w-[85vw] h-screen bg-white shadow-2xl z-50 md:hidden flex flex-col"
            >
              {/* Mobile Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center">
                  <img 
                    src="/logo/6f48a7af-3abc-49b9-8548-aa14faedb439-removebg-preview.png" 
                    alt="Roofty Logo" 
                    className="h-10 w-auto"
                  />
                </Link>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5 text-foreground" />
                </button>
              </div>

              {/* Mobile Nav Links */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="flex flex-col gap-2">
                  {NAV_LINKS.map((link, index) => (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "block px-4 py-3 rounded-xl text-base font-medium transition-all duration-200",
                          pathname === link.href
                            ? "bg-primary/10 text-primary font-semibold"
                            : "text-foreground/70 hover:bg-gray-50 hover:text-foreground"
                        )}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Mobile CTA */}
              <div className="p-6 border-t border-gray-100">
                <Link href="/contact" onClick={() => setIsOpen(false)}>
                  <Button size="lg" className="w-full bg-primary text-white hover:bg-primary/90 shadow-md">
                    Get a Free Quote <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
