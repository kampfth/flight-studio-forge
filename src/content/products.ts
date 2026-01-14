import { Product } from '@/lib/types';

export const products: Product[] = [
  {
    slug: 'embraer-e175',
    name: 'Embraer E175',
    tagline: 'Regional precision. Uncompromised detail.',
    category: 'aircraft',
    heroImage: '/products/e175-hero.jpg',
    description: 'The E175 brings the most popular regional jet to MSFS with unprecedented accuracy. Every rivet, every system, every flight characteristic — crafted for pilots who demand authenticity.',
    features: [
      {
        icon: 'Gauge',
        title: 'Full Systems Depth',
        description: 'Complete FMS, autoflight, and electrical systems modeled from real-world documentation.',
      },
      {
        icon: 'Layers',
        title: '4K Textures',
        description: 'PBR materials with realistic wear patterns and environmental effects.',
      },
      {
        icon: 'Volume2',
        title: 'Spatial Audio',
        description: 'Custom 3D soundscape recorded from actual E175 operations.',
      },
      {
        icon: 'Settings',
        title: 'EFB Integration',
        description: 'Built-in tablet for performance calculations and ground services.',
      },
    ],
    faq: [
      {
        question: 'Is this compatible with MSFS 2024?',
        answer: 'Yes. The E175 is fully tested and optimized for both MSFS 2020 and MSFS 2024.',
      },
      {
        question: 'What skill level is this aircraft for?',
        answer: 'Designed for intermediate to advanced simmers. Full tutorials included.',
      },
      {
        question: 'Are updates free?',
        answer: 'All updates within the same MSFS generation are free. Forever.',
      },
    ],
    gallery: [
      '/products/e175-gallery-1.jpg',
      '/products/e175-gallery-2.jpg',
      '/products/e175-gallery-3.jpg',
      '/products/e175-gallery-4.jpg',
    ],
    specs: [
      { label: 'Polygon Count', value: '1.2M optimized' },
      { label: 'Texture Resolution', value: '4K PBR' },
      { label: 'Custom Sounds', value: '200+ samples' },
      { label: 'File Size', value: '~2.1 GB' },
    ],
    releaseDate: '2024-03-15',
    version: '1.2.0',
    marketplaceUrl: '#',
    discordUrl: '#',
  },
  {
    slug: 'sbgr-guarulhos',
    name: 'SBGR Guarulhos',
    tagline: 'Latin America\'s largest hub. Now in your sim.',
    category: 'scenery',
    heroImage: '/products/sbgr-hero.jpg',
    description: 'São Paulo Guarulhos International — Brazil\'s busiest airport recreated with obsessive attention to detail. From terminal architecture to taxiway markings, every element built from on-site research.',
    features: [
      {
        icon: 'Building2',
        title: 'Terminal Interiors',
        description: 'Fully modeled terminals with accurate signage and retail areas.',
      },
      {
        icon: 'Plane',
        title: 'Dynamic Ground',
        description: 'Animated jetways, ground vehicles, and realistic traffic patterns.',
      },
      {
        icon: 'Sun',
        title: 'Night Lighting',
        description: 'Custom PBR lighting system for stunning night operations.',
      },
      {
        icon: 'Map',
        title: 'Ortho Coverage',
        description: '15cm resolution orthoimagery for surrounding São Paulo area.',
      },
    ],
    faq: [
      {
        question: 'Does this include the new terminal 3?',
        answer: 'Yes. All three terminals are included with the latest 2024 layout.',
      },
      {
        question: 'Will this impact my frame rate?',
        answer: 'Optimized for 40+ FPS on mid-range systems. LOD system included.',
      },
    ],
    gallery: [
      '/products/sbgr-gallery-1.jpg',
      '/products/sbgr-gallery-2.jpg',
      '/products/sbgr-gallery-3.jpg',
    ],
    specs: [
      { label: 'Terrain Coverage', value: '25 km²' },
      { label: 'Custom Objects', value: '12,000+' },
      { label: 'Ortho Resolution', value: '15 cm/px' },
      { label: 'File Size', value: '~4.8 GB' },
    ],
    releaseDate: '2024-06-20',
    version: '1.0.2',
    marketplaceUrl: '#',
    discordUrl: '#',
  },
  {
    slug: 'flight-tracker-pro',
    name: 'Flight Tracker Pro',
    tagline: 'Your flights. Your data. Your control.',
    category: 'utility',
    heroImage: '/products/tracker-hero.jpg',
    description: 'Automatic flight logging with zero configuration. Track hours, routes, landings, and performance metrics. All data stays local — privacy by design.',
    features: [
      {
        icon: 'Database',
        title: 'Local-First',
        description: 'All data stored on your machine. No accounts, no cloud, no tracking.',
      },
      {
        icon: 'BarChart3',
        title: 'Deep Analytics',
        description: 'Landing rates, fuel efficiency, route history — all visualized.',
      },
      {
        icon: 'Zap',
        title: 'Zero Config',
        description: 'Install and fly. Automatic detection of simulator and flights.',
      },
      {
        icon: 'Download',
        title: 'Export Anywhere',
        description: 'CSV, JSON, or PDF exports for your logbook or VA.',
      },
    ],
    faq: [
      {
        question: 'Does this work with all aircraft?',
        answer: 'Yes. Compatible with any aircraft in MSFS 2020/2024, including third-party.',
      },
      {
        question: 'Can I sync with Volanta or VATSIM?',
        answer: 'Export formats are compatible. Direct integration planned for v2.',
      },
    ],
    gallery: [
      '/products/tracker-gallery-1.jpg',
      '/products/tracker-gallery-2.jpg',
    ],
    specs: [
      { label: 'Memory Usage', value: '<50 MB' },
      { label: 'Storage', value: 'SQLite local' },
      { label: 'Updates', value: 'Lifetime free' },
    ],
    releaseDate: '2024-01-10',
    version: '2.1.0',
    marketplaceUrl: '#',
    discordUrl: '#',
  },
];

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find((p) => p.slug === slug);
};

export const getProductsByCategory = (category: Product['category']): Product[] => {
  return products.filter((p) => p.category === category);
};
