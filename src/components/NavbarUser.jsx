import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sparkles, Menu, X } from "lucide-react";
import { useAuthStore } from "../store/authstore/authStore";

const NavbarUser = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-[50] bg-white shadow-md py-4 transition-none">
        
        {/* Desktop */}
        <div className="hidden md:flex justify-between items-center px-8 lg:px-12 max-w-[1400px] mx-auto">
          
          {/* Left section */}
          <div className="flex gap-x-8 text-sm font-medium uppercase tracking-widest text-black">
            <Link to="/client/dashboard" className="hover:text-[#C5A059]">
              Services
            </Link>

            <Link to="/client/dashboard/mybookings" className="hover:text-[#C5A059]">
              MyBookings
            </Link>
          </div>

          {/* Center Logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Link to="/" className="flex items-center gap-2 cursor-pointer text-black">
              <Sparkles size={20} className="text-[#C5A059]" />
              <span className="font-serif text-2xl font-bold tracking-wide hover:text-[#C5A059]">
                Naila's Spa
              </span>
            </Link>
          </div>

          {/* Right section */}
          <div className="flex items-center text-sm font-medium uppercase tracking-widest text-black">
            <button
              onClick={handleLogout}
              className="px-6 py-2 rounded-full border border-black text-black hover:bg-black hover:text-white transition-all duration-300"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden flex justify-between items-center px-6">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 cursor-pointer text-black">
            <Sparkles size={18} className="text-[#C5A059]" />
            <span className="font-serif text-xl font-bold tracking-wide">
              Naila's Spa
            </span>
          </Link>

          {/* Hamburger */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-black">
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-[45] bg-white flex flex-col items-center justify-center gap-8 md:hidden">
          <Link
            to="/client/dashboard"
            onClick={() => setMenuOpen(false)}
            className="text-stone-900 font-serif text-2xl hover:text-[#C5A059]"
          >
            Services
          </Link>

          <Link
            to="/client/dashboard/mybookings"
            onClick={() => setMenuOpen(false)}
            className="text-stone-900 font-serif text-2xl hover:text-[#C5A059]"
          >
            MyBookings
          </Link>

          <button
            onClick={() => {
              setMenuOpen(false);
              handleLogout();
            }}
            className="mt-4 px-8 py-3 rounded-full border border-black text-black font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all"
          >
            Logout
          </button>
        </div>
      )}
    </>
  );
};

export default NavbarUser;
