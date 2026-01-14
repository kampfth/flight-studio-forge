import { motion } from 'framer-motion';
import { Crosshair, MessageSquare, Wrench, Palette, Link as LinkIcon } from 'lucide-react';
import { Layout } from '@/components/layout/layout';
import { staggerContainer, staggerItem, fadeUp } from '@/lib/motion';
import { FACEBOOK_URL } from '@/lib/constants';

const values = [
  {
    icon: Crosshair,
    title: 'Precision Craft',
    description: 'Every texture, every feature, every detail is obsessively refined. We don\'t ship until it\'s right.',
  },
  {
    icon: MessageSquare,
    title: 'Feedback Built',
    description: 'Our roadmap comes from real users. Features are shaped by the community that uses them.',
  },
  {
    icon: Wrench,
    title: 'Pioneering Utilities',
    description: 'We build tools that don\'t exist yet. Solving problems others haven\'t tackled.',
  },
  {
    icon: Palette,
    title: 'Consistent Style',
    description: 'A unified visual language across all products. Recognizable quality at a glance.',
  },
  {
    icon: LinkIcon,
    title: 'Clean Integration',
    description: 'Simple installation, clear documentation, seamless compatibility. No friction.',
  },
];

const Brand = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-section-lg md:py-24">
        <div className="section-container">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="max-w-3xl"
          >
            <span className="font-mono text-primary text-sm tracking-[0.2em] uppercase mb-4 block">
              The Philosophy
            </span>
            <h1 className="text-4xl md:text-5xl font-mono font-bold mb-8">
              From Simmers, For Simmers
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              4Simmers was born from passion. Too many addons felt half-finished. 
              Too many studios went silent after release. We wanted something better.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We're developers who've been simming since FS2004. We know what 
              good software feels like — and what's missing from this market. So we 
              built the studio we wished existed.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-section md:py-section-md bg-card/30">
        <div className="section-container">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-10"
          >
            <span className="font-mono text-primary text-sm tracking-[0.2em] uppercase mb-4 block">
              Our Values
            </span>
            <h2 className="text-3xl md:text-4xl font-mono font-bold">
              What We Stand For
            </h2>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {values.map((value) => (
              <motion.div
                key={value.title}
                variants={staggerItem}
                className="p-5 rounded-lg border border-border/30 bg-card/20 hover:border-border/50 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <value.icon size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-mono font-semibold text-base mb-2">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Approach Section */}
      <section className="py-section md:py-section-md">
        <div className="section-container">
          <div className="max-w-3xl">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <span className="font-mono text-primary text-sm tracking-[0.2em] uppercase mb-4 block">
                Our Approach
              </span>
              <h2 className="text-3xl md:text-4xl font-mono font-bold mb-8">
                Quality Over Quantity
              </h2>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-6"
            >
              <motion.div variants={staggerItem} className="p-5 rounded-lg border border-primary/30 bg-primary/5">
                <p className="font-mono text-base text-foreground">
                  We'd rather release one exceptional product per year than five mediocre ones.
                </p>
              </motion.div>

              <motion.p variants={staggerItem} className="text-muted-foreground leading-relaxed">
                Every product goes through extensive testing across different systems 
                and configurations. We don't abandon projects after release — updates 
                keep coming based on real feedback.
              </motion.p>

              <motion.p variants={staggerItem} className="text-muted-foreground leading-relaxed">
                Documentation matters. Every product ships with proper guides, 
                troubleshooting steps, and customization options. Because good software 
                should be understandable.
              </motion.p>

              <motion.p variants={staggerItem} className="text-muted-foreground leading-relaxed">
                Follow our journey on{' '}
                <a 
                  href={FACEBOOK_URL} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Facebook
                </a>{' '}
                for updates, behind-the-scenes content, and new releases.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Brand;
