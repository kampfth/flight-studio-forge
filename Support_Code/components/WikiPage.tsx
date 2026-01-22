/**
 * Wiki Page Component
 * 
 * Features:
 * - Search functionality
 * - Category filtering
 * - Paginated article list
 * - Article modal reader
 * - Most read sidebar
 * - Support CTA
 * - Animated geometric background
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

// Import your data and types
// import { WIKI_ARTICLES, WIKI_CATEGORIES, searchArticles, getMostReadArticles } from '../data/wiki-mock-data';
// import type { WikiArticle } from '../data/wiki-types';
// import { SUPPORT_URL } from '../constants';

// For demo, using inline mock data
const SUPPORT_URL = 'https://example.com/support';
const ITEMS_PER_PAGE = 10;

// Mock data inline for demo
const WIKI_CATEGORIES = [
  { id: 'getting-started', name: 'Getting Started', icon: 'rocket', count: 4 },
  { id: 'installation', name: 'Installation', icon: 'download', count: 6 },
  { id: 'troubleshooting', name: 'Troubleshooting', icon: 'wrench', count: 8 },
  { id: 'liveries', name: 'Liveries', icon: 'palette', count: 5 },
  { id: 'utilities', name: 'Utilities', icon: 'settings', count: 3 },
];

// Type definition
interface WikiArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  views: number;
  createdAt: string;
  updatedAt: string;
}

// Icon mapping
const categoryIcons: Record<string, React.ReactNode> = {
  'rocket': <Rocket size={16} />,
  'download': <Download size={16} />,
  'wrench': <Wrench size={16} />,
  'palette': <Palette size={16} />,
  'settings': <Settings size={16} />,
};

/**
 * Wiki Page
 * 
 * Layout:
 * - 70/30 split on desktop
 * - Left: Search, filters, article list with pagination
 * - Right: Most read, support CTA
 * - Modal for article reading
 */
const WikiPage = () => {
  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<WikiArticle | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Replace with your data fetching logic
  const WIKI_ARTICLES: WikiArticle[] = []; // Your articles here
  
  // Filter articles based on search and category
  const filteredArticles = useMemo(() => {
    let articles = WIKI_ARTICLES;
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      articles = articles.filter(a => 
        a.title.toLowerCase().includes(query) ||
        a.excerpt.toLowerCase().includes(query)
      );
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

  // Pagination
  const totalPages = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE);
  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Most read articles
  const mostReadArticles = useMemo(() => {
    return [...WIKI_ARTICLES]
      .sort((a, b) => b.views - a.views)
      .slice(0, 4);
  }, []);

  // Clear filters
  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory(null);
    setCurrentPage(1);
  };

  return (
    <section className="relative py-20 md:py-24 min-h-screen overflow-hidden">
      {/* ================================================================
          BACKGROUND LAYER
          ================================================================ */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Primary orb */}
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, hsl(220 80% 72% / 0.12) 0%, transparent 60%)',
            filter: 'blur(80px)',
            top: '-10%',
            right: '-10%',
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.6, 0.8, 0.6],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        
        {/* Secondary orb */}
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, hsl(40 90% 65% / 0.08) 0%, transparent 60%)',
            filter: 'blur(100px)',
            bottom: '5%',
            left: '-5%',
          }}
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(hsl(220 10% 95%) 1px, transparent 1px),
              linear-gradient(90deg, hsl(220 10% 95%) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-[hsl(220_80%_72%_/_0.3)]"
            style={{ top: `${20 + i * 15}%`, left: `${10 + i * 12}%` }}
            animate={{ y: [0, -30, 0], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
          />
        ))}
      </div>

      {/* ================================================================
          CONTENT
          ================================================================ */}
      <div className="max-w-7xl mx-auto px-4 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 mb-6">
            <BookOpen size={14} className="text-[hsl(220_80%_72%)]" />
            <span className="font-mono text-[hsl(220_10%_55%)] text-xs tracking-[0.2em] uppercase">
              Knowledge Base
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-mono font-bold mb-4 text-[hsl(220_10%_95%)]">
            Wiki
          </h1>
          <p className="text-[hsl(220_10%_55%)] max-w-md mx-auto">
            Find answers, guides, and documentation for all 4Simmers products.
          </p>
        </motion.div>

        {/* Main Grid: 70/30 split */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
          {/* LEFT COLUMN (70%) */}
          <div className="space-y-6">
            {/* Search Input */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="relative"
            >
              <Search 
                size={18} 
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[hsl(220_10%_55%)]" 
              />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-14 pl-12 pr-4 bg-white/[0.03] border border-white/10 focus:border-[hsl(220_80%_72%_/_0.5)] text-base rounded-xl text-[hsl(220_10%_95%)] placeholder:text-[hsl(220_10%_55%)] outline-none transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[hsl(220_10%_55%)] hover:text-[hsl(220_10%_95%)] transition-colors"
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
                    ? 'bg-[hsl(220_80%_72%)] text-[hsl(220_15%_10%)]' 
                    : 'bg-white/5 text-[hsl(220_10%_55%)] hover:bg-white/10 hover:text-[hsl(220_10%_95%)]'
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
                      ? 'bg-[hsl(220_80%_72%)] text-[hsl(220_15%_10%)]' 
                      : 'bg-white/5 text-[hsl(220_10%_55%)] hover:bg-white/10 hover:text-[hsl(220_10%_95%)]'
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
                      className="group p-5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-[hsl(220_80%_72%_/_0.2)] hover:bg-white/[0.04] transition-all cursor-pointer"
                      onClick={() => setSelectedArticle(article)}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          {/* Category badge */}
                          <div className="flex items-center gap-2 mb-2">
                            <span className="px-2 py-0.5 rounded bg-[hsl(220_80%_72%_/_0.1)] text-[hsl(220_80%_72%)] text-[10px] font-mono uppercase tracking-wider">
                              {WIKI_CATEGORIES.find(c => c.id === article.category)?.name}
                            </span>
                          </div>
                          
                          {/* Title */}
                          <h3 className="font-semibold text-[hsl(220_10%_95%)] group-hover:text-[hsl(220_80%_72%)] transition-colors mb-1 truncate">
                            {article.title}
                          </h3>
                          
                          {/* Excerpt */}
                          <p className="text-sm text-[hsl(220_10%_55%)] line-clamp-2">
                            {article.excerpt}
                          </p>
                          
                          {/* Meta */}
                          <div className="flex items-center gap-4 mt-3 text-xs text-[hsl(220_10%_55%_/_0.7)]">
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
                        
                        {/* Read button */}
                        <button className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity inline-flex items-center gap-1 px-3 py-1.5 text-sm text-[hsl(220_10%_55%)] hover:text-[hsl(220_10%_95%)]">
                          Read
                          <ArrowRight size={14} />
                        </button>
                      </div>
                    </motion.article>
                  ))
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-16"
                  >
                    <p className="text-[hsl(220_10%_55%)] mb-4">No articles found.</p>
                    <button 
                      onClick={handleClearFilters}
                      className="px-4 py-2 text-sm border border-white/10 rounded-lg hover:bg-white/5 transition-colors"
                    >
                      Clear filters
                    </button>
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
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="inline-flex items-center gap-1 px-3 py-2 text-sm text-[hsl(220_10%_55%)] hover:text-[hsl(220_10%_95%)] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={16} />
                  Previous
                </button>
                
                <div className="flex items-center gap-1 mx-4">
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-8 h-8 rounded-lg font-mono text-sm transition-all ${
                        currentPage === i + 1
                          ? 'bg-[hsl(220_80%_72%)] text-[hsl(220_15%_10%)]'
                          : 'bg-white/5 text-[hsl(220_10%_55%)] hover:bg-white/10'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="inline-flex items-center gap-1 px-3 py-2 text-sm text-[hsl(220_10%_55%)] hover:text-[hsl(220_10%_95%)] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                  <ChevronRight size={16} />
                </button>
              </motion.div>
            )}
          </div>

          {/* RIGHT COLUMN (30%) */}
          <div className="space-y-6">
            {/* Most Read */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="p-6 rounded-xl bg-white/[0.02] border border-white/5"
            >
              <h3 className="font-mono font-semibold text-sm uppercase tracking-wider text-[hsl(220_10%_55%)] mb-4">
                Most Read
              </h3>
              <div className="space-y-3">
                {mostReadArticles.map((article, index) => (
                  <button
                    key={article.id}
                    onClick={() => setSelectedArticle(article)}
                    className="group flex items-start gap-3 w-full text-left"
                  >
                    <span className="shrink-0 w-6 h-6 rounded bg-[hsl(220_80%_72%_/_0.1)] text-[hsl(220_80%_72%)] text-xs font-mono flex items-center justify-center">
                      {index + 1}
                    </span>
                    <span className="text-sm text-[hsl(220_10%_55%)] group-hover:text-[hsl(220_10%_95%)] transition-colors line-clamp-2">
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
              className="p-6 rounded-xl bg-gradient-to-br from-[hsl(220_80%_72%_/_0.1)] via-[hsl(220_80%_72%_/_0.05)] to-transparent border border-[hsl(220_80%_72%_/_0.2)]"
            >
              <div className="w-12 h-12 rounded-xl bg-[hsl(220_80%_72%_/_0.2)] flex items-center justify-center mb-4">
                <Headset size={24} className="text-[hsl(220_80%_72%)]" />
              </div>
              <h3 className="font-mono font-semibold mb-2 text-[hsl(220_10%_95%)]">
                Still need help?
              </h3>
              <p className="text-sm text-[hsl(220_10%_55%)] mb-4">
                Can't find what you're looking for? Our support team is ready to assist.
              </p>
              <a 
                href={SUPPORT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-[hsl(220_80%_72%)] text-[hsl(220_15%_10%)] font-mono text-sm uppercase tracking-wider rounded-lg hover:bg-[hsl(220_80%_72%_/_0.9)] transition-all"
              >
                Contact Support
                <ChevronRight size={14} />
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ================================================================
          ARTICLE MODAL
          ================================================================ */}
      <AnimatePresence>
        {selectedArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[hsl(220_20%_4%_/_0.8)] backdrop-blur-md"
            onClick={() => setSelectedArticle(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-3xl max-h-[85vh] overflow-hidden rounded-2xl bg-[hsl(220_20%_4%)] border border-white/10 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-white/10 bg-[hsl(220_20%_4%_/_0.95)] backdrop-blur-sm">
                <div>
                  <span className="px-2 py-0.5 rounded bg-[hsl(220_80%_72%_/_0.1)] text-[hsl(220_80%_72%)] text-[10px] font-mono uppercase tracking-wider">
                    {WIKI_CATEGORIES.find(c => c.id === selectedArticle.category)?.name}
                  </span>
                  <h2 className="font-mono font-bold text-xl mt-2 text-[hsl(220_10%_95%)]">
                    {selectedArticle.title}
                  </h2>
                </div>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="shrink-0 w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/5 transition-colors"
                >
                  <X size={20} className="text-[hsl(220_10%_55%)]" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(85vh-100px)]">
                <div className="flex items-center gap-4 mb-6 text-sm text-[hsl(220_10%_55%)]">
                  <span className="inline-flex items-center gap-1">
                    <Eye size={14} />
                    {selectedArticle.views.toLocaleString()} views
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock size={14} />
                    Updated {selectedArticle.updatedAt}
                  </span>
                </div>
                
                {/* Article content - render markdown */}
                <div className="prose prose-invert prose-sm max-w-none">
                  {/* Your markdown renderer here */}
                  <p className="text-[hsl(220_10%_55%)]">{selectedArticle.content}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default WikiPage;
