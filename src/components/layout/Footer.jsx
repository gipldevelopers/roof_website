import Link from "next/link";
import { Facebook, Twitter, Linkedin, Instagram, MapPin, Phone, Mail, ArrowRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground pt-20 pb-10 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent via-white to-accent opacity-20" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-white flex items-center justify-center text-primary font-display font-bold text-lg">
                M
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-white">
                MaxRoof
              </span>
            </div>
            <p className="text-primary-foreground/80 leading-relaxed text-sm">
              Premium metal roofing and pre-engineered building solutions engineered for durability, performance, and aesthetic excellence.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-primary transition-all duration-300">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-bold text-lg mb-6 text-white">Company</h3>
            <ul className="space-y-4 text-sm text-primary-foreground/80">
              <li><Link href="/about" className="hover:text-accent transition-colors">About Us</Link></li>
              <li><Link href="/careers" className="hover:text-accent transition-colors">Careers</Link></li>
              <li><Link href="/blog" className="hover:text-accent transition-colors">News & Insights</Link></li>
              <li><Link href="/contact" className="hover:text-accent transition-colors">Contact Support</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-display font-bold text-lg mb-6 text-white">Solutions</h3>
            <ul className="space-y-4 text-sm text-primary-foreground/80">
              <li><Link href="/products" className="hover:text-accent transition-colors">Metal Roofing</Link></li>
              <li><Link href="/products" className="hover:text-accent transition-colors">PEB Structures</Link></li>
              <li><Link href="/products" className="hover:text-accent transition-colors">Wall Cladding</Link></li>
              <li><Link href="/services" className="hover:text-accent transition-colors">Installation</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-display font-bold text-lg mb-6 text-white">Contact</h3>
            <ul className="space-y-4 text-sm text-primary-foreground/80">
              <li className="flex gap-3 items-start">
                <MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <span>123 Industrial Ave, Construction District, City 54321</span>
              </li>
              <li className="flex gap-3 items-center">
                <Phone className="w-5 h-5 text-accent shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex gap-3 items-center">
                <Mail className="w-5 h-5 text-accent shrink-0" />
                <span>sales@maxroof.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/60">
          <p>© {new Date().getFullYear()} MaxRoof Solutions. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
