"use client";

import { useEffect, useState } from "react";
import { SERVICES } from "@/lib/constants";
import { notFound, useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Hammer, ListChecks, ShieldCheck, FileText, Wrench } from "lucide-react";

// Helper map for icons (since they are stored as strings in constants)
const iconMap = {
  Hammer: Hammer,
  FileText: FileText,
  Wrench: Wrench
};

export default function ServiceDetail() {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const foundService = SERVICES.find((s) => s.id === id);
      if (foundService) {
        setService(foundService);
      }
      setLoading(false);
    }
  }, [id]);

  if (!loading && !service) {
    return notFound();
  }

  if (loading) {
     return <div className="min-h-screen pt-32 pb-20 flex items-center justify-center">Loading...</div>;
  }

  const IconComponent = iconMap[service.icon] || Hammer;

  // We can pick a random image based on the service ID or index (mocking for now as SERVICES doesn't have image prop explicitly set up for detail page, using one from the list or a fallback)
  // Actually, let's grab the same image logic from the main services page for consistency or utilize a high-quality placeholder.
  const serviceImages = {
      "installation": "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2000&auto=format&fit=crop",
      "consultation": "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2000&auto=format&fit=crop",
      "maintenance": "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2000&auto=format&fit=crop"
  };
  const heroImage = serviceImages[service.id] || "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2000&auto=format&fit=crop";


  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden bg-slate-900 border-b border-white/10">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt={service.title} 
            className="w-full h-full object-cover opacity-20 grayscale"
          />
           <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl"
            >
                <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center text-primary mb-8 backdrop-blur-md border border-primary/30">
                    <IconComponent className="w-8 h-8" />
                </div>
                <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
                    {service.title}
                </h1>
                <p className="text-xl text-slate-300 max-w-2xl leading-relaxed">
                    {service.description} We are committed to delivering excellence at every stage of the project lifecycle.
                </p>
            </motion.div>
        </div>
      </section>

      {/* Process / Details Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
                <div className="lg:col-span-8">
                     <h2 className="text-3xl font-display font-bold text-slate-900 mb-8">Service Overview</h2>
                     <div className="prose prose-lg text-slate-600 mb-12">
                        <p>
                            At MaxRoof, our <strong>{service.title}</strong> service is designed to meet the rigorous demands of modern industrial and commercial construction. 
                            We leverage advanced technology and seasoned expertise to ensure that your project is executed flawlessly.
                        </p>
                        <p>
                            Whether you are looking for a complete turnkey solution or specialized support, our team works closely with you to understand your specific requirements 
                            and deliver results that exceed expectations.
                        </p>
                     </div>

                     <h3 className="text-2xl font-display font-bold text-slate-900 mb-6">Our Process</h3>
                     <div className="space-y-8">
                        {[
                            { title: "Initial Consultation", desc: "Understanding your project goals, timeline, and budget requirements." },
                            { title: "Strategic Planning", desc: "Developing a comprehensive roadmap and resource allocation plan." },
                            { title: "Execution", desc: " deploying our expert teams to carry out the work with precision." },
                            { title: "Quality Assurance", desc: "Rigorous testing and inspection to ensure compliance with global standards." }
                        ].map((step, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="flex gap-6"
                            >
                                <div className="flex flex-col items-center">
                                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-sm border border-primary/20">
                                        {i + 1}
                                    </div>
                                    {i !== 3 && <div className="w-px h-full bg-slate-200 my-2" />}
                                </div>
                                <div className="pb-8">
                                    <h4 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h4>
                                    <p className="text-slate-600">{step.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                     </div>
                </div>

                <div className="lg:col-span-4">
                    <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 sticky top-32">
                        <h3 className="text-xl font-bold text-slate-900 mb-6">Why Choose Us?</h3>
                        <ul className="space-y-4 mb-8">
                            <li className="flex items-start gap-3">
                                <ShieldCheck className="w-5 h-5 text-primary mt-0.5" />
                                <span className="text-slate-600 text-sm font-medium">Certified Industry Experts</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <ListChecks className="w-5 h-5 text-primary mt-0.5" />
                                <span className="text-slate-600 text-sm font-medium">Comprehensive Safety Protocols</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Hammer className="w-5 h-5 text-primary mt-0.5" />
                                <span className="text-slate-600 text-sm font-medium">State-of-the-Art Equipment</span>
                            </li>
                        </ul>
                        
                        <div className="pt-6 border-t border-slate-200">
                             <p className="text-slate-500 text-sm mb-4">Ready to start your project?</p>
                             <Link href="/contact" className="w-full">
                                <Button className="w-full rounded-xl" size="lg">
                                    Get a Quote
                                </Button>
                             </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
}
