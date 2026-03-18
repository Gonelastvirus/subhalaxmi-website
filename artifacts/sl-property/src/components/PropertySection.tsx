import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, BedDouble, Square, Tag, ImageOff } from 'lucide-react';
import { useGetProperties } from '@workspace/api-client-react';
import { setDownloadModalOpen } from '@/hooks/use-app-state';
import { formatCurrency } from '@/lib/constants';

export function PropertySection() {
  const [filters, setFilters] = useState({
    listingType: '',
    propertyType: '',
    district: ''
  });

  // Since we're casting from a generated schema that might have undefined fields in mock setup,
  // we pass an empty object if no specific filters are applied to avoid undefined params breaking URL
  const activeParams = Object.fromEntries(
    Object.entries(filters).filter(([_, v]) => v !== '')
  ) as any;

  const { data, isLoading, isError } = useGetProperties({ ...activeParams, limit: 6 });

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="properties" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Filters */}
        <div className="mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-10">
            <div>
              <span className="text-primary font-bold uppercase tracking-wider text-sm mb-2 block">Exclusive</span>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">Featured Listings</h2>
            </div>
            
            {/* Filter Bar */}
            <div className="flex flex-wrap gap-4 bg-white p-2 rounded-2xl shadow-lg shadow-black/5 border border-border/50">
              <select 
                name="listingType" 
                value={filters.listingType} 
                onChange={handleFilterChange}
                className="bg-transparent text-foreground/80 font-medium px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 hover:bg-secondary transition-colors cursor-pointer"
              >
                <option value="">Any Status</option>
                <option value="sale">For Sale</option>
                <option value="rent">For Rent</option>
              </select>
              
              <div className="w-px h-8 bg-border/50 self-center hidden sm:block" />
              
              <select 
                name="propertyType" 
                value={filters.propertyType} 
                onChange={handleFilterChange}
                className="bg-transparent text-foreground/80 font-medium px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 hover:bg-secondary transition-colors cursor-pointer"
              >
                <option value="">Property Type</option>
                <option value="House">House</option>
                <option value="Land">Land</option>
                <option value="Apartment">Apartment</option>
                <option value="Commercial">Commercial</option>
              </select>
              
              <div className="w-px h-8 bg-border/50 self-center hidden sm:block" />

              <select 
                name="district" 
                value={filters.district} 
                onChange={handleFilterChange}
                className="bg-transparent text-foreground/80 font-medium px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 hover:bg-secondary transition-colors cursor-pointer"
              >
                <option value="">All Districts</option>
                <option value="Kathmandu">Kathmandu</option>
                <option value="Lalitpur">Lalitpur</option>
                <option value="Bhaktapur">Bhaktapur</option>
                <option value="Pokhara">Pokhara</option>
              </select>
            </div>
          </div>
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card rounded-3xl h-[450px] animate-pulse shadow-sm" />
            ))}
          </div>
        ) : isError ? (
          <div className="text-center py-20 bg-card rounded-3xl border border-destructive/20 text-destructive">
            <p>Failed to load properties. Please try again later.</p>
          </div>
        ) : !data?.properties || data.properties.length === 0 ? (
          <div className="text-center py-24 bg-card rounded-3xl border border-border shadow-sm">
            <ImageOff className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-bold text-foreground mb-2">No properties found</h3>
            <p className="text-muted-foreground">Try adjusting your filters to see more results.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.properties.map((property, idx) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                key={property.id}
                onClick={() => setDownloadModalOpen(true)}
                className="group cursor-pointer bg-card rounded-3xl overflow-hidden shadow-lg shadow-black/5 hover:shadow-2xl hover:shadow-primary/10 border border-border/50 hover:border-primary/30 transition-all duration-500 flex flex-col"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden bg-secondary">
                  {property.imageUrl ? (
                    <img 
                      src={property.imageUrl} 
                      alt={property.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      {/* Placeholder property modern house Unsplash */}
                      <img 
                        src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80" 
                        alt="Placeholder" 
                        className="w-full h-full object-cover opacity-80 mix-blend-overlay group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-lg text-xs font-bold text-primary shadow-sm flex items-center gap-1.5 uppercase tracking-wide">
                      <Tag className="w-3 h-3" />
                      For {property.listingType}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-foreground leading-tight line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                        {property.title}
                      </h3>
                      <div className="flex items-center text-muted-foreground text-sm gap-1.5">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span className="truncate">{property.location}, {property.district}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-auto">
                    <div className="flex items-center gap-4 py-4 border-y border-border/50 mb-4">
                      {property.bedrooms > 0 && (
                        <div className="flex items-center gap-2 text-foreground/80 font-medium">
                          <div className="p-2 rounded-lg bg-secondary">
                            <BedDouble className="w-4 h-4 text-primary" />
                          </div>
                          {property.bedrooms} Beds
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-foreground/80 font-medium">
                        <div className="p-2 rounded-lg bg-secondary">
                          <Square className="w-4 h-4 text-primary" />
                        </div>
                        {property.area}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="font-display font-bold text-2xl text-foreground">
                        {formatCurrency(property.price)}
                        {property.listingType === 'rent' && <span className="text-sm text-muted-foreground font-sans font-normal ml-1">/ mo</span>}
                      </div>
                      <span className="text-primary font-semibold group-hover:underline text-sm flex items-center gap-1">
                        Details &rarr;
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
        
        <div className="mt-16 text-center">
          <button 
            onClick={() => setDownloadModalOpen(true)}
            className="inline-flex items-center justify-center px-8 py-4 rounded-full font-bold text-foreground border-2 border-border hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-300"
          >
            View All Properties in App
          </button>
        </div>
      </div>
    </section>
  );
}
