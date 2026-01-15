/**
 * Component: ProductIntro
 * Responsibility: Product description section with rich content support
 * Used by: ProductDetail page
 * 
 * Supports:
 * - Simple text description (string)
 * - Rich content blocks (RichContentBlock[]) for complex formatting
 * 
 * Layout constraints:
 * - Container: max-w-4xl for optimal reading width (~65-75 chars per line)
 * - Prose width: Rich content uses full container width
 * - Images: Can be fullWidth to break out of prose container
 */
import { motion } from 'framer-motion';
import { RichContent, type RichContentBlock } from '@/components/content/RichContent';

interface ProductIntroProps {
  /** Simple text description */
  description: string;
  /** Rich formatted content blocks (optional - takes precedence over description) */
  richDescription?: RichContentBlock[];
}

export function ProductIntro({ description, richDescription }: ProductIntroProps) {
  const hasRichContent = richDescription && richDescription.length > 0;

  return (
    <section className="py-16 md:py-24 bg-card/30">
      <div className="section-container">
        {/* 
          Content area constraints:
          - max-w-4xl: Optimal reading width (896px)
          - This keeps text at comfortable 65-75 characters per line
          - Rich content images can break out with fullWidth option
        */}
        <div className="max-w-4xl">
          {hasRichContent ? (
            <RichContent blocks={richDescription} />
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                {description}
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
