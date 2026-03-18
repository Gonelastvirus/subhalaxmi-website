import React from 'react';
import { motion } from 'framer-motion';
import { Download, CheckCircle } from 'lucide-react';
import { APK_URL } from '@/lib/constants';

export function DownloadCTA() {
  const features = [
    "Exclusive Off-Market Properties",
    "Direct Chat with Sellers & Builders",
    "Instant Service Booking",
    "Post Your Own Property"
  ];

  return (
    <section className="py-24 bg-foreground relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-[3rem] p-8 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-12 backdrop-blur-xl shadow-2xl">
          
          <div className="lg:w-1/2">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 leading-tight">
              Get Full Access on Our <span className="text-primary">Mobile App</span>
            </h2>
            <p className="text-lg text-white/70 mb-8 leading-relaxed">
              Experience the future of real estate. Download the official SL Property app to unlock premium features and connect instantly.
            </p>
            
            <ul className="space-y-4 mb-10">
              {features.map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-white/90 font-medium">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>

            <a
              href={APK_URL}
              download
              className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full font-bold text-lg text-primary-foreground bg-primary shadow-[0_0_40px_rgba(218,165,32,0.4)] hover:shadow-[0_0_60px_rgba(218,165,32,0.6)] hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto"
            >
              <Download className="w-6 h-6" />
              Download APK Free
            </a>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 flex justify-center lg:justify-end"
          >
            <div className="relative w-[300px] h-[400px]">
              {/* Decorative glows */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/20 blur-[100px] rounded-full z-0" />
              
              <img 
                src={`${import.meta.env.BASE_URL}images/app-mockup.png`} 
                alt="App Mockup" 
                className="relative z-10 w-full h-full object-contain drop-shadow-2xl"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
