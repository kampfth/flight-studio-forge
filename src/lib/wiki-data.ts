/**
 * Wiki Knowledge Base Data
 * Mock data for articles and categories
 */

export interface WikiArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  views: number;
  createdAt: string;
  updatedAt: string;
}

export interface WikiCategory {
  id: string;
  name: string;
  icon: string;
  count: number;
}

export const WIKI_CATEGORIES: WikiCategory[] = [
  { id: 'getting-started', name: 'Getting Started', icon: 'rocket', count: 4 },
  { id: 'installation', name: 'Installation', icon: 'download', count: 6 },
  { id: 'troubleshooting', name: 'Troubleshooting', icon: 'wrench', count: 8 },
  { id: 'liveries', name: 'Liveries', icon: 'palette', count: 5 },
  { id: 'utilities', name: 'Utilities', icon: 'settings', count: 3 },
];

export const WIKI_ARTICLES: WikiArticle[] = [
  {
    id: '1',
    slug: 'how-to-install-liveries',
    title: 'How to Install Liveries in MSFS',
    excerpt: 'Step-by-step guide to installing liveries in Microsoft Flight Simulator 2020/2024.',
    content: `
# How to Install Liveries in MSFS

Installing liveries in Microsoft Flight Simulator is straightforward. Follow these steps:

## Method 1: Community Folder

1. **Locate your Community folder**
   - Steam: \`C:\\Users\\[Username]\\AppData\\Roaming\\Microsoft Flight Simulator\\Packages\\Community\`
   - Microsoft Store: \`C:\\Users\\[Username]\\AppData\\Local\\Packages\\Microsoft.FlightSimulator_8wekyb3d8bbwe\\LocalCache\\Packages\\Community\`

2. **Extract the livery package**
   - Download the livery ZIP file
   - Extract using WinRAR or 7-Zip

3. **Copy to Community folder**
   - Move the extracted folder to your Community folder
   - The folder should contain a \`manifest.json\` file

4. **Restart the simulator**
   - Close and reopen MSFS
   - The livery should appear in aircraft selection

## Method 2: Content Manager (Marketplace purchases)

For liveries purchased through the in-game marketplace, they install automatically through the Content Manager.

## Troubleshooting

If the livery doesn't appear:
- Verify the folder structure is correct
- Check for conflicting liveries
- Ensure the livery is compatible with your aircraft version
    `,
    category: 'installation',
    views: 1542,
    createdAt: '2024-01-15',
    updatedAt: '2024-03-20',
  },
  {
    id: '2',
    slug: 'msfs-2024-compatibility',
    title: 'MSFS 2024 Compatibility Guide',
    excerpt: 'Understanding compatibility between MSFS 2020 and 2024 add-ons.',
    content: `
# MSFS 2024 Compatibility Guide

Microsoft Flight Simulator 2024 brings significant changes. Here's what you need to know about compatibility.

## What Works

- Most simple livery repaints
- Basic aircraft modifications
- Scenery add-ons (with some adjustments)

## What Needs Updates

- Complex aircraft with custom systems
- Utilities that interact with SimConnect
- Plugins using deprecated APIs

## 4Simmers Products

All our products are being updated for MSFS 2024 compatibility. Check the product page for specific compatibility status.

## Migration Tips

1. Back up your Community folder
2. Test add-ons one at a time
3. Check developer websites for updates
4. Report compatibility issues to developers
    `,
    category: 'getting-started',
    views: 2341,
    createdAt: '2024-11-01',
    updatedAt: '2024-12-15',
  },
  {
    id: '3',
    slug: 'livery-not-showing',
    title: 'Livery Not Showing in Aircraft Selection',
    excerpt: 'Common solutions for when liveries don\'t appear in the aircraft selection screen.',
    content: `
# Livery Not Showing in Aircraft Selection

If your livery isn't appearing, try these solutions:

## Check Folder Structure

The most common issue is incorrect folder structure. Your livery folder should look like:

\`\`\`
Community/
└── livery-name/
    ├── manifest.json
    ├── layout.json
    └── SimObjects/
        └── Airplanes/
            └── ...
\`\`\`

## Verify Aircraft Compatibility

Ensure the livery is made for:
- The correct aircraft (A320neo vs A320)
- The correct variant (Standard vs Developer version)
- Compatible simulator version (2020 vs 2024)

## Clear Rolling Cache

1. Go to MSFS Options > General > Data
2. Delete Rolling Cache
3. Restart the simulator

## Check for Conflicts

Remove all other add-ons temporarily to isolate the issue.
    `,
    category: 'troubleshooting',
    views: 3210,
    createdAt: '2024-02-10',
    updatedAt: '2024-04-05',
  },
  {
    id: '4',
    slug: 'vr-optimization-guide',
    title: 'VR Optimization Guide',
    excerpt: 'Tips and settings for optimal VR performance in MSFS.',
    content: `
# VR Optimization Guide

Getting smooth VR performance in MSFS requires careful optimization.

## Recommended Settings

### Render Scaling
- Start at 80-90% and adjust based on your GPU
- Lower values = better performance, slightly reduced clarity

### Terrain Level of Detail
- 100-150 for most systems
- Reduce if experiencing stutters over complex scenery

### Object Level of Detail
- 100-150 recommended
- Affects buildings, vehicles, and ground objects

## Hardware Tips

1. **GPU**: RTX 3080 or better recommended
2. **RAM**: 32GB minimum for VR
3. **Storage**: NVMe SSD for smooth scenery streaming

## Our VR Utilities

Check out our VR Toolkit for automatic optimization profiles.
    `,
    category: 'utilities',
    views: 1876,
    createdAt: '2024-03-01',
    updatedAt: '2024-05-10',
  },
  {
    id: '5',
    slug: 'getting-started-with-4simmers',
    title: 'Getting Started with 4Simmers Products',
    excerpt: 'Welcome guide for new customers to the 4Simmers ecosystem.',
    content: `
# Getting Started with 4Simmers

Welcome to 4Simmers! Here's everything you need to know to get started.

## Account Setup

After purchasing, you'll receive:
- Download links via email
- Access to product updates
- Support ticket system access

## Product Categories

### Liveries
High-quality aircraft repaints with accurate details.

### Utilities
Tools to enhance your simulator experience.

### Packs
Bundled collections at discounted prices.

## Installation

All our products come with detailed README files. General steps:

1. Download the product ZIP
2. Extract to your Community folder
3. Launch MSFS and enjoy!

## Getting Help

- Check this Wiki for common questions
- Open a support ticket for specific issues
- Follow our Facebook for updates
    `,
    category: 'getting-started',
    views: 4521,
    createdAt: '2024-01-01',
    updatedAt: '2024-06-01',
  },
  {
    id: '6',
    slug: 'simconnect-errors',
    title: 'Fixing SimConnect Errors',
    excerpt: 'How to resolve common SimConnect connection issues with utilities.',
    content: `
# Fixing SimConnect Errors

SimConnect is the interface utilities use to communicate with MSFS.

## Common Errors

### "SimConnect not found"

1. Ensure MSFS is running
2. Check if SimConnect SDK is installed
3. Verify the utility is compatible with your MSFS version

### "Connection timeout"

- Run the utility as Administrator
- Check Windows Firewall settings
- Verify no other apps are blocking the connection

### "Version mismatch"

Update your utility to the latest version that matches your simulator.

## Prevention

- Keep utilities updated
- Don't run multiple SimConnect apps simultaneously
- Check compatibility before simulator updates
    `,
    category: 'troubleshooting',
    views: 1234,
    createdAt: '2024-04-15',
    updatedAt: '2024-07-20',
  },
];

export function searchArticles(query: string): WikiArticle[] {
  const lowercaseQuery = query.toLowerCase();
  return WIKI_ARTICLES.filter(
    article =>
      article.title.toLowerCase().includes(lowercaseQuery) ||
      article.excerpt.toLowerCase().includes(lowercaseQuery) ||
      article.content.toLowerCase().includes(lowercaseQuery)
  );
}

export function getArticleBySlug(slug: string): WikiArticle | undefined {
  return WIKI_ARTICLES.find(article => article.slug === slug);
}

export function getArticlesByCategory(categoryId: string): WikiArticle[] {
  return WIKI_ARTICLES.filter(article => article.category === categoryId);
}

export function getMostReadArticles(limit: number = 5): WikiArticle[] {
  return [...WIKI_ARTICLES].sort((a, b) => b.views - a.views).slice(0, limit);
}
