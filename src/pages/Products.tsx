import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { Layout } from '@/components/layout/layout';
import { ProductCard } from '@/components/products/product-card';
import { products } from '@/content/products';
import { cn } from '@/lib/utils';
import { PRODUCT_CATEGORIES } from '@/lib/constants';
import { staggerContainer, fadeUp } from '@/lib/motion';

type Category = 'all' | 'livery' | 'utility' | 'pack';

const Products = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter((p) => {
    const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <Layout>
      <section className="py-section-lg md:py-24">
        <div className="section-container">
          {/* Header */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mb-10"
          >
            <span className="font-mono text-primary text-sm tracking-[0.2em] uppercase mb-4 block">
              The Hangar
            </span>
            <h1 className="text-4xl md:text-5xl font-mono font-bold mb-4">
              Our Releases
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              Every product is crafted with obsessive attention to detail. 
              No shovelware. No half-measures.
            </p>
          </motion.div>

          {/* Filters & Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex flex-col sm:flex-row gap-4 mb-10"
          >
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {PRODUCT_CATEGORIES.map((category) => (
                <button
                  key={category.value}
                  onClick={() => setActiveCategory(category.value as Category)}
                  className={cn(
                    'px-4 py-2 rounded-md font-mono text-xs transition-all duration-300',
                    activeCategory === category.value
                      ? 'bg-foreground text-background'
                      : 'bg-card border border-border/50 text-muted-foreground hover:text-foreground hover:border-border'
                  )}
                >
                  {category.label}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative sm:ml-auto">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-56 pl-9 pr-4 py-2 rounded-md bg-card border border-border/50 font-mono text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>
          </motion.div>

          {/* Products Grid */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {filteredProducts.map((product, index) => (
              <ProductCard key={product.slug} product={product} index={index} />
            ))}
          </motion.div>

          {/* Empty state */}
          {filteredProducts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <p className="text-muted-foreground font-mono">
                No products found.
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Products;
