"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ProductCard({ product, variant = "default", className, isActive, ...props }) {
  const variants = {
    default: "bg-white border-border/50 hover:shadow-xl",
    elevated: "bg-white border-border/50 shadow-lg hover:shadow-2xl hover:-translate-y-1",
    minimal: "bg-transparent border-border/30 hover:bg-white/50",
    "3d": "bg-white rounded-2xl overflow-hidden border-2 border-gray-200 w-[180px] h-[240px] sm:w-[220px] sm:h-[300px] md:w-[320px] md:h-[400px] lg:w-[420px] lg:h-[540px]",
  };

  // 3D carousel variant
  if (variant === "3d") {
    return (
      <div
        className={cn(
          "group relative transition-all duration-500",
          variants["3d"],
          className
        )}
        style={{
          transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
        {...props}
      >
        <div className="w-full h-[110px] sm:h-[140px] md:h-[200px] lg:h-[300px] overflow-hidden relative">
          <img 
            src={product.image} 
            alt={product.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 md:top-3 md:right-3 bg-white/95 backdrop-blur-sm px-1.5 py-0.5 sm:px-2 sm:py-1 md:px-2.5 rounded-full text-[8px] sm:text-[9px] md:text-[10px] font-bold text-primary uppercase tracking-wide shadow-sm">
            {product.category}
          </div>
        </div>
        <div className="p-3 sm:p-4 md:p-5 lg:p-8">
          <h3 className="text-xs sm:text-sm md:text-lg lg:text-2xl font-display font-bold text-foreground mb-1 sm:mb-1.5 md:mb-2 lg:mb-3 group-hover:text-primary transition-colors line-clamp-1">
            {product.title}
          </h3>
          <p className="text-muted-foreground mb-2 sm:mb-3 md:mb-4 lg:mb-5 line-clamp-2 text-[9px] sm:text-[10px] md:text-xs lg:text-base leading-relaxed">
            {product.description}
          </p>
          <div className="flex justify-between items-center gap-1 sm:gap-2">
            <div className="text-accent text-[8px] sm:text-[9px] md:text-xs lg:text-sm font-semibold uppercase tracking-wider truncate">
              {product.category}
            </div>
            <Link href="/products">
              <Button variant="primary" size="sm" className="text-[9px] sm:text-[10px] md:text-xs lg:text-sm px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 lg:px-7 lg:py-3.5 rounded-lg md:rounded-xl font-bold uppercase tracking-wide whitespace-nowrap">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Default variants
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn(
        "group relative rounded-xl overflow-hidden transition-all duration-500 border",
        variants[variant],
        className
      )}
      {...props}
    >
      <div className="aspect-[4/3] overflow-hidden relative">
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-full text-[10px] font-bold text-primary uppercase tracking-wide shadow-sm">
          {product.category}
        </div>
      </div>
      <div className="p-4 md:p-5">
        <div className="text-accent text-[10px] font-semibold mb-1.5 uppercase tracking-wider">
          {product.category}
        </div>
        <h3 className="text-base md:text-lg font-display font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-1">
          {product.title}
        </h3>
        <p className="text-muted-foreground mb-3 line-clamp-2 text-xs md:text-sm leading-relaxed">
          {product.description}
        </p>
        <div className="flex items-center gap-2">
          <Link href="/products" className="flex-1">
            <Button variant="primary" size="sm" className="w-full text-xs h-8 px-3">
              Learn More
            </Button>
          </Link>
          <Link 
            href="/contact" 
            className="p-1.5 rounded-full border border-primary/20 hover:border-primary hover:bg-primary/5 transition-all duration-300 group/icon"
          >
            <ArrowRight className="w-3.5 h-3.5 text-primary group-hover/icon:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
