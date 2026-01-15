/**
 * Component: Footer
 * Responsibility: Site footer with copyright, navigation links, and social
 * Used by: Layout
 */
import { Facebook } from 'lucide-react';
import { FACEBOOK_URL, BRAND_NAME } from '@/lib/constants';
import { ROUTES } from '@/lib/routes';
import { Logo } from '@/components/common';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/50 bg-card/50">
      <div className="section-container py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Copyright */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <Logo textClassName="text-sm" />
            <p className="text-muted-foreground text-xs font-mono">
              © {currentYear} {BRAND_NAME}. Precision craft for MSFS.
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-8">
            <a
              href={ROUTES.BRAND}
              className="text-muted-foreground hover:text-foreground text-sm font-mono transition-colors"
            >
              Brand
            </a>
            <a
              href={ROUTES.CONTACT}
              className="text-muted-foreground hover:text-foreground text-sm font-mono transition-colors"
            >
              Contact
            </a>
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
