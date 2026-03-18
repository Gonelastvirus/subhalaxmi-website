import React from 'react';
import { motion } from 'framer-motion';
import { Download, Search, Building2 } from 'lucide-react';
import { setDownloadModalOpen } from '@/hooks/use-app-state';

export function Hero() {
  return (
    <section id="home" className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={`${import.meta.env.BASE_URL}images/hero-bg.png`}
          alt="Luxury modern real estate"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 text-primary-foreground font-medium text-sm mb-6 shadow-[0_0_15px_rgba(200,150,50,0.3)]">
              Leading Real Estate in Nepal
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white leading-tight mb-6"
          >
            Find Your <span className="text-primary drop-shadow-sm">Dream Property</span> in Nepal
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-white/80 mb-10 max-w-lg leading-relaxed"
          >
            Buy, Sell & Construction Services — All in One App. 
            Connect with top verified sellers and expert builders instantly.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button
              onClick={() => setDownloadModalOpen(true)}
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-lg bg-gradient-to-r from-primary to-yellow-500 text-primary-foreground shadow-[0_0_30px_rgba(218,165,32,0.4)] hover:shadow-[0_0_40px_rgba(218,165,32,0.6)] hover:-translate-y-1 transition-all duration-300"
            >
              <Download className="w-5 h-5" />
              Download APK
            </button>
            <a
              href="#properties"
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-lg bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all duration-300 border border-white/30"
            >
              <Search className="w-5 h-5" />
              Browse Properties
            </a>
          </motion.div>
        </div>
      </div>
      
      {/* Decorative Bottom Arch */}
      <div className="absolute bottom-0 inset-x-0 h-16 bg-background rounded-t-[100%] z-10" />
    </section>
  );
}
