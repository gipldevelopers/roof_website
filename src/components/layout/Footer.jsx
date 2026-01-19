import Link from "next/link";
import { Facebook, Twitter, Linkedin, Instagram, MapPin, Phone, Mail, ArrowRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-light-brown text-gray-800 pt-20 pb-10 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-white to-primary opacity-20" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2 group/footer-logo">
              <img 
                src="/logo/6f48a7af-3abc-49b9-8548-aa14faedb439-removebg-preview.png" 
                alt="Roofy Logo" 
                className="h-10 w-auto transition-transform duration-300 group-hover/footer-logo:scale-105"
              />
            </Link>
            <p className="text-gray-600 leading-relaxed text-sm">
              Premium metal roofing and pre-engineered building solutions engineered for durability, performance, and aesthetic excellence.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/50 border border-gray-200 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 text-gray-600">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-bold text-lg mb-6 text-gray-900">Company</h3>
            <ul className="space-y-4 text-sm text-gray-600">
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/careers" className="hover:text-primary transition-colors">Careers</Link></li>
              <li><Link href="/blog" className="hover:text-primary transition-colors">News & Insights</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Support</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-display font-bold text-lg mb-6 text-gray-900">Solutions</h3>
            <ul className="space-y-4 text-sm text-gray-600">
              <li><Link href="/products" className="hover:text-primary transition-colors">Metal Roofing</Link></li>
              <li><Link href="/products" className="hover:text-primary transition-colors">PEB Structures</Link></li>
              <li><Link href="/products" className="hover:text-primary transition-colors">Wall Cladding</Link></li>
              <li><Link href="/services" className="hover:text-primary transition-colors">Installation</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-display font-bold text-lg mb-6 text-gray-900">Contact</h3>
            <ul className="space-y-4 text-sm text-gray-600">
              <li className="flex gap-3 items-start">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span>123 Industrial Ave, Construction District, City 54321</span>
              </li>
              <li className="flex gap-3 items-center">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex gap-3 items-center">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span>sales@roofy.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200/60 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Roofy Solutions. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
