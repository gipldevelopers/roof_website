"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Play, Video, CheckCircle, Shield, Clock, Zap } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils"; // Ensure you have this or use standard template literals

// --- Data & Config ---
const STATS = [
  { icon: CheckCircle, text: "30+ Years Warranty", color: "text-green-500" },
  { icon: Shield, text: "Insured & Certified", color: "text-secondary" },
  
];

const ROOF_TEXTURES = [
  "/logo/6f48a7af-3abc-49b9-8548-aa14faedb439-removebg-preview.png",
  "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=100&h=100&fit=crop&q=80",
  "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=100&h=100&fit=crop&q=80"
];

const HERO_IMAGE = "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop";

// --- Sub-Components ---

function HeroBadge() {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-gray-200 text-xs font-medium text-gray-600 mb-4 shadow-sm w-fit">
      <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
      Trusted Roofing Experts
    </div>
  );
}

function HeroHeading() {
  return (
    <h1 className="text-4xl xs:text-5xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-gray-900 leading-[1.1] mb-4 sm:mb-6 tracking-tight">
      Smart Roofing for <br />
      <span className="relative inline-block">
        <span className="relative z-10">Modern Homes.</span>
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="absolute bottom-2 left-0 h-4 bg-secondary/10 -z-0"
        />
      </span>
    </h1>
  );
}

function StatsGroup() {
  return (
    <div className="flex  gap-4 mb-1">
      {STATS.map((item, i) => (
        <div key={i} className="flex items-center gap-2 bg-white/50 px-3 py-1.5 rounded-full border border-gray-100">
          <item.icon className={`w-4 h-4 ${item.color}`} />
          <span className="text-xs font-medium text-gray-700">{item.text}</span>
        </div>
      ))}
    </div>
  );
}

function ActionButtons() {
  return (
    <div className="flex flex-row gap-3 mb-2 w-auto ">
      <Link href="/contact" className="w-full sm:w-auto">
        <Button size="lg" className="w-auto h-12 px-4 rounded-full text-base shadow-lg hover:shadow-xl group bg-primary hover:bg-primary/90">
          Get Free Quote
        </Button>
      </Link>
      <Link href="/services" className="w-full sm:w-auto">
        <Button variant="outline" size="lg" className="w-auto h-12 px-4 rounded-full text-base border-gray-300 hover:border-gray-400 hover:bg-gray-50/80 backdrop-blur-sm bg-white/50">
          View Services
        </Button>
      </Link>
    </div>
  );
}

function FloatingConfigCard() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.6 }}
      className="bg-white rounded-xl lg:rounded-2xl p-3 lg:p-4 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 max-w-auto lg:max-w-[320px] mb-6"
    >
      <div className="flex justify-between items-center mb-2 lg:mb-3">
        <h3 className="font-semibold text-gray-900 text-xs lg:text-sm">Modern Roof Style</h3>
        <div className="flex items-center gap-1 text-[10px] font-medium text-secondary bg-secondary/10 px-2 py-1 rounded-md">
          <Video className="w-3 h-3" />
          2:40
        </div>
      </div>

      <div className="flex gap-2 mb-2 lg:mb-3">
        {ROOF_TEXTURES.map((src, i) => (
          <div key={i} className="w-9 h-9 lg:w-12 lg:h-12 rounded-lg overflow-hidden relative border-2 border-transparent hover:border-secondary transition-colors cursor-pointer group">
            <img src={src} alt="Texture" className="w-full h-full object-cover" />
            {i === 1 && (
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <div className="w-4 h-4 lg:w-5 lg:h-5 bg-white/90 rounded-full flex items-center justify-center">
                  <Play className="w-1.5 h-1.5 lg:w-2 lg:h-2 text-black fill-black ml-0.5" />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="bg-gray-50 rounded-lg p-2 mb-2 lg:mb-3 text-[10px] lg:text-[11px] text-gray-500 leading-relaxed border border-gray-100">
        Upload 3 new roofing materials photos, videos and describe the vibe.
      </div>

      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
        {['Suggest', 'Image', 'Video'].map(label => (
          <button key={label} className="px-2.5 py-1 lg:px-3 lg:py-1.5 rounded-full bg-gray-100 text-[9px] lg:text-[10px] font-medium text-gray-600 hover:bg-gray-200 transition-colors whitespace-nowrap">
            {label}
          </button>
        ))}
        <button className="ml-auto px-3 py-1 lg:px-4 lg:py-1.5 rounded-full bg-primary text-[9px] lg:text-[10px] font-medium text-white hover:bg-primary/90 transition-colors whitespace-nowrap">Generate</button>
      </div>
    </motion.div>
  );
}

function TrustIndicators() {
  return (
    <div className="hidden lg:flex items-center gap-4 text-xs text-gray-500 mt-2 border-t border-gray-100 mb-2 w-fit">
      <div className="flex items-center gap-1.5">
        <Clock className="w-3.5 h-3.5" />
        <span>Quick Response</span>
      </div>
      <div className="w-px h-3 bg-gray-300" />
      <div className="flex items-center gap-1.5">
        <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
        <span className="font-medium text-gray-900">4.9/5 Rating</span>
      </div>
      <div className="w-px h-3 bg-gray-300" />
      <span>✓ Free Consultation</span>
    </div>
  );
}

function MainVisual() {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      className="hidden lg:block lg:relative lg:col-span-5 lg:z-auto lg:inset-auto h-full w-full lg:h-auto lg:w-auto"
    >
      {/* Main Image */}
      <div className="relative w-full h-full lg:rounded-2xl lg:rounded-3xl overflow-hidden shadow-none lg:shadow-2xl lg:h-[520px] lg:max-w-[500px] lg:ml-auto lg:opacity-100">
        <img 
          src={HERO_IMAGE} 
          alt="Modern House" 
          className="w-full h-full object-cover transform lg:hover:scale-105 transition-transform duration-700"
        />
        {/* Desktop Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-60" />
      </div>

      {/* Floating Elements - Desktop Only to prevent clutter/scroll on mobile */}
      <div className="hidden lg:block absolute inset-0 pointer-events-none">
        
        {/* Pin */}
        <motion.div 
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            y: [0, -10, 0]
          }}
          transition={{ 
            opacity: { delay: 0.6, duration: 0.4 },
            scale: { delay: 0.6, type: "spring" },
            y: {
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
          className="absolute top-[20%] left-[10%] flex flex-col items-center pointer-events-auto"
        >
          <div className="w-8 h-8 rounded-full border-4 border-white/20 bg-white/30 backdrop-blur-md flex items-center justify-center relative">
            <div className="w-2.5 h-2.5 bg-white rounded-full shadow-lg" />
            <div className="absolute inset-0 border border-white/40 rounded-full animate-ping" />
          </div>
          <div className="mt-2 h-10 w-0.5 bg-gradient-to-b from-white/60 to-transparent" />
          <div className="bg-black/40 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full text-white text-[10px] font-medium mt-1 shadow-xl">
            Boral Steel Roofing
          </div>
        </motion.div>

        {/* Pin 2 - Sustainable PEB */}
        <motion.div 
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            y: [0, 8, 0]
          }}
          transition={{ 
            opacity: { delay: 0.9, duration: 0.4 },
            scale: { delay: 0.9, type: "spring" },
            y: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
          className="absolute bottom-[25%] right-[15%] flex flex-col items-center pointer-events-auto z-10"
        >
          <div className="bg-white/90 backdrop-blur-md border border-primary/20 px-3 py-1.5 rounded-full text-foreground text-[10px] font-bold shadow-xl flex items-center gap-2 mb-1">
            <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
            Sustainable PEB
          </div>
          <div className="h-8 w-0.5 bg-gradient-to-t from-white/60 to-transparent" />
          <div className="w-6 h-6 rounded-full border-2 border-white bg-primary shadow-lg flex items-center justify-center">
             <div className="w-1 h-1 bg-white rounded-full" />
          </div>
        </motion.div>

        {/* Stats Card */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="absolute top-8 right-[-10px] lg:right-[-20px] bg-white p-3 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-gray-100 max-w-[140px] pointer-events-auto"
        >
          <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <div className="text-lg font-bold text-gray-900 leading-none">15+</div>
                <div className="text-[9px] text-gray-500 font-medium">Years Exp.</div>
              </div>
          </div>
        </motion.div>

        {/* Review Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="absolute bottom-8 left-[-10px] lg:left-[-30px] bg-white p-3 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-gray-100 pointer-events-auto pr-6"
        >
          <div className="flex gap-0.5 text-yellow-400 mb-1">
            {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 fill-current" />)}
            <span className="text-gray-900 font-bold text-xs ml-1.5">4.9</span>
          </div>
          <p className="text-[10px] text-gray-500 mb-2 font-medium">From 240+ Verified Reviews</p>
          <div className="flex -space-x-2">
            {[
              "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100",
              "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100",
              "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100"
            ].map((src, i) => (
              <img key={i} src={src} className="w-7 h-7 rounded-full border-2 border-white ring-1 ring-gray-100" alt="User" />
            ))}
            <div className="w-7 h-7 rounded-full bg-gray-900 text-white flex items-center justify-center text-[9px] font-bold border-2 border-white ring-1 ring-gray-100">+12k</div>
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}

// --- Main Component ---

export default function Hero1() {
  return (
    <section className="relative min-h-[100dvh] flex items-center bg-background overflow-x-hidden pt-28 pb-12 md:pt-20 md:pb-0">
      {/* Mobile Background Image Layer */}
      <div 
        className="absolute inset-0 z-0 lg:hidden"
        style={{
          backgroundImage: `url(${HERO_IMAGE})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.35
        }}
      />
      {/* Overlay to ensure text readability on mobile */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/40 to-background/90 lg:hidden z-0" />
      <div className="container mx-auto px-4 sm:px-6 relative z-10 h-full flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center h-full">
          
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-7 relative z-20 flex flex-col justify-center"
          >
            <HeroBadge />
            <HeroHeading />
            
            <p className="text-base lg:text-lg text-gray-600 mb-6 max-w-xl leading-relaxed">
              Our expert roofing services are designed to protect your home with quality and precision. 
              Get a free quote in minutes with our AI-powered roof assessment.
            </p>

            <div className="flex flex-col gap-6 lg:hidden w-full max-w-[360px] mx-auto sm:mx-0">
              <ActionButtons />
              
              <div className="">
                 <div className="flex flex-wrap gap-3">
                    <StatsGroup />
                 </div>
              </div>

              {/* Minimized Floating Card for Mobile */}
              <div className="scale-95 origin-top-left opacity-90 hover:opacity-100 transition-opacity">
                 <FloatingConfigCard />
              </div>
            </div>

            <div className="hidden lg:grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              {/* Left Sub-Column */}
              <div>
                <FloatingConfigCard />
              </div>

              {/* Right Sub-Column */}
              <div className="flex flex-col gap-6">
                <StatsGroup />
                <ActionButtons />
                <TrustIndicators />
              </div>
            </div>
          </motion.div>

          {/* Right Visuals */}
          <MainVisual />

        </div>
      </div>
      
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[50%] h-full bg-gradient-to-l from-secondary/5 to-transparent -z-0 pointer-events-none" />
    </section>
  );
}