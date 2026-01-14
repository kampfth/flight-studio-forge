import { DispatchPost } from '@/lib/types';

export const dispatchPosts: DispatchPost[] = [
  {
    slug: 'e175-update-120',
    title: 'E175 v1.2.0 — Autoflight Overhaul',
    date: '2024-12-10',
    excerpt: 'Complete rewrite of the autoflight logic. VNAV now matches real-world behavior.',
    content: `
The E175 autoflight system has been completely rebuilt from the ground up. 

**What's New:**
- VNAV path following now uses descent advisory calculations
- LNAV wind correction improved
- Fixed altitude capture overshoot at high speeds
- Added managed speed mode for climb/descent

This update was built using data from real E175 pilots in our Discord community. Their feedback was invaluable.

**Coming Next:**
We're already working on the TCAS implementation for v1.3.0. Stay tuned.
    `,
    image: '/dispatch/e175-update.jpg',
    tags: ['update', 'aircraft', 'e175'],
  },
  {
    slug: 'sbgr-announced',
    title: 'SBGR Guarulhos — Development Started',
    date: '2024-09-05',
    excerpt: 'Our first major scenery project is officially underway. São Paulo, here we come.',
    content: `
After months of research and planning, we're thrilled to announce our first scenery project: São Paulo Guarulhos International (SBGR).

**Why SBGR?**
- Largest airport in South America
- Underserved in the MSFS ecosystem
- Complex operations and unique challenges
- Beautiful Brazilian architecture

**Our Approach:**
We've partnered with local spotters and aviation professionals to gather reference material. Every terminal, every taxiway sign, every parking position will be accurate.

The team is aiming for a Q2 2024 release. We'll share progress in our Discord.
    `,
    image: '/dispatch/sbgr-announced.jpg',
    tags: ['announcement', 'scenery', 'development'],
  },
  {
    slug: 'privacy-manifesto',
    title: 'Why We Don\'t Track You',
    date: '2024-07-20',
    excerpt: 'Privacy isn\'t a feature. It\'s a fundamental right. Here\'s our commitment.',
    content: `
In an industry where telemetry and analytics are the norm, we're taking a different path.

**Our Commitment:**
- No telemetry in any of our products
- No accounts required to use what you bought
- No "phone home" license checks
- No data collection of any kind

**Why?**
Because you bought software to fly, not to be surveilled. Your sim, your data, your business.

This isn't marketing. It's how we build everything. Flight Tracker Pro keeps all your flight data on your local machine — always has, always will.

**The Business Reality:**
Yes, this means we have less data. We can't A/B test features or track engagement. We rely on Discord and direct feedback instead.

Worth it.
    `,
    image: '/dispatch/privacy.jpg',
    tags: ['philosophy', 'privacy'],
  },
  {
    slug: 'studio-origins',
    title: 'From Simmers, For Simmers',
    date: '2024-03-01',
    excerpt: 'How 4Simmers started and where we\'re heading.',
    content: `
4Simmers was born from frustration.

Too many addons felt half-finished. Too many studios went silent after release. Too many products tracked everything you did.

We're four developers who've been simming since FS2004. We know what good software feels like — and what's missing from this market.

**Our Focus:**
- Quality over quantity
- Long-term support
- Transparent development
- Community-driven roadmaps

**What's Next:**
We're small, but we're building for the long term. Each release will be polished, documented, and supported.

Thanks for being here.
    `,
    image: '/dispatch/origins.jpg',
    tags: ['announcement', 'team'],
  },
];

export const getDispatchBySlug = (slug: string): DispatchPost | undefined => {
  return dispatchPosts.find((p) => p.slug === slug);
};
