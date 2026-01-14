export interface Product {
  slug: string;
  name: string;
  tagline: string;
  category: 'livery' | 'utility' | 'pack';
  heroImage: string;
  heroVideo?: string;
  description: string;
  features: FeatureItem[];
  faq: FaqItem[];
  gallery: string[];
  specs?: SpecItem[];
  compatibility?: string[];
  releaseDate?: string;
  version?: string;
  marketplaceUrl?: string;
  discordUrl?: string;
  trailerUrl?: string;
}

export interface FeatureItem {
  icon: string;
  title: string;
  description: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface SpecItem {
  label: string;
  value: string;
}

export interface DispatchPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  image?: string;
  tags: string[];
}

export interface NavItem {
  label: string;
  href: string;
}