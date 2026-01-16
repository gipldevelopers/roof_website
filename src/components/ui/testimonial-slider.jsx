"use client";

import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function TestimonialSlider({ 
  testimonials, 
  autoPlay = true,
  interval = 5000,
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
  const scrollTimeoutRef = useRef(null);

  const totalItems = testimonials.length;
  
  // Cards per view: Mobile (2), Tablet (3), Desktop (4)
  // We'll use CSS to handle responsive display, but calculate based on viewport
  const [cardsPerView, setCardsPerView] = useState(2);

  useEffect(() => {
    const updateCardsPerView = () => {
      if (typeof window !== 'undefined') {
        if (window.innerWidth >= 1024) {
          setCardsPerView(4); // Desktop
        } else if (window.innerWidth >= 768) {
          setCardsPerView(3); // Tablet
        } else {
          setCardsPerView(2); // Mobile
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

  const goToSlide = (index) => {
    const targetIndex = Math.min(index, maxIndex);
    setCurrentIndex(targetIndex);
    setDragOffset(0);
  };

  // Mouse Wheel Scroll Handler
  useEffect(() => {
    const handleWheel = (e) => {
      if (!containerRef.current) return;
      
      // Check if user is scrolling inside a card's text area
      const target = e.target;
      const cardElement = target.closest('[data-testimonial-card]');
      
      if (cardElement) {
        // Find the scrollable text area inside the card
        const textArea = cardElement.querySelector('.overflow-y-auto');
        
        if (textArea) {
          const isScrollable = textArea.scrollHeight > textArea.clientHeight;
          const isAtTop = textArea.scrollTop <= 0;
          const isAtBottom = textArea.scrollTop + textArea.clientHeight >= textArea.scrollHeight - 5;
          
          // If text area is scrollable and not at boundaries, allow vertical scroll
          if (isScrollable && !isAtTop && !isAtBottom) {
            return; // Allow normal vertical scrolling inside the card
          }
          
          // If at boundaries, prevent default to allow slider navigation
          if ((e.deltaY < 0 && isAtTop) || (e.deltaY > 0 && isAtBottom)) {
            e.preventDefault();
            // Convert vertical scroll to horizontal slider movement
            if (e.deltaY > 0) {
              nextSlide();
            } else {
              prevSlide();
            }
            return;
          }
        }
      }
      
      // Horizontal scroll for slider (when not on card)
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault();
        if (e.deltaX > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      } else if (Math.abs(e.deltaY) > Math.abs(e.deltaX) && !cardElement) {
        // Vertical scroll on slider container (not on card) - convert to horizontal
        e.preventDefault();
        if (e.deltaY > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
      return () => container.removeEventListener('wheel', handleWheel);
    }
  }, [maxIndex, cardsPerView, totalItems]);

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

  // Mouse Events
  const handleMouseDown = (e) => {
    setStartX(e.clientX);
    setIsDragging(true);
    setDragOffset(0);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const current = e.clientX;
    setCurrentX(current);
    const diff = startX - current;
    setDragOffset(-diff);
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
    } else {
      setDragOffset(0);
    }
    
    setIsDragging(false);
    setStartX(0);
    setCurrentX(0);
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      const diff = startX - currentX;
      if (Math.abs(diff) > dragThreshold) {
        if (diff > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
    }
    setIsDragging(false);
    setStartX(0);
    setCurrentX(0);
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
      onMouseLeave={() => {
        setIsHovered(false);
        handleMouseLeave();
      }}
    >
      {/* Slider Container */}
      <div
        ref={sliderRef}
        className="relative overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        style={{ touchAction: 'pan-y pinch-zoom' }}
      >
        <motion.div
          className="flex"
          animate={{
            x: `${getTranslateX()}%`,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id || index}
              className="flex-shrink-0 px-2 sm:px-3"
              style={{ width: `${100 / cardsPerView}%` }}
            >
              <div 
                data-testimonial-card
                className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 h-[300px] md:h-[200px] lg:h-[300px] shadow-md border border-gray-100 hover:shadow-lg transition-shadow flex flex-col"
              >
                {/* Stars */}
                <div className="flex gap-0.5 md:gap-1 mb-3 md:mb-4 shrink-0">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-3 h-3 md:w-4 md:h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                {/* Testimonial Text - Scrollable */}
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                  <p className="text-gray-700 text-xs md:text-sm lg:text-base leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-2 md:gap-3 shrink-0">
                  <div className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-white font-bold text-sm md:text-base lg:text-lg shrink-0">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-gray-900 text-xs md:text-sm lg:text-base truncate">
                      {testimonial.author}
                    </div>
                    <div className="text-gray-500 text-[10px] md:text-xs lg:text-sm truncate">
                      {testimonial.role}
                    </div>
                    {testimonial.company && (
                      <div className="text-gray-400 text-[10px] md:text-xs truncate">
                        {testimonial.company}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Dots Indicator */}
      {totalItems > cardsPerView && (
        <div className="flex justify-center gap-2 mt-4 md:mt-6">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                currentIndex === index
                  ? "bg-primary w-6 md:w-8"
                  : "bg-gray-300 hover:bg-gray-400 w-2"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
