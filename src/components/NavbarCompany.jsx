import { useState } from "react";
import { Link } from "react-router-dom";
import { Sparkles, Menu, X } from "lucide-react";

const NavbarCompany = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Static white navbar, no scroll effects */}
      <nav className="fixed top-0 left-0 w-full z-[50] bg-white shadow-md py-4">
        
        {/* Desktop */}
        <div className="hidden md:flex justify-between items-center px-8 lg:px-12 max-w-[1400px] mx-auto">

          {/* Left links */}
          <div className="flex gap-x-8 text-sm font-medium uppercase tracking-widest text-stone-900">
            <a href="#services" className="hover:text-[#C5A059] transition-colors">
              Services
            </a>
            <a href="#about" className="hover:text-[#C5A059] transition-colors">
              About
            </a>
          </div>

          {/* Center Logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Link
              to="/"
              className="flex items-center gap-2 cursor-pointer group text-stone-900"
            >
              <Sparkles size={20} className="text-[#C5A059]" />
              <span className="font-serif text-2xl font-bold tracking-wide group-hover:text-[#C5A059] transition-colors">
                Naila's Spa
              </span>
            </Link>
          </div>

          {/* Right links */}
          <div className="flex gap-x-8 text-sm font-medium uppercase tracking-widest text-stone-900">
            <a
              href="#contact"
              className="hover:text-[#C5A059] transition-colors"
            >
              Contact
            </a>
          </div>
        </div>

        {/* Mobile */}
        <div className="md:hidden flex justify-between items-center px-6">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-stone-900"
          >
            <Sparkles size={18} className="text-[#C5A059]" />
            <span className="font-serif text-xl font-bold tracking-wide">
              Naila's Spa
            </span>
          </Link>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-stone-900"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-[45] bg-white flex flex-col items-center justify-center gap-8 md:hidden">
          <a
            href="#services"
            onClick={() => setMenuOpen(false)}
            className="text-stone-900 font-serif text-2xl hover:text-[#C5A059] transition-colors"
          >
            Services
          </a>

          <a
            href="#about"
            onClick={() => setMenuOpen(false)}
            className="text-stone-900 font-serif text-2xl hover:text-[#C5A059] transition-colors"
          >
            About
          </a>

          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="text-stone-900 font-serif text-2xl hover:text-[#C5A059] transition-colors"
          >
            Contact
          </a>
        </div>
      )}
    </>
  );
};

export default NavbarCompany;
