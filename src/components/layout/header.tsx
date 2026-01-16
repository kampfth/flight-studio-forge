/**
 * Component: Header
 * Responsibility: Top-level navigation, brand logo, and mobile menu
 * Used by: Layout
 */
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Menu, X, Facebook } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FACEBOOK_URL, NAV_ITEMS } from '@/lib/constants';
import { Logo } from '@/components/common';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActiveRoute = (href: string) => {
    return location.pathname === href || location.pathname.startsWith(href + '/');
  };

  return (
    <motion.header
      data-qa="site-header"
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="fixed top-0 left-0 right-0 z-50 glass"
    >
      <nav className="section-container" aria-label="Main navigation">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Logo */}
          <Logo textClassName="hidden sm:block text-sm" />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-7">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                data-qa={`site-nav-link-${item.label.toLowerCase()}`}
                className={cn(
                  'font-mono text-xs tracking-wide uppercase transition-colors duration-200',
                  isActiveRoute(item.href)
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {item.label}
              </a>
            ))}
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-qa="site-nav-link-facebook"
              aria-label="Visit our Facebook page"
              className="flex items-center gap-1.5 font-mono text-xs tracking-wide uppercase text-primary hover:text-primary/80 transition-colors"
            >
              <Facebook size={14} />
              Facebook
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 -mr-2 text-foreground hover:text-primary transition-colors"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            data-qa="site-mobile-menu-toggle"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-t border-border/40"
            data-qa="site-mobile-menu"
          >
            <nav className="section-container py-4 flex flex-col gap-1" aria-label="Mobile navigation">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  data-qa={`site-mobile-nav-link-${item.label.toLowerCase()}`}
                  className={cn(
                    'font-mono text-sm py-2.5 transition-colors',
                    isActiveRoute(item.href)
                      ? 'text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  {item.label}
                </a>
              ))}
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-qa="site-mobile-nav-link-facebook"
                aria-label="Visit our Facebook page"
                className="flex items-center gap-2 font-mono text-sm py-2.5 text-primary"
              >
                <Facebook size={16} />
                Facebook
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
