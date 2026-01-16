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
    <div className="pt-24 pb-20">
      <section className="bg-primary text-white py-16 mb-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">Our Projects</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            A showcase of our engineering capabilities across industrial, commercial, and residential sectors.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4">
        {/* Filters */}
        <div className="flex justify-center gap-4 mb-12">
           {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  filter === cat 
                    ? "bg-accent text-primary shadow-lg" 
                    : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                }`}
              >
                {cat}
              </button>
            ))}
        </div>

        {/* Masonry Grid Simulation */}
        <motion.div 
          layout
          className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                key={project.id}
                className="break-inside-avoid"
              >
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="group relative rounded-xl overflow-hidden cursor-zoom-in">
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-auto transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white p-4 text-center">
                        <ZoomIn className="w-8 h-8 mb-2 opacity-80" />
                        <h3 className="font-bold text-lg">{project.title}</h3>
                        <span className="text-accent text-sm">{project.category}</span>
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl bg-transparent border-none shadow-none p-0 text-white">
                     <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-auto rounded-lg shadow-2xl"
                      />
                      <div className="bg-black/80 p-4 rounded-b-lg backdrop-blur absolute bottom-0 w-full">
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
    </div>
  );
}
