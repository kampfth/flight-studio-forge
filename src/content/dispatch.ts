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
We're exploring a cargo variant series. Let us know on Discord if that interests you.
    `,
    image: '/dispatch/neo-minimal-update.jpg',
    tags: ['update', 'livery', 'a320'],
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
    image: '/dispatch/runway-notes-v23.jpg',
    tags: ['update', 'utility'],
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

Join Discord for sneak peeks as we progress.
    `,
    image: '/dispatch/retroline-announced.jpg',
    tags: ['announcement', 'livery', 'development'],
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
Features come from Discord conversations. Not guesswork, not trends — actual requests from people who use our stuff daily.

**Long-Term Thinking:**
We don't abandon products after release. Runway Notes is on v2.3 with more updates planned. Neo Minimal keeps getting new liveries. This is how software should work.

**Documentation:**
Every product ships with proper docs. Installation guides, troubleshooting steps, customization options. Because "just works" includes "you can figure out when it doesn't."

**What's Next:**
More utilities. More liveries. Maybe some surprises. Follow along on Discord.
    `,
    image: '/dispatch/philosophy.jpg',
    tags: ['philosophy', 'team'],
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
    image: '/dispatch/cabin-camera-vr.jpg',
    tags: ['roadmap', 'utility', 'vr'],
  },
];

export const getDispatchBySlug = (slug: string): DispatchPost | undefined => {
  return dispatchPosts.find((p) => p.slug === slug);
};