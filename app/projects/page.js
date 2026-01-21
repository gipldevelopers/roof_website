"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PROJECTS } from "@/lib/constants";
import { ZoomIn } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export default function Projects() {
  const [filter, setFilter] = useState("All");
  const categories = ["All", ...Array.from(new Set(PROJECTS.map(p => p.category)))];
  
  const filteredProjects = filter === "All" 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === filter);

  return (
    <div className="pt-16 pb-16">
      <section className="bg-secondary/30 py-16 mb-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-primary mb-6">Our Projects</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            A showcase of our engineering capabilities across industrial, commercial, and residential sectors.
          </p>
          
          <div className="flex flex-nowrap sm:flex-wrap justify-start sm:justify-center gap-3 overflow-x-auto pb-4 sm:pb-0 scrollbar-hide px-4 sm:px-0">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 whitespace-nowrap ${
                  filter === cat 
                    ? "bg-primary text-white shadow-lg scale-105" 
                    : "bg-white text-foreground hover:bg-white/80 border border-border"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

        {/* Project Grid */}
        <motion.div 
          layout
          className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={project.id}
              >
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="group relative rounded-xl overflow-hidden cursor-zoom-in aspect-square sm:aspect-auto">
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white p-2 md:p-4 text-center">
                        <ZoomIn className="w-5 h-5 md:w-8 md:h-8 mb-1 md:mb-2 opacity-80" />
                        <h3 className="font-bold text-xs md:text-lg line-clamp-1">{project.title}</h3>
                        <span className="text-accent text-[10px] md:text-sm">{project.category}</span>
                      </div>
                      {/* Mobile Title Badge */}
                      <div className="absolute bottom-2 left-2 md:hidden bg-black/50 backdrop-blur-sm px-2 py-1 rounded text-[10px] text-white">
                        {project.title}
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl bg-transparent border-none shadow-none p-0 text-white">
                     <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-auto rounded-lg shadow-2xl"
                      />
                      <div className="bg-black/80 p-4 rounded-b-lg backdrop-blur">
                        <h3 className="font-bold text-xl">{project.title}</h3>
                        <p className="text-sm text-gray-300">{project.category} Project</p>
                      </div>
                  </DialogContent>
                </Dialog>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
  );
}
