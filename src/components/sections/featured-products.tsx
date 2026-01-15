/**
 * Component: FeaturedProducts
 * Responsibility: Display featured products grid on homepage
 * Used by: Index page
 */
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { products } from '@/content/products';
import { ProductCard } from '@/components/products/product-card';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/lib/routes';

export function FeaturedProducts() {
  const featuredProducts = products.slice(0, 6);

  return (
    <section className="py-section md:py-section-md">
      <div className="section-container">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8"
        >
          <div>
            <span className="font-mono text-primary text-xs tracking-[0.2em] uppercase mb-2 block">
              The Hangar
            </span>
            <h2 className="text-2xl md:text-3xl font-mono font-bold">
              Latest Releases
            </h2>
          </div>
          <Button asChild variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground w-fit">
            <Link to="/products">
              View All
              <ArrowRight size={14} className="ml-1.5" />
            </Link>
          </Button>
        </motion.div>

        {/* Product grid - compact */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredProducts.map((product, index) => (
            <ProductCard key={product.slug} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}