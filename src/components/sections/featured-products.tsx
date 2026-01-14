import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { products } from '@/content/products';
import { ProductCard } from '@/components/products/product-card';
import { Button } from '@/components/ui/button';

export function FeaturedProducts() {
  const featuredProducts = products.slice(0, 3);

  return (
    <section className="py-24 md:py-32">
      <div className="section-container">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div>
            <span className="font-mono text-primary text-sm tracking-[0.2em] uppercase mb-4 block">
              The Hangar
            </span>
            <h2 className="text-3xl md:text-4xl font-mono font-bold">
              Latest Releases
            </h2>
          </div>
          <Button asChild variant="outline">
            <Link to="/products">
              View All Products
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </Button>
        </motion.div>

        {/* Product grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product, index) => (
            <ProductCard key={product.slug} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
