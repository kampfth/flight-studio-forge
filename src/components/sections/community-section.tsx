import { motion } from 'framer-motion';
import { MessageCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CommunitySection() {
  return (
    <section className="py-section md:py-section-md">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="relative rounded-lg border border-border/50 bg-card/30 overflow-hidden"
        >
          <div className="p-6 md:p-8 lg:p-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              {/* Content */}
              <div className="max-w-lg">
                <span className="font-mono text-primary text-xs tracking-[0.2em] uppercase mb-2 block">
                  Community
                </span>
                <h2 className="text-xl md:text-2xl font-mono font-bold mb-2">
                  Join the Discord
                </h2>
                <p className="text-muted-foreground text-sm">
                  Feature requests, development updates, and pilot chat. 
                  No fluff — just people who care about quality addons.
                </p>
              </div>

              {/* CTA */}
              <Button asChild className="bg-foreground text-background hover:bg-foreground/90 w-fit">
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <MessageCircle size={16} className="mr-2" />
                  Join Discord
                  <ArrowRight size={14} className="ml-2" />
                </a>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}