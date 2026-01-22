/**
 * Page: Contact
 * Responsibility: Contact page with Wiki/Support cards + Facebook bar
 */
import { motion } from 'framer-motion';
import { Facebook, Headset, ExternalLink, MessageCircle, BookOpen, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/layout';
import { Button } from '@/components/ui/button';
import { FACEBOOK_URL, SUPPORT_URL } from '@/lib/constants';
import { ROUTES } from '@/lib/routes';

const Contact = () => {
  return (
    <Layout>
      <section className="relative py-24 md:py-32 min-h-screen overflow-hidden">
        {/* Modern geometric background */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Primary gradient orb */}
          <motion.div
            className="absolute w-[700px] h-[700px] rounded-full"
            style={{
              background: 'radial-gradient(circle, hsl(var(--primary) / 0.1) 0%, transparent 60%)',
              filter: 'blur(100px)',
              top: '5%',
              left: '50%',
              transform: 'translateX(-50%)',
            }}
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.5, 0.7, 0.5],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          
          {/* Secondary accent orb */}
          <motion.div
            className="absolute w-[400px] h-[400px] rounded-full"
            style={{
              background: 'radial-gradient(circle, hsl(var(--accent) / 0.08) 0%, transparent 60%)',
              filter: 'blur(80px)',
              bottom: '10%',
              right: '5%',
            }}
            animate={{
              x: [0, -20, 0],
              y: [0, 15, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 5,
            }}
          />

          {/* Geometric grid pattern */}
          <div 
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `
                linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)
              `,
              backgroundSize: '80px 80px',
            }}
          />

          {/* Radial lines from center */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.02]" preserveAspectRatio="xMidYMid slice">
            <defs>
              <radialGradient id="centerGlow" cx="50%" cy="40%" r="50%">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx="50%" cy="40%" r="400" fill="url(#centerGlow)" />
          </svg>

          {/* Floating geometric shapes */}
          <motion.div
            className="absolute w-32 h-32 border border-primary/10 rounded-full"
            style={{ top: '15%', left: '10%' }}
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute w-20 h-20 border border-primary/5 rounded-lg"
            style={{ bottom: '20%', left: '15%', rotate: '45deg' }}
            animate={{ rotate: [45, 135, 45] }}
            transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        <div className="section-container relative">
          <div className="max-w-2xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-12 text-center"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 mb-6">
                <MessageCircle size={14} className="text-primary" />
                <span className="font-mono text-muted-foreground text-xs tracking-[0.2em] uppercase">
                  Contact
                </span>
              </div>
              
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

            {/* Main Cards: Wiki & Support */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {/* Wiki Card */}
              <div className="group flex flex-col p-8 rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/10 hover:border-primary/30 transition-all duration-300">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                  <BookOpen size={28} className="text-primary" />
                </div>
                <h2 className="font-mono font-semibold text-xl mb-2">
                  Wiki
                </h2>
                <p className="text-muted-foreground text-sm mb-6 leading-relaxed flex-1">
                  Find quick answers for your problems. Browse guides, tutorials, and documentation.
                </p>
                <Button asChild className="w-full group/btn">
                  <Link to={ROUTES.WIKI}>
                    Browse Wiki
                    <ArrowRight size={14} className="ml-2 transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </Button>
              </div>

              {/* Support Card */}
              <div className="group flex flex-col p-8 rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/10 hover:border-primary/30 transition-all duration-300">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                  <Headset size={28} className="text-primary" />
                </div>
                <h2 className="font-mono font-semibold text-xl mb-2">
                  Support
                </h2>
                <p className="text-muted-foreground text-sm mb-6 leading-relaxed flex-1">
                  Need help with a product? Open a support ticket and we'll get back to you.
                </p>
                <Button asChild variant="outline" className="w-full bg-white/5 border-white/10 hover:border-primary/30 hover:bg-white/10">
                  <a href={SUPPORT_URL} target="_blank" rel="noopener noreferrer">
                    Open Ticket
                    <ExternalLink size={14} className="ml-2" />
                  </a>
                </Button>
              </div>
            </motion.div>

            {/* Facebook Bar */}
            <motion.a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-5 flex items-center justify-between px-6 py-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-primary/20 hover:bg-white/[0.04] transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Facebook size={20} className="text-primary" />
                </div>
                <div>
                  <span className="font-mono font-medium text-sm">Follow us on Facebook</span>
                  <p className="text-xs text-muted-foreground">Updates, news, and community</p>
                </div>
              </div>
              <ExternalLink size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
            </motion.a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
