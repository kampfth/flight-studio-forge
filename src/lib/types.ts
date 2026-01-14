export interface Product {
  slug: string;
  name: string;
  tagline: string;
  category: 'aircraft' | 'scenery' | 'utility';
  heroImage: string;
  heroVideo?: string;
  description: string;
  features: FeatureItem[];
  faq: FaqItem[];
  gallery: string[];
  specs?: SpecItem[];
  releaseDate?: string;
  version?: string;
  marketplaceUrl?: string;
  discordUrl?: string;
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
