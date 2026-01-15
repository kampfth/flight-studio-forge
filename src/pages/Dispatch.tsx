import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Tag, Loader2 } from 'lucide-react';
import { Layout } from '@/components/layout/layout';
import { dispatchPosts, getAllDispatchTags } from '@/content/dispatch';
import { getProductBySlug } from '@/content/products';
import { PLACEHOLDERS } from '@/lib/constants';
import { staggerContainer, staggerItem, fadeUp } from '@/lib/motion';
import { useLoadMore } from '@/hooks/use-load-more';
import { cn } from '@/lib/utils';

const INITIAL_POSTS = 5;
const LOAD_INCREMENT = 5;

const Dispatch = () => {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const allTags = useMemo(() => getAllDispatchTags(), []);

  // Filter posts by tag
  const filteredPosts = useMemo(() => {
    if (!activeTag) return dispatchPosts;
    return dispatchPosts.filter(p => p.tags.includes(activeTag));
  }, [activeTag]);

  const { 
    visibleItems, 
    hasMore, 
    loadMore, 
    reset,
    loadedCount, 
    totalCount 
  } = useLoadMore({
    items: filteredPosts,
    initialCount: INITIAL_POSTS,
    increment: LOAD_INCREMENT,
  });

  // Reset loaded count when filter changes
  useEffect(() => {
    reset();
  }, [activeTag, reset]);

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
              Dispatch
            </span>
            <h1 className="text-4xl md:text-5xl font-mono font-bold mb-4">
              Flight Log
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              Updates, announcements, and insights from the hangar.
            </p>
          </motion.div>

          {/* Tag Filters */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap gap-2 mb-8"
          >
            <button
              onClick={() => setActiveTag(null)}
              className={cn(
                'px-3 py-1.5 rounded-md font-mono text-xs transition-all duration-200',
                activeTag === null
                  ? 'bg-foreground text-background'
                  : 'bg-card border border-border/50 text-muted-foreground hover:text-foreground hover:border-border'
              )}
            >
              All
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={cn(
                  'px-3 py-1.5 rounded-md font-mono text-xs transition-all duration-200 capitalize',
                  activeTag === tag
                    ? 'bg-foreground text-background'
                    : 'bg-card border border-border/50 text-muted-foreground hover:text-foreground hover:border-border'
                )}
              >
                {tag}
              </button>
            ))}
          </motion.div>

          {/* Posts List */}
          <motion.div 
            className="space-y-4"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <AnimatePresence mode="popLayout">
              {visibleItems.map((post, index) => (
                <motion.article
                  key={post.slug}
                  variants={staggerItem}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={`/dispatch/${post.slug}`}
                    className="group flex flex-col md:flex-row gap-4 p-4 md:p-5 rounded-lg border border-border/50 bg-card/30 hover:border-primary/30 hover:bg-card/50 transition-all duration-300"
                  >
                    {/* Thumbnail */}
                    <div className="w-full md:w-40 h-24 md:h-auto flex-shrink-0 rounded-md overflow-hidden bg-muted/20">
                      <img 
                        src={post.image || PLACEHOLDERS.dispatch[index % PLACEHOLDERS.dispatch.length]}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 flex flex-col justify-center">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground font-mono mb-2">
                        <Calendar size={12} />
                        <time>
                          {new Date(post.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </time>
                        <span className="text-border">•</span>
                        <div className="flex gap-1.5 flex-wrap">
                          {post.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 bg-primary/10 text-primary rounded text-[10px] uppercase"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <h2 className="text-lg font-mono font-semibold mb-1.5 group-hover:text-primary transition-colors line-clamp-1">
                        {post.title}
                      </h2>

                      <p className="text-muted-foreground text-sm line-clamp-2 mb-2">
                        {post.excerpt}
                      </p>

                      {/* Related Products */}
                      {post.relatedProducts && post.relatedProducts.length > 0 && (
                        <div className="flex items-center gap-2 mb-2">
                          <Tag size={10} className="text-muted-foreground" />
                          <div className="flex gap-1.5 flex-wrap">
                            {post.relatedProducts.map((slug) => {
                              const product = getProductBySlug(slug);
                              return product ? (
                                <span
                                  key={slug}
                                  className="px-2 py-0.5 bg-accent/50 text-accent-foreground rounded text-[10px]"
                                >
                                  {product.name}
                                </span>
                              ) : null;
                            })}
                          </div>
                        </div>
                      )}

                      <span className="inline-flex items-center gap-1.5 text-xs font-mono text-primary">
                        Read More
                        <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Load More Button */}
          {hasMore && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex justify-center mt-10"
            >
              <button
                onClick={loadMore}
                className="group inline-flex items-center gap-3 px-6 py-3 rounded-md border border-border/50 bg-card/30 hover:border-primary/30 hover:bg-card/50 transition-all duration-300 font-mono text-sm"
              >
                <span>Load More</span>
                <span className="text-muted-foreground">
                  ({loadedCount} of {totalCount})
                </span>
              </button>
            </motion.div>
          )}

          {/* Empty state */}
          {visibleItems.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <p className="text-muted-foreground font-mono">
                No posts found for this filter.
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Dispatch;
