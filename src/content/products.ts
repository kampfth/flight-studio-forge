import { Product } from '@/lib/types';
import type { RichContentBlock } from '@/components/content/RichContent';

/**
 * Rich description example for Neo Minimal pack
 * Demonstrates all supported content blocks for interface testing
 */
const neoMinimalRichDescription: RichContentBlock[] = [
  // Lead paragraph with inline HTML
  {
    type: 'paragraph',
    content: 'Trijet enthusiasts and aviation perfectionists, it\'s your time to shine. The <strong>4S Livery Pack: Neo Minimal</strong> represents our most ambitious collection yet—a carefully curated set of 12 minimalist liveries designed for pilots who appreciate <em>understated elegance</em> over flashy branding.',
  },
  
  // YouTube embed (example with valid video ID)
  {
    type: 'youtube',
    videoId: 'dQw4w9WgXcQ',
    title: 'Official Trailer: Neo Minimal Livery Pack | 4S Studios',
  },
  
  // Paragraph with link
  {
    type: 'paragraph',
    content: 'The update brings a host of refinements including expanded systems simulation, new art and sounds, and <a href="https://flightsimulator.com" target="_blank" class="text-primary hover:underline">MSFS 2024 compatibility</a>. Every texture has been optimized for performance without sacrificing a single pixel of detail.',
  },
  
  // H2 heading
  {
    type: 'heading',
    level: 2,
    content: 'What\'s Included in This Pack',
    id: 'whats-included',
  },
  
  // Unordered list with formatted items
  {
    type: 'list',
    ordered: false,
    items: [
      '<strong>12 Unique Liveries</strong> — Each design crafted from scratch with consistent visual language',
      '<strong>4K PBR Textures</strong> — High-resolution materials with accurate wear, dirt, and weathering patterns',
      '<strong>Night Lighting</strong> — Custom emissive maps for realistic cabin glow and nav lights',
      '<strong>Custom Sounds</strong> — Carefully curated ambient audio for cabin immersion',
      '<strong>Documentation</strong> — Full installation guide and livery preview cards',
    ],
  },
  
  // Image with caption
  {
    type: 'image',
    src: '/placeholders/product-01.jpg',
    alt: 'Neo Minimal Livery Preview - Exterior shot',
    caption: 'The flagship Swiss-inspired livery features clean lines and subtle metallic accents',
  },
  
  // Callout - info
  {
    type: 'callout',
    variant: 'info',
    title: 'Compatibility Note',
    content: 'This pack is designed exclusively for the <strong>FlyByWire A32NX</strong>. Works with both MSFS 2020 and MSFS 2024. Ensure you have the latest stable or development version installed.',
  },
  
  // Heading 3
  {
    type: 'heading',
    level: 3,
    content: 'Technical Specifications',
    id: 'tech-specs',
  },
  
  // Comparison table
  {
    type: 'comparison-table',
    headers: ['Specification', 'Value', 'Notes'],
    rows: [
      ['Texture Resolution', '4096 x 4096', 'DDS BC7 compressed'],
      ['Performance Impact', 'Minimal (<2 FPS)', 'Tested on RTX 3070'],
      ['File Size', '~450 MB', 'Per livery: ~38 MB average'],
      ['PBR Channels', 'Full', 'Albedo, Normal, Metallic, Roughness'],
      ['Night Textures', 'Yes', 'Custom emissive maps'],
    ],
  },
  
  // Blockquote
  {
    type: 'blockquote',
    content: 'The Neo Minimal pack changed how I think about livery design. Less is truly more when executed with this level of precision.',
    author: 'Captain SimReview',
    source: 'Flight Sim Magazine',
  },
  
  // Gradient divider
  {
    type: 'divider',
    style: 'gradient',
  },
  
  // Heading 2
  {
    type: 'heading',
    level: 2,
    content: 'MSFS 2024-Only Features',
    id: 'msfs2024-features',
  },
  
  // Paragraph with bold highlights
  {
    type: 'paragraph',
    content: 'The Microsoft Flight Simulator 2024 variant takes full advantage of the new LOD system to minimize performance impact. <strong>2024-only features include:</strong> enhanced weathering effects that respond to actual flight conditions, dynamic dirt accumulation, and improved night lighting with the new global illumination system.',
  },
  
  // Feature grid
  {
    type: 'feature-grid',
    items: [
      { title: 'Dynamic Weathering', description: 'Liveries react to rain, snow, and environmental conditions in real-time' },
      { title: 'Enhanced LOD', description: 'Optimized texture switching for buttery smooth performance at any altitude' },
      { title: 'HDR Lighting', description: 'Full support for the new HDR pipeline with accurate color reproduction' },
      { title: 'Career Mode Ready', description: 'Compatible with the new career mode when purchased via Marketplace' },
    ],
  },
  
  // Full-width image
  {
    type: 'image',
    src: '/placeholders/product-02.jpg',
    alt: 'Multiple liveries parked at gate',
    caption: 'Three liveries from the collection shown at Zurich Airport during golden hour',
    fullWidth: true,
  },
  
  // Callout - tip
  {
    type: 'callout',
    variant: 'tip',
    title: 'Pro Tip',
    content: 'For the best visual experience, we recommend enabling <strong>Ultra texture quality</strong> and <strong>High anisotropic filtering</strong> in your MSFS graphics settings.',
  },
  
  // Heading 3
  {
    type: 'heading',
    level: 3,
    content: 'Installation Guide',
    id: 'installation',
  },
  
  // Ordered list
  {
    type: 'list',
    ordered: true,
    items: [
      'Download the pack from your account dashboard or the MSFS Marketplace',
      'Extract the ZIP file to a temporary location',
      'Copy the <code>4s-neo-minimal</code> folder to your Community folder',
      'Launch MSFS and verify the liveries appear in the aircraft selector',
      'Optional: Run the provided <code>verify-install.bat</code> to check file integrity',
    ],
  },
  
  // Code block
  {
    type: 'code',
    language: 'Folder Structure',
    content: `Community/
└── 4s-neo-minimal/
    ├── manifest.json
    ├── layout.json
    ├── ContentInfo/
    │   └── 4S-NEOMIN/
    │       └── Thumbnail.jpg
    └── SimObjects/
        └── Airplanes/
            └── FlyByWire_A320_NEO/
                └── TEXTURE.4S_*/ (12 folders)`,
  },
  
  // Warning callout
  {
    type: 'callout',
    variant: 'warning',
    title: 'Important',
    content: 'Do not rename the folders after extraction. The simulator requires exact folder names to locate the textures correctly.',
  },
  
  // Divider
  {
    type: 'divider',
    style: 'dashed',
  },
  
  // Heading 2
  {
    type: 'heading',
    level: 2,
    content: 'Pricing & Availability',
    id: 'pricing',
  },
  
  // Paragraph with styled text
  {
    type: 'paragraph',
    content: '<span class="font-mono text-primary font-bold text-xl">$14.99 USD</span> — Includes all 12 liveries, free lifetime updates, and Discord support.',
  },
  
  // Paragraph
  {
    type: 'paragraph',
    content: '<strong>Existing customers</strong> of previous 4S livery packs receive a loyalty discount of <strong class="text-primary">20% off</strong>. Check your email for the discount code, or contact us on Discord if you haven\'t received it.',
  },
  
  // Link block
  {
    type: 'link-block',
    href: 'https://discord.gg/example',
    text: 'Join our Discord Community',
    description: 'Get support, request new liveries, and connect with other virtual pilots',
    external: true,
  },
  
  // GIF example (using a placeholder)
  {
    type: 'gif',
    src: 'https://media.giphy.com/media/3o7TKSjRrfIPjeiVyU/giphy.gif',
    alt: 'Airplane takeoff animation',
    caption: 'Animated preview of the custom ground handling effects',
  },
  
  // Success callout
  {
    type: 'callout',
    variant: 'success',
    title: 'Version 1.2.0 Released',
    content: 'The latest update includes two new liveries, performance optimizations, and bug fixes for night lighting on certain displays.',
  },
  
  // Final heading
  {
    type: 'heading',
    level: 3,
    content: 'What\'s Next?',
    id: 'roadmap',
  },
  
  // Final paragraph
  {
    type: 'paragraph',
    content: 'We\'re already working on the next expansion pack featuring <em>retro-futuristic</em> designs inspired by 1960s concept art. Join our <a href="#" class="text-primary hover:underline">mailing list</a> to be the first to know when it drops.',
  },
];

export const products: Product[] = [
  {
    slug: 'livery-pack-neo-minimal',
    name: '4S Livery Pack: Neo Minimal',
    tagline: 'Clean lines. Zero clutter. Maximum presence.',
    category: 'livery',
    heroImage: '/products/neo-minimal-hero.jpg',
    trailerUrl: '#',
    description: 'A collection of 12 minimalist liveries for the A320neo. Designed for pilots who appreciate understated elegance over flashy branding. Every texture optimized for performance without sacrificing detail.',
    richDescription: neoMinimalRichDescription,
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
  // ============= BUNDLE EXAMPLE =============
  {
    slug: 'a320-regions-liveries-bundle',
    name: 'A320 Regions Liveries Bundle',
    tagline: 'Complete regional coverage. One package.',
    category: 'bundle',
    heroImage: '/placeholders/hero-01.jpg',
    trailerUrl: '#',
    description: 'The ultimate A320 livery collection combining our most popular regional packs into one comprehensive bundle. From European carriers to Asian airlines, get complete coverage at a fraction of the cost.',
    richDescription: [
      {
        type: 'paragraph',
        content: 'The <strong>A320 Regions Liveries Bundle</strong> is our most comprehensive livery collection, bringing together four of our best-selling packs into a single, value-packed offering. Whether you\'re operating short-haul European routes or long-range Asian destinations, this bundle has you covered.',
      },
      {
        type: 'heading',
        level: 2,
        content: 'What\'s Inside the Bundle',
        id: 'whats-inside',
      },
      {
        type: 'paragraph',
        content: 'This bundle combines <em>48+ unique liveries</em> from four distinct packs, each designed with the same attention to detail and performance optimization. From the understated elegance of Neo Minimal to the stealth aesthetics of Night Ops, variety is the name of the game.',
      },
      {
        type: 'feature-grid',
        items: [
          { title: 'Neo Minimal Pack', description: '12 minimalist liveries featuring clean lines and subtle metallic accents for the modern aviator.' },
          { title: 'Night Ops Collection', description: 'Blacked-out matte finishes perfect for those who prefer their aircraft understated.' },
          { title: 'Retroline Series', description: 'Vintage-inspired designs paying homage to the golden age of aviation.' },
          { title: 'Regional Express', description: 'Authentic regional carrier liveries from smaller European and Asian airlines.' },
        ],
      },
      {
        type: 'image',
        src: '/placeholders/gallery-05.jpg',
        alt: 'Bundle liveries preview showing multiple aircraft',
        caption: 'A selection of liveries from the bundle displayed at various airports',
        fullWidth: true,
      },
      {
        type: 'callout',
        variant: 'info',
        title: 'Bundle Savings',
        content: 'Purchasing this bundle saves you <strong>40% compared to buying each pack individually</strong>. Plus, all future updates to any included pack are automatically included at no extra cost.',
      },
      {
        type: 'heading',
        level: 2,
        content: 'Why Choose the Bundle?',
        id: 'why-bundle',
      },
      {
        type: 'list',
        ordered: false,
        items: [
          '<strong>Massive Variety</strong> — Over 48 unique liveries covering airlines from around the globe',
          '<strong>Consistent Quality</strong> — All packs share the same 4K PBR texture quality and optimization',
          '<strong>Single Installation</strong> — One download, one Community folder drop, done',
          '<strong>Future-Proof</strong> — Lifetime updates for all included products',
          '<strong>Cross-Compatible</strong> — Works with MSFS 2020, MSFS 2024, and FlyByWire A32NX',
        ],
      },
      {
        type: 'image',
        src: '/placeholders/gallery-08.jpg',
        alt: 'Night operations with bundle liveries',
        caption: 'Night Ops liveries in action during evening departure',
      },
      {
        type: 'heading',
        level: 3,
        content: 'Technical Specifications',
        id: 'tech-specs',
      },
      {
        type: 'comparison-table',
        headers: ['Specification', 'Value', 'Notes'],
        rows: [
          ['Total Liveries', '48+', 'Across 4 packs'],
          ['Texture Resolution', '4096 x 4096', 'DDS BC7 compressed'],
          ['Total File Size', '~1.8 GB', 'After compression'],
          ['Performance Impact', 'Minimal', '<2 FPS on average hardware'],
          ['Night Textures', 'Full', 'Custom emissive for all liveries'],
        ],
      },
      {
        type: 'divider',
        style: 'gradient',
      },
      {
        type: 'heading',
        level: 2,
        content: 'Installation',
        id: 'installation',
      },
      {
        type: 'paragraph',
        content: 'Installing the bundle is straightforward. All four packs are combined into a single installer for convenience.',
      },
      {
        type: 'list',
        ordered: true,
        items: [
          'Download the bundle from your account dashboard',
          'Run the installer or extract the ZIP file',
          'Select which packs to install (or install all)',
          'Point to your Community folder',
          'Launch MSFS and enjoy your new liveries',
        ],
      },
      {
        type: 'callout',
        variant: 'tip',
        title: 'Pro Tip',
        content: 'Use the included <strong>Livery Manager</strong> utility to quickly enable/disable specific liveries based on your current flight plan or preferences.',
      },
      {
        type: 'image',
        src: '/placeholders/gallery-11.jpg',
        alt: 'Retroline series liveries',
        caption: 'Retroline Series brings vintage charm to modern cockpits',
        fullWidth: true,
      },
      {
        type: 'blockquote',
        content: 'This bundle is the best value in the flight sim livery market. The quality is consistent across all packs, and the variety means I never fly the same livery twice.',
        author: 'FlightSimmer2024',
        source: 'Reddit r/flightsim',
      },
      {
        type: 'heading',
        level: 2,
        content: 'Included Products Preview',
        id: 'products-preview',
      },
      {
        type: 'paragraph',
        content: 'Below you\'ll find quick access to each product included in this bundle. Each product page contains detailed galleries, installation guides, and full feature lists.',
      },
    ],
    features: [
      {
        icon: 'Globe',
        title: 'Global Coverage',
        description: 'Airlines from Europe, Asia, Americas, and Middle East.',
      },
      {
        icon: 'Package',
        title: '4 Packs Included',
        description: 'Neo Minimal, Night Ops, Retroline, and Regional Express.',
      },
      {
        icon: 'Percent',
        title: '40% Savings',
        description: 'Massive discount compared to buying individually.',
      },
      {
        icon: 'RefreshCcw',
        title: 'Auto Updates',
        description: 'All included products receive free lifetime updates.',
      },
      {
        icon: 'Download',
        title: 'Single Install',
        description: 'One installer, one download. No hassle.',
      },
      {
        icon: 'Layers',
        title: '48+ Liveries',
        description: 'Massive variety covering multiple regions.',
      },
    ],
    faq: [
      {
        question: 'Which products are included?',
        answer: 'This bundle includes Neo Minimal, Night Ops, Retroline Series, and Regional Express Pack — a total of 48+ unique liveries.',
      },
      {
        question: 'Do I get updates for all products?',
        answer: 'Yes! All included products receive free lifetime updates as they are released. When we add new liveries to any pack, you get them automatically.',
      },
      {
        question: 'Can I buy the bundle if I already own one product?',
        answer: 'Contact us on Discord with proof of purchase for a custom discount code. We\'ll subtract what you\'ve already paid from the bundle price.',
      },
      {
        question: 'Is the installation separate for each pack?',
        answer: 'No, the bundle comes with a unified installer. You can choose to install all packs at once or select specific ones.',
      },
      {
        question: 'Which simulator versions are supported?',
        answer: 'The bundle works with MSFS 2020, MSFS 2024, and requires the FlyByWire A32NX aircraft (stable or development version).',
      },
    ],
    gallery: [
      '/placeholders/gallery-01.jpg',
      '/placeholders/gallery-02.jpg',
      '/placeholders/gallery-03.jpg',
      '/placeholders/gallery-04.jpg',
      '/placeholders/gallery-06.jpg',
      '/placeholders/gallery-07.jpg',
      '/placeholders/gallery-09.jpg',
      '/placeholders/gallery-10.jpg',
    ],
    compatibility: [
      'FlyByWire A32NX (stable & dev)',
      'MSFS 2020 / MSFS 2024',
      'All weather presets',
      'VR Compatible',
    ],
    releaseDate: '2025-01-15',
    marketplaceUrl: '#',
    discordUrl: '#',
    // Products included in this bundle
    includedProducts: [
      'livery-pack-neo-minimal',
      'fleet-livery-night-ops',
      'livery-series-retroline',
      'livery-regional-express',
    ],
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

/**
 * Get products included in a bundle
 * @param bundleSlug - The slug of the bundle product
 * @returns Array of products included in the bundle
 */
export const getBundleProducts = (bundleSlug: string): Product[] => {
  const bundle = getProductBySlug(bundleSlug);
  if (!bundle || bundle.category !== 'bundle' || !bundle.includedProducts) {
    return [];
  }
  
  return bundle.includedProducts
    .map(slug => getProductBySlug(slug))
    .filter((p): p is Product => p !== undefined);
};