import { motion } from 'framer-motion';
import { Facebook, Headset, ExternalLink } from 'lucide-react';
import { Layout } from '@/components/layout/layout';
import { Button } from '@/components/ui/button';
import { FACEBOOK_URL, SUPPORT_URL } from '@/lib/constants';
import { staggerContainer, staggerItem, fadeUp } from '@/lib/motion';

const Contact = () => {
  return (
    <Layout>
      <section className="py-section-lg md:py-24">
        <div className="section-container">
          <div className="max-w-2xl mx-auto text-center">
            {/* Header */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mb-12"
            >
              <span className="font-mono text-primary text-sm tracking-[0.2em] uppercase mb-4 block">
                Contact
              </span>
              <h1 className="text-4xl md:text-5xl font-mono font-bold mb-6">
                Get in Touch
              </h1>
              <p className="text-muted-foreground">
                Questions, feedback, or need help? We're here for you.
              </p>
            </motion.div>

            {/* Contact Options */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {/* Support */}
              <motion.div
                variants={staggerItem}
                className="p-6 md:p-8 rounded-lg border border-border/50 bg-card/30 hover:border-primary/30 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-5">
                  <Headset size={28} className="text-primary" />
                </div>
                <h2 className="font-mono font-semibold text-xl mb-3">
                  Support
                </h2>
                <p className="text-muted-foreground text-sm mb-6">
                  Need help with a product? Open a support ticket and we'll get back to you.
                </p>
                <Button asChild variant="glow" className="w-full">
                  <a href={SUPPORT_URL} target="_blank" rel="noopener noreferrer">
                    Open a Support Ticket
                    <ExternalLink size={14} className="ml-2" />
                  </a>
                </Button>
              </motion.div>

              {/* Facebook */}
              <motion.div
                variants={staggerItem}
                className="p-6 md:p-8 rounded-lg border border-border/50 bg-card/30 hover:border-primary/30 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-5">
                  <Facebook size={28} className="text-primary" />
                </div>
                <h2 className="font-mono font-semibold text-xl mb-3">
                  Facebook
                </h2>
                <p className="text-muted-foreground text-sm mb-6">
                  Follow us for updates, news, and connect with the flight sim community.
                </p>
                <Button asChild variant="outline" className="w-full">
                  <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer">
                    Visit Our Page
                    <ExternalLink size={14} className="ml-2" />
                  </a>
                </Button>
              </motion.div>
            </motion.div>

            {/* Note */}
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mt-10 text-sm text-muted-foreground font-mono"
            >
              Response time: Support tickets ~24-48h
            </motion.p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
