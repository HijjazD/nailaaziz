import { useEffect } from 'react'
import gsap from 'gsap'
import { Link } from "react-router-dom";
const NavbarCompany = () => {
  return (
    <section id='navbar' className='absolute top-0 left-0 w-full z-[50] bg-white/10'>
      {/* Desktop Layout - hidden on mobile */}
      <div className='hidden md:flex h-[70px] justify-between items-center px-8'>
        {/* Left section */}
        <div className="text-amber-50 flex gap-x-4">
          <a href="#services">Services</a>
          <a href="#about">About</a>

        </div>
        
        {/* Center (Nibbles) */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <Link
            to="/"
            className="text-amber-50 font-semibold font-gabrielle"
          >
            Naila's Spa
          </Link>
        </div>
        
        {/* Right section */}
        <div className="text-amber-50 flex gap-x-4">
          <a href="#contact">Contact</a>
        </div>
      </div>

      {/* Mobile Layout - visible only on mobile */}
      <div className='md:hidden flex flex-col items-center py-4'>
        {/* Nibbles on top */}
        <div className="mb-4">
          <Link
            to="/"
            className="text-amber-50 font-semibold font-gabrielle"
          >
            Naila's Spa
          </Link>
        </div>
        
        {/* Menu items below */}
        <div className="text-amber-50 flex gap-x-6 text-sm">
          <a href="#services">Services</a>
          <a href="#contact">Contact</a>
          <a href="#about">About</a>
        </div>
      </div>
    </section>
  )
}

export default NavbarCompany
