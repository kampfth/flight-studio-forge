import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle, Users, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CommunitySection() {
  return (
    <section className="py-24 md:py-32">
      <div className="section-container">
        <div className="relative rounded-2xl border border-border/50 bg-gradient-to-br from-card via-card to-primary/5 overflow-hidden">
          {/* Background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative p-8 md:p-12 lg:p-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Content */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <span className="font-mono text-primary text-sm tracking-[0.2em] uppercase mb-4 block">
                  Join the Squadron
                </span>
                <h2 className="text-3xl md:text-4xl font-mono font-bold mb-6">
                  Built with the community
                </h2>
                <p className="text-muted-foreground mb-8 max-w-md">
                  Our Discord is where features are born. Real feedback from real pilots 
                  shapes every release. No corporate filters.
                </p>
                <Button asChild variant="glow" size="lg">
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    <MessageCircle size={18} className="mr-2" />
                    Join Discord
                  </a>
                </Button>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="grid grid-cols-2 gap-6"
              >
                <div className="p-6 rounded-lg bg-background/50 border border-border/50">
                  <Users className="text-primary mb-3" size={28} />
                  <div className="font-mono text-3xl font-bold mb-1">2.5K+</div>
                  <div className="text-muted-foreground text-sm">Discord Members</div>
                </div>
                <div className="p-6 rounded-lg bg-background/50 border border-border/50">
                  <Download className="text-primary mb-3" size={28} />
                  <div className="font-mono text-3xl font-bold mb-1">15K+</div>
                  <div className="text-muted-foreground text-sm">Downloads</div>
                </div>
                <div className="col-span-2 p-6 rounded-lg bg-background/50 border border-border/50">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                    <span className="font-mono text-sm text-muted-foreground">Latest activity</span>
                  </div>
                  <p className="text-sm">
                    <span className="text-primary font-mono">@pilot_marco</span>
                    <span className="text-muted-foreground"> just shared a stunning approach into SBGR</span>
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
