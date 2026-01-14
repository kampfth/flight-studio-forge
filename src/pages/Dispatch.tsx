import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar } from 'lucide-react';
import { Layout } from '@/components/layout/layout';
import { dispatchPosts } from '@/content/dispatch';
import { PLACEHOLDERS } from '@/lib/constants';
import { staggerContainer, staggerItem, fadeUp } from '@/lib/motion';

const Dispatch = () => {
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
              Dispatch
            </span>
            <h1 className="text-4xl md:text-5xl font-mono font-bold mb-4">
              Flight Log
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              Updates, announcements, and insights from the hangar.
            </p>
          </motion.div>

          {/* Posts Grid */}
          <motion.div 
            className="space-y-4"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {dispatchPosts.map((post, index) => (
              <motion.article
                key={post.slug}
                variants={staggerItem}
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
                      <div className="flex gap-1.5">
                        {post.tags.slice(0, 2).map((tag) => (
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

                    <span className="inline-flex items-center gap-1.5 text-xs font-mono text-primary">
                      Read More
                      <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Dispatch;
