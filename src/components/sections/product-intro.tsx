/**
 * Component: ProductIntro
 * Responsibility: Product description section
 * Used by: ProductDetail page
 */
import { motion } from 'framer-motion';

interface ProductIntroProps {
  description: string;
}

export function ProductIntro({ description }: ProductIntroProps) {
  return (
    <section className="py-20 md:py-28 bg-card/30">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            {description}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
