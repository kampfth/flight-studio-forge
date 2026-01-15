import { motion } from 'framer-motion';
import { Crosshair, MessageSquare, Wrench } from 'lucide-react';
import { Layout } from '@/components/layout/layout';
import { staggerContainer, staggerItem, fadeUp } from '@/lib/motion';
import { FACEBOOK_URL } from '@/lib/constants';

const values = [
  {
    icon: Crosshair,
    title: 'Precision First',
    description: 'Every texture, feature, and system is deliberately refined. We don\'t ship fast—we ship right. Quality is not a marketing term; it\'s a requirement.',
  },
  {
    icon: MessageSquare,
    title: 'Built With the Community',
    description: 'Our roadmap is shaped by real users. Many features exist because someone asked for them—and we listened. Feedback is not collected for optics; it directly influences development.',
  },
  {
    icon: Wrench,
    title: 'Pioneering Utilities',
    description: 'We focus on solving real problems before they become trends. From early library systems to advanced utilities, we build tools that expand what\'s possible in the simulator, across all platforms.',
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
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              For Simmers was founded in early 2021 by long-time flight simulation enthusiasts who wanted more from the ecosystem. What started with general aviation flying and technical curiosity quickly evolved into a focused effort to build tools and environments that felt complete, polished, and genuinely useful.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              As Microsoft Flight Simulator expanded to new platforms, we identified a clear gap, especially for Xbox users who lacked access to high-quality, well-supported content. For Simmers moved early, committing to deliver the same level of precision and care across PC and Xbox, without compromise.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Today, For Simmers is home to more than 150 products, spanning scenery, libraries, and utilities. Every release reflects a long-term commitment to quality, continuous updates, and listening closely to the community that uses our work every day.
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
                Built to Last
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
                  We build products meant to stay relevant—maintained, refined, and supported long after release.
                </p>
              </motion.div>

              <motion.p variants={staggerItem} className="text-muted-foreground leading-relaxed">
                For Simmers focuses on long-term value. Our products are not disposable releases—they are systems designed to evolve. Updates, refinements, and compatibility improvements are part of the lifecycle, not an afterthought.
              </motion.p>

              <motion.p variants={staggerItem} className="text-muted-foreground leading-relaxed">
                With a growing catalog of over 150 products, consistency matters. Every release follows the same standard: solid foundations, real-world testing, and continued support driven by community feedback. We build once, then keep improving.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Brand;
