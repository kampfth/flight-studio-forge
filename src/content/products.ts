import { Product } from '@/lib/types';

export const products: Product[] = [
  {
    slug: 'livery-pack-neo-minimal',
    name: '4S Livery Pack: Neo Minimal',
    tagline: 'Clean lines. Zero clutter. Maximum presence.',
    category: 'livery',
    heroImage: '/products/neo-minimal-hero.jpg',
    trailerUrl: '#',
    description: 'A collection of 12 minimalist liveries for the A320neo. Designed for pilots who appreciate understated elegance over flashy branding. Every texture optimized for performance without sacrificing detail.',
    features: [
      {
        icon: 'Paintbrush',
        title: '12 Unique Liveries',
        description: 'Each design crafted from scratch with consistent visual language.',
      },
      {
        icon: 'Gauge',
        title: '4K Textures',
        description: 'PBR materials with accurate wear, dirt, and weathering patterns.',
      },
      {
        icon: 'Zap',
        title: 'Frame-rate Friendly',
        description: 'Compressed without quality loss. No stutters, no compromises.',
      },
      {
        icon: 'Layers',
        title: 'Night Lighting',
        description: 'Custom emissive maps for realistic cabin glow and nav lights.',
      },
    ],
    faq: [
      {
        question: 'Which aircraft is this compatible with?',
        answer: 'Designed for the FlyByWire A32NX. Works with MSFS 2020 and 2024.',
      },
      {
        question: 'How do I install?',
        answer: 'Drag and drop into your Community folder. No installer needed.',
      },
      {
        question: 'Are updates free?',
        answer: 'All updates are free. We add new liveries based on community requests.',
      },
    ],
    gallery: [
      '/products/neo-minimal-1.jpg',
      '/products/neo-minimal-2.jpg',
      '/products/neo-minimal-3.jpg',
      '/products/neo-minimal-4.jpg',
    ],
    compatibility: [
      'FlyByWire A32NX (stable & dev)',
      'MSFS 2020 / MSFS 2024',
      'All weather presets',
    ],
    releaseDate: '2024-11-15',
    version: '1.2.0',
    marketplaceUrl: '#',
    discordUrl: '#',
  },
  {
    slug: 'fleet-livery-night-ops',
    name: 'Fleet Livery: Night Ops',
    tagline: 'When darkness is the aesthetic.',
    category: 'livery',
    heroImage: '/products/night-ops-hero.jpg',
    trailerUrl: '#',
    description: 'A collection of blacked-out liveries for various aircraft. Matte finishes, minimal markings, maximum stealth vibes. Perfect for night flights and those who prefer their aircraft understated.',
    features: [
      {
        icon: 'Moon',
        title: 'Stealth Aesthetic',
        description: 'Matte black finishes with subtle reflections.',
      },
      {
        icon: 'Plane',
        title: 'Multi-Aircraft',
        description: 'Covers A320, 737, CRJ, and more in a unified style.',
      },
      {
        icon: 'Eye',
        title: 'Detail Work',
        description: 'Subtle logo placement and accurate registration fonts.',
      },
      {
        icon: 'Settings',
        title: 'Easy Swap',
        description: 'Modular structure for mixing liveries across your fleet.',
      },
    ],
    faq: [
      {
        question: 'Which aircraft are included?',
        answer: 'A32NX, PMDG 737, Aerosoft CRJ. More added with each update.',
      },
      {
        question: 'Do the matte textures affect performance?',
        answer: 'No. Optimized compression maintains frame rates.',
      },
    ],
    gallery: [
      '/products/night-ops-1.jpg',
      '/products/night-ops-2.jpg',
      '/products/night-ops-3.jpg',
    ],
    compatibility: [
      'Multiple aircraft (see FAQ)',
      'MSFS 2020 / MSFS 2024',
    ],
    releaseDate: '2024-09-20',
    version: '2.0.0',
    marketplaceUrl: '#',
    discordUrl: '#',
  },
  {
    slug: 'runway-notes',
    name: 'Runway Notes',
    tagline: 'Your flights. Documented automatically.',
    category: 'utility',
    heroImage: '/products/runway-notes-hero.jpg',
    trailerUrl: '#',
    description: 'Automatic flight logging that runs in the background. Track hours, routes, landings, and performance metrics. Exports to PDF for logbooks or virtual airlines. No accounts, no cloud — everything stays on your machine.',
    features: [
      {
        icon: 'FileText',
        title: 'Auto-Logging',
        description: 'Detects takeoff and landing automatically. Zero input required.',
      },
      {
        icon: 'BarChart3',
        title: 'Flight Analytics',
        description: 'Landing rates, fuel efficiency, route history visualized.',
      },
      {
        icon: 'Download',
        title: 'Export Options',
        description: 'PDF, CSV, JSON. Compatible with most VA logbook systems.',
      },
      {
        icon: 'HardDrive',
        title: 'Local Storage',
        description: 'SQLite database on your machine. Your data never leaves.',
      },
    ],
    faq: [
      {
        question: 'Does this work with all aircraft?',
        answer: 'Yes. Any aircraft in MSFS 2020/2024, including third-party.',
      },
      {
        question: 'How much disk space does it use?',
        answer: 'Minimal. Each flight is a few KB. Years of flying fit in megabytes.',
      },
      {
        question: 'Can I sync with Volanta or LittleNavMap?',
        answer: 'Export formats are compatible. Direct integration in our roadmap.',
      },
    ],
    gallery: [
      '/products/runway-notes-1.jpg',
      '/products/runway-notes-2.jpg',
    ],
    specs: [
      { label: 'Memory Usage', value: '<40 MB' },
      { label: 'Storage', value: 'SQLite local' },
      { label: 'Updates', value: 'Lifetime free' },
    ],
    releaseDate: '2024-06-01',
    version: '2.3.0',
    marketplaceUrl: '#',
    discordUrl: '#',
  },
  {
    slug: 'cabin-camera',
    name: 'Cabin Camera Utility',
    tagline: 'See your aircraft from every angle.',
    category: 'utility',
    heroImage: '/products/cabin-camera-hero.jpg',
    trailerUrl: '#',
    description: 'A camera utility that unlocks cinematic views inside and outside your aircraft. Smooth transitions, saved presets, and controller support. Built for content creators and immersion seekers.',
    features: [
      {
        icon: 'Camera',
        title: 'Free Camera',
        description: 'Move anywhere inside or around the aircraft with smooth physics.',
      },
      {
        icon: 'Save',
        title: 'Saved Presets',
        description: 'Store and recall your favorite angles per aircraft.',
      },
      {
        icon: 'Gamepad2',
        title: 'Controller Support',
        description: 'Xbox, PlayStation, or any XInput device works out of the box.',
      },
      {
        icon: 'Film',
        title: 'Cinematic Mode',
        description: 'Auto-pan and dolly effects for recording smooth footage.',
      },
    ],
    faq: [
      {
        question: 'Does this work in VR?',
        answer: 'Currently desktop only. VR support is planned for v3.',
      },
      {
        question: 'Will this conflict with other camera mods?',
        answer: 'No. Uses a separate injection method that coexists with others.',
      },
    ],
    gallery: [
      '/products/cabin-camera-1.jpg',
      '/products/cabin-camera-2.jpg',
      '/products/cabin-camera-3.jpg',
    ],
    releaseDate: '2024-04-15',
    version: '2.1.0',
    marketplaceUrl: '#',
    discordUrl: '#',
  },
  {
    slug: 'flight-companion-toolkit',
    name: 'Flight Companion Toolkit',
    tagline: 'Everything you need. One window.',
    category: 'utility',
    heroImage: '/products/companion-hero.jpg',
    trailerUrl: '#',
    description: 'A lightweight overlay with checklists, fuel planner, weight & balance, and quick references. Designed to minimize alt-tabbing while keeping essential info at your fingertips.',
    features: [
      {
        icon: 'ClipboardList',
        title: 'Dynamic Checklists',
        description: 'Per-aircraft checklists that remember your progress.',
      },
      {
        icon: 'Fuel',
        title: 'Fuel Planner',
        description: 'Calculate block fuel with wind and reserves built in.',
      },
      {
        icon: 'Scale',
        title: 'Weight & Balance',
        description: 'Visual CG calculator with aircraft-specific limits.',
      },
      {
        icon: 'Layers',
        title: 'Always-On-Top',
        description: 'Stays visible over MSFS without stealing focus.',
      },
    ],
    faq: [
      {
        question: 'How do I add custom checklists?',
        answer: 'JSON files in the config folder. Documentation included.',
      },
      {
        question: 'Does it sync with SimBrief?',
        answer: 'Not yet. SimBrief import is on our roadmap for Q2.',
      },
    ],
    gallery: [
      '/products/companion-1.jpg',
      '/products/companion-2.jpg',
    ],
    specs: [
      { label: 'Memory', value: '<60 MB' },
      { label: 'Overlay Tech', value: 'DirectX hook' },
      { label: 'Aircraft Profiles', value: '25+' },
    ],
    releaseDate: '2024-08-10',
    version: '1.4.0',
    marketplaceUrl: '#',
    discordUrl: '#',
  },
  {
    slug: 'livery-series-retroline',
    name: 'Livery Series: Retroline',
    tagline: 'Classic schemes. Modern execution.',
    category: 'livery',
    heroImage: '/products/retroline-hero.jpg',
    trailerUrl: '#',
    description: 'Recreations of iconic airline liveries from the 70s, 80s, and 90s. Painstakingly researched from historical photos and painted with modern PBR techniques. Nostalgia in 4K.',
    features: [
      {
        icon: 'History',
        title: 'Historical Accuracy',
        description: 'Research-based recreations verified by aviation historians.',
      },
      {
        icon: 'Palette',
        title: 'Period Colors',
        description: 'Authentic paint codes matched to original airline specs.',
      },
      {
        icon: 'Sparkles',
        title: 'Modern Quality',
        description: '4K PBR with proper metallic and roughness maps.',
      },
      {
        icon: 'Package',
        title: '15 Liveries',
        description: 'A curated collection across multiple eras and airlines.',
      },
    ],
    faq: [
      {
        question: 'Which airlines are included?',
        answer: 'Pan Am, TWA, Eastern, Braniff, and 11 more. Full list on Discord.',
      },
      {
        question: 'Are these officially licensed?',
        answer: 'These are fan recreations for personal use in flight simulation.',
      },
    ],
    gallery: [
      '/products/retroline-1.jpg',
      '/products/retroline-2.jpg',
      '/products/retroline-3.jpg',
      '/products/retroline-4.jpg',
    ],
    compatibility: [
      'PMDG 737',
      'Fenix A320',
      'iniBuilds A310',
    ],
    releaseDate: '2024-10-05',
    version: '1.1.0',
    marketplaceUrl: '#',
    discordUrl: '#',
  },
  {
    slug: 'livery-regional-express',
    name: 'Regional Express Pack',
    tagline: 'Short hops. Sharp looks.',
    category: 'pack',
    heroImage: '/products/regional-hero.jpg',
    trailerUrl: '#',
    description: 'A collection of regional airline liveries for turboprops and small jets. Featuring operators often overlooked by other creators. Designed for those who fly the routes others skip.',
    features: [
      {
        icon: 'MapPin',
        title: 'Regional Focus',
        description: 'Airlines from Europe, Asia, and the Americas.',
      },
      {
        icon: 'Plane',
        title: 'Turboprop & Jet',
        description: 'ATR, Q400, E-Jets covered in one pack.',
      },
      {
        icon: 'Star',
        title: 'Rare Operators',
        description: 'Liveries you won\'t find elsewhere.',
      },
      {
        icon: 'Brush',
        title: 'Consistent Style',
        description: 'Unified quality across all aircraft types.',
      },
    ],
    faq: [
      {
        question: 'How many liveries total?',
        answer: '24 liveries across 3 aircraft types.',
      },
      {
        question: 'Can I request a specific airline?',
        answer: 'Absolutely. Drop by Discord with references and we\'ll consider it.',
      },
    ],
    gallery: [
      '/products/regional-1.jpg',
      '/products/regional-2.jpg',
    ],
    compatibility: [
      'ATR 42/72 (various devs)',
      'Aerosoft CRJ',
      'E-Jets (any compatible)',
    ],
    releaseDate: '2024-12-01',
    version: '1.0.0',
    marketplaceUrl: '#',
    discordUrl: '#',
  },
  {
    slug: 'checklist-master',
    name: 'Checklist Master',
    tagline: 'Never miss a step.',
    category: 'utility',
    heroImage: '/products/checklist-hero.jpg',
    trailerUrl: '#',
    description: 'A standalone checklist app with voice readback and aircraft-specific procedures. Syncs state with the sim so you know what\'s already done. Clean interface, no distractions.',
    features: [
      {
        icon: 'Mic',
        title: 'Voice Readback',
        description: 'TTS reads items aloud. Configurable voice and speed.',
      },
      {
        icon: 'Link',
        title: 'Sim Sync',
        description: 'Auto-checks items based on cockpit state.',
      },
      {
        icon: 'Folder',
        title: 'Custom Checklists',
        description: 'Import or create your own procedures.',
      },
      {
        icon: 'Monitor',
        title: 'Minimal UI',
        description: 'Dark theme, compact mode, VR-friendly sizing.',
      },
    ],
    faq: [
      {
        question: 'Which aircraft have built-in profiles?',
        answer: 'A32NX, PMDG 737/777, Fenix A320, and 15 more.',
      },
      {
        question: 'Does it support multiple monitors?',
        answer: 'Yes. Drag it to any display and it remembers position.',
      },
    ],
    gallery: [
      '/products/checklist-1.jpg',
      '/products/checklist-2.jpg',
    ],
    specs: [
      { label: 'Memory', value: '<30 MB' },
      { label: 'Built-in Profiles', value: '18 aircraft' },
      { label: 'Custom Profiles', value: 'Unlimited' },
    ],
    releaseDate: '2024-07-20',
    version: '1.5.0',
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

export const getRelatedProducts = (currentSlug: string, limit: number = 3): Product[] => {
  const current = getProductBySlug(currentSlug);
  if (!current) return products.slice(0, limit);
  
  // Get products from same category first, then others
  const sameCategory = products.filter(p => p.category === current.category && p.slug !== currentSlug);
  const others = products.filter(p => p.category !== current.category && p.slug !== currentSlug);
  
  return [...sameCategory, ...others].slice(0, limit);
};