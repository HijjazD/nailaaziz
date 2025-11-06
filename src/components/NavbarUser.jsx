import { useEffect } from 'react'
import gsap from 'gsap'
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authstore/authStore';

const NavbarUser = () => {
  const navigate = useNavigate()
  const {logout} = useAuthStore()

  const handleLogout = () => {
    console.log("logout")
    logout()
    navigate('/')
  }
  return (
    <section id='navbar' className='absolute top-0 left-0 w-full z-[50] bg-white/10'>
      {/* Desktop Layout - hidden on mobile */}
      <div className='hidden md:flex h-[70px] justify-between items-center px-8'>
        {/* Left section */}
        <div className="text-amber-50 flex gap-x-4">
          <Link to="/client/dashboard">Services</Link>
          <Link to="/client/dashboard/mybookings">MyBookings</Link>
        </div>

        
        {/* Center (Nibbles) */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <a href="#hero" className="text-amber-50 font-semibold">
            Kaknel
          </a>
        </div>
        
        {/* Right section */}
        <div className="text-amber-50 flex gap-x-4 bg-gray-600 rounded-2xl">
          <button 
            onClick={handleLogout}
            className="hover:text-amber-300 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Mobile Layout - visible only on mobile */}
      <div className='md:hidden flex flex-col items-center py-4'>
        {/* Nibbles on top */}
        <div className="mb-4">
          <a href="#hero" className="text-amber-50 font-semibold text-lg">
            Kaknel
          </a>
        </div>
        
        {/* Menu items below */}
        <div className="text-amber-50 flex gap-x-6 text-sm">
          <Link to="/client/dashboard">Services</Link>
          <Link to="/client/dashboard/mybookings">MyBookings</Link>
          <div className="text-amber-50 flex gap-x-4 bg-gray-600 rounded-2xl p-2">
            <button 
                onClick={handleLogout}
                className="hover:text-amber-300 transition-colors"
            >
                Logout
          </button>
        </div>
        </div>
      </div>
    </section>
  )
}

export default NavbarUser
