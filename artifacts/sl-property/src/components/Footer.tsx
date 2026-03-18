import React from 'react';
import { Facebook, Instagram, Twitter, Youtube, ArrowRight } from 'lucide-react';
import { useGetAbout } from '@workspace/api-client-react';
import { COMPANY_NAME, APK_URL } from '@/lib/constants';

export function Footer() {
  const { data } = useGetAbout();

  return (
    <footer className="bg-background pt-20 pb-10 border-t border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl overflow-hidden bg-secondary">
                <img 
                  src={`${import.meta.env.BASE_URL}images/logo.png`} 
                  alt={COMPANY_NAME} 
                  className="w-full h-full object-cover mix-blend-multiply"
                />
              </div>
              <span className="font-display font-bold text-2xl text-foreground">
                SL Property
              </span>
            </div>
            <p className="text-muted-foreground text-lg mb-8 max-w-md">
              Connecting you with the finest properties and construction professionals across Nepal.
            </p>
            <div className="flex items-center gap-4">
              {data?.socialLinks?.facebook && (
                <a href={data.socialLinks.facebook} className="p-3 bg-secondary rounded-full text-foreground hover:bg-primary hover:text-white transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
              )}
              {data?.socialLinks?.instagram && (
                <a href={data.socialLinks.instagram} className="p-3 bg-secondary rounded-full text-foreground hover:bg-primary hover:text-white transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
              )}
              {data?.socialLinks?.twitter && (
                <a href={data.socialLinks.twitter} className="p-3 bg-secondary rounded-full text-foreground hover:bg-primary hover:text-white transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
              )}
              {data?.socialLinks?.youtube && (
                <a href={data.socialLinks.youtube} className="p-3 bg-secondary rounded-full text-foreground hover:bg-primary hover:text-white transition-colors">
                  <Youtube className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li><a href="#home" className="text-muted-foreground hover:text-primary transition-colors">Home</a></li>
              <li><a href="#properties" className="text-muted-foreground hover:text-primary transition-colors">Properties</a></li>
              <li><a href="#services" className="text-muted-foreground hover:text-primary transition-colors">Construction Services</a></li>
              <li><a href="#about" className="text-muted-foreground hover:text-primary transition-colors">About Us</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-6">Mobile App</h4>
            <p className="text-muted-foreground mb-4">Download our app for the full experience.</p>
            <a 
              href={APK_URL}
              download
              className="inline-flex items-center gap-2 text-primary font-bold hover:underline"
            >
              Download APK <ArrowRight className="w-4 h-4" />
            </a>
          </div>

        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} {COMPANY_NAME}. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary">Privacy Policy</a>
            <a href="#" className="hover:text-primary">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
