"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Carousel({ 
  items, 
  itemsPerView = { mobile: 1, tablet: 2, desktop: 3 },
  autoPlay = false,
  interval = 5000,
  className,
  renderItem,
  ...props 
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const totalItems = items.length;
  // Calculate max index - if items fit on one screen, allow looping
  const maxIndex = totalItems <= itemsPerView.desktop 
    ? totalItems // Allow looping through all items
    : Math.max(0, totalItems - itemsPerView.desktop);

  const next = () => {
    if (totalItems <= itemsPerView.desktop) {
      // Loop through all items one by one
      setCurrentIndex((prev) => (prev >= totalItems - 1 ? 0 : prev + 1));
    } else {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }
  };

  const prev = () => {
    if (totalItems <= itemsPerView.desktop) {
      // Loop through all items one by one
      setCurrentIndex((prev) => (prev <= 0 ? totalItems - 1 : prev - 1));
    } else {
      setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
    }
  };

  useEffect(() => {
    if (autoPlay && !isHovered) {
      const timer = setInterval(() => {
        if (totalItems <= itemsPerView.desktop) {
          setCurrentIndex((prev) => (prev >= totalItems - 1 ? 0 : prev + 1));
        } else {
          setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
        }
      }, interval);
      return () => clearInterval(timer);
    }
  }, [autoPlay, interval, isHovered, maxIndex, totalItems, itemsPerView.desktop]);

  return (
    <div 
      className={cn("relative w-full", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      <div className="overflow-hidden">
        <motion.div
          className="flex"
          animate={{
            x: `-${currentIndex * (100 / itemsPerView.desktop)}%`,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
        >
          {items.map((item, index) => (
            <div
              key={index}
              className="flex-shrink-0 px-2 md:px-3"
              style={{ width: `${100 / itemsPerView.desktop}%` }}
            >
              {renderItem ? renderItem(item, index) : item}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prev}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 transition-all duration-300 hover:scale-110"
        aria-label="Previous"
      >
        <ChevronLeft className="w-6 h-6 text-primary" />
      </button>
      <button
        onClick={next}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 transition-all duration-300 hover:scale-110"
        aria-label="Next"
      >
        <ChevronRight className="w-6 h-6 text-primary" />
      </button>

      {/* Dots Indicator */}
      {totalItems > itemsPerView.desktop && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                currentIndex === index
                  ? "bg-primary w-8"
                  : "bg-primary/30 hover:bg-primary/50 w-2"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
      {totalItems <= itemsPerView.desktop && totalItems > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: totalItems }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                currentIndex === index
                  ? "bg-primary w-8"
                  : "bg-primary/30 hover:bg-primary/50 w-2"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
