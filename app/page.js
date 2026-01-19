"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ui/product-card";
import { Carousel3D } from "@/components/ui/carousel-3d";
import { TestimonialSlider } from "@/components/ui/testimonial-slider";
import { BrandSlider } from "@/components/ui/brand-slider"; // Added this line
import { AnimatedNumber } from "@/components/ui/animated-number";
import { ArrowRight, CheckCircle2, Factory, ShieldCheck, Ruler, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { PRODUCTS, SERVICES, TESTIMONIALS, BRAND_LOGOS } from "@/lib/constants"; // Modified this line
import FAQSection from "@/components/sections/faqsection";
import Hero1 from "@/components/sections/hero1"; // Added this line

export default function Home() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  // Why Choose Us - 4 Feature Options
  const featureOptions = [
    {
      title: "Superior Durability",
      desc: "Materials tested for extreme weather conditions.",
      icon: ShieldCheck,
      image: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?q=80&w=800&auto=format&fit=crop",
      alt: "Durable Construction",
      content: "Our materials undergo rigorous testing to withstand extreme weather conditions, ensuring your structure remains strong and protected for decades."
    },
    {
      title: "Precision Engineering",
      desc: "Custom designed to millimeter accuracy.",
      icon: Ruler,
      image: "https://images.unsplash.com/photo-1531834685032-c34bf0d84c7c?q=80&w=800&auto=format&fit=crop",
      alt: "Precision Engineering",
      content: "Every component is custom-designed with millimeter precision, ensuring perfect fit and optimal performance for your specific requirements."
    },
    {
      title: "Rapid Installation",
      desc: "Pre-engineered systems for faster project completion.",
      icon: Factory,
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop",
      alt: "Fast Installation",
      content: "Our pre-engineered building systems are designed for rapid assembly, reducing construction time by up to 50% compared to traditional methods."
    },
    {
      title: "Energy Efficient",
      desc: "Advanced insulation systems reduce energy consumption.",
      icon: CheckCircle2,
      image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800&auto=format&fit=crop",
      alt: "Energy Efficient",
      content: "Advanced insulation and energy-efficient designs help reduce operational costs while maintaining optimal indoor comfort throughout the year."
    }
  ];

  const [activeFeature, setActiveFeature] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-change every 3 seconds
  useEffect(() => {
    if (!isHovered) {
      const timer = setInterval(() => {
        setActiveFeature((prev) => (prev + 1) % featureOptions.length);
      }, 3000);
      return () => clearInterval(timer);
    }
  }, [isHovered]);

  return (
    <div className="flex flex-col">
      
      <Hero1 />

      {/* Stats Section */}
      <section className="py-4 relative z-10 -mt-10 mx-4 md:mx-10 rounded-2xl shadow-xl border border-border/50 backdrop-blur bg-white/95">
        <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-border/50">
          {[
            { label: "Years Experience", target: 16, suffix: "+" },
            { label: "Projects Completed", target: 500, suffix: "+" },
            { label: "Square Meters Built", target: 1000000, suffix: "M+" },
            { label: "Client Satisfaction", target: 100, suffix: "%" },
          ].map((stat, i) => (
            <motion.div 
              key={i} 
              className="p-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <h3 className="text-4xl md:text-5xl font-display font-bold text-primary mb-2">
                <AnimatedNumber 
                  value={stat.target} 
                  suffix={stat.suffix}
                  duration={2000}
                  className="inline-block"
                />
              </h3>
              <p className="text-muted-foreground text-sm font-medium uppercase tracking-wider">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Brand Logos Section */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2">
              We Are Associated With International Brands
            </h2>
          </div>
          
          <BrandSlider logos={BRAND_LOGOS} />
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gradient-to-b from-secondary/30 to-background overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-semibold mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              Premium Solutions
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
              Engineered for Excellence
            </h2>
            <p className="text-muted-foreground text-base md:text-lg">
              Our comprehensive range of roofing and structural solutions meets the highest industry standards.
            </p>
          </motion.div>

          <div className="mb-8 overflow-hidden -mx-4 md:mx-0 md:px-0">
            <Carousel3D
              items={PRODUCTS}
              autoPlay={true}
              interval={3000}
              renderItem={(product, index, isActive) => (
                <ProductCard product={product} variant="3d" isActive={isActive} />
              )}
            />
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center"
          >
            
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section 
        className="py-6 md:py-8 lg:py-10 bg-primary text-white overflow-hidden relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 skew-x-12 translate-x-1/2" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8 items-center">
            <div className="relative">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-display font-bold mb-2 md:mb-2.5 lg:mb-3">Why Industry Leaders Choose Roofy</h2>
              <p className="text-white/80 text-sm sm:text-base md:text-base lg:text-lg mb-2.5 md:mb-3 lg:mb-4 leading-relaxed">
                We combine decades of engineering expertise with cutting-edge manufacturing to deliver 
                structures that stand the test of time and weather.
              </p>
              
              {/* 4 Feature Options */}
              <div className="space-y-2 md:space-y-2.5 lg:space-y-3">
                {featureOptions.map((feature, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveFeature(index)}
                    onMouseEnter={() => setActiveFeature(index)}
                    onTouchStart={() => setActiveFeature(index)}
                    className={cn(
                      "w-full flex items-center gap-2.5 md:gap-3 p-2 md:p-2.5 lg:p-3 rounded-lg border transition-all duration-300 text-left",
                      activeFeature === index
                        ? "bg-white/15 border-white/30 scale-[1.02] shadow-lg"
                        : "bg-white/5 border-white/10 hover:bg-white/10 hover:scale-[1.01]"
                    )}
                  >
                    <div className={cn(
                      "w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 rounded-lg bg-white/20 text-white flex items-center justify-center shrink-0 transition-all duration-300",
                      activeFeature === index ? "bg-white text-primary scale-110 shadow-md" : ""
                    )}>
                      <feature.icon className="w-4 h-4 md:w-4 md:h-4 lg:w-5 lg:h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm md:text-base lg:text-lg font-bold mb-0.5 leading-tight">{feature.title}</h4>
                      <p className="text-white/70 text-xs md:text-sm leading-snug">{feature.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Side Content & Image */}
            <div className="relative mt-3 md:mt-0 flex justify-center">
              <div className="aspect-square rounded-xl md:rounded-2xl overflow-hidden border-4 md:border-6 lg:border-6 border-white/10 shadow-2xl max-w-md lg:max-w-sm relative">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeFeature}
                    src={featureOptions[activeFeature].image}
                    alt={featureOptions[activeFeature].alt}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>
              </div>
              
              {/* Content Card */}
              <div className="absolute -bottom-4 md:-bottom-5 lg:-bottom-5 -left-4 md:-left-5 lg:-left-5 bg-white text-primary p-3 md:p-3.5 lg:p-3.5 rounded-lg shadow-xl max-w-xs hidden md:block">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeFeature}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-sm md:text-base lg:text-base font-bold mb-1 leading-tight">
                      {featureOptions[activeFeature].content}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-primary/10 shrink-0" />
                      <span className="text-xs md:text-xs lg:text-sm font-medium text-muted-foreground">
                        {featureOptions[activeFeature].title}
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-8 md:py-12 lg:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-6 md:mb-8 lg:mb-10"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-semibold mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              Client Testimonials
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
              What Our Clients Say
            </h2>
            <p className="text-muted-foreground text-sm md:text-base">
              Trusted by industry leaders across India for quality and reliability
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto"
          >
            <TestimonialSlider 
              testimonials={TESTIMONIALS}
              autoPlay={true}
              interval={5000}
            />
          </motion.div>
        </div>
      </section>

      <FAQSection />

      {/* CTA Section */}
      <section className="py- bg-white">
        <div className="container mx-auto px-4 pb-6">
          <div className="bg-accent rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
            
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">Ready to Start Your Project?</h2>
              <p className="text-white/80 text-lg mb-10">
                Get a comprehensive quote for your next industrial or commercial construction project today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button size="lg" className="h-14 px-10 text-lg rounded-full">
                    Get Free Quote
                  </Button>
                </Link>
                <Link href="/projects">
                  <Button size="lg" variant="outline" className="h-14 px-10 border-white/20 hover:border-white hover:bg-white/10 text-white text-lg rounded-full">
                    View Portfolio
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
