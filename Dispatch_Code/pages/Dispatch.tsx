/**
 * Page: Dispatch (Flight Log)
 * 
 * Responsibility: Blog/news listing with glassmorphism styling
 * 
 * Features:
 * - Tag-based filtering
 * - Load More pagination
 * - Animated cards with stagger
 * - Glassmorphism design
 * - Responsive layout
 * 
 * Dependencies:
 * - framer-motion
 * - react-router-dom
 * - lucide-react
 */

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Tag, FileText } from 'lucide-react';

// Ajuste estes imports para seu projeto:
import { Layout } from '@/components/layout/layout';
import { dispatchPosts, getAllDispatchTags } from '@/content/dispatch';
import { getProductBySlug } from '@/content/products'; // Opcional - remova se não usar produtos
import { PLACEHOLDERS } from '@/lib/constants';
import { staggerContainer, staggerItem } from '@/lib/motion';
import { useLoadMore } from '@/hooks/use-load-more';
import { cn } from '@/lib/utils';

// =============================================================================
// CONFIGURAÇÕES
// =============================================================================

/** Quantidade inicial de posts exibidos */
const INITIAL_POSTS = 5;

/** Quantidade de posts carregados por clique em "Load More" */
const LOAD_INCREMENT = 5;

// =============================================================================
// COMPONENTE PRINCIPAL
// =============================================================================

const Dispatch = () => {
  // Estado do filtro ativo
  const [activeTag, setActiveTag] = useState<string | null>(null);
  
  // Memoize todas as tags disponíveis
  const allTags = useMemo(() => getAllDispatchTags(), []);

  // Filtra posts pela tag ativa
  const filteredPosts = useMemo(() => {
    if (!activeTag) return dispatchPosts;
    return dispatchPosts.filter(p => p.tags.includes(activeTag));
  }, [activeTag]);

  // Hook de paginação Load More
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

  // Reset da paginação quando o filtro muda
  useEffect(() => {
    reset();
  }, [activeTag, reset]);

  return (
    <Layout>
      <section 
        className="relative py-24 md:py-32 min-h-screen overflow-hidden"
        data-qa="dispatch-page"
      >
        {/* ================================================================
            BACKGROUND ANIMADO
            Dois orbs com gradiente radial e movimento suave
        ================================================================ */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Orb superior esquerdo */}
          <motion.div
            className="absolute w-[500px] h-[500px] rounded-full"
            style={{
              background: 'radial-gradient(circle, hsl(var(--primary) / 0.08) 0%, transparent 70%)',
              filter: 'blur(80px)',
              top: '5%',
              left: '-10%',
            }}
            animate={{
              x: [0, 40, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          
          {/* Orb inferior direito */}
          <motion.div
            className="absolute w-[400px] h-[400px] rounded-full"
            style={{
              background: 'radial-gradient(circle, hsl(var(--accent) / 0.06) 0%, transparent 70%)',
              filter: 'blur(100px)',
              bottom: '10%',
              right: '-5%',
            }}
            animate={{
              x: [0, -30, 0],
              y: [0, -40, 0],
            }}
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 3,
            }}
          />
        </div>

        {/* Grid overlay decorativo */}
        <div className="absolute inset-0 grid-overlay opacity-10" />

        <div className="section-container relative">
          {/* ================================================================
              HEADER
              Badge + Título + Descrição
          ================================================================ */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
            data-qa="dispatch-header"
          >
            {/* Badge com glassmorphism */}
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 mb-4"
              whileHover={{ scale: 1.02 }}
            >
              <FileText size={14} className="text-primary" />
              <span className="font-mono text-muted-foreground text-xs tracking-[0.2em] uppercase">
                Dispatch
              </span>
            </motion.div>
            
            {/* Título com gradiente */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-mono font-bold mb-4">
              Flight{' '}
              <span className="text-gradient bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                Log
              </span>
            </h1>
            
            <p className="text-muted-foreground max-w-2xl text-lg">
              Updates, announcements, and insights from the hangar.
            </p>
          </motion.div>

          {/* ================================================================
              FILTROS DE TAG
              Chips clicáveis com estado ativo
          ================================================================ */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap gap-2 mb-10"
            data-qa="dispatch-filters"
          >
            {/* Botão "All" */}
            <button
              onClick={() => setActiveTag(null)}
              className={cn(
                'px-4 py-2 rounded-lg font-mono text-xs transition-all duration-200 backdrop-blur-md',
                activeTag === null
                  ? 'bg-foreground text-background'
                  : 'bg-white/5 border border-white/10 text-muted-foreground hover:text-foreground hover:border-white/20 hover:bg-white/10'
              )}
            >
              All
            </button>
            
            {/* Tags dinâmicas */}
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={cn(
                  'px-4 py-2 rounded-lg font-mono text-xs transition-all duration-200 capitalize backdrop-blur-md',
                  activeTag === tag
                    ? 'bg-foreground text-background'
                    : 'bg-white/5 border border-white/10 text-muted-foreground hover:text-foreground hover:border-white/20 hover:bg-white/10'
                )}
              >
                {tag}
              </button>
            ))}
          </motion.div>

          {/* ================================================================
              LISTA DE POSTS
              Cards com animação stagger
          ================================================================ */}
          <motion.div 
            className="space-y-4"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            data-qa="dispatch-posts-list"
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
                  data-qa={`dispatch-post-${post.slug}`}
                >
                  <Link
                    to={`/dispatch/${post.slug}`}
                    className="group flex flex-col md:flex-row gap-4 p-5 md:p-6 rounded-xl bg-white/[0.02] backdrop-blur-md border border-white/10 hover:border-primary/30 hover:bg-white/[0.05] transition-all duration-300"
                  >
                    {/* ====== THUMBNAIL ====== */}
                    <div className="w-full md:w-44 h-28 md:h-auto flex-shrink-0 rounded-lg overflow-hidden bg-white/5">
                      <img 
                        src={post.image || PLACEHOLDERS.dispatch[index % PLACEHOLDERS.dispatch.length]}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>

                    {/* ====== CONTENT ====== */}
                    <div className="flex-1 flex flex-col justify-center">
                      {/* Meta: Data + Tags */}
                      <div className="flex items-center gap-3 text-xs text-muted-foreground font-mono mb-2">
                        <Calendar size={12} />
                        <time>
                          {new Date(post.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </time>
                        <span className="text-white/20">•</span>
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

                      {/* Título */}
                      <h2 className="text-lg md:text-xl font-mono font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-1">
                        {post.title}
                      </h2>

                      {/* Excerpt */}
                      <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
                        {post.excerpt}
                      </p>

                      {/* Related Products (opcional - remova se não usar) */}
                      {post.relatedProducts && post.relatedProducts.length > 0 && (
                        <div className="flex items-center gap-2 mb-2">
                          <Tag size={10} className="text-muted-foreground" />
                          <div className="flex gap-1.5 flex-wrap">
                            {post.relatedProducts.map((slug) => {
                              const product = getProductBySlug(slug);
                              return product ? (
                                <span
                                  key={slug}
                                  className="px-2 py-0.5 bg-white/5 border border-white/10 text-muted-foreground rounded text-[10px]"
                                >
                                  {product.name}
                                </span>
                              ) : null;
                            })}
                          </div>
                        </div>
                      )}

                      {/* Read More link */}
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

          {/* ================================================================
              LOAD MORE BUTTON
              Exibido apenas se houver mais posts
          ================================================================ */}
          {hasMore && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex justify-center mt-12"
            >
              <button
                onClick={loadMore}
                className="group inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-white/[0.03] backdrop-blur-md border border-white/10 hover:border-primary/30 hover:bg-white/[0.06] transition-all duration-300 font-mono text-sm"
                data-qa="dispatch-load-more"
              >
                <span>Load More</span>
                <span className="text-muted-foreground">
                  ({loadedCount} of {totalCount})
                </span>
              </button>
            </motion.div>
          )}

          {/* ================================================================
              EMPTY STATE
              Exibido quando não há posts para o filtro selecionado
          ================================================================ */}
          {visibleItems.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24"
              data-qa="dispatch-empty-state"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 backdrop-blur-md border border-white/10 mb-4">
                <FileText size={24} className="text-muted-foreground" />
              </div>
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
