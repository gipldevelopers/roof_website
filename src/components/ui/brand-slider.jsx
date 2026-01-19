"use client";

import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function BrandSlider({ 
  logos = [], 
  autoPlay = true,
  interval = 3000,
  className,
  ...props 
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const sliderRef = useRef(null);
  const containerRef = useRef(null);
  const dragThreshold = 50;

  const totalItems = logos.length;
  
  // Cards per view: Mobile (3), Tablet (4), Desktop (6)
  const [cardsPerView, setCardsPerView] = useState(3);

  useEffect(() => {
    const updateCardsPerView = () => {
      if (typeof window !== 'undefined') {
        if (window.innerWidth >= 1024) {
          setCardsPerView(6); // Desktop
        } else if (window.innerWidth >= 768) {
          setCardsPerView(4); // Tablet
        } else {
          setCardsPerView(3); // Mobile
        }
      }
    };

    updateCardsPerView();
    window.addEventListener('resize', updateCardsPerView);
    return () => window.removeEventListener('resize', updateCardsPerView);
  }, []);

  const maxIndex = Math.max(0, totalItems - cardsPerView);

  const nextSlide = () => {
    setCurrentIndex((prev) => {
      if (prev >= maxIndex) return 0;
      return prev + 1;
    });
    setDragOffset(0);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => {
      if (prev <= 0) return maxIndex;
      return prev - 1;
    });
    setDragOffset(0);
  };

  // Auto-play
  useEffect(() => {
    if (autoPlay && !isHovered && !isDragging) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => {
          if (prev >= maxIndex) return 0;
          return prev + 1;
        });
      }, interval);
      return () => clearInterval(timer);
    }
  }, [autoPlay, interval, isHovered, isDragging, maxIndex]);

  // Touch Events
  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
    setIsDragging(true);
    setDragOffset(0);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const current = e.touches[0].clientX;
    setCurrentX(current);
    const diff = startX - current;
    setDragOffset(-diff);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    const diff = startX - currentX;
    
    if (Math.abs(diff) > dragThreshold) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    } else {
      setDragOffset(0);
    }
    
    setIsDragging(false);
    setStartX(0);
    setCurrentX(0);
  };

  // Mouse Events with Window Binding
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const current = e.clientX;
      setCurrentX(current);
      const diff = startX - current;
      setDragOffset(-diff);
    };

    const handleMouseUp = (e) => {
      if (!isDragging) return;
      const diff = startX - currentX;
      
      if (Math.abs(diff) > dragThreshold) {
        if (diff > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      } else {
        setDragOffset(0);
      }
      
      setIsDragging(false);
      setStartX(0);
      setCurrentX(0);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, startX, currentX, dragThreshold]);

  const handleMouseDown = (e) => {
    setStartX(e.clientX);
    setIsDragging(true);
    setDragOffset(0);
  };

  const getTranslateX = () => {
    const baseTranslate = -(currentIndex * (100 / cardsPerView));
    const dragTranslate = sliderRef.current 
      ? (dragOffset / sliderRef.current.offsetWidth) * 100 
      : 0;
    return baseTranslate + dragTranslate;
  };

  return (
    <div 
      ref={containerRef}
      className={cn("relative w-full overflow-hidden", className)} 
      {...props}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        ref={sliderRef}
        className={cn(
          "relative overflow-hidden cursor-grab active:cursor-grabbing select-none", 
          isDragging && "cursor-grabbing"
        )}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        style={{ touchAction: 'pan-y pinch-zoom' }}
      >
        <motion.div
          className="flex items-center"
          animate={{
            x: `${getTranslateX()}%`,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
        >
          {logos.map((logo, index) => (
            <div
              key={logo.id || index}
              className="flex-shrink-0 px-4 md:px-6"
              style={{ width: `${100 / cardsPerView}%` }}
            >
              <div className="flex flex-col items-center justify-center gap-3 opacity-60 hover:opacity-100 transition-opacity duration-300">
                <div className="h-12 md:h-16 w-full flex items-center justify-center">
                   {/* Placeholder for actual logo - using text/icon style for now if image fails, or the image itself */}
                   <img 
                    src={logo.logo} 
                    alt={logo.name} 
                    className="max-h-full max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                   />
                </div>
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{logo.name}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
