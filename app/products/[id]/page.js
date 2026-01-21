"use client";

import { useEffect, useState } from "react";
import { PRODUCTS } from "@/lib/constants";
import { notFound, useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Download, Info } from "lucide-react";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const foundProduct = PRODUCTS.find((p) => p.id === id);
      if (foundProduct) {
        setProduct(foundProduct);
      }
      setLoading(false);
    }
  }, [id]);

  if (!loading && !product) {
    return notFound();
  }

  if (loading) {
     return <div className="min-h-screen pt-32 pb-20 flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-24 pb-12 md:pt-32 md:pb-20 overflow-hidden bg-slate-900 border-b border-white/10">
        <div className="absolute inset-0">
          <img 
            src={product.image} 
            alt={product.title} 
            className="w-full h-full object-cover opacity-30 grayscale mix-blend-overlay"
          />
           <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className="inline-block px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-primary/20 text-primary border border-primary/30 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-4 md:mb-6 backdrop-blur-sm">
                    {product.category}
                </div>
                <h1 className="text-3xl md:text-6xl font-display font-bold text-white mb-4 md:mb-6 leading-tight">
                    {product.title}
                </h1>
                <p className="text-base md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed px-2 md:px-0">
                    {product.description}
                </p>
            </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16">
                <div>
                   <motion.div 
                     initial={{ opacity: 0, x: -30 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     viewport={{ once: true }}
                     className="rounded-2xl md:rounded-3xl overflow-hidden shadow-xl md:shadow-2xl border border-slate-100"
                    >
                        <img 
                            src={product.image} 
                            alt={product.title} 
                            className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                        />
                   </motion.div>
                </div>
                
                <div className="flex flex-col justify-center">
                    <motion.div
                         initial={{ opacity: 0, x: 30 }}
                         whileInView={{ opacity: 1, x: 0 }}
                         viewport={{ once: true }}
                    >
                        <h2 className="text-2xl md:text-3xl font-display font-bold text-slate-900 mb-4 md:mb-6">Product Overview</h2>
                        <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-6 md:mb-8">
                            Our {product.title} offers superior performance and durability for modern construction needs. 
                            Engineered with precision and high-grade materials, it ensures long-lasting protection and structural integrity.
                        </p>

                        <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                             <Info className="w-5 h-5 text-primary" /> Key Features
                        </h3>
                        <ul className="space-y-3 md:space-y-4 mb-8 md:mb-10">
                            {[
                                "High weather resistance and durability",
                                "Precision engineering for perfect fit",
                                "Available in multiple finishes and colors",
                                "Low maintenance requirements",
                                "Eco-friendly and sustainable materials"
                            ].map((feature, i) => (
                                <li key={i} className="flex items-center gap-3 text-slate-700 text-sm md:text-base font-medium">
                                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                                    {feature}
                                </li>
                            ))}
                        </ul>

                        <div className="flex flex-row gap-2 mt-6 md:mt-8">
                            <Link href="/contact" className="flex-1">
                                <Button 
                                  size="lg" 
                                  className="w-full rounded-full px-2 py-2.5 md:px-8 md:py-6 text-[11px] md:text-base shadow-[0_4px_14px_0_rgba(242,98,56,0.39)] hover:shadow-[0_6px_20_rgba(242,98,56,0.23)] hover:-translate-y-1 transition-all duration-300 bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] border-none font-bold whitespace-nowrap"
                                >
                                    Get Quote <ArrowRight className="ml-1 w-3 h-3 md:ml-2 md:w-5 md:h-5" />
                                </Button>
                            </Link>
                            <div className="flex-1">
                                <Button 
                                  variant="outline" 
                                  size="lg" 
                                  className="w-full rounded-full px-2 py-2.5 md:px-8 md:py-6 text-[11px] md:text-base border-2 border-slate-200 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-300 group font-bold whitespace-nowrap"
                                >
                                    <Download className="mr-1 w-3 h-3 md:mr-2 md:w-5 md:h-5 group-hover:animate-bounce" /> Brochure
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
      </section>

      {/* Specifications / Technical Details */}
      <section className="py-12 md:py-20 bg-slate-50">
          <div className="container mx-auto px-4">
              <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-12 shadow-sm border border-slate-100">
                  <h3 className="text-xl md:text-2xl font-display font-bold text-slate-900 mb-6 md:mb-8 text-center md:text-left">Technical Specifications</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
                      <div className="p-5 md:p-6 bg-slate-50 rounded-xl md:rounded-2xl border border-slate-100">
                          <h4 className="text-[10px] md:text-sm font-bold text-slate-500 uppercase tracking-wider mb-1 md:mb-2">Material Grade</h4>
                          <p className="text-base md:text-lg font-bold text-slate-900">High-Tensile Steel 550 MPA</p>
                      </div>
                      <div className="p-5 md:p-6 bg-slate-50 rounded-xl md:rounded-2xl border border-slate-100">
                           <h4 className="text-[10px] md:text-sm font-bold text-slate-500 uppercase tracking-wider mb-1 md:mb-2">Coating Thickness</h4>
                           <p className="text-base md:text-lg font-bold text-slate-900">AZ150 / Z275 GSM</p>
                      </div>
                      <div className="p-5 md:p-6 bg-slate-50 rounded-xl md:rounded-2xl border border-slate-100">
                           <h4 className="text-[10px] md:text-sm font-bold text-slate-500 uppercase tracking-wider mb-1 md:mb-2">Warranty</h4>
                           <p className="text-base md:text-lg font-bold text-slate-900">Up to 25 Years</p>
                      </div>
                  </div>
              </div>
          </div>
      </section>
    </div>
  );
}
