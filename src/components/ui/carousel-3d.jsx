"use client";

import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export function Carousel3D({ 
  items, 
  autoPlay = false,
  interval = 3000,
  className,
  renderItem,
  ...props 
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const sliderRef = useRef(null);
  const dragThreshold = 50;

  const totalItems = items.length;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const getCardClass = (index) => {
    let diff = index - currentIndex;
    
    // Handle circular navigation
    if (diff > totalItems / 2) diff -= totalItems;
    if (diff < -totalItems / 2) diff += totalItems;
    
    if (diff === 0) return 'card-active';
    if (diff === 1) return 'card-right-1';
    if (diff === -1) return 'card-left-1';

    if (!isMobile) {
      if (diff === 2) return 'card-right-2';
      if (diff === -2) return 'card-left-2';
    }
    
    return 'card-hidden';
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalItems);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Auto-play
  useEffect(() => {
    if (autoPlay && !isHovered && !isDragging) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % totalItems);
      }, interval);
      return () => clearInterval(timer);
    }
  }, [autoPlay, interval, isHovered, isDragging, totalItems]);

  // Touch Events
  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    setCurrentX(e.touches[0].clientX);
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
    }
    
    setIsDragging(false);
    setStartX(0);
    setCurrentX(0);
  };

  // Mouse Events
  const handleMouseDown = (e) => {
    setStartX(e.clientX);
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setCurrentX(e.clientX);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    const diff = startX - currentX;
    
    if (Math.abs(diff) > dragThreshold) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    
    setIsDragging(false);
    setStartX(0);
    setCurrentX(0);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    setStartX(0);
    setCurrentX(0);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        setCurrentIndex((prev) => (prev + 1) % totalItems);
      }
      if (e.key === 'ArrowLeft') {
        setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [totalItems]);

  return (
    <div className={cn("w-full mx-auto relative overflow-hidden", className)} {...props}>
      {/* Slider Wrapper */}
      <div
        ref={sliderRef}
        className="relative w-full h-[300px] sm:h-[380px] md:h-[500px] lg:h-[500px] flex items-center justify-center cursor-grab active:cursor-grabbing overflow-hidden"
        style={{ perspective: '1200px', touchAction: 'pan-y' }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          handleMouseLeave();
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {/* Slider Track */}
        <div 
          className="relative w-full h-auto flex items-center justify-center"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {items.map((item, index) => {
            const cardClass = getCardClass(index);
            const isActive = cardClass === 'card-active';
            
            return (
              <div
                key={index}
                className={cn(
                  "absolute transition-all duration-500",
                  cardClass
                )}
                style={{
                  transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
                  boxShadow: isActive 
                    ? '0 15px 50px rgba(0, 0, 0, 0.12)' 
                    : '0 8px 30px rgba(0, 0, 0, 0.08)',
                  pointerEvents: cardClass === 'card-hidden' ? 'none' : 'auto',
                  zIndex: isActive ? 10 : (cardClass.includes('right-1') || cardClass.includes('left-1') ? 9 : 1),
                }}
              >
                {renderItem ? renderItem(item, index, isActive) : item}
              </div>
            );
          })}
        </div>

        {/* Swipe Hint */}
        <div className="absolute -bottom-10 sm:-bottom-12 md:-bottom-14 left-1/2 -translate-x-1/2 text-gray-500 text-[10px] sm:text-xs font-semibold uppercase tracking-widest animate-pulse">
          ← Drag to Explore →
        </div>
      </div>

      {/* Dots Navigation */}
      <div className="flex justify-center gap-2 sm:gap-3 ">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              "w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full cursor-pointer transition-all duration-300 border-2",
              currentIndex === index
                ? "bg-gray-900 border-gray-400"
                : "bg-gray-300 border-gray-400"
            )}
            style={{
              boxShadow: currentIndex === index ? '0 0 10px rgba(0, 0, 0, 0.3)' : 'none'
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
