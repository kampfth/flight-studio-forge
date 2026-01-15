import { DispatchPost } from '@/lib/types';

export const dispatchPosts: DispatchPost[] = [
  {
    slug: 'neo-minimal-update-120',
    title: 'Neo Minimal v1.2.0 — Winter Refresh',
    date: '2024-12-10',
    excerpt: 'Four new liveries added, plus improved night lighting across the pack.',
    content: `
The Neo Minimal pack just got bigger. Based on community requests, we've added four new designs focusing on northern European aesthetics.

**What's New:**
- Arctic White variant with subtle blue accents
- Nordic Gray with warm interior glow
- Midnight Express - our darkest yet
- Dawn Patrol - sunrise gradients done right

**Improvements:**
- Emissive maps tweaked for more realistic cabin lighting
- Registration fonts unified across all liveries
- Minor texture seams fixed on wing tips

**Coming Next:**
We're exploring a cargo variant series. Let us know on Facebook if that interests you.
    `,
    image: '/placeholders/dispatch-01.jpg',
    tags: ['update', 'livery', 'a320'],
    relatedProducts: ['livery-pack-neo-minimal'],
  },
  {
    slug: 'runway-notes-v23',
    title: 'Runway Notes v2.3.0 — Export Overhaul',
    date: '2024-11-28',
    excerpt: 'New export formats and better VA compatibility.',
    content: `
Version 2.3 focuses on getting your flight data where you need it.

**New Export Options:**
- vPilot-compatible format for VATSIM logging
- POSCON integration beta
- Enhanced PDF with approach charts compatibility
- SimBrief format for route comparisons

**Bug Fixes:**
- Fixed fuel calculation on long-haul flights
- Corrected timezone issues in some regions
- Better handling of sim crashes mid-flight

**Performance:**
- Database queries now 40% faster
- Reduced memory footprint by 15%

Thanks to everyone who reported issues. Keep them coming.
    `,
    image: '/placeholders/dispatch-02.jpg',
    tags: ['update', 'utility'],
    relatedProducts: ['runway-notes'],
  },
  {
    slug: 'retroline-announced',
    title: 'Retroline Series — Development Started',
    date: '2024-08-15',
    excerpt: 'Our love letter to the golden age of aviation.',
    content: `
After months of research, we're thrilled to announce Retroline — a collection of meticulously recreated classic liveries.

**Why Retroline?**
- These schemes deserve modern quality
- Historical aviation is underserved in MSFS
- We love the aesthetics of 70s/80s aviation

**Our Approach:**
We've been collecting reference photos from aviation museums, historical societies, and collector communities. Every stripe, every font, every color will be period-accurate.

**Aircraft Planned:**
- PMDG 737 (initial release)
- Fenix A320 (post-launch)
- iniBuilds A310 (if demand exists)

Join our Facebook page for sneak peeks as we progress.
    `,
    image: '/placeholders/dispatch-03.jpg',
    tags: ['announcement', 'livery'],
    relatedProducts: ['livery-series-retroline'],
  },
  {
    slug: 'studio-philosophy',
    title: 'How We Build Things',
    date: '2024-06-01',
    excerpt: 'A look inside our development process and priorities.',
    content: `
4Simmers started because we wanted addons that respected our time.

**Quality Over Speed:**
We'd rather take six months on something polished than rush out half-finished products. Every release is tested across different systems, different configurations, different use cases.

**Community Input:**
Features come from Facebook conversations. Not guesswork, not trends — actual requests from people who use our stuff daily.

**Long-Term Thinking:**
We don't abandon products after release. Runway Notes is on v2.3 with more updates planned. Neo Minimal keeps getting new liveries. This is how software should work.

**Documentation:**
Every product ships with proper docs. Installation guides, troubleshooting steps, customization options. Because "just works" includes "you can figure out when it doesn't."

**What's Next:**
More utilities. More liveries. Maybe some surprises. Follow along on Facebook.
    `,
    image: '/placeholders/dispatch-04.jpg',
    tags: ['philosophy'],
    relatedProducts: [],
  },
  {
    slug: 'cabin-camera-vr-roadmap',
    title: 'Cabin Camera VR — Roadmap Update',
    date: '2024-10-20',
    excerpt: 'VR support is coming. Here\'s the timeline.',
    content: `
The most requested feature for Cabin Camera is VR support. Here's where we stand.

**The Challenge:**
VR camera manipulation is fundamentally different from desktop. We're not just porting — we're rebuilding the interaction model from scratch.

**Timeline:**
- Beta testing: Q1 2025
- Public release: Q2 2025 (v3.0)

**What to Expect:**
- Hand controller support for camera movement
- Saved presets accessible via gesture menu
- Performance optimizations for VR frame rates

**Desktop Users:**
V3 will also bring desktop improvements. Smoother physics, more preset slots, and better UI.

Patience appreciated. We'd rather delay than ship broken.
    `,
    image: '/placeholders/dispatch-05.jpg',
    tags: ['roadmap', 'utility', 'vr'],
    relatedProducts: ['cabin-camera'],
  },
  {
    slug: 'regional-express-launch',
    title: 'Regional Express Pack — Now Available',
    date: '2024-12-01',
    excerpt: 'Short hops deserve sharp looks. 24 regional airline liveries released.',
    content: `
Regional Express Pack is now live on the marketplace.

**What's Included:**
- 24 liveries covering regional operators often overlooked
- ATR 42/72, Aerosoft CRJ, and E-Jets
- Airlines from Europe, Asia, and the Americas

**Why Regional?**
The big carriers get all the attention. We wanted to give some love to the routes that connect smaller cities, the turboprops that hop between islands, the jets that serve communities.

**Community Requests:**
Several liveries in this pack came directly from user suggestions. Keep them coming.
    `,
    image: '/placeholders/dispatch-06.jpg',
    tags: ['announcement', 'livery', 'pack'],
    relatedProducts: ['livery-regional-express'],
  },
  {
    slug: 'checklist-master-simbrief',
    title: 'Checklist Master — SimBrief Integration Coming',
    date: '2024-11-15',
    excerpt: 'Direct OFP import landing in v1.6.',
    content: `
One of the most requested features for Checklist Master is finally in development.

**SimBrief Integration:**
- Import your OFP directly
- Auto-populate weights and fuel
- Route information displayed inline

**Other v1.6 Features:**
- Improved voice synthesis quality
- New compact mode for smaller screens
- Better handling of interrupted checklists

Expected release: Late January 2025.
    `,
    image: '/placeholders/dispatch-01.jpg',
    tags: ['roadmap', 'utility'],
    relatedProducts: ['checklist-master'],
  },
  {
    slug: 'night-ops-v2-update',
    title: 'Night Ops v2.0 — Multi-Aircraft Expansion',
    date: '2024-09-20',
    excerpt: 'The stealth collection grows with 6 new aircraft.',
    content: `
Night Ops just doubled in size.

**New Aircraft:**
- PMDG 777
- Fenix A320
- iniBuilds A310
- ATR 72
- Working Title CJ4
- HPG H145

**Improvements:**
- Revised matte textures with better specular response
- Unified registration fonts across all aircraft
- Documentation updated with installation notes per aircraft

The blacked-out fleet is ready for night operations.
    `,
    image: '/placeholders/dispatch-02.jpg',
    tags: ['update', 'livery'],
    relatedProducts: ['fleet-livery-night-ops'],
  },
];

export const getDispatchBySlug = (slug: string): DispatchPost | undefined => {
  return dispatchPosts.find((p) => p.slug === slug);
};

export const getDispatchesByProduct = (productSlug: string): DispatchPost[] => {
  return dispatchPosts.filter((p) => p.relatedProducts?.includes(productSlug));
};

export const getDispatchesByTag = (tag: string): DispatchPost[] => {
  return dispatchPosts.filter((p) => p.tags.includes(tag));
};

/** Get unique tags from all dispatch posts for filtering */
export const getAllDispatchTags = (): string[] => {
  const tags = new Set<string>();
  dispatchPosts.forEach((p) => p.tags.forEach((t) => tags.add(t)));
  return Array.from(tags).sort();
};
