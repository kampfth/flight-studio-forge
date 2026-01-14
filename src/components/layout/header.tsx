import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { NavItem } from '@/lib/types';
import { cn } from '@/lib/utils';

const navigation: NavItem[] = [
  { label: 'Hangar', href: '/products' },
  { label: 'Dispatch', href: '/dispatch' },
  { label: 'Brand', href: '/brand' },
  { label: 'Contact', href: '/contact' },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <motion.header
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="fixed top-0 left-0 right-0 z-50 glass"
    >
      <nav className="section-container">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-7 h-7 bg-foreground rounded-sm flex items-center justify-center transition-all duration-300 group-hover:scale-105">
              <span className="font-mono font-bold text-background text-xs">4S</span>
            </div>
            <span className="font-mono font-medium text-sm tracking-tight hidden sm:block">
              4Simmers
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-7">
            {navigation.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  'font-mono text-xs tracking-wide uppercase transition-colors duration-200',
                  location.pathname === item.href || location.pathname.startsWith(item.href + '/')
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {item.label}
              </Link>
            ))}
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs tracking-wide uppercase text-primary hover:text-primary/80 transition-colors"
            >
              Discord
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 -mr-2 text-foreground hover:text-primary transition-colors"
            aria-label="Toggle menu"
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
          >
            <div className="section-container py-4 flex flex-col gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    'font-mono text-sm py-2.5 transition-colors',
                    location.pathname === item.href
                      ? 'text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-sm py-2.5 text-primary"
              >
                Discord
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}