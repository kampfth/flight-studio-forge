import { Link } from 'react-router-dom';
import { Facebook } from 'lucide-react';
import { FACEBOOK_URL, BRAND_NAME } from '@/lib/constants';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/50 bg-card/50">
      <div className="section-container py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Copyright */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-6 h-6 bg-foreground rounded-sm flex items-center justify-center transition-all duration-300 group-hover:scale-105">
                <span className="font-mono font-bold text-background text-xs">4S</span>
              </div>
              <span className="font-mono font-medium text-sm">{BRAND_NAME}</span>
            </Link>
            <p className="text-muted-foreground text-xs font-mono">
              © {currentYear} {BRAND_NAME}. Precision craft for MSFS.
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-8">
            <Link
              to="/brand"
              className="text-muted-foreground hover:text-foreground text-sm font-mono transition-colors"
            >
              Brand
            </Link>
            <Link
              to="/contact"
              className="text-muted-foreground hover:text-foreground text-sm font-mono transition-colors"
            >
              Contact
            </Link>
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Facebook"
            >
              <Facebook size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
