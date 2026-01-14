import { useState } from 'react';
import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/layout';
import { ProductCard } from '@/components/products/product-card';
import { products } from '@/content/products';
import { cn } from '@/lib/utils';

type Category = 'all' | 'aircraft' | 'scenery' | 'utility';

const categories: { value: Category; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'aircraft', label: 'Aircraft' },
  { value: 'scenery', label: 'Scenery' },
  { value: 'utility', label: 'Utility' },
];

const Products = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('all');

  const filteredProducts = activeCategory === 'all'
    ? products
    : products.filter((p) => p.category === activeCategory);

  return (
    <Layout>
      <section className="py-24 md:py-32">
        <div className="section-container">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <span className="font-mono text-primary text-sm tracking-[0.2em] uppercase mb-4 block">
              The Hangar
            </span>
            <h1 className="text-4xl md:text-5xl font-mono font-bold mb-6">
              Our Releases
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              Every product is crafted with obsessive attention to detail. 
              No shovelware. No half-measures. Just quality that respects your time.
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-wrap gap-3 mb-12"
          >
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setActiveCategory(category.value)}
                className={cn(
                  'px-5 py-2 rounded-md font-mono text-sm transition-all duration-300',
                  activeCategory === category.value
                    ? 'bg-primary text-primary-foreground shadow-glow-sm'
                    : 'bg-card border border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/30'
                )}
              >
                {category.label}
              </button>
            ))}
          </motion.div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product, index) => (
              <ProductCard key={product.slug} product={product} index={index} />
            ))}
          </div>

          {/* Empty state */}
          {filteredProducts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-muted-foreground font-mono">
                No products in this category yet.
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Products;
