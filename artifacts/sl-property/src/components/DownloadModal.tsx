import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Smartphone, Download, Star, ShieldCheck } from 'lucide-react';
import { useDownloadModal } from '@/hooks/use-app-state';
import { APK_URL } from '@/lib/constants';

export function DownloadModal() {
  const { isOpen, closeModal } = useDownloadModal();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="w-full max-w-md bg-card rounded-3xl shadow-2xl overflow-hidden pointer-events-auto border border-white/20 relative"
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 p-2 rounded-full bg-secondary/50 text-foreground hover:bg-secondary transition-colors z-10"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header Image/Pattern Area */}
              <div className="bg-gradient-to-br from-primary/20 to-primary/5 h-32 relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, hsl(var(--primary)) 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
                <div className="w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center relative z-10 rotate-12 hover:rotate-0 transition-transform duration-500">
                  <Smartphone className="w-8 h-8 text-primary" />
                </div>
              </div>

              {/* Content */}
              <div className="p-8 text-center">
                <h3 className="text-2xl font-display font-bold text-foreground mb-3">
                  Unlock Full Access
                </h3>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  To view full property details, owner contact information, and book services directly, please download our mobile application.
                </p>

                <div className="grid grid-cols-2 gap-4 mb-8 text-left text-sm text-foreground/80">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-primary" />
                    <span>Verified Listings</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-primary" />
                    <span>Direct Chat</span>
                  </div>
                </div>

                <a
                  href={APK_URL}
                  download
                  onClick={() => setTimeout(closeModal, 500)}
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-semibold text-primary-foreground bg-gradient-to-r from-primary to-yellow-500 shadow-lg shadow-primary/30 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
                >
                  <Download className="w-5 h-5" />
                  Download APK Now
                </a>
                
                <button
                  onClick={closeModal}
                  className="mt-4 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  Maybe Later
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
