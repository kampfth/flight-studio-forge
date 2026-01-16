/**
 * Page: Contact
 * Responsibility: Contact page with glassmorphism styling
 */
import { motion } from 'framer-motion';
import { Facebook, Headset, ExternalLink, MessageCircle } from 'lucide-react';
import { Layout } from '@/components/layout/layout';
import { Button } from '@/components/ui/button';
import { FACEBOOK_URL, SUPPORT_URL } from '@/lib/constants';
import { staggerContainer, staggerItem } from '@/lib/motion';

const Contact = () => {
  return (
    <Layout>
      <section className="relative py-24 md:py-32 min-h-screen overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full"
            style={{
              background: 'radial-gradient(circle, hsl(var(--primary) / 0.1) 0%, transparent 70%)',
              filter: 'blur(80px)',
              top: '10%',
              left: '50%',
              transform: 'translateX(-50%)',
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute w-[400px] h-[400px] rounded-full"
            style={{
              background: 'radial-gradient(circle, hsl(var(--accent) / 0.08) 0%, transparent 70%)',
              filter: 'blur(100px)',
              bottom: '10%',
              right: '10%',
            }}
            animate={{
              x: [0, -30, 0],
              y: [0, 20, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 5,
            }}
          />
        </div>

        {/* Grid overlay */}
        <div className="absolute inset-0 grid-overlay opacity-10" />

        <div className="section-container relative">
          <div className="max-w-2xl mx-auto text-center">
            {/* Header with glassmorphism */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12"
            >
              <motion.div 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 mb-6"
                whileHover={{ scale: 1.02 }}
              >
                <MessageCircle size={14} className="text-primary" />
                <span className="font-mono text-muted-foreground text-xs tracking-[0.2em] uppercase">
                  Contact
                </span>
              </motion.div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-mono font-bold mb-6">
                Get in{' '}
                <span className="text-gradient bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                  Touch
                </span>
              </h1>
              <p className="text-muted-foreground text-lg">
                Questions, feedback, or need help? We're here for you.
              </p>
            </motion.div>

            {/* Contact Options with glassmorphism */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {/* Support */}
              <motion.div
                variants={staggerItem}
                whileHover={{ scale: 1.02, y: -4 }}
                className="p-8 rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/10 hover:border-primary/30 transition-all duration-300"
              >
                <motion.div 
                  className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-6"
                  whileHover={{ rotate: 5 }}
                >
                  <Headset size={32} className="text-primary" />
                </motion.div>
                <h2 className="font-mono font-semibold text-xl mb-3">
                  Support
                </h2>
                <p className="text-muted-foreground text-sm mb-6">
                  Need help with a product? Open a support ticket and we'll get back to you.
                </p>
                <Button asChild className="w-full bg-foreground text-background hover:bg-foreground/90">
                  <a href={SUPPORT_URL} target="_blank" rel="noopener noreferrer">
                    Open a Support Ticket
                    <ExternalLink size={14} className="ml-2" />
                  </a>
                </Button>
              </motion.div>

              {/* Facebook */}
              <motion.div
                variants={staggerItem}
                whileHover={{ scale: 1.02, y: -4 }}
                className="p-8 rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/10 hover:border-primary/30 transition-all duration-300"
              >
                <motion.div 
                  className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-6"
                  whileHover={{ rotate: -5 }}
                >
                  <Facebook size={32} className="text-primary" />
                </motion.div>
                <h2 className="font-mono font-semibold text-xl mb-3">
                  Facebook
                </h2>
                <p className="text-muted-foreground text-sm mb-6">
                  Follow us for updates, news, and connect with the flight sim community.
                </p>
                <Button asChild variant="outline" className="w-full bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10">
                  <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer">
                    Visit Our Page
                    <ExternalLink size={14} className="ml-2" />
                  </a>
                </Button>
              </motion.div>
            </motion.div>

            {/* Note with glassmorphism */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-12"
            >
              <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-white/[0.03] backdrop-blur-md border border-white/10">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-sm text-muted-foreground font-mono">
                  Response time: Support tickets ~24-48h
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
