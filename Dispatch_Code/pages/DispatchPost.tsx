/**
 * Page: DispatchPost
 * 
 * Responsibility: Individual dispatch post with glassmorphism styling
 * 
 * Features:
 * - Dynamic routing via slug
 * - Simple markdown rendering
 * - Related products section (optional)
 * - Animated content
 * - Glassmorphism design
 * 
 * Dependencies:
 * - framer-motion
 * - react-router-dom
 * - lucide-react
 */

import { useParams, Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Tag, ArrowRight } from 'lucide-react';

// Ajuste estes imports para seu projeto:
import { Layout } from '@/components/layout/layout';
import { getDispatchBySlug } from '@/content/dispatch';
import { getProductBySlug } from '@/content/products'; // Opcional - remova se não usar produtos
import { PLACEHOLDERS } from '@/lib/constants';
import { fadeUp, staggerContainer, staggerItem } from '@/lib/motion';

// =============================================================================
// COMPONENTE PRINCIPAL
// =============================================================================

const DispatchPost = () => {
  // Obtém o slug da URL
  const { slug } = useParams<{ slug: string }>();
  
  // Busca o post pelo slug
  const post = slug ? getDispatchBySlug(slug) : undefined;

  // Redireciona se o post não existir
  if (!post) {
    return <Navigate to="/dispatch" replace />;
  }

  // Obtém dados dos produtos relacionados (opcional)
  const relatedProductsData = post.relatedProducts
    ?.map(slug => getProductBySlug(slug))
    .filter(Boolean) || [];

  // ==========================================================================
  // RENDERIZAÇÃO DE CONTEÚDO MARKDOWN SIMPLES
  // Suporta: **bold** para headers, - para listas, parágrafos
  // ==========================================================================
  const renderContent = (content: string) => {
    return content.split('\n').map((line, i) => {
      // Headers (**text**)
      if (line.startsWith('**') && line.endsWith('**')) {
        return (
          <h3 key={i} className="font-mono font-semibold text-lg mt-8 mb-4">
            {line.slice(2, -2)}
          </h3>
        );
      }
      
      // Lista (- item)
      if (line.startsWith('- ')) {
        return (
          <li key={i} className="text-muted-foreground ml-4 mb-2">
            {line.slice(2)}
          </li>
        );
      }
      
      // Linha vazia
      if (line.trim() === '') {
        return <br key={i} />;
      }
      
      // Parágrafo normal
      return (
        <p key={i} className="text-muted-foreground leading-relaxed mb-4">
          {line}
        </p>
      );
    });
  };

  return (
    <Layout>
      <article 
        className="relative py-24 md:py-32 min-h-screen overflow-hidden"
        data-qa="dispatch-post-page"
      >
        {/* ================================================================
            BACKGROUND ANIMADO
            Orb decorativo com movimento suave
        ================================================================ */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full"
            style={{
              background: 'radial-gradient(circle, hsl(var(--primary) / 0.06) 0%, transparent 70%)',
              filter: 'blur(100px)',
              top: '0%',
              right: '-15%',
            }}
            animate={{
              x: [0, 30, 0],
              y: [0, 20, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>

        {/* Grid overlay decorativo */}
        <div className="absolute inset-0 grid-overlay opacity-10" />

        <div className="section-container relative">
          <div className="max-w-3xl mx-auto">
            {/* ================================================================
                BACK LINK
                Link de volta para a listagem
            ================================================================ */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-10"
            >
              <Link
                to="/dispatch"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 backdrop-blur-md border border-white/10 text-muted-foreground hover:text-foreground hover:border-white/20 transition-all font-mono text-sm"
                data-qa="dispatch-back-link"
              >
                <ArrowLeft size={16} />
                Back to Dispatch
              </Link>
            </motion.div>

            {/* ================================================================
                HEADER DO POST
                Data + Título + Tags
            ================================================================ */}
            <motion.header
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mb-10"
              data-qa="dispatch-post-header"
            >
              {/* Data */}
              <div className="flex items-center gap-3 text-sm text-muted-foreground font-mono mb-4">
                <Calendar size={14} />
                <time>
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </div>

              {/* Título */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-mono font-bold mb-6">
                {post.title}
              </h1>

              {/* Tags clicáveis */}
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    to={`/dispatch?tag=${tag}`}
                    className="px-3 py-1.5 text-xs font-mono bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </motion.header>

            {/* ================================================================
                IMAGEM DESTACADA
                Com borda glassmorphism
            ================================================================ */}
            {post.image && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-10 rounded-xl overflow-hidden border border-white/10"
                data-qa="dispatch-post-image"
              >
                <img 
                  src={post.image || PLACEHOLDERS.dispatch[0]}
                  alt={post.title}
                  className="w-full aspect-video object-cover"
                />
              </motion.div>
            )}

            {/* ================================================================
                CONTEÚDO DO POST
                Renderizado com markdown simples
            ================================================================ */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="prose prose-invert prose-lg max-w-none"
              data-qa="dispatch-post-content"
            >
              {renderContent(post.content)}
            </motion.div>

            {/* ================================================================
                PRODUTOS RELACIONADOS (OPCIONAL)
                Cards de produtos vinculados ao post
            ================================================================ */}
            {relatedProductsData.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-16 pt-10 border-t border-white/10"
                data-qa="dispatch-related-products"
              >
                {/* Header da seção */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10">
                    <Tag size={12} className="text-primary" />
                    <span className="font-mono text-xs uppercase tracking-wider">Related Products</span>
                  </div>
                </div>
                
                {/* Grid de produtos */}
                <motion.div 
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                >
                  {relatedProductsData.map((product) => product && (
                    <motion.div key={product.slug} variants={staggerItem}>
                      <Link
                        to={`/products/${product.slug}`}
                        className="group flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] backdrop-blur-md border border-white/10 hover:border-primary/30 hover:bg-white/[0.05] transition-all duration-300"
                      >
                        {/* Thumbnail do produto */}
                        <div className="w-16 h-16 rounded-lg overflow-hidden bg-white/5 flex-shrink-0">
                          <img 
                            src={PLACEHOLDERS.products[0]}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        {/* Info do produto */}
                        <div className="flex-1 min-w-0">
                          <span className="text-[10px] font-mono uppercase text-primary">
                            {product.category}
                          </span>
                          <h3 className="font-mono font-medium text-sm group-hover:text-primary transition-colors truncate">
                            {product.name}
                          </h3>
                          <p className="text-xs text-muted-foreground truncate">
                            {product.tagline}
                          </p>
                        </div>
                        
                        {/* Arrow icon */}
                        <ArrowRight size={16} className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.section>
            )}
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default DispatchPost;
