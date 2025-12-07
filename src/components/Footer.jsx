import React from 'react'
import { Facebook, Instagram, Linkedin, Twitter, Sparkles, MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  const scrollToSection = (id) => (e) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth"
      });
    }
  };

  return (
    <footer className="bg-stone-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Sparkles size={24} className="text-[#C5A059]" />
              <span className="font-serif text-2xl font-bold tracking-wide">Naila's Spa</span>
            </div>
            <p className="text-stone-400 leading-relaxed">
              A sanctuary for holistic wellness, rooted in tradition and crafted with care. Your journey to healing begins here.
            </p>
            <div className="flex items-center gap-4">
              <Facebook size={20} className="text-stone-400 hover:text-[#C5A059] transition-colors cursor-pointer" />
              <Instagram size={20} className="text-stone-400 hover:text-[#C5A059] transition-colors cursor-pointer" />
              <Linkedin size={20} className="text-stone-400 hover:text-[#C5A059] transition-colors cursor-pointer" />
              <Twitter size={20} className="text-stone-400 hover:text-[#C5A059] transition-colors cursor-pointer" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-lg font-semibold mb-6 text-[#C5A059]">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="#about" onClick={scrollToSection('about')} className="text-stone-400 hover:text-white transition-colors cursor-pointer">
                  About Us
                </a>
              </li>
              <li>
                <a href="#services" onClick={scrollToSection('services')} className="text-stone-400 hover:text-white transition-colors cursor-pointer">
                  Our Services
                </a>
              </li>
              <li>
                <a href="#contact-review" onClick={scrollToSection('contact-review')} className="text-stone-400 hover:text-white transition-colors cursor-pointer">
                  Reviews
                </a>
              </li>
              <li>
                <a href="#card-2" onClick={scrollToSection('card-2')} className="text-stone-400 hover:text-white transition-colors cursor-pointer">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-serif text-lg font-semibold mb-6 text-[#C5A059]">Our Services</h3>
            <ul className="space-y-3 text-stone-400">
              <li>Spa & Wellness</li>
              <li>Confinement Care</li>
              <li>Confinement Food</li>
              <li>Sport Therapy</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-serif text-lg font-semibold mb-6 text-[#C5A059]">Get in Touch</h3>
            <ul className="space-y-4">
              
              <li className="flex items-center gap-3 text-stone-400">
                <Phone size={18} className="text-[#C5A059] flex-shrink-0" />
                <span className="text-sm">(555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3 text-stone-400">
                <Mail size={18} className="text-[#C5A059] flex-shrink-0" />
                <span className="text-sm">hello@nailasspa.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-stone-800">
        <div className="container mx-auto px-6 md:px-12 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-stone-500 text-sm">
              &copy; {new Date().getFullYear()} Naila's Spa. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <a href="#" className="text-stone-500 hover:text-[#C5A059] transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-stone-500 hover:text-[#C5A059] transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-stone-500 hover:text-[#C5A059] transition-colors">
                Booking Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
