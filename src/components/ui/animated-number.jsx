"use client";

import { useState, useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import { motion } from "framer-motion";

export function AnimatedNumber({ 
  value, 
  duration = 2000, 
  className,
  suffix = "",
  prefix = ""
}) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isInView && !hasAnimated.current) {
      hasAnimated.current = true;
      
      const startTime = Date.now();
      const startValue = 0;

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentValue = startValue + (value - startValue) * easeOutQuart;
        
        setDisplayValue(currentValue);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setDisplayValue(value);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [isInView, value, duration]);

  // Format the display value based on suffix
  let displayText;
  if (suffix === "M+") {
    const millions = displayValue / 1000000;
    displayText = millions.toFixed(1) + "M+";
  } else if (suffix === "%") {
    displayText = Math.round(displayValue) + "%";
  } else if (suffix === "+") {
    displayText = Math.round(displayValue) + "+";
  } else {
    displayText = Math.round(displayValue) + suffix;
  }

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      {prefix}{displayText}
    </motion.span>
  );
}
