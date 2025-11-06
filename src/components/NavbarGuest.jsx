import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'

const Navbar = () => {
  const navigate = useNavigate()
  
  return (
    <section id='navbar' className='absolute top-0 left-0 w-full z-[40] bg-white/10'>
      {/* Desktop Layout - hidden on mobile */}
      <div className='hidden md:flex h-[70px] justify-between items-center px-8'>
        {/* Left section */}
        <div className="text-amber-50 flex gap-x-4">
          <a href="#services">Services</a>
          <a href="#about">About</a>

        </div>
        
        {/* Center (Naila's Spa) */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <a href="#hero" className="text-amber-50 font-semibold font-gabrielle text-4xl">
            Naila's Spa
          </a>
        </div>
        
        {/* Right section */}
        <div className="text-amber-50 flex gap-x-4">
          <a href="#contact">Contact</a>
          <button
            onClick={() => navigate('/login')}
            className="ml-4 px-4 py-1 border border-amber-50 rounded-full hover:bg-amber-50 hover:text-black transition-all duration-300"
          >
            Login
          </button>
        </div>
      </div>

      {/* Mobile Layout - visible only on mobile */}
      <div className='md:hidden flex flex-col items-center py-4'>
        {/* Nibbles on top */}
        <div className="mb-4">
          <a href="#hero" className="text-amber-50 font-semibold text-4xl font-gabrielle">
            Naila's Spa
          </a>
        </div>
        
        {/* Menu items below */}
        <div className="text-amber-50 flex gap-x-6 text-sm">
          <a href="#services">Services</a>
          <a href="#contact">Contact</a>
          <a href="#about">About</a>
        </div>

        {/* Mobile login button */}
        <button
          onClick={() => navigate('/login')}
          className="text-amber-50 border border-amber-50 px-6 py-1 rounded-full text-sm hover:bg-amber-50 hover:text-black transition-all duration-300"
        >
          Login
        </button>
      </div>
    </section>
  )
}

export default Navbar