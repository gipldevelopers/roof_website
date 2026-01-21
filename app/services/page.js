"use client";

import { motion } from "framer-motion";
import { SERVICES } from "@/lib/constants";
import { Hammer, FileText, Wrench, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const iconMap = {
  Hammer: Hammer,
  FileText: FileText,
  Wrench: Wrench
};

export default function Services() {
  return (
    <div className="pt-24 pb-20">
      <section className="container mx-auto px-4 mb-20 text-center">
        <h1 className="text-4xl md:text-6xl font-display font-bold text-primary mb-6">Our Services</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          We don't just supply materials; we provide end-to-end solutions from design conceptualization to final installation.
        </p>
      </section>

      <div className="container mx-auto px-4 space-y-32">
        {SERVICES.map((service, index) => {
          const Icon = iconMap[service.icon];
          const isEven = index % 2 === 0;

          return (
            <motion.div 
              key={service.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12`}
            >
              <div className="flex-1">
                <div className="w-16 h-16 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center mb-6">
                  <Icon className="w-8 h-8" />
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-6">{service.title}</h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  {service.description} We bring years of field experience to ensure every detail is handled with precision. Our team coordinates closely with architects and contractors to deliver seamless results.
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3 text-foreground font-medium">
                    <div className="w-2 h-2 rounded-full bg-secondary/30" />
                    Certified Professionals
                  </li>
                  <li className="flex items-center gap-3 text-foreground font-medium">
                    <div className="w-2 h-2 rounded-full bg-secondary/30" />
                    On-Time Delivery
                  </li>
                  <li className="flex items-center gap-3 text-foreground font-medium">
                    <div className="w-2 h-2 rounded-full bg-secondary/30" />
                    Safety Compliant
                  </li>
                </ul>
                <div className="flex flex-wrap gap-4">
                  <Link href={`/services/${service.id}`}>
                     <Button variant="outline" size="lg" className="rounded-full">
                       Learn More
                     </Button>
                  </Link>
                  <Link href="/contact">
                    <Button size="lg" className="rounded-full">Get Service Quote</Button>
                  </Link>
                </div>
              </div>
              
              <div className="flex-1 w-full">
                <div className={`relative aspect-video rounded-2xl overflow-hidden shadow-2xl ${isEven ? 'rounded-tl-[5rem]' : 'rounded-tr-[5rem]'}`}>
                  <img 
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-primary/10 mix-blend-multiply" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
