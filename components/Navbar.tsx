'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, Phone, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Products', href: '/products' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        scrolled ? 'bg-white/90 backdrop-blur-xl shadow-xl py-3' : 'bg-transparent py-6'
      }`}
    >
      <div className="container-custom">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl transition-all duration-500 group-hover:rotate-12 ${
              scrolled ? 'bg-primary text-white shadow-lg' : 'bg-white text-primary'
            }`}>
              LD
            </div>
            <span className={`font-black text-2xl tracking-tighter hidden sm:block ${
              scrolled ? 'text-primary' : 'text-white'
            }`}>
              LYCARONZ <span className={scrolled ? 'text-secondary' : 'text-white/80'}>DESIGNS</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className={`text-sm font-black uppercase tracking-widest transition-all hover:scale-110 ${
                  scrolled ? 'text-gray-800 hover:text-primary' : 'text-white hover:text-secondary'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link href="/book-appointment" className={`btn-primary !px-6 !py-2.5 !text-sm ${
              scrolled ? '' : 'bg-white !text-primary hover:bg-white/90'
            }`}>
              Book Now
            </Link>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center gap-4">
            <a href="tel:+256705241179 / +256 702 084 480" className={`p-2 rounded-full ${scrolled ? 'bg-primary/10 text-primary' : 'bg-white/10 text-white'}`}>
              <Phone size={20} />
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-xl transition-colors ${
                scrolled ? 'bg-gray-100 text-gray-900' : 'bg-white/10 text-white'
              }`}
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[110] bg-primary flex flex-col p-8 md:hidden"
          >
            <div className="flex justify-between items-center mb-16">
              <span className="text-white font-black text-2xl tracking-tighter">LD MENU</span>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white"
              >
                <X size={32} />
              </button>
            </div>

            <div className="flex flex-col space-y-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * i }}
                >
                  <Link 
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-5xl font-black text-white/40 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="pt-12"
              >
                <Link 
                  href="/book-appointment"
                  onClick={() => setIsOpen(false)}
                  className="btn-primary bg-white !text-primary w-full py-6 text-2xl shadow-2xl"
                >
                  Book Appointment
                </Link>
              </motion.div>
            </div>

            <div className="mt-auto flex justify-center gap-8">
               <a href="https://wa.me/256702084480" className="text-white/60 hover:text-white">
                <MessageCircle size={32} />
               </a>
               <a href="tel:+256705241179" className="text-white/60 hover:text-white">
                <Phone size={32} />
               </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
