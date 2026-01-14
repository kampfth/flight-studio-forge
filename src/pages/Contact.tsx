import { motion } from 'framer-motion';
import { Mail, MessageCircle, ExternalLink } from 'lucide-react';
import { Layout } from '@/components/layout/layout';
import { Button } from '@/components/ui/button';

const Contact = () => {
  return (
    <Layout>
      <section className="py-24 md:py-32">
        <div className="section-container">
          <div className="max-w-2xl mx-auto text-center">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-16"
            >
              <span className="font-mono text-primary text-sm tracking-[0.2em] uppercase mb-4 block">
                Contact
              </span>
              <h1 className="text-4xl md:text-5xl font-mono font-bold mb-6">
                Get in Touch
              </h1>
              <p className="text-muted-foreground">
                Questions, feedback, or just want to talk about flight sim? 
                We're always around.
              </p>
            </motion.div>

            {/* Contact Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Discord */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="p-8 rounded-lg border border-border/50 bg-card/30 hover:border-primary/30 transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <MessageCircle size={32} className="text-primary" />
                </div>
                <h2 className="font-mono font-semibold text-xl mb-3">
                  Discord
                </h2>
                <p className="text-muted-foreground text-sm mb-6">
                  The fastest way to reach us. Join the community, get support, 
                  share your flights.
                </p>
                <Button asChild variant="glow" className="w-full">
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    Join Server
                    <ExternalLink size={14} className="ml-2" />
                  </a>
                </Button>
              </motion.div>

              {/* Email */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="p-8 rounded-lg border border-border/50 bg-card/30 hover:border-primary/30 transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <Mail size={32} className="text-primary" />
                </div>
                <h2 className="font-mono font-semibold text-xl mb-3">
                  Email
                </h2>
                <p className="text-muted-foreground text-sm mb-6">
                  For business inquiries, press, or anything that needs a 
                  formal reply.
                </p>
                <Button asChild variant="outline" className="w-full">
                  <a href="mailto:hello@4simmers.com">
                    hello@4simmers.com
                  </a>
                </Button>
              </motion.div>
            </div>

            {/* Note */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-12 text-sm text-muted-foreground font-mono"
            >
              Response time: Discord ~hours • Email ~48h
            </motion.p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
