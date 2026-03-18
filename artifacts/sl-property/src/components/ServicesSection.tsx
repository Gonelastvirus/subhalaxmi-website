import React from 'react';
import { motion } from 'framer-motion';
import { HardHat, Star, MapPin, Phone, CheckCircle2 } from 'lucide-react';
import { useGetServices } from '@workspace/api-client-react';
import { setDownloadModalOpen } from '@/hooks/use-app-state';
import { maskPhone } from '@/lib/constants';

export function ServicesSection() {
  const { data, isLoading } = useGetServices();

  return (
    <section id="services" className="py-24 bg-secondary/50 relative overflow-hidden">
      {/* Decorative bg element */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <HardHat className="w-12 h-12 text-primary mx-auto mb-6 opacity-80" />
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">Construction Partners</h2>
          <p className="text-lg text-muted-foreground">
            Find trusted builders, architects, and contractors for your next big project. 
            All verified and ready to work.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card rounded-2xl h-48 animate-pulse shadow-sm" />
            ))}
          </div>
        ) : !data?.services || data.services.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">No services found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.services.slice(0, 6).map((service, idx) => (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                key={service.id}
                onClick={() => setDownloadModalOpen(true)}
                className="bg-card p-6 rounded-3xl shadow-lg shadow-black/5 border border-border/50 hover:border-primary/30 hover:shadow-xl cursor-pointer transition-all duration-300 group flex flex-col"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-secondary text-primary font-semibold text-xs uppercase tracking-wide mb-3">
                      {service.serviceType}
                    </span>
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors leading-tight mb-2">
                      {service.businessName}
                    </h3>
                  </div>
                  {service.rating && (
                    <div className="flex items-center gap-1 text-sm font-bold bg-yellow-100 text-yellow-800 px-2 py-1 rounded-lg">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      {service.rating}
                    </div>
                  )}
                </div>

                <p className="text-muted-foreground text-sm line-clamp-2 mb-6 flex-1">
                  {service.description}
                </p>

                <div className="space-y-3 pt-4 border-t border-border/60">
                  <div className="flex items-center gap-3 text-sm text-foreground/80">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    {service.district}
                  </div>
                  <div className="flex justify-between items-center text-sm text-foreground/80">
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span className="font-mono">{maskPhone(service.phone)}</span>
                    </div>
                    {service.experience && (
                      <span className="text-xs font-medium text-muted-foreground">
                        {service.experience} exp
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-4 pt-4 text-center">
                  <span className="text-primary text-xs font-semibold flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Unlock details in app
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
