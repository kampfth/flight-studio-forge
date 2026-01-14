import { motion } from 'framer-motion';
import { SpecItem } from '@/lib/types';

interface ProductSpecsProps {
  specs: SpecItem[];
}

export function ProductSpecs({ specs }: ProductSpecsProps) {
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
            Technical Specs
          </span>
          <h2 className="text-3xl md:text-4xl font-mono font-bold">
            Under the Hood
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-2xl"
        >
          <div className="border border-border/50 rounded-lg overflow-hidden">
            {specs.map((spec, index) => (
              <div
                key={spec.label}
                className={`flex items-center justify-between p-5 ${
                  index !== specs.length - 1 ? 'border-b border-border/50' : ''
                } hover:bg-card/50 transition-colors`}
              >
                <span className="font-mono text-muted-foreground">
                  {spec.label}
                </span>
                <span className="font-mono font-medium text-foreground">
                  {spec.value}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
