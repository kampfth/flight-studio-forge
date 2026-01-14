import { Layout } from '@/components/layout/layout';
import { HeroSection } from '@/components/sections/hero-section';
import { FeaturedProducts } from '@/components/sections/featured-products';
import { ValuesSection } from '@/components/sections/values-section';
import { CommunitySection } from '@/components/sections/community-section';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <FeaturedProducts />
      <ValuesSection />
      <CommunitySection />
    </Layout>
  );
};

export default Index;
