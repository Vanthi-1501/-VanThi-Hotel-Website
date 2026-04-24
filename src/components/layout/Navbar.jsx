import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail, MapPin, User as UserIcon, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(authService.getCurrentUser());
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    navigate('/');
    window.location.reload();
  };

  const navLinks = [
    { name: 'Trang chủ', href: '#' },
    { name: 'Phòng nghỉ', href: '#rooms' },
    { name: 'Dịch vụ', href: '#services' },
    { name: 'Bộ sưu tập', href: '#gallery' },
    { name: 'Liên hệ', href: '#contact' },
  ];

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Link to="/" className={`text-2xl font-serif font-bold ${isScrolled ? 'text-luxury-dark' : 'text-white'}`}>
            VANTHI <span className="text-luxury-gold">LUXURY</span>
          </Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-sm font-medium tracking-widest uppercase transition-colors hover:text-luxury-gold ${
                isScrolled ? 'text-luxury-dark' : 'text-white'
              }`}
            >
              {link.name}
            </a>
          ))}
          
          {user ? (
            <div className="flex items-center gap-4 ml-4">
              <div className={`flex items-center gap-2 font-medium ${isScrolled ? 'text-luxury-dark' : 'text-white'}`}>
                <div className="w-8 h-8 bg-luxury-gold rounded-full flex items-center justify-center text-white">
                  <UserIcon size={16} />
                </div>
                <span className="text-sm">{user.fullName}</span>
              </div>
              <button 
                onClick={handleLogout}
                className="p-2 text-gray-400 hover:text-rose-500 transition-colors"
                title="Đăng xuất"
              >
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn-primary ml-4 px-8">
              Đăng nhập
            </Link>
          )}

          <a href="/#rooms" className="btn-primary ml-4">
            Đặt phòng ngay
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className={isScrolled ? 'text-luxury-dark' : 'text-white'} />
          ) : (
            <Menu className={isScrolled ? 'text-luxury-dark' : 'text-white'} />
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white shadow-xl md:hidden"
          >
            <div className="flex flex-col p-6 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-luxury-dark font-medium uppercase tracking-wider hover:text-luxury-gold"
                >
                  {link.name}
                </a>
              ))}
              
              {user ? (
                <>
                  <div className="flex items-center gap-3 p-2 bg-luxury-cream rounded-xl">
                    <UserIcon className="text-luxury-gold" size={20} />
                    <span className="font-bold text-luxury-dark">{user.fullName}</span>
                  </div>
                  <button onClick={handleLogout} className="btn-primary w-full bg-rose-500 text-white border-none">
                    Đăng xuất
                  </button>
                </>
              ) : (
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="btn-primary w-full text-center">
                  Đăng nhập
                </Link>
              )}

              <a href="/#rooms" onClick={() => setIsMobileMenuOpen(false)} className="btn-primary w-full text-center">
                Đặt phòng ngay
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
