"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PRODUCTS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ui/product-card";
import { Carousel } from "@/components/ui/carousel";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Products() {
  const [filter, setFilter] = useState("All");
  const categories = ["All", ...Array.from(new Set(PRODUCTS.map(p => p.category)))];

  const filteredProducts = filter === "All" 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === filter);

  return (
    <div className="pt-16 pb-16">
      <section className="bg-secondary/30 py-16 mb-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-primary mb-6">Our Products</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            Engineered for durability and performance, our product range covers everything from roofing sheets to complete PEB structures.
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

      <div className="container mx-auto px-4">
        {/* Carousel Section */}
        

        {/* Filtered Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-display font-bold text-foreground mb-6">
            {filter === "All" ? "All Products" : filter}
          </h2>
          <motion.div 
            layout
            className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8"
          >
            <AnimatePresence>
              {filteredProducts.map((product) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  key={product.id}
                >
                  <ProductCard product={product} variant="default" />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
