import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sparkles, Menu, X } from 'lucide-react'
import gsap from 'gsap'

const Navbar = () => {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id) => (e) => {
    e.preventDefault()
    setMenuOpen(false)
    const element = document.getElementById(id)
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      })
    }
  }
  
  return (
    <>
      <nav 
        className={`fixed top-0 left-0 w-full z-[40] transition-all duration-300 ${
          scrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-md py-4' 
            : 'bg-transparent py-6'
        }`}
      >
        {/* Desktop Layout */}
        <div className='hidden md:flex justify-between items-center px-8 lg:px-12 max-w-[1400px] mx-auto'>
          {/* Left section */}
          <div className={`flex gap-x-8 text-sm font-medium uppercase tracking-widest transition-colors ${
            scrolled ? 'text-stone-900' : 'text-black'
          }`}>
            <a 
              href="#about" 
              onClick={scrollToSection('about')}
              className="hover:text-[#C5A059] transition-colors cursor-pointer"
            >
              About
            </a>
            <a 
              href="#services" 
              onClick={scrollToSection('services')}
              className="hover:text-[#C5A059] transition-colors cursor-pointer"
            >
              Services
            </a>
          </div>
          
          {/* Center Logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <a 
              href="#hero" 
              onClick={scrollToSection('hero')}
              className={`flex items-center gap-2 cursor-pointer group ${
                scrolled ? 'text-stone-900' : 'text-black'
              }`}
            >
              <Sparkles 
                size={20} 
                className="text-[#C5A059]"
              />
              <span className="font-serif text-2xl font-bold tracking-wide group-hover:text-[#C5A059] transition-colors">
                Naila's Spa
              </span>
            </a>
          </div>
          
          {/* Right section */}
          <div className={`flex gap-x-8 items-center text-sm font-medium uppercase tracking-widest transition-colors ${
            scrolled ? 'text-stone-900' : 'text-black'
          }`}>
            <a 
              href="#contact-review" 
              onClick={scrollToSection('contact-review')}
              className="hover:text-[#C5A059] transition-colors cursor-pointer"
            >
              Contact
            </a>
            <button
              onClick={() => navigate('/login')}
              className={`px-6 py-2 rounded-full transition-all duration-300 border ${
                scrolled 
                  ? 'border-stone-900 hover:bg-stone-900 hover:text-white' 
                  : 'border-black/50 hover:bg-white hover:text-stone-900'
              }`}
            >
              Login
            </button>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className='md:hidden flex justify-between items-center px-6'>
          {/* Logo */}
          <a 
            href="#hero" 
            onClick={scrollToSection('hero')}
            className={`flex items-center gap-2 cursor-pointer ${
              scrolled ? 'text-stone-900' : 'text-black'
            }`}
          >
            <Sparkles size={18} className="text-[#C5A059]" />
            <span className="font-serif text-xl font-bold tracking-wide">
              Naila's Spa
            </span>
          </a>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className={`transition-colors ${
              scrolled ? 'text-stone-900' : 'black'
            }`}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-[35] bg-white flex flex-col items-center justify-center gap-8 md:hidden">
          <a 
            href="#about" 
            onClick={scrollToSection('about')}
            className="text-stone-900 font-serif text-2xl hover:text-[#C5A059] transition-colors"
          >
            About
          </a>
          <a 
            href="#services" 
            onClick={scrollToSection('services')}
            className="text-stone-900 font-serif text-2xl hover:text-[#C5A059] transition-colors"
          >
            Services
          </a>
          <a 
            href="#contact-review" 
            onClick={scrollToSection('contact-review')}
            className="text-stone-900 font-serif text-2xl hover:text-[#C5A059] transition-colors"
          >
            Contact
          </a>
          <button
            onClick={() => {
              setMenuOpen(false)
              navigate('/login')
            }}
            className="mt-4 px-8 py-3 bg-[#C5A059] text-white rounded-full font-bold uppercase tracking-widest hover:bg-stone-900 transition-all"
          >
            Login
          </button>
        </div>
      )}
    </>
  )
}

export default Navbar
