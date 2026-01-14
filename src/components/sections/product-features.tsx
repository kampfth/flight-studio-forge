import { motion } from 'framer-motion';
import { Gauge, Layers, Volume2, Settings, Building2, Plane, Sun, Map, Database, BarChart3, Zap, Download, Box, LucideIcon } from 'lucide-react';
import { FeatureItem } from '@/lib/types';

const iconMap: Record<string, LucideIcon> = {
  Gauge, Layers, Volume2, Settings, Building2, Plane, Sun, Map, Database, BarChart3, Zap, Download, Box
};

interface ProductFeaturesProps {
  features: FeatureItem[];
}

export function ProductFeatures({ features }: ProductFeaturesProps) {
  return (
    <section className="py-20 md:py-28">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <span className="font-mono text-primary text-sm tracking-[0.2em] uppercase mb-4 block">
            Features
          </span>
          <h2 className="text-3xl md:text-4xl font-mono font-bold">
            What's Inside
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => {
            const IconComponent = iconMap[feature.icon] || Box;
            
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group p-6 md:p-8 rounded-lg border border-border/50 bg-card/30 hover:border-primary/30 hover:bg-card/50 transition-all duration-300"
              >
                <div className="flex gap-5">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:shadow-glow-sm transition-all duration-300">
                    <IconComponent size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-mono font-semibold text-lg mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
