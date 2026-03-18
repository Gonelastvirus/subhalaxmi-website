import React from 'react';
import { motion } from 'framer-motion';
import { Target, Flag, Building, Mail, Phone, MapPin } from 'lucide-react';
import { useGetAbout } from '@workspace/api-client-react';

export function AboutSection() {
  const { data } = useGetAbout();

  if (!data) return null;

  return (
    <section id="about" className="py-24 bg-background border-t border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Mission & Vision */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-10"
          >
            <div>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">Building Nepal's Future</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Subhalaxmi Property & Construction is a growing platform connecting people with properties and skilled construction professionals across Nepal — from the mountains of Koshi to the plains of Sudurpashchim.
              </p>
            </div>

            <div className="grid gap-6">
              <div className="p-6 rounded-3xl bg-secondary border border-border/50 hover:border-primary/30 transition-colors">
                <Target className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">Our Mission</h3>
                <p className="text-muted-foreground leading-relaxed">{data.mission}</p>
              </div>
              
              <div className="p-6 rounded-3xl bg-secondary border border-border/50 hover:border-primary/30 transition-colors">
                <Flag className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">Our Vision</h3>
                <p className="text-muted-foreground leading-relaxed">{data.vision}</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Contact & Image */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent rounded-[3rem] -rotate-3 scale-105 -z-10" />
            
            <div className="bg-card rounded-[3rem] p-10 shadow-xl border border-border/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <Building className="w-48 h-48" />
              </div>
              
              <h3 className="text-3xl font-display font-bold text-foreground mb-8">Get in Touch</h3>
              
              <ul className="space-y-8 relative z-10">
                <li className="flex items-start gap-5 group">
                  <div className="p-3 rounded-2xl bg-secondary text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-1">Head Office</h4>
                    <p className="text-muted-foreground text-lg">{data.address}</p>
                  </div>
                </li>
                
                <li className="flex items-start gap-5 group">
                  <div className="p-3 rounded-2xl bg-secondary text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-1">Phone</h4>
                    <p className="text-muted-foreground text-lg">{data.contactPhone}</p>
                  </div>
                </li>

                <li className="flex items-start gap-5 group">
                  <div className="p-3 rounded-2xl bg-secondary text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-1">Email</h4>
                    <a href={`mailto:${data.contactEmail}`} className="text-primary font-medium text-lg hover:underline">
                      {data.contactEmail}
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
