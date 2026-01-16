"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ui/product-card";
import { Carousel3D } from "@/components/ui/carousel-3d";
import { TestimonialSlider } from "@/components/ui/testimonial-slider";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { ArrowRight, CheckCircle2, Factory, ShieldCheck, Ruler, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { PRODUCTS, SERVICES, TESTIMONIALS } from "@/lib/constants";

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

  // Why Choose Us Carousel Data
  const whyChooseSlides = [
    {
      features: [
        { title: "Superior Durability", desc: "Materials tested for extreme weather conditions.", icon: ShieldCheck },
        { title: "Precision Engineering", desc: "Custom designed to millimeter accuracy.", icon: Ruler },
        { title: "Rapid Installation", desc: "Pre-engineered systems for faster project completion.", icon: Factory }
      ],
      image: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?q=80&w=800&auto=format&fit=crop",
      alt: "Construction Site"
    },
    {
      features: [
        { title: "Energy Efficient", desc: "Advanced insulation systems reduce energy consumption.", icon: CheckCircle2 },
        { title: "Cost Effective", desc: "Optimized designs minimize material waste and costs.", icon: Factory },
        { title: "Quality Assurance", desc: "Rigorous testing ensures long-term performance.", icon: ShieldCheck }
      ],
      image: "https://images.unsplash.com/photo-1531834685032-c34bf0d84c7c?q=80&w=800&auto=format&fit=crop",
      alt: "Modern Building"
    },
    {
      features: [
        { title: "Expert Team", desc: "Certified professionals with years of experience.", icon: CheckCircle2 },
        { title: "Timely Delivery", desc: "On-time project completion guaranteed.", icon: Ruler },
        { title: "Customer Support", desc: "24/7 support for all your construction needs.", icon: ShieldCheck }
      ],
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop",
      alt: "Industrial Structure"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-play every 3 seconds
  useEffect(() => {
    if (!isHovered) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % whyChooseSlides.length);
      }, 3000);
      return () => clearInterval(timer);
    }
  }, [isHovered]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % whyChooseSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + whyChooseSlides.length) % whyChooseSlides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1621255530268-80949a889445?q=80&w=1920&auto=format&fit=crop" 
            alt="Modern Metal Roofing" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/40 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="container mx-auto px-4 relative z-10 text-white pt-20">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 border border-accent/30 text-accent text-sm font-semibold mb-6 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              Next-Gen Construction Solutions
            </div>
            
            <h1 className="text-5xl md:text-7xl font-display font-bold leading-[1.1] mb-6 tracking-tight">
              Building the Future <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/70">
                With Steel Strength
              </span>
            </h1>
            
            <p className="text-xl text-white/80 max-w-2xl mb-10 leading-relaxed font-light">
              Premium metal roofing and pre-engineered building systems designed for durability, 
              energy efficiency, and architectural excellence.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link href="/products">
                <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-accent text-primary hover:bg-white hover:scale-105 transition-all duration-300 shadow-lg shadow-accent/20">
                  Explore Products
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full border-white/30 text-white hover:bg-white/10 backdrop-blur-sm hover:border-white transition-all duration-300">
                  Request Quote
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/50"
        >
          <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-20 relative z-10 -mt-10 mx-4 md:mx-10 rounded-2xl shadow-xl border border-border/50 backdrop-blur bg-white/95">
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

      {/* Featured Products */}
      <section className="py-16 bg-gradient-to-b from-secondary/30 to-background overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-10"
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

          <div className="mb-8 overflow-hidden -mx-4 px-4 md:mx-0 md:px-0">
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
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-display font-bold mb-2 md:mb-2.5 lg:mb-3">Why Industry Leaders Choose MaxRoof</h2>
              <p className="text-white/80 text-sm sm:text-base md:text-base lg:text-lg mb-2.5 md:mb-3 lg:mb-4 leading-relaxed">
                We combine decades of engineering expertise with cutting-edge manufacturing to deliver 
                structures that stand the test of time and weather.
              </p>
              
              <div className="relative min-h-[200px] md:min-h-[220px] lg:min-h-[240px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-2 md:space-y-2.5 lg:space-y-3"
                  >
                    {whyChooseSlides[currentSlide].features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2.5 md:gap-3 p-2 md:p-2.5 lg:p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                        <div className="w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 rounded-lg bg-accent text-primary flex items-center justify-center shrink-0">
                          <feature.icon className="w-4 h-4 md:w-4 md:h-4 lg:w-5 lg:h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm md:text-base lg:text-lg font-bold mb-0.5 leading-tight">{feature.title}</h4>
                          <p className="text-white/70 text-xs md:text-sm leading-snug">{feature.desc}</p>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation Buttons */}
              <div className="flex items-center gap-2 mt-4">
                <button
                  onClick={prevSlide}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
                </button>
                <div className="flex gap-1.5">
                  {whyChooseSlides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        currentSlide === index
                          ? "bg-white w-8"
                          : "bg-white/30 hover:bg-white/50 w-2"
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
                <button
                  onClick={nextSlide}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
                </button>
              </div>
            </div>
            
            <div className="relative mt-3 md:mt-0 flex justify-center">
              <div className="aspect-square rounded-xl md:rounded-2xl overflow-hidden border-4 md:border-6 lg:border-6 border-white/10 shadow-2xl max-w-md lg:max-w-sm relative">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentSlide}
                    src={whyChooseSlides[currentSlide].image}
                    alt={whyChooseSlides[currentSlide].alt}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>
              </div>
              {/* Floating Card */}
              <div className="absolute -bottom-4 md:-bottom-5 lg:-bottom-5 -left-4 md:-left-5 lg:-left-5 bg-white text-primary p-3 md:p-3.5 lg:p-3.5 rounded-lg shadow-xl max-w-xs hidden md:block">
                <p className="text-sm md:text-base lg:text-base font-bold mb-1 leading-tight">"MaxRoof delivered our warehouse 2 weeks ahead of schedule."</p>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-primary/10 shrink-0" />
                  <span className="text-xs md:text-xs lg:text-sm font-medium text-muted-foreground">Logistics Corp CEO</span>
                </div>
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

      {/* CTA Section */}
      <section className="py- bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-accent rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
            
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-display font-bold text-primary mb-6">Ready to Start Your Project?</h2>
              <p className="text-primary/80 text-lg mb-10">
                Get a comprehensive quote for your next industrial or commercial construction project today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button size="lg" className="h-14 px-8 bg-primary text-white hover:bg-primary/90 text-lg rounded-full">
                    Get Free Quote
                  </Button>
                </Link>
                <Link href="/projects">
                  <Button size="lg" variant="outline" className="h-14 px-8 border-primary/20 hover:bg-white text-primary text-lg rounded-full">
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
