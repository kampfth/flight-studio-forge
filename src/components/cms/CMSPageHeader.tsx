/**
 * Component: CMSPageHeader
 * Responsibility: Page header with title, breadcrumb, and action buttons
 * Used by: All CMS pages
 */

import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Breadcrumb {
  label: string;
  href?: string;
}

interface CMSPageHeaderProps {
  title: string;
  breadcrumbs?: Breadcrumb[];
  actions?: ReactNode;
}

export function CMSPageHeader({ title, breadcrumbs = [], actions }: CMSPageHeaderProps) {
  return (
    <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm shrink-0">
      <div className="h-full px-6 flex items-center justify-between">
        {/* Left: Breadcrumb & Title */}
        <div className="flex flex-col justify-center">
          {breadcrumbs.length > 0 && (
            <nav className="flex items-center gap-1 text-xs text-muted-foreground mb-0.5">
              {breadcrumbs.map((crumb, index) => (
                <span key={index} className="flex items-center gap-1">
                  {crumb.href ? (
                    <Link 
                      to={crumb.href} 
                      className="hover:text-foreground transition-colors"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span>{crumb.label}</span>
                  )}
                  {index < breadcrumbs.length - 1 && (
                    <ChevronRight className="w-3 h-3" />
                  )}
                </span>
              ))}
            </nav>
          )}
          <h1 className="text-lg font-semibold text-foreground">{title}</h1>
        </div>

        {/* Right: Actions */}
        {actions && (
          <div className="flex items-center gap-2">
            {actions}
          </div>
        )}
      </div>
    </header>
  );
}
