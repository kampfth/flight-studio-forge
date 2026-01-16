import { useRef } from 'react';
import { Layout } from '@/components/layout/layout';
import { HeroSection } from '@/components/sections/hero-section';
import { FeaturedProducts } from '@/components/sections/featured-products';

const Index = () => {
  const featuredRef = useRef<HTMLElement>(null);

  const scrollToContent = () => {
    featuredRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Layout>
      <div className="snap-y snap-mandatory">
        <HeroSection onScrollToContent={scrollToContent} />
        <FeaturedProducts ref={featuredRef} />
      </div>
    </Layout>
  );
};

export default Index;
