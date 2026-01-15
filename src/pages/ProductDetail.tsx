import { useParams, Navigate, Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/layout';
import { ProductHero } from '@/components/sections/product-hero';
import { ProductIntro } from '@/components/sections/product-intro';
import { ProductFeatures } from '@/components/sections/product-features';
import { ProductFaq } from '@/components/sections/product-faq';
import { ProductGallery } from '@/components/sections/product-gallery';
import { ProductSpecs } from '@/components/sections/product-specs';
import { getProductBySlug, getRelatedProducts } from '@/content/products';
import { getDispatchesByProduct } from '@/content/dispatch';
import { ProductCard } from '@/components/products/product-card';
import { PLACEHOLDERS } from '@/lib/constants';
import { fadeUp, staggerContainer, staggerItem } from '@/lib/motion';

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = slug ? getProductBySlug(slug) : undefined;

  if (!product) {
    return <Navigate to="/products" replace />;
  }

  // Get related dispatch posts
  const relatedDispatches = getDispatchesByProduct(product.slug);
  
  // Get related products
  const relatedProducts = getRelatedProducts(product.slug, 3);

  return (
    <Layout>
      <ProductHero product={product} />
      <ProductIntro description={product.description} />
      <ProductFeatures features={product.features} />
      
      {product.specs && product.specs.length > 0 && (
        <ProductSpecs specs={product.specs} />
      )}
      
      <ProductGallery gallery={product.gallery} productName={product.name} />
      
      <ProductFaq faq={product.faq} />

      {/* Related Dispatch Posts */}
      {relatedDispatches.length > 0 && (
        <section className="py-section-md border-t border-border/30">
          <div className="section-container">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mb-8"
            >
              <span className="font-mono text-primary text-xs tracking-[0.2em] uppercase mb-2 block">
                Updates
              </span>
              <h2 className="text-2xl md:text-3xl font-mono font-bold">
                Changelog & News
              </h2>
            </motion.div>

            <motion.div 
              className="space-y-3"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {relatedDispatches.slice(0, 3).map((post, index) => (
                <motion.div key={post.slug} variants={staggerItem}>
                  <Link
                    to={`/dispatch/${post.slug}`}
                    className="group flex items-center gap-4 p-4 rounded-lg border border-border/50 bg-card/30 hover:border-primary/30 hover:bg-card/50 transition-all duration-300"
                  >
                    <div className="w-16 h-12 rounded overflow-hidden bg-muted/20 flex-shrink-0">
                      <img 
                        src={post.image || PLACEHOLDERS.dispatch[index % PLACEHOLDERS.dispatch.length]}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <time className="text-[10px] font-mono text-muted-foreground">
                          {new Date(post.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </time>
                        {post.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="px-1.5 py-0.5 bg-primary/10 text-primary rounded text-[9px] uppercase"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="font-mono text-sm font-medium group-hover:text-primary transition-colors truncate">
                        {post.title}
                      </h3>
                    </div>
                    <ArrowRight size={16} className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {relatedDispatches.length > 3 && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="mt-6 text-center"
              >
                <Link
                  to="/dispatch"
                  className="inline-flex items-center gap-2 text-sm font-mono text-primary hover:underline"
                >
                  View all updates
                  <ArrowRight size={14} />
                </Link>
              </motion.div>
            )}
          </div>
        </section>
      )}

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-section-md border-t border-border/30">
          <div className="section-container">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mb-8"
            >
              <span className="font-mono text-primary text-xs tracking-[0.2em] uppercase mb-2 block">
                More from the Hangar
              </span>
              <h2 className="text-2xl md:text-3xl font-mono font-bold">
                Related Products
              </h2>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {relatedProducts.map((product, index) => (
                <ProductCard key={product.slug} product={product} index={index} />
              ))}
            </motion.div>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default ProductDetail;
