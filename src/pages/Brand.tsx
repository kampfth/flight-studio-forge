import { motion } from 'framer-motion';
import { Shield, Heart, Eye, Users } from 'lucide-react';
import { Layout } from '@/components/layout/layout';

const values = [
  {
    icon: Shield,
    title: 'Privacy by Design',
    description: 'No telemetry. No accounts required. No "phone home" license checks. Your sim, your data, your business.',
  },
  {
    icon: Heart,
    title: 'Quality Over Quantity',
    description: 'We\'d rather release one exceptional product per year than five mediocre ones. Every detail matters.',
  },
  {
    icon: Eye,
    title: 'Transparency',
    description: 'Development updates shared openly. Roadmaps discussed publicly. No surprises, no abandoned projects.',
  },
  {
    icon: Users,
    title: 'Community First',
    description: 'Features come from real feedback. Our Discord isn\'t a support dump — it\'s where decisions are made.',
  },
];

const Brand = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-24 md:py-32">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <span className="font-mono text-primary text-sm tracking-[0.2em] uppercase mb-4 block">
              The Philosophy
            </span>
            <h1 className="text-4xl md:text-5xl font-mono font-bold mb-8">
              From Simmers, For Simmers
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              4Simmers was born from frustration. Too many addons felt half-finished. 
              Too many studios went silent after release. Too many products tracked 
              everything you did.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We're four developers who've been simming since FS2004. We know what 
              good software feels like — and what's missing from this market. So we 
              built the studio we wished existed.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 md:py-28 bg-card/30">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <span className="font-mono text-primary text-sm tracking-[0.2em] uppercase mb-4 block">
              Our Values
            </span>
            <h2 className="text-3xl md:text-4xl font-mono font-bold">
              What We Stand For
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex gap-6"
              >
                <div className="flex-shrink-0 w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center">
                  <value.icon size={28} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-mono font-semibold text-xl mb-3">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy Section */}
      <section className="py-20 md:py-28">
        <div className="section-container">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="font-mono text-primary text-sm tracking-[0.2em] uppercase mb-4 block">
                Privacy Policy
              </span>
              <h2 className="text-3xl md:text-4xl font-mono font-bold mb-8">
                The Simplest Privacy Policy
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-6"
            >
              <div className="p-6 rounded-lg border border-primary/30 bg-primary/5">
                <p className="font-mono text-lg text-foreground">
                  We don't collect your data. Period.
                </p>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                Our products don't phone home. They don't track your flights. They 
                don't require accounts. They don't analyze your usage patterns.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                This website uses no cookies, no analytics, no tracking scripts. 
                We don't know who you are unless you tell us by joining Discord or 
                emailing us.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                When you buy from a marketplace (like the MSFS Marketplace or 
                simMarket), that's between you and them. We only see aggregate sales 
                numbers, never individual customer data.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                This isn't marketing. It's how we build everything. Because you 
                bought software to fly, not to be surveilled.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Brand;
