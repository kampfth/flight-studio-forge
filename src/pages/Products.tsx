import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { Layout } from '@/components/layout/layout';
import { ProductCard } from '@/components/products/product-card';
import { products } from '@/content/products';
import { cn } from '@/lib/utils';
import { PRODUCT_CATEGORIES } from '@/lib/constants';
import { staggerContainer, fadeUp } from '@/lib/motion';
import { usePagination } from '@/hooks/use-pagination';
import { useIsMobile } from '@/hooks/use-mobile';

type Category = 'all' | 'livery' | 'utility' | 'pack';

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
      // Always show first page
      pages.push(1);
      
      if (currentPage > 3) {
        pages.push('ellipsis');
      }
      
      // Pages around current
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) pages.push(i);
      }
      
      if (currentPage < totalPages - 2) {
        pages.push('ellipsis');
      }
      
      // Always show last page
      if (!pages.includes(totalPages)) pages.push(totalPages);
    }
    
    return pages;
  }, [currentPage, totalPages, isMobile]);

  return (
    <Layout>
      <section className="py-section-lg md:py-24">
        <div className="section-container">
          {/* Header */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mb-8"
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
            className="flex flex-col sm:flex-row gap-4 mb-8"
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
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
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
              className="text-center py-16"
            >
              <p className="text-muted-foreground font-mono">
                No products found.
              </p>
            </motion.div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <motion.nav
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-center gap-1 mt-10"
              aria-label="Pagination"
            >
              {/* Previous */}
              <button
                onClick={prevPage}
                disabled={!hasPrevPage}
                className={cn(
                  'flex items-center gap-1 px-3 py-2 rounded-md font-mono text-sm transition-all duration-200',
                  hasPrevPage
                    ? 'bg-card border border-border/50 hover:border-primary/30 hover:bg-card/80'
                    : 'opacity-40 cursor-not-allowed bg-card/30'
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
                        'w-10 h-10 rounded-md font-mono text-sm transition-all duration-200',
                        currentPage === page
                          ? 'bg-foreground text-background'
                          : 'bg-card border border-border/50 hover:border-primary/30 hover:bg-card/80'
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
                  'flex items-center gap-1 px-3 py-2 rounded-md font-mono text-sm transition-all duration-200',
                  hasNextPage
                    ? 'bg-card border border-border/50 hover:border-primary/30 hover:bg-card/80'
                    : 'opacity-40 cursor-not-allowed bg-card/30'
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
