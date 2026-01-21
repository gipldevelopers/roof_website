"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, BookOpen, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

const FAQ_DATA = [
  {
    question: "What is the lifespan of your metal roofing systems?",
    answer: "Our premium metal roofing systems are designed to last 40-60 years with proper installation and maintenance. We use high-grade materials with protective coatings that resist corrosion, fading, and weather damage, ensuring long-term performance and value.",
    category: "general"
  },
  {
    question: "How long does installation typically take?",
    answer: "Installation time varies based on project size and complexity. For standard commercial buildings, our pre-engineered systems can be installed 30-50% faster than traditional construction. A typical 10,000 sq. ft. structure can be completed in 4-6 weeks from ground-breaking to completion.",
    category: "installation"
  },
  {
    question: "Are your buildings energy efficient?",
    answer: "Yes, our buildings feature advanced insulation systems with R-values up to R-30. Combined with cool-roof technology that reflects solar heat, our structures can reduce energy costs by up to 40% compared to conventional buildings.",
    category: "technical"
  },
  {
    question: "What maintenance is required for metal roofs?",
    answer: "Metal roofs require minimal maintenance. We recommend annual inspections, cleaning of gutters and downspouts, and checking for debris accumulation. Our roofs come with self-cleaning coatings that reduce maintenance needs significantly.",
    category: "maintenance"
  },
  {
    question: "Can you customize designs to match our architecture?",
    answer: "Absolutely. We offer complete customization options including various profiles, colors, finishes, and trim details. Our design team works closely with architects to ensure the final product complements your existing or planned architecture.",
    category: "general"
  },
  {
    question: "What warranty do you provide?",
    answer: "We offer comprehensive warranties including a 25-year paint warranty, 20-year weathertightness warranty, and up to 40-year structural warranty depending on the system. All warranties are transferable to new owners.",
    category: "technical"
  },
  {
    question: "Do you handle permits and approvals?",
    answer: "Yes, we provide complete turnkey solutions including assistance with permit applications, engineering approvals, and local compliance. Our team has extensive experience navigating building codes across India.",
    category: "installation"
  },
  {
    question: "How do you handle extreme weather conditions?",
    answer: "Our systems are engineered to withstand winds up to 150 km/h, heavy snow loads, and seismic activity. We conduct site-specific wind and load calculations to ensure optimal performance for your location's conditions.",
    category: "technical"
  },
  {
    question: "What is the lead time for material delivery?",
    answer: "Standard materials are typically available within 2-3 weeks. Custom colors and specialized components may require 4-6 weeks. We maintain strategic inventory levels to ensure timely project starts.",
    category: "installation"
  },
  {
    question: "Do you provide financing options?",
    answer: "We partner with leading financial institutions to offer competitive financing solutions for both commercial and industrial projects. Flexible payment plans and lease-to-own options are available.",
    category: "general"
  },
  {
    question: "Can you work on occupied buildings?",
    answer: "Yes, we have specialized procedures for working on occupied facilities with minimal disruption. We schedule work during off-hours when needed and implement comprehensive safety and cleanliness protocols.",
    category: "installation"
  },
  {
    question: "How do you ensure quality control?",
    answer: "We implement rigorous quality control at every stage: material testing, factory production monitoring, and on-site inspection. Our team uses advanced technology including drone inspections and thermal imaging for quality verification.",
    category: "technical"
  }
];

const CATEGORIES = [
  { id: "all", label: "All Questions", count: FAQ_DATA.length },
  { id: "general", label: "General", count: FAQ_DATA.filter(f => f.category === "general").length },
  { id: "installation", label: "Installation", count: FAQ_DATA.filter(f => f.category === "installation").length },
  { id: "technical", label: "Technical", count: FAQ_DATA.filter(f => f.category === "technical").length },
  { id: "maintenance", label: "Maintenance", count: FAQ_DATA.filter(f => f.category === "maintenance").length }
];

export default function FAQSection() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [openIndex, setOpenIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFAQs = FAQ_DATA.filter(faq => {
    const matchesCategory = activeCategory === "all" || faq.category === activeCategory;
    const matchesSearch = searchQuery === "" || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Function to get category color
  const getCategoryColor = (category) => {
    const colors = {
      general: "bg-blue-100 text-blue-800",
      installation: "bg-green-100 text-green-800",
      technical: "bg-purple-100 text-purple-800",
      maintenance: "bg-amber-100 text-amber-800"
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  // Function to get category label
  const getCategoryLabel = (category) => {
    const labels = {
      general: "General",
      installation: "Installation",
      technical: "Technical",
      maintenance: "Maintenance"
    };
    return labels[category] || "General";
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-semibold mb-4">
            <HelpCircle className="w-4 h-4" />
            Knowledge Base
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground text-sm md:text-base">
            Find answers to common questions about our metal roofing and pre-engineered building solutions
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-2xl mx-auto mb-10"
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Search for answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 pl-14 rounded-xl border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent text-lg focus:shadow-md transition-shadow"
            />
            <HelpCircle className="absolute left-5 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                Clear
              </button>
            )}
          </div>
        </motion.div>

        {/* Category Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {CATEGORIES.map((category) => {
            const isActive = activeCategory === category.id;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-5 py-2.5 rounded-full border transition-all duration-300 flex items-center gap-2 ${
                  isActive
                    ? "bg-accent text-white border-accent shadow-md"
                    : "bg-white text-gray-700 border-gray-300 hover:border-accent hover:bg-accent/5"
                }`}
              >
                <span className="font-medium">{category.label}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  isActive
                    ? "bg-white/30 text-white"
                    : "bg-gray-100 text-gray-600"
                }`}>
                  {category.count}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* FAQ Items */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-4xl mx-auto space-y-3 mb-16"
        >
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full p-6 text-left flex justify-between items-center gap-4 hover:bg-gray-50 transition-colors"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${getCategoryColor(faq.category)} uppercase tracking-wide`}>
                          {getCategoryLabel(faq.category)}
                        </span>
                      </div>
                      <h3 className="text-lg md:text-xl font-bold text-gray-900">
                        {faq.question}
                      </h3>
                    </div>
                    <ChevronDown className={`w-6 h-6 text-gray-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`} />
                  </button>
                  
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        id={`faq-answer-${index}`}
                        role="region"
                        aria-labelledby={`faq-question-${index}`}
                      >
                        <div className="px-6 pb-6 pt-2 border-t border-gray-100">
                          <p className="text-gray-600 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })
          ) : (
            <div className="text-center py-12">
              <HelpCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">No matches found</h3>
              <p className="text-gray-600">
                Try searching with different keywords or browse our categories
              </p>
            </div>
          )}
        </motion.div>

        {/* Contact CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-primary/5 via-accent/10 to-primary/5 rounded-2xl p-8 md:p-12 text-center border border-gray-200"
        >
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Still have questions?
            </h3>
            <p className="text-gray-600 text-lg mb-8">
              Our expert team is ready to help you with personalized advice and solutions.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <div className="flex items-center gap-3 px-6 py-4 bg-white rounded-xl border border-gray-200 shadow-sm">
                <Phone className="w-5 h-5 text-accent" />
                <div className="text-left">
                  <p className="text-sm text-gray-500">Call us at</p>
                  <p className="font-bold text-gray-900">+91 98765 43210</p>
                </div>
              </div>
              <div className="flex items-center gap-3 px-6 py-4 bg-white rounded-xl border border-gray-200 shadow-sm">
                <Mail className="w-5 h-5 text-accent" />
                <div className="text-left">
                  <p className="text-sm text-gray-500">Email us</p>
                  <p className="font-bold text-gray-900">info@roofy.com</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact" className="inline-block">
                <button className="h-12 px-8 bg-primary text-white hover:bg-primary/90 rounded-full font-medium transition-all duration-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                  Contact Sales Team
                </button>
              </Link>
              <Link href="/downloads" className="inline-block">
                <button className="h-12 px-8 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-full font-medium transition-all duration-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 flex items-center justify-center">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Download Brochure
                </button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}