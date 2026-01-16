/**
 * Page: Index
 * Responsibility: Homepage with full-screen hero
 * Route: /
 */
import { HeroSection } from '@/components/sections';

export default function Index() {
  return (
    <div className="h-screen overflow-hidden" data-qa="page-index">
      <HeroSection />
    </div>
  );
}
