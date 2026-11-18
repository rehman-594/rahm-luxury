export type PropertyCategory = 'All' | 'Coastal Villas' | 'Penthouse Estates' | 'Private Sanctuaries';

export interface LuxuryProperty {
  id: string;
  name: string;
  location: string;
  region: string;
  category: Exclude<PropertyCategory, 'All'>;
  priceUsd: number;
  priceDisplay: string;
  beds: number;
  baths: number;
  sqft: string;
  plot: string;
  architect: string;
  year: string;
  image: string;
  secondaryImage?: string;
  summary: string;
  highlights: string[];
  featured?: boolean;
}

export const LUXURY_PROPERTIES: LuxuryProperty[] = [
  {
    id: 'villa-solaris-mustique',
    name: 'Villa Solaris Pavilion',
    location: 'Mustique',
    region: 'St. Vincent & The Grenadines',
    category: 'Coastal Villas',
    priceUsd: 42500000,
    priceDisplay: '$42,500,000',
    beds: 8,
    baths: 10,
    sqft: '18,400 sq ft',
    plot: '4.2 Acres',
    architect: 'Atelier Vermeer & Partners',
    year: '2025',
    image: '/assets/aistudio/ezgif-frame-060_e995076d.jpg',
    secondaryImage: '/assets/aistudio/ezgif-frame-213_1f25eacb.jpg',
    summary:
      'Anchored in honed Roman travertine and cantilevered teak soffits, Villa Solaris opens directly onto a 28-meter zero-edge reflection pool and private botanical reserve.',
    highlights: [
      'Double-height marble atrium with suspended crystal gallery lighting',
      '28-meter heated salt-water infinity pool with submerged travertine sun deck',
      'Private deep-water mooring access and botanical sanctuary gardens',
      'Climate-controlled 1,800-bottle wine vault and acoustic screening pavilion',
    ],
    featured: true,
  },
  {
    id: 'palazzo-ravello-amalfi',
    name: 'Casa Bianca del Mare',
    location: 'Ravello, Amalfi Coast',
    region: 'Campania, Italy',
    category: 'Coastal Villas',
    priceUsd: 34800000,
    priceDisplay: '$34,800,000',
    beds: 6,
    baths: 8,
    sqft: '11,900 sq ft',
    plot: '2.1 Acres',
    architect: 'Studio Bellini Architetti',
    year: '2024',
    image: '/src/assets/images/villa_amalfi_cliffside_1795025338770.jpg',
    summary:
      'Carved into limestone terraces suspended above the Tyrrhenian Sea, blending dry-stacked Mediterranean stone with seamless floor-to-ceiling bronze glazing.',
    highlights: [
      'Cantilevered glass-edge infinity lap pool facing Positano bay',
      'Three terraced olive and lemon groves with private cliff elevator to sea',
      'Hand-troweled lime plaster interiors and bespoke walnut millwork',
      'Dedicated guest casita with independent coastal veranda',
    ],
  },
  {
    id: 'crown-triplex-manhattan',
    name: 'The Atelier Crown Triplex',
    location: 'Billionaires’ Row, Manhattan',
    region: 'New York, United States',
    category: 'Penthouse Estates',
    priceUsd: 58000000,
    priceDisplay: '$58,000,000',
    beds: 5,
    baths: 7,
    sqft: '9,650 sq ft',
    plot: 'Private Sky Loggia',
    architect: 'Kessler & Vance Studio',
    year: '2025',
    image: '/src/assets/images/penthouse_manhattan_sky_1795025339083.jpg',
    summary:
      'Occupying the upper three crown levels above Midtown, featuring 24-foot double-height gallery glazing, a monolithic travertine hearth, and 360-degree skyline horizons.',
    highlights: [
      'Private keyed high-speed elevator vestibule with museum-grade lighting',
      'Double-height salon framed in bronze-anodized structural mullions',
      'Heated wraparound sky loggia overlooking Central Park and Hudson River',
      'Bespoke Italian stone chef’s atelier plus discreet service kitchen',
    ],
  },
  {
    id: 'pointe-milou-st-barts',
    name: 'Domaine Pointe Milou',
    location: 'Pointe Milou',
    region: 'Saint-Barthélemy',
    category: 'Coastal Villas',
    priceUsd: 29400000,
    priceDisplay: '$29,400,000',
    beds: 6,
    baths: 7,
    sqft: '10,800 sq ft',
    plot: '1.85 Acres',
    architect: 'Maison Laurent Tropicale',
    year: '2024',
    image: '/src/assets/images/estate_st_barts_ocean_1795025340106.jpg',
    summary:
      'Crafted in weathered Burmese teak and pale Caribbean coral stone, oriented precisely toward year-round sunset trade winds above the Atlantic.',
    highlights: [
      'Expansive teak pool deck with sunken ocean-view fire lounge',
      'Retractable hurricane-rated Vitrocsa glass walls across all living wings',
      'Open-air spa pavilion with cold plunge and cedar hammam',
      'Full staff quarters and solar micro-grid autonomy',
    ],
  },
  {
    id: 'chalet-oberbort-gstaad',
    name: 'Chalet Serein Oberbort',
    location: 'Oberbort, Gstaad',
    region: 'Bernese Oberland, Switzerland',
    category: 'Private Sanctuaries',
    priceUsd: 46200000,
    priceDisplay: '$46,200,000',
    beds: 7,
    baths: 9,
    sqft: '14,100 sq ft',
    plot: '1.6 Acres',
    architect: 'Alpenstein Architektur',
    year: '2025',
    image: '/src/assets/images/chalet_gstaad_alpine_1795025340718.jpg',
    summary:
      'An understated alpine sanctuary uniting hand-split Valser quartzite, aged larch soffits, and panoramic heated glass overlooking the Wasserngrat peaks.',
    highlights: [
      'Direct ski-in private trail access and heated underground 6-car gallery',
      '20-meter indoor-outdoor thermal pool with alpine cedar sauna',
      'Double-height great room with suspended bronze hearth',
      'Private wellness floor with hydrotherapy suite and ski concierge room',
    ],
  },
  {
    id: 'courtyard-sanctuary-mallorca',
    name: 'Finca Son Serra',
    location: 'Serra de Tramuntana',
    region: 'Mallorca, Spain',
    category: 'Private Sanctuaries',
    priceUsd: 24900000,
    priceDisplay: '$24,900,000',
    beds: 7,
    baths: 8,
    sqft: '13,200 sq ft',
    plot: '18.5 Acres',
    architect: 'Studio Soler',
    year: '2024',
    image: '/src/assets/images/about_travertine_courtyard_1795025340732.jpg',
    summary:
      'A monastic stone estate reimagined around a colonnaded travertine water courtyard, ancient olive terraces, and serene minimalist living pavilions.',
    highlights: [
      'Central Roman travertine colonnade flanking a 32-meter reflecting basin',
      '18.5-acre organic vineyard and century-old olive grove estate',
      'Private helipad pad clearance and equestrian paddock',
      'Subterranean tasting gallery and guest courtyard residences',
    ],
  },
];
