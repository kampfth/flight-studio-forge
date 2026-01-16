/**
 * Page: NotFound
 * Responsibility: 404 error page
 * Route: *
 */
import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Layout } from '@/components/layout';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  const location = useLocation();

  useEffect(() => {
    console.error('404 Error: User attempted to access non-existent route:', location.pathname);
  }, [location.pathname]);

  return (
    <Layout>
      <section className="min-h-[70vh] flex items-center justify-center" data-qa="page-not-found">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <span className="block mb-6 font-mono text-8xl md:text-9xl font-bold text-primary">
              404
            </span>
            <h1 className="mb-4 font-mono text-2xl md:text-3xl font-semibold">
              Flight Not Found
            </h1>
            <p className="mx-auto mb-8 max-w-md text-muted-foreground">
              Looks like this route doesn't exist. Maybe it was never filed, 
              or perhaps the waypoint was removed.
            </p>
            <Button asChild variant="outline" data-qa="not-found-return-btn">
              <Link to="/">
                <ArrowLeft size={16} className="mr-2" />
                Return to Base
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
