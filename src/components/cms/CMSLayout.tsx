/**
 * Component: CMSLayout
 * Responsibility: Main layout wrapper for CMS pages with sidebar navigation
 * Used by: All CMS pages
 */

import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  FileText, 
  Settings,
  ChevronLeft,
  Plane
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { CMS_ROUTES } from '@/lib/cms/routes';

interface CMSLayoutProps {
  children: ReactNode;
}

const navItems = [
  { 
    label: 'Dashboard', 
    href: CMS_ROUTES.DASHBOARD, 
    icon: LayoutDashboard,
    exact: true 
  },
  { 
    label: 'Products', 
    href: CMS_ROUTES.PRODUCTS, 
    icon: Package,
    exact: false 
  },
  { 
    label: 'Patch Notes', 
    href: CMS_ROUTES.PATCH_NOTES, 
    icon: FileText,
    exact: false 
  },
  { 
    label: 'Settings', 
    href: CMS_ROUTES.SETTINGS, 
    icon: Settings,
    exact: true,
    disabled: true 
  },
];

export function CMSLayout({ children }: CMSLayoutProps) {
  const location = useLocation();

  const isActive = (href: string, exact: boolean) => {
    if (exact) {
      return location.pathname === href;
    }
    return location.pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-card flex flex-col shrink-0">
        {/* Logo / Brand */}
        <div className="h-16 border-b border-border flex items-center px-6">
          <Link 
            to={CMS_ROUTES.DASHBOARD} 
            className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
          >
            <Plane className="w-5 h-5" />
            <span className="font-mono font-semibold text-sm tracking-tight">
              4SIMMERS CMS
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href, item.exact);
            
            return (
              <Link
                key={item.href}
                to={item.disabled ? '#' : item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors',
                  active 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50',
                  item.disabled && 'opacity-50 cursor-not-allowed pointer-events-none'
                )}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Back to Site */}
        <div className="p-4 border-t border-border">
          <Link
            to="/"
            className="flex items-center gap-2 px-3 py-2.5 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Site
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {children}
      </main>
    </div>
  );
}
