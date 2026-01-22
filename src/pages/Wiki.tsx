/**
 * Page: Wiki
 * Responsibility: Knowledge base with search, articles, and support CTA
 */
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  BookOpen, 
  ArrowRight, 
  Clock, 
  Eye, 
  ChevronRight,
  ChevronLeft,
  Rocket,
  Download,
  Wrench,
  Palette,
  Settings,
  Headset,
  X
} from 'lucide-react';
import { Layout } from '@/components/layout/layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SUPPORT_URL } from '@/lib/constants';
import { 
  WIKI_ARTICLES, 
  WIKI_CATEGORIES, 
  searchArticles, 
  getMostReadArticles,
  type WikiArticle 
} from '@/lib/wiki-data';

const ITEMS_PER_PAGE = 10;

const categoryIcons: Record<string, React.ReactNode> = {
  'rocket': <Rocket size={16} />,
  'download': <Download size={16} />,
  'wrench': <Wrench size={16} />,
  'palette': <Palette size={16} />,
  'settings': <Settings size={16} />,
};

const Wiki = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<WikiArticle | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredArticles = useMemo(() => {
    let articles = WIKI_ARTICLES;
    
    if (searchQuery) {
      articles = searchArticles(searchQuery);
    }
    
    if (selectedCategory) {
      articles = articles.filter(a => a.category === selectedCategory);
    }
    
    return articles;
  }, [searchQuery, selectedCategory]);

  // Reset to page 1 when filters change
  useMemo(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  const totalPages = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE);
  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const mostReadArticles = useMemo(() => getMostReadArticles(4), []);

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory(null);
    setCurrentPage(1);
  };

  return (
    <Layout>
      <section className="relative py-20 md:py-24 min-h-screen overflow-hidden">
        {/* Modern geometric background */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Primary gradient orb */}
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full"
            style={{
              background: 'radial-gradient(circle, hsl(var(--primary) / 0.12) 0%, transparent 60%)',
              filter: 'blur(80px)',
              top: '-10%',
              right: '-10%',
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.6, 0.8, 0.6],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          
          {/* Secondary accent orb */}
          <motion.div
            className="absolute w-[500px] h-[500px] rounded-full"
            style={{
              background: 'radial-gradient(circle, hsl(var(--accent) / 0.08) 0%, transparent 60%)',
              filter: 'blur(100px)',
              bottom: '5%',
              left: '-5%',
            }}
            animate={{
              x: [0, 30, 0],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Geometric grid pattern */}
          <div 
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `
                linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
            }}
          />

          {/* Diagonal accent lines */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.04]" preserveAspectRatio="none">
            <defs>
              <pattern id="diagonals" patternUnits="userSpaceOnUse" width="100" height="100">
                <line x1="0" y1="100" x2="100" y2="0" stroke="hsl(var(--primary))" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#diagonals)" />
          </svg>

          {/* Floating particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-primary/30"
              style={{
                top: `${20 + i * 15}%`,
                left: `${10 + i * 12}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.5,
              }}
            />
          ))}
        </div>

        <div className="section-container relative">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 mb-6">
              <BookOpen size={14} className="text-primary" />
              <span className="font-mono text-muted-foreground text-xs tracking-[0.2em] uppercase">
                Knowledge Base
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-mono font-bold mb-4">
              Wiki
            </h1>
            <p className="text-muted-foreground max-w-md mx-auto">
              Find answers, guides, and documentation for all 4Simmers products.
            </p>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
            {/* Left Column - 70% */}
            <div className="space-y-6">
              {/* Search */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="relative"
              >
                <Search 
                  size={18} 
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" 
                />
                <Input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-14 bg-white/[0.03] border-white/10 focus:border-primary/50 text-base rounded-xl"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X size={16} />
                  </button>
                )}
              </motion.div>

              {/* Category Filters */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 }}
                className="flex flex-wrap gap-2"
              >
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`px-4 py-2 rounded-lg font-mono text-xs uppercase tracking-wider transition-all ${
                    !selectedCategory 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground'
                  }`}
                >
                  All
                </button>
                {WIKI_CATEGORIES.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs uppercase tracking-wider transition-all ${
                      selectedCategory === category.id 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground'
                    }`}
                  >
                    {categoryIcons[category.icon]}
                    {category.name}
                  </button>
                ))}
              </motion.div>

              {/* Articles List */}
              <div className="space-y-3">
                <AnimatePresence mode="popLayout">
                  {paginatedArticles.length > 0 ? (
                    paginatedArticles.map((article) => (
                      <motion.article
                        key={article.id}
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        whileHover={{ x: 4 }}
                        className="group p-5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-primary/20 hover:bg-white/[0.04] transition-all cursor-pointer"
                        onClick={() => setSelectedArticle(article)}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-[10px] font-mono uppercase tracking-wider">
                                {WIKI_CATEGORIES.find(c => c.id === article.category)?.name}
                              </span>
                            </div>
                            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-1 truncate">
                              {article.title}
                            </h3>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {article.excerpt}
                            </p>
                            <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground/70">
                              <span className="inline-flex items-center gap-1">
                                <Eye size={12} />
                                {article.views.toLocaleString()} views
                              </span>
                              <span className="inline-flex items-center gap-1">
                                <Clock size={12} />
                                Updated {article.updatedAt}
                              </span>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            Read
                            <ArrowRight size={14} className="ml-1" />
                          </Button>
                        </div>
                      </motion.article>
                    ))
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-16"
                    >
                      <p className="text-muted-foreground mb-4">No articles found.</p>
                      <Button variant="outline" size="sm" onClick={handleClearFilters}>
                        Clear filters
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center justify-center gap-2 pt-6"
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="gap-1"
                  >
                    <ChevronLeft size={16} />
                    Previous
                  </Button>
                  
                  <div className="flex items-center gap-1 mx-4">
                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`w-8 h-8 rounded-lg font-mono text-sm transition-all ${
                          currentPage === i + 1
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-white/5 text-muted-foreground hover:bg-white/10'
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="gap-1"
                  >
                    Next
                    <ChevronRight size={16} />
                  </Button>
                </motion.div>
              )}
            </div>

            {/* Right Column - 30% */}
            <div className="space-y-6">
              {/* Most Read */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="p-6 rounded-xl bg-white/[0.02] border border-white/5"
              >
                <h3 className="font-mono font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">
                  Most Read
                </h3>
                <div className="space-y-3">
                  {mostReadArticles.map((article, index) => (
                    <button
                      key={article.id}
                      onClick={() => setSelectedArticle(article)}
                      className="group flex items-start gap-3 w-full text-left"
                    >
                      <span className="shrink-0 w-6 h-6 rounded bg-primary/10 text-primary text-xs font-mono flex items-center justify-center">
                        {index + 1}
                      </span>
                      <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors line-clamp-2">
                        {article.title}
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Still Need Help */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="p-6 rounded-xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4">
                  <Headset size={24} className="text-primary" />
                </div>
                <h3 className="font-mono font-semibold mb-2">
                  Still need help?
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Can't find what you're looking for? Our support team is ready to assist.
                </p>
                <Button asChild className="w-full">
                  <a href={SUPPORT_URL} target="_blank" rel="noopener noreferrer">
                    Contact Support
                    <ChevronRight size={14} className="ml-1" />
                  </a>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Article Modal */}
        <AnimatePresence>
          {selectedArticle && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md"
              onClick={() => setSelectedArticle(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative w-full max-w-3xl max-h-[85vh] overflow-hidden rounded-2xl bg-background border border-white/10 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-white/10 bg-background/95 backdrop-blur-sm">
                  <div>
                    <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-[10px] font-mono uppercase tracking-wider">
                      {WIKI_CATEGORIES.find(c => c.id === selectedArticle.category)?.name}
                    </span>
                    <h2 className="font-mono font-bold text-xl mt-2">
                      {selectedArticle.title}
                    </h2>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSelectedArticle(null)}
                    className="shrink-0"
                  >
                    <X size={20} />
                  </Button>
                </div>

                {/* Modal Content */}
                <div className="p-6 overflow-y-auto max-h-[calc(85vh-100px)]">
                  <div className="flex items-center gap-4 mb-6 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <Eye size={14} />
                      {selectedArticle.views.toLocaleString()} views
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock size={14} />
                      Updated {selectedArticle.updatedAt}
                    </span>
                  </div>
                  
                  {/* Article content - rendered as markdown-like */}
                  <div className="prose prose-invert prose-sm max-w-none">
                    {selectedArticle.content.split('\n').map((line, i) => {
                      if (line.startsWith('# ')) {
                        return <h1 key={i} className="text-2xl font-mono font-bold mt-6 mb-4">{line.slice(2)}</h1>;
                      }
                      if (line.startsWith('## ')) {
                        return <h2 key={i} className="text-xl font-mono font-semibold mt-6 mb-3 text-foreground">{line.slice(3)}</h2>;
                      }
                      if (line.startsWith('### ')) {
                        return <h3 key={i} className="text-lg font-mono font-medium mt-4 mb-2 text-foreground">{line.slice(4)}</h3>;
                      }
                      if (line.startsWith('- ')) {
                        return <li key={i} className="text-muted-foreground ml-4">{line.slice(2)}</li>;
                      }
                      if (line.match(/^\d+\. /)) {
                        return <li key={i} className="text-muted-foreground ml-4 list-decimal">{line.replace(/^\d+\. /, '')}</li>;
                      }
                      if (line.startsWith('```')) {
                        return null;
                      }
                      if (line.trim() === '') {
                        return <div key={i} className="h-2" />;
                      }
                      if (line.includes('`') && !line.startsWith('```')) {
                        const parts = line.split(/(`[^`]+`)/);
                        return (
                          <p key={i} className="text-muted-foreground leading-relaxed">
                            {parts.map((part, j) => 
                              part.startsWith('`') ? (
                                <code key={j} className="px-1.5 py-0.5 rounded bg-white/10 text-primary text-xs font-mono">
                                  {part.slice(1, -1)}
                                </code>
                              ) : part
                            )}
                          </p>
                        );
                      }
                      return <p key={i} className="text-muted-foreground leading-relaxed">{line}</p>;
                    })}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </Layout>
  );
};

export default Wiki;
