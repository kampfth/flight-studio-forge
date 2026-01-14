import { motion } from 'framer-motion';
import { useState } from 'react';
import { X } from 'lucide-react';

interface ProductGalleryProps {
  gallery: string[];
  productName: string;
}

export function ProductGallery({ gallery, productName }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      <section className="py-20 md:py-28 bg-card/30">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <span className="font-mono text-primary text-sm tracking-[0.2em] uppercase mb-4 block">
              Gallery
            </span>
            <h2 className="text-3xl md:text-4xl font-mono font-bold">
              In Action
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {gallery.map((image, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setSelectedImage(image)}
                className="group relative aspect-video rounded-lg overflow-hidden bg-card border border-border/50 hover:border-primary/30 transition-all duration-300"
              >
                {/* Placeholder */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent flex items-center justify-center">
                  <span className="font-mono text-muted-foreground/30 text-sm">
                    Image {index + 1}
                  </span>
                </div>
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="font-mono text-sm text-primary">View</span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 p-2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close lightbox"
          >
            <X size={32} />
          </button>
          
          <div className="max-w-5xl w-full aspect-video bg-card rounded-lg flex items-center justify-center border border-border/50">
            <span className="font-mono text-muted-foreground">
              {productName} - Gallery Image
            </span>
          </div>
        </motion.div>
      )}
    </>
  );
}
