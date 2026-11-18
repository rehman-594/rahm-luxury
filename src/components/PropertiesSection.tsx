import { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Building2, Check, X } from 'lucide-react';
import {
  LUXURY_PROPERTIES,
  type LuxuryProperty,
  type PropertyCategory,
} from '../data/properties';

interface PropertiesSectionProps {
  onRequestViewing: (propertyName: string) => void;
}

const CATEGORIES: PropertyCategory[] = [
  'All',
  'Coastal Villas',
  'Penthouse Estates',
  'Private Sanctuaries',
];

function PropertyImage({
  src,
  alt,
  title,
  className,
}: {
  src: string;
  alt: string;
  title: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-[#232625] text-[#F7F5F0] p-6 text-center ${className ?? ''}`}
      >
        <Building2 className="w-7 h-7 text-[#B69A69] mb-2" strokeWidth={1.3} />
        <span className="font-serif text-lg">{title}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}

export function PropertiesSection({ onRequestViewing }: PropertiesSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<PropertyCategory>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-desc' | 'price-asc'>('featured');
  const [activeProperty, setActiveProperty] = useState<LuxuryProperty | null>(null);

  const filteredProperties = useMemo(() => {
    const list =
      selectedCategory === 'All'
        ? [...LUXURY_PROPERTIES]
        : LUXURY_PROPERTIES.filter((item) => item.category === selectedCategory);

    if (sortBy === 'price-desc') {
      list.sort((a, b) => b.priceUsd - a.priceUsd);
    } else if (sortBy === 'price-asc') {
      list.sort((a, b) => a.priceUsd - b.priceUsd);
    }
    return list;
  }, [selectedCategory, sortBy]);

  return (
    <section
      id="properties"
      className="relative z-10 text-[#F7F5F0] pt-24 pb-28 md:pt-32 md:pb-32"
      style={{
        background:
          'linear-gradient(180deg, rgba(23,25,24,0.34) 0%, rgba(23,25,24,0.58) 20%, rgba(23,25,24,0.72) 100%)',
      }}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Minimal Editorial Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-white/15"
        >
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-[#B69A69] font-medium mb-2.5">
              Curated Portfolio
            </p>
            <h2 className="font-serif text-[clamp(2.2rem,3.6vw,3.35rem)] leading-[1.06] font-normal text-[#FFFFFF]">
              Selected Residences
            </h2>
          </div>

          <p className="text-sm text-[#DCD4C6]/85 max-w-sm leading-relaxed">
            Private estates chosen for architectural provenance and enduring horizons.
          </p>
        </motion.div>

        {/* Clean Filter Bar & Sort */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-7">
          <div
            role="tablist"
            aria-label="Filter properties by category"
            className="flex flex-wrap items-center gap-2"
          >
            {CATEGORIES.map((category) => {
              const active = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 text-xs uppercase tracking-[0.14em] whitespace-nowrap shrink-0 transition-colors cursor-pointer border ${
                    active
                      ? 'bg-[#B69A69] text-[#171918] border-[#B69A69] font-semibold'
                      : 'bg-[#171918]/55 text-[#DCD4C6] border-white/20 hover:border-[#B69A69] hover:text-[#FFFFFF]'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto">
            <label htmlFor="property-sort" className="text-[11px] uppercase tracking-[0.16em] text-[#DCD4C6]/75">
              Sort
            </label>
            <select
              id="property-sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="bg-[#171918]/80 border border-white/20 px-3 py-2 text-xs uppercase tracking-[0.12em] text-[#F7F5F0] focus:outline-none focus:border-[#B69A69] cursor-pointer"
            >
              <option value="featured">Curated</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="price-asc">Price: Low to High</option>
            </select>
          </div>
        </div>

        {/* Clean Uncluttered Residences Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 mt-2">
          {filteredProperties.map((property, index) => {
            const isHeroFeature = index === 0 && selectedCategory === 'All' && sortBy === 'featured';
            return (
              <motion.article
                key={property.id}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.55, delay: Math.min(index * 0.06, 0.24), ease: [0.16, 1, 0.3, 1] }}
                className={`group flex flex-col bg-[#171918]/75 backdrop-blur-sm border border-white/12 p-4 ${
                  isHeroFeature ? 'md:col-span-2 lg:col-span-2' : ''
                }`}
              >
                <button
                  type="button"
                  onClick={() => setActiveProperty(property)}
                  className="relative overflow-hidden bg-[#1D201F] aspect-[4/3] w-full text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B69A69]"
                  style={isHeroFeature ? { aspectRatio: '16 / 9' } : undefined}
                  aria-label={`Inspect ${property.name} in ${property.location}`}
                >
                  <PropertyImage
                    src={property.image}
                    alt={`${property.name} in ${property.location}`}
                    title={property.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#171918]/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="absolute bottom-3.5 right-3.5 inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#F7F5F0] text-[#171918] text-[11px] uppercase tracking-[0.15em] font-medium opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <span>Dossier</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </button>

                <div className="pt-4 flex flex-col flex-1 justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-4 text-[11px] uppercase tracking-[0.15em] text-[#DCD4C6]/75 mb-1.5">
                      <span>{property.location}</span>
                      <span className="tabular-nums text-[#B69A69] font-medium">
                        {property.priceDisplay}
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl leading-snug font-normal text-[#FFFFFF] mb-3">
                      <button
                        type="button"
                        onClick={() => setActiveProperty(property)}
                        className="text-left hover:text-[#B69A69] transition-colors cursor-pointer"
                      >
                        {property.name}
                      </button>
                    </h3>
                  </div>

                  <div className="pt-3 border-t border-white/12 flex items-center justify-between text-xs text-[#DCD4C6]/75 tabular-nums">
                    <span>
                      {property.beds} Beds <span aria-hidden="true">·</span> {property.baths} Baths{' '}
                      <span aria-hidden="true">·</span> {property.sqft}
                    </span>
                    <button
                      type="button"
                      onClick={() => setActiveProperty(property)}
                      className="text-[11px] uppercase tracking-[0.16em] text-[#F7F5F0] font-medium hover:text-[#B69A69] transition-colors cursor-pointer whitespace-nowrap"
                    >
                      Inspect
                    </button>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      {/* Property Architectural Dossier Modal */}
      {activeProperty && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#171918]/80 p-4 md:p-8"
          role="dialog"
          aria-modal="true"
          aria-labelledby="dossier-title"
          onClick={() => setActiveProperty(null)}
        >
          <div
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#F7F5F0] text-[#171918] border border-[#DCD4C6]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveProperty(null)}
              aria-label="Close property dossier"
              className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-[#F7F5F0] border border-[#DCD4C6] text-[#171918] hover:bg-[#171918] hover:text-[#F7F5F0] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-6 bg-[#171918] flex flex-col">
                <div className="aspect-[4/3] w-full overflow-hidden">
                  <PropertyImage
                    src={activeProperty.image}
                    alt={activeProperty.name}
                    title={activeProperty.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {activeProperty.secondaryImage && (
                  <div className="aspect-[16/9] w-full overflow-hidden border-t border-white/10">
                    <PropertyImage
                      src={activeProperty.secondaryImage}
                      alt={`${activeProperty.name} interior atrium`}
                      title={activeProperty.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>

              <div className="lg:col-span-6 p-7 md:p-10 flex flex-col justify-between gap-6">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-[#B69A69] font-medium mb-2">
                    {activeProperty.location} · {activeProperty.region}
                  </p>
                  <h3 id="dossier-title" className="font-serif text-3xl md:text-4xl text-[#171918] mb-2">
                    {activeProperty.name}
                  </h3>
                  <p className="text-xl font-serif italic text-[#171918] tabular-nums mb-5">
                    {activeProperty.priceDisplay}
                  </p>

                  <p className="text-sm text-[#77756F] leading-relaxed mb-6">
                    {activeProperty.summary}
                  </p>

                  <div className="grid grid-cols-2 gap-y-3 gap-x-6 py-4 border-y border-[#DCD4C6] text-xs mb-6 tabular-nums">
                    <div>
                      <span className="block text-[10px] uppercase tracking-[0.16em] text-[#77756F]">
                        Interior Area
                      </span>
                      <span className="font-medium text-[#171918]">{activeProperty.sqft}</span>
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase tracking-[0.16em] text-[#77756F]">
                        Grounds
                      </span>
                      <span className="font-medium text-[#171918]">{activeProperty.plot}</span>
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase tracking-[0.16em] text-[#77756F]">
                        Suite Configuration
                      </span>
                      <span className="font-medium text-[#171918]">
                        {activeProperty.beds} Bedrooms · {activeProperty.baths} Baths
                      </span>
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase tracking-[0.16em] text-[#77756F]">
                        Architecture
                      </span>
                      <span className="font-medium text-[#171918]">
                        {activeProperty.architect} ({activeProperty.year})
                      </span>
                    </div>
                  </div>

                  <div>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-[#171918] font-medium mb-3">
                      Architectural Highlights
                    </p>
                    <ul className="space-y-2">
                      {activeProperty.highlights.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-xs text-[#77756F] leading-relaxed">
                          <Check className="w-3.5 h-3.5 text-[#B69A69] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      const name = activeProperty.name;
                      setActiveProperty(null);
                      onRequestViewing(name);
                    }}
                    className="flex-1 min-w-[180px] py-3.5 px-6 bg-[#171918] text-[#F7F5F0] text-xs uppercase tracking-[0.16em] font-medium hover:bg-[#B69A69] hover:text-[#171918] transition-colors cursor-pointer"
                  >
                    Request Private Viewing
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
