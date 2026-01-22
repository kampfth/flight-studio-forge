/**
 * Page: Products (Hangar)
 * Responsibility: Product gallery with glassmorphism styling
 */
import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronLeft, ChevronRight, Box } from 'lucide-react';
import { Layout } from '@/components/layout/layout';
import { ProductCard } from '@/components/products/product-card';
import { products } from '@/content/products';
import { cn } from '@/lib/utils';
import { PRODUCT_CATEGORIES } from '@/lib/constants';
import { staggerContainer, staggerItem } from '@/lib/motion';
import { usePagination } from '@/hooks/use-pagination';
import { useIsMobile } from '@/hooks/use-mobile';

type Category = 'all' | 'livery' | 'utility' | 'pack' | 'bundle';

const Products = () => {
  const isMobile = useIsMobile();
  const itemsPerPage = isMobile ? 4 : 6;
  
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            p.tagline.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Pagination
  const {
    currentPage,
    totalPages,
    paginatedItems,
    hasNextPage,
    hasPrevPage,
    goToPage,
    nextPage,
    prevPage,
    resetPage,
  } = usePagination({
    items: filteredProducts,
    itemsPerPage,
  });

  // Reset to page 1 when filters change
  useEffect(() => {
    resetPage();
  }, [activeCategory, searchQuery, resetPage]);

  // Generate page numbers to display
  const pageNumbers = useMemo(() => {
    const pages: (number | 'ellipsis')[] = [];
    const maxVisible = isMobile ? 3 : 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      
      if (currentPage > 3) {
        pages.push('ellipsis');
      }
      
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) pages.push(i);
      }
      
      if (currentPage < totalPages - 2) {
        pages.push('ellipsis');
      }
      
      if (!pages.includes(totalPages)) pages.push(totalPages);
    }
    
    return pages;
  }, [currentPage, totalPages, isMobile]);

  return (
    <Layout>
      <section className="relative py-24 md:py-32 min-h-screen overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full"
            style={{
              background: 'radial-gradient(circle, hsl(var(--primary) / 0.08) 0%, transparent 70%)',
              filter: 'blur(80px)',
              top: '10%',
              right: '-10%',
            }}
            animate={{
              x: [0, 50, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute w-[500px] h-[500px] rounded-full"
            style={{
              background: 'radial-gradient(circle, hsl(var(--accent) / 0.06) 0%, transparent 70%)',
              filter: 'blur(100px)',
              bottom: '5%',
              left: '-10%',
            }}
            animate={{
              x: [0, -40, 0],
              y: [0, 40, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 5,
            }}
          />
        </div>

        {/* Grid overlay */}
        <div className="absolute inset-0 grid-overlay opacity-10" />

        <div className="section-container relative">
          {/* Header with glassmorphism */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 mb-4"
              whileHover={{ scale: 1.02 }}
            >
              <Box size={14} className="text-primary" />
              <span className="font-mono text-muted-foreground text-xs tracking-[0.2em] uppercase">
                The Hangar
              </span>
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-mono font-bold mb-4">
              Our{' '}
              <span className="text-gradient bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                Releases
              </span>
            </h1>
            <p className="text-muted-foreground max-w-2xl text-lg">
              Every product is crafted with obsessive attention to detail. 
              No shovelware. No half-measures.
            </p>
          </motion.div>

          {/* Filters & Search with glassmorphism */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex flex-col sm:flex-row gap-4 mb-8"
          >
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {PRODUCT_CATEGORIES.map((category) => (
                <button
                  key={category.value}
                  onClick={() => setActiveCategory(category.value as Category)}
                  className={cn(
                    'px-4 py-2 rounded-lg font-mono text-xs transition-all duration-300 backdrop-blur-md',
                    activeCategory === category.value
                      ? 'bg-foreground text-background'
                      : 'bg-white/5 border border-white/10 text-muted-foreground hover:text-foreground hover:border-white/20 hover:bg-white/10'
                  )}
                >
                  {category.label}
                </button>
              ))}
            </div>

            {/* Search with glassmorphism */}
            <div className="relative sm:ml-auto">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-56 pl-9 pr-4 py-2 rounded-lg bg-white/5 backdrop-blur-md border border-white/10 font-mono text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>
          </motion.div>

          {/* Results count */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-between mb-6"
          >
            <p className="text-sm text-muted-foreground font-mono">
              {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
            </p>
            {totalPages > 1 && (
              <p className="text-sm text-muted-foreground font-mono">
                Page {currentPage} of {totalPages}
              </p>
            )}
          </motion.div>

          {/* Products Grid */}
          <AnimatePresence mode="wait">
            <motion.div 
              key={`${activeCategory}-${searchQuery}-${currentPage}`}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0 }}
            >
              {paginatedItems.map((product, index) => (
                <ProductCard key={product.slug} product={product} index={index} />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Empty state */}
          {filteredProducts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 backdrop-blur-md border border-white/10 mb-4">
                <Box size={24} className="text-muted-foreground" />
              </div>
              <p className="text-muted-foreground font-mono">
                No products found.
              </p>
            </motion.div>
          )}

          {/* Pagination with glassmorphism */}
          {totalPages > 1 && (
            <motion.nav
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-center gap-1 mt-12"
              aria-label="Pagination"
            >
              {/* Previous */}
              <button
                onClick={prevPage}
                disabled={!hasPrevPage}
                className={cn(
                  'flex items-center gap-1 px-3 py-2 rounded-lg font-mono text-sm transition-all duration-200 backdrop-blur-md',
                  hasPrevPage
                    ? 'bg-white/5 border border-white/10 hover:border-primary/30 hover:bg-white/10'
                    : 'opacity-40 cursor-not-allowed bg-white/[0.02]'
                )}
                aria-label="Previous page"
              >
                <ChevronLeft size={16} />
                <span className="hidden sm:inline">Prev</span>
              </button>

              {/* Page Numbers */}
              <div className="flex items-center gap-1 mx-2">
                {pageNumbers.map((page, idx) => 
                  page === 'ellipsis' ? (
                    <span 
                      key={`ellipsis-${idx}`} 
                      className="px-2 text-muted-foreground"
                    >
                      …
                    </span>
                  ) : (
                    <button
                      key={page}
                      onClick={() => goToPage(page)}
                      className={cn(
                        'w-10 h-10 rounded-lg font-mono text-sm transition-all duration-200',
                        currentPage === page
                          ? 'bg-foreground text-background'
                          : 'bg-white/5 backdrop-blur-md border border-white/10 hover:border-primary/30 hover:bg-white/10'
                      )}
                      aria-label={`Page ${page}`}
                      aria-current={currentPage === page ? 'page' : undefined}
                    >
                      {page}
                    </button>
                  )
                )}
              </div>

              {/* Next */}
              <button
                onClick={nextPage}
                disabled={!hasNextPage}
                className={cn(
                  'flex items-center gap-1 px-3 py-2 rounded-lg font-mono text-sm transition-all duration-200 backdrop-blur-md',
                  hasNextPage
                    ? 'bg-white/5 border border-white/10 hover:border-primary/30 hover:bg-white/10'
                    : 'opacity-40 cursor-not-allowed bg-white/[0.02]'
                )}
                aria-label="Next page"
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight size={16} />
              </button>
            </motion.nav>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Products;
