"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { 
  Award, 
  TrendingUp, 
  Target, 
  Lightbulb, 
  ShieldCheck, 
  History, 
  Zap,
  ArrowRight,
  Linkedin,
  Mail
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

const JOURNEY_STEPS = [
  { year: "2008", month: "January", title: "The Beginning", desc: "Roofy was founded with a vision to revolutionize metal roofing with high-precision manufacturing.", icon: "logo" },
  { year: "2012", month: "March", title: "Industrial Expansion", desc: "Opened our first major PEB (Pre-Engineered Building) manufacturing unit, expanding our capacity tenfold.", stats: "10x" },
  { year: "2016", month: "July", title: "National Recognition", desc: "Awarded as the fastest-growing roofing solution provider in the region, serving 500+ industrial clients.", icon: "award" },
  { year: "2020", month: "June", title: "Innovation Hub", desc: "Launched our SmartRoof series with advanced thermal insulation and 30+ years warranty.", stats: "30+" },
  { year: "2024", month: "Present", title: "Global Vision", desc: "Expanding into sustainable construction technologies and digital-first client experiences.", icon: "globe" },
];

const LEADERS = [
  { 
    name: "Rajesh Sharma", 
    role: "Founder & CEO", 
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&h=400&fit=crop",
    bio: "Visionary leader with 25+ years in industrial construction."
  },
  { 
    name: "Amit Patel", 
    role: "Director of Engineering", 
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&h=400&fit=crop",
    bio: "Ex-L&T engineer specializing in complex PEB structures."
  },
  { 
    name: "Sanjay Mehta", 
    role: "Head of Operations", 
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&h=400&fit=crop",
    bio: "Driving manufacturing excellence and lead-time optimization."
  },
  { 
    name: "Vikram Singh", 
    role: "Technical Consultant", 
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&h=400&fit=crop",
    bio: "Expert advisor on multi-story steel construction."
  },
];

const DIFFERENTIATORS = [
  { title: "Manufacturing", desc: "We control every step, from raw material to final form.", icon: Zap },
  { title: "Engineering", desc: "Expert team of 50+ engineers ensuring precision.", icon: ShieldCheck },
  { title: "Trust", desc: "Unmatched 30+ years warranty on roofing.", icon: Award },
  { title: "Agile", desc: "Fastest implementation tracked via ERP.", icon: TrendingUp },
];

function TimelineProgress({ containerRef }) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const pathLength = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="absolute left-1/2 top-4 bottom-4 w-[2px] md:w-[4px] bg-slate-100 -translate-x-1/2">
      <motion.div 
        style={{ scaleY: pathLength }}
        className="w-full h-full bg-primary origin-top shadow-[0_0_10px_rgba(242,98,56,0.5)] rounded-full"
      />
    </div>
  );
}

export default function About() {
  const journeyRef = useRef(null);

  return (
    <div className="bg-background min-h-screen">
      {/* Header / Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-slate-900 border-b border-white/10">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2000&auto=format&fit=crop')] opacity-20 grayscale brightness-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/20 text-primary border border-primary/30 text-xs font-bold uppercase tracking-widest mb-6">
              Who We Are
            </span>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-8 leading-[1.1]">
              Engineered for <br />
              <span className="text-primary italic">Generations.</span>
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed mb-10 max-w-2xl mx-auto">
              Roofy isn't just a roofing company. We are a team of visionaries, engineers, 
              and craftsmen dedicated to building the infrastructure of tomorrow.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Vision */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="p-10 rounded-3xl bg-white border border-border shadow-sm group transition-all"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-8 group-hover:scale-110 transition-transform">
                <Target className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-display font-bold text-slate-900 mb-6 font-display">Our Vision</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                To be the global benchmark in high-performance building solutions, merging 
                cutting-edge engineering with sustainable architecture to protect what matters most.
              </p>
            </motion.div>

            {/* Mission */}
            <motion.div 
               whileHover={{ y: -5 }}
               className="p-10 rounded-3xl bg-slate-900 border border-white/5 shadow-2xl group transition-all"
            >
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-primary mb-8 group-hover:scale-110 transition-transform">
                <Lightbulb className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-display font-bold text-white mb-6 font-display">Our Mission</h2>
              <p className="text-slate-300 text-lg leading-relaxed">
                We empower industries to grow through reliable, swift, and superior pre-engineered systems, 
                maintaining a non-negotiable standard of quality and safety in every joint and panel.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Journey - Advanced Timeline */}
      <section className="py-24 bg-white relative overflow-hidden" id="journey" ref={journeyRef}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-4 relative inline-block">
              Our Journey
              <div className="absolute -bottom-2 -right-4 w-24 h-4 bg-primary/10 -z-10" />
            </h2>
          </div>

          <div className="relative max-w-5xl mx-auto pb-20 px-4 md:px-0">
            {/* The Drawing Line */}
            <TimelineProgress containerRef={journeyRef} />

            <div className="space-y-12 md:space-y-32">
              {JOURNEY_STEPS.map((step, i) => (
                <div key={i} className="relative">
                  {/* Desktop Layout (Alternating) */}
                  <motion.div 
                    initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className={cn(
                      "hidden md:flex items-center gap-16 w-full",
                      i % 2 === 0 ? "flex-row" : "flex-row-reverse"
                    )}
                  >
                    <div className="w-1/2 flex flex-col items-start px-4">
                       <div className={cn(
                         "p-8 rounded-3xl bg-white border border-slate-100 shadow-sm relative w-full hover:shadow-md transition-shadow",
                         i % 2 === 0 ? "text-right" : "text-left"
                       )}>
                          <div className={cn(
                            "absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-l border-b border-slate-100 rotate-45 z-0",
                            i % 2 === 0 ? "-right-2" : "-left-2"
                          )} />
                          <h4 className="text-primary font-bold text-sm mb-2">{step.month} {step.year}</h4>
                          <h3 className="text-2xl font-bold text-slate-900 mb-4">{step.title}</h3>
                          <p className="text-slate-600 leading-relaxed text-sm">
                            {step.desc}
                          </p>
                       </div>
                    </div>

                    <div className="relative z-20 shrink-0 w-32 h-32">
                       <div className="relative w-full h-full rounded-full border-[6px] border-white bg-white shadow-xl flex items-center justify-center overflow-hidden group">
                          {step.stats ? (
                            <div className="flex flex-col items-center">
                              <span className="text-3xl font-bold text-primary group-hover:scale-110 transition-transform">{step.stats}</span>
                            </div>
                          ) : (
                            <div className="w-12 h-12 flex items-center justify-center">
                              {step.icon === "logo" ? (
                                <img src="/logo/6f48a7af-3abc-49b9-8548-aa14faedb439-removebg-preview.png" className="w-full opacity-80" alt="Icon" />
                              ) : (
                                <History className="w-8 h-8 text-primary opacity-20" />
                              )}
                            </div>
                          )}
                       </div>
                    </div>

                    <div className="w-1/2" />
                  </motion.div>

                  {/* Mobile Layout (Full Width Cards) */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex md:hidden flex-row gap-6 relative"
                  >
                    <div className="flex flex-col items-center">
                       <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white z-10 shadow-lg shrink-0">
                          <span className="text-xs font-bold">{step.year}</span>
                       </div>
                       <div className="w-[2px] h-full bg-slate-100 -mt-1" />
                    </div>
                    <div className="pb-8 flex-1">
                       <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm">
                          <h4 className="text-primary font-bold text-xs uppercase mb-1">{step.month} {step.year}</h4>
                          <h3 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h3>
                          <p className="text-slate-600 text-sm leading-relaxed whitespace-normal">
                            {step.desc}
                          </p>
                       </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Management */}
      <section className="py-24 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-6 font-display">Meet the Leadership</h2>
              <p className="text-slate-600 text-lg italic">
                "We don't just manage projects; we build legacies of trust. Our team is our greatest strength."
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {LEADERS.map((leader, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl mb-4 shadow-lg border border-border/50">
                   <img 
                    src={leader.image} 
                    alt={leader.name} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-4 left-4 right-4 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all">
                    <div className="flex gap-2">
                       <button className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-primary transition-all">
                        <Linkedin className="w-3.5 h-3.5" />
                      </button>
                      <button className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-primary transition-all">
                        <Mail className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-0.5">{leader.name}</h3>
                <p className="text-primary font-bold tracking-tight text-[10px] uppercase mb-2">{leader.role}</p>
                <p className="text-slate-600 text-xs leading-relaxed line-clamp-2">{leader.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[40%] h-full bg-primary/5 -skew-x-12 translate-x-1/2 pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-4">
              <h2 className="text-4xl font-display font-bold mb-8 leading-tight font-display">
                What Makes <br />
                <span className="text-primary italic">Us Different?</span>
              </h2>
              <p className="text-slate-400 mb-10 text-lg">
                We bridge the gap between heavy engineering and architectural elegance with 
                a focus on precision that most competitors simply can't match.
              </p>
              <Link href="/contact">
                <Button size="lg" className="rounded-full px-8 py-6 group">
                  Start Your Project
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>

            <div className="lg:col-span-8">
              <div className="grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-6">
                {DIFFERENTIATORS.map((item, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    className="p-4 md:p-8 rounded-2xl md:rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                  >
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-primary/20 flex items-center justify-center text-primary mb-4 md:mb-6">
                      <item.icon className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <h3 className="text-sm md:text-xl font-bold mb-2 md:mb-4">{item.title}</h3>
                    <p className="text-slate-400 leading-relaxed text-[10px] md:text-sm">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Quote */}
      <section className="py-20 bg-primary text-white text-center">
        <div className="container mx-auto px-4 max-w-4xl">
           <p className="text-2xl md:text-3xl font-display font-bold leading-relaxed mb-8 italic">
             "Quality is never an accident; it is always the result of intelligent effort."
           </p>
           <div className="w-12 h-1 bg-white/30 mx-auto rounded-full" />
        </div>
      </section>
    </div>
  );
}
