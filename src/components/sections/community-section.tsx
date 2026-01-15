/**
 * Component: CommunitySection
 * Responsibility: Facebook follow CTA section on homepage
 * Used by: Index page
 */
import { motion } from 'framer-motion';
import { Facebook, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FACEBOOK_URL } from '@/lib/constants';
import { fadeUp } from '@/lib/motion';

export function CommunitySection() {
  return (
    <section className="py-section md:py-section-md">
      <div className="section-container">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative rounded-lg border border-border/50 bg-card/30 overflow-hidden"
        >
          <div className="p-6 md:p-8 lg:p-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              {/* Content */}
              <div className="max-w-lg">
                <span className="font-mono text-primary text-xs tracking-[0.2em] uppercase mb-2 block">
                  Stay Connected
                </span>
                <h2 className="text-xl md:text-2xl font-mono font-bold mb-2">
                  Follow on Facebook
                </h2>
                <p className="text-muted-foreground text-sm">
                  Updates, new releases, and behind-the-scenes content. 
                  Join the conversation.
                </p>
              </div>

              {/* CTA */}
              <Button asChild className="btn-sheen bg-foreground text-background hover:bg-foreground/90 w-fit">
                <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer">
                  <Facebook size={16} className="mr-2" />
                  Follow Us
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
