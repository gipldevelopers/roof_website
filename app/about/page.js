"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Award, Users, TrendingUp } from "lucide-react";

export default function About() {
  return (
    <div className="pt-24 pb-20">
      {/* Header */}
      <section className="bg-primary text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-display font-bold mb-6"
          >
            About MaxRoof
          </motion.h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Pioneering excellence in pre-engineered buildings and metal roofing systems since 2008.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-display font-bold text-primary mb-6">Our Mission</h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                To deliver world-class sustainable roofing and structural solutions that empower industries to build faster, stronger, and smarter. We are committed to innovation, safety, and uncompromising quality in every square meter we install.
              </p>
              
              <div className="space-y-4">
                {[
                  "Customer-Centric Approach",
                  "Sustainable Manufacturing Practices",
                  "Continuous Innovation in Design",
                  "Uncompromising Safety Standards"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent" />
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <div className="relative">
               <img 
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop" 
                alt="Our Team" 
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-8 rounded-xl shadow-xl border border-border/50 hidden md:block">
                <div className="text-4xl font-bold text-primary mb-1">16+</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider">Years of Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold text-primary mb-4">Our Core Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">The principles that drive every decision we make.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Quality First", desc: "We never compromise on materials or workmanship.", icon: Award },
              { title: "Team Collaboration", desc: "Working together to solve complex engineering challenges.", icon: Users },
              { title: "Constant Growth", desc: "Always learning, improving, and innovating.", icon: TrendingUp }
            ].map((val, i) => (
              <div key={i} className="bg-white p-8 rounded-xl shadow-sm border border-border/50 hover:shadow-lg transition-all">
                <div className="w-14 h-14 rounded-full bg-primary/5 flex items-center justify-center text-primary mb-6">
                  <val.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-3">{val.title}</h3>
                <p className="text-muted-foreground">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
