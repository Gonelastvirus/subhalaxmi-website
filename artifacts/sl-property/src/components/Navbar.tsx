import React, { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X, Download } from 'lucide-react';
import { setDownloadModalOpen } from '@/hooks/use-app-state';
import { COMPANY_NAME } from '@/lib/constants';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Properties', href: '#properties' },
    { name: 'Services', href: '#services' },
    { name: 'About', href: '#about' },
  ];

  return (
    <motion.header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/90 backdrop-blur-md shadow-sm border-b border-border/50 py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl overflow-hidden shadow-sm group-hover:shadow-md transition-shadow">
            <img 
              src={`${import.meta.env.BASE_URL}images/logo.png`} 
              alt={COMPANY_NAME} 
              className="w-full h-full object-cover"
            />
          </div>
          <span className={`font-display font-bold text-lg tracking-wide hidden sm:block ${isScrolled ? 'text-foreground' : 'text-white drop-shadow-md'}`}>
            Subhalaxmi Property
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-sm font-medium hover:text-primary transition-colors ${
                isScrolled ? 'text-foreground/80' : 'text-white/90 drop-shadow-sm hover:text-white'
              }`}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <button
            onClick={() => setDownloadModalOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold bg-white text-primary shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 border border-transparent hover:border-primary/20"
          >
            <Download className="w-4 h-4" />
            Get App
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className={`md:hidden p-2 rounded-lg ${isScrolled ? 'text-foreground' : 'text-white'}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav Dropdown */}
      <motion.div
        initial={false}
        animate={{ height: mobileMenuOpen ? 'auto' : 0, opacity: mobileMenuOpen ? 1 : 0 }}
        className="md:hidden overflow-hidden bg-background border-b border-border/50"
      >
        <div className="px-4 pt-2 pb-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-foreground/80 font-medium p-2 hover:bg-secondary rounded-lg"
            >
              {link.name}
            </a>
          ))}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              setDownloadModalOpen(true);
            }}
            className="flex items-center justify-center gap-2 w-full px-5 py-3 mt-2 rounded-xl font-semibold bg-primary text-primary-foreground shadow-md"
          >
            <Download className="w-4 h-4" />
            Download App
          </button>
        </div>
      </motion.div>
    </motion.header>
  );
}
