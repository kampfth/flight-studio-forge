import { useParams, Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar } from 'lucide-react';
import { Layout } from '@/components/layout/layout';
import { getDispatchBySlug } from '@/content/dispatch';

const DispatchPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getDispatchBySlug(slug) : undefined;

  if (!post) {
    return <Navigate to="/dispatch" replace />;
  }

  // Simple markdown-like rendering
  const renderContent = (content: string) => {
    return content.split('\n').map((line, i) => {
      if (line.startsWith('**') && line.endsWith('**')) {
        return (
          <h3 key={i} className="font-mono font-semibold text-lg mt-8 mb-4">
            {line.slice(2, -2)}
          </h3>
        );
      }
      if (line.startsWith('- ')) {
        return (
          <li key={i} className="text-muted-foreground ml-4 mb-2">
            {line.slice(2)}
          </li>
        );
      }
      if (line.trim() === '') {
        return <br key={i} />;
      }
      return (
        <p key={i} className="text-muted-foreground leading-relaxed mb-4">
          {line}
        </p>
      );
    });
  };

  return (
    <Layout>
      <article className="py-24 md:py-32">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            {/* Back link */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <Link
                to="/dispatch"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-mono text-sm"
              >
                <ArrowLeft size={16} />
                Back to Dispatch
              </Link>
            </motion.div>

            {/* Header */}
            <motion.header
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-12"
            >
              <div className="flex items-center gap-3 text-sm text-muted-foreground font-mono mb-6">
                <Calendar size={14} />
                <time>
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-mono font-bold mb-6">
                {post.title}
              </h1>

              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs font-mono bg-primary/10 text-primary rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.header>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="prose prose-invert prose-lg max-w-none"
            >
              {renderContent(post.content)}
            </motion.div>
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default DispatchPost;
