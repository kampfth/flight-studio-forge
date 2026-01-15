/**
 * Component: Layout
 * Responsibility: Main app shell with header, footer, and content area
 * Used by: All pages
 */
import { Header } from './header';
import { Footer } from './footer';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-14 md:pt-16">
        {children}
      </main>
      <Footer />
    </div>
  );
}
