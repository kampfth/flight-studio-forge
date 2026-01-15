/**
 * CMS Mock Data
 * Initial seed data for the CMS
 * Matches the structure of existing content files
 */

import { CMSProduct, CMSPatchNote } from './types';

const generateId = () => Math.random().toString(36).substring(2, 15);

export const mockProducts: CMSProduct[] = [
  {
    id: generateId(),
    slug: 'livery-pack-neo-minimal',
    title: '4S Livery Pack: Neo Minimal',
    tagline: 'Clean lines. Zero clutter. Maximum presence.',
    description: 'A collection of 12 minimalist liveries for the A320neo. Designed for pilots who appreciate understated elegance over flashy branding.',
    category: 'livery',
    actualVersion: '1.2.0',
    releaseDate: '2024-11-15',
    bannerImage: { id: '1', url: '/products/neo-minimal-hero.jpg', name: 'neo-minimal-hero.jpg' },
    features: [
      { id: '1', title: '12 Unique Liveries', description: 'Each design crafted from scratch with consistent visual language.', icon: 'Paintbrush' },
      { id: '2', title: '4K Textures', description: 'PBR materials with accurate wear, dirt, and weathering patterns.', icon: 'Gauge' },
      { id: '3', title: 'Frame-rate Friendly', description: 'Compressed without quality loss. No stutters, no compromises.', icon: 'Zap' },
      { id: '4', title: 'Night Lighting', description: 'Custom emissive maps for realistic cabin glow and nav lights.', icon: 'Layers' },
    ],
    gallery: [
      { id: '1', url: '/products/neo-minimal-1.jpg', name: 'Gallery 1' },
      { id: '2', url: '/products/neo-minimal-2.jpg', name: 'Gallery 2' },
    ],
    faq: [
      { id: '1', question: 'Which aircraft is this compatible with?', answer: 'Designed for the FlyByWire A32NX. Works with MSFS 2020 and 2024.' },
      { id: '2', question: 'How do I install?', answer: 'Drag and drop into your Community folder. No installer needed.' },
    ],
    compatibility: ['FlyByWire A32NX (stable & dev)', 'MSFS 2020 / MSFS 2024'],
    tags: ['a320', 'livery', 'minimal'],
    status: 'published',
    marketplaceUrl: '#',
    discordUrl: '#',
    trailerUrl: '#',
    createdAt: '2024-11-15T00:00:00.000Z',
    updatedAt: '2024-12-10T00:00:00.000Z',
  },
  {
    id: generateId(),
    slug: 'runway-notes',
    title: 'Runway Notes',
    tagline: 'Your flight logbook, evolved.',
    description: 'Automatic flight tracking with detailed analytics, export options, and VA integration.',
    category: 'utility',
    actualVersion: '2.3.0',
    releaseDate: '2024-06-01',
    bannerImage: { id: '1', url: '/products/runway-notes-hero.jpg', name: 'runway-notes-hero.jpg' },
    features: [
      { id: '1', title: 'Auto Detection', description: 'Starts logging when you start your engines.', icon: 'Radio' },
      { id: '2', title: 'VA Export', description: 'Compatible with VATSIM, POSCON, and major VAs.', icon: 'Upload' },
    ],
    gallery: [],
    faq: [
      { id: '1', question: 'Does it work offline?', answer: 'Yes, data syncs when you reconnect.' },
    ],
    compatibility: ['MSFS 2020', 'MSFS 2024', 'Windows 10/11'],
    tags: ['utility', 'logbook'],
    status: 'published',
    createdAt: '2024-06-01T00:00:00.000Z',
    updatedAt: '2024-11-28T00:00:00.000Z',
  },
];

export const mockPatchNotes: CMSPatchNote[] = [
  {
    id: generateId(),
    productId: mockProducts[0].id,
    slug: 'neo-minimal-update-120',
    title: 'Neo Minimal v1.2.0 — Winter Refresh',
    version: '1.2.0',
    releaseDate: '2024-12-10',
    summary: 'Four new liveries added, plus improved night lighting across the pack.',
    bannerImage: { id: '1', url: '/placeholders/dispatch-01.jpg', name: 'dispatch-01.jpg' },
    sections: [
      {
        id: '1',
        type: 'Added',
        items: [
          'Arctic White variant with subtle blue accents',
          'Nordic Gray with warm interior glow',
          'Midnight Express - our darkest yet',
          'Dawn Patrol - sunrise gradients done right',
        ],
      },
      {
        id: '2',
        type: 'Improved',
        items: [
          'Emissive maps tweaked for more realistic cabin lighting',
          'Registration fonts unified across all liveries',
        ],
      },
      {
        id: '3',
        type: 'Fixed',
        items: [
          'Minor texture seams fixed on wing tips',
        ],
      },
    ],
    images: [],
    tags: ['update', 'livery', 'a320'],
    status: 'published',
    createdAt: '2024-12-10T00:00:00.000Z',
    updatedAt: '2024-12-10T00:00:00.000Z',
  },
  {
    id: generateId(),
    productId: mockProducts[1].id,
    slug: 'runway-notes-v23',
    title: 'Runway Notes v2.3.0 — Export Overhaul',
    version: '2.3.0',
    releaseDate: '2024-11-28',
    summary: 'New export formats and better VA compatibility.',
    bannerImage: { id: '1', url: '/placeholders/dispatch-02.jpg', name: 'dispatch-02.jpg' },
    sections: [
      {
        id: '1',
        type: 'Added',
        items: [
          'vPilot-compatible format for VATSIM logging',
          'POSCON integration beta',
          'Enhanced PDF with approach charts compatibility',
        ],
      },
      {
        id: '2',
        type: 'Fixed',
        items: [
          'Fixed fuel calculation on long-haul flights',
          'Corrected timezone issues in some regions',
        ],
      },
      {
        id: '3',
        type: 'Improved',
        items: [
          'Database queries now 40% faster',
          'Reduced memory footprint by 15%',
        ],
      },
    ],
    images: [],
    tags: ['update', 'utility'],
    status: 'published',
    createdAt: '2024-11-28T00:00:00.000Z',
    updatedAt: '2024-11-28T00:00:00.000Z',
  },
];
