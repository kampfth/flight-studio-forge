/**
 * Contact Page Component
 * 
 * Features:
 * - Wiki card with link to knowledge base
 * - Support card with external ticket link
 * - Facebook bar for social link
 * - Animated geometric background
 */

import { motion } from 'framer-motion';
import { 
  Facebook, 
  Headset, 
  ExternalLink, 
  MessageCircle, 
  BookOpen, 
  ArrowRight 
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Import your layout wrapper
// import { Layout } from '@/components/layout/layout';

// Import your button component
// import { Button } from '@/components/ui/button';

// Import constants
// import { FACEBOOK_URL, SUPPORT_URL, ROUTES } from '../constants';

// For demo purposes, using inline values:
const FACEBOOK_URL = 'https://www.facebook.com/4simmers/';
const SUPPORT_URL = 'https://example.com/support';
const ROUTES = { WIKI: '/wiki' };

/**
 * Contact Page
 * 
 * Layout:
 * - Header with title
 * - 2-column grid with Wiki and Support cards
 * - Facebook bar below cards
 * - Animated background with geometric elements
 */
const ContactPage = () => {
  return (
    // Wrap with your Layout component
    <section className="relative py-24 md:py-32 min-h-screen overflow-hidden">
      {/* ================================================================
          BACKGROUND LAYER
          ================================================================ */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Primary gradient orb - top center */}
        <motion.div
          className="absolute w-[700px] h-[700px] rounded-full"
          style={{
            background: 'radial-gradient(circle, hsl(220 80% 72% / 0.1) 0%, transparent 60%)',
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
        
        {/* Secondary accent orb - bottom right */}
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full"
          style={{
            background: 'radial-gradient(circle, hsl(40 90% 65% / 0.08) 0%, transparent 60%)',
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

        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(hsl(220 10% 95%) 1px, transparent 1px),
              linear-gradient(90deg, hsl(220 10% 95%) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />

        {/* Floating geometric shapes */}
        <motion.div
          className="absolute w-32 h-32 border border-[hsl(220_80%_72%_/_0.1)] rounded-full"
          style={{ top: '15%', left: '10%' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute w-20 h-20 border border-[hsl(220_80%_72%_/_0.05)]"
          style={{ bottom: '20%', left: '15%', rotate: '45deg' }}
          animate={{ rotate: [45, 135, 45] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* ================================================================
          CONTENT
          ================================================================ */}
      <div className="max-w-2xl mx-auto px-4 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-12 text-center"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 mb-6">
            <MessageCircle size={14} className="text-[hsl(220_80%_72%)]" />
            <span className="font-mono text-[hsl(220_10%_55%)] text-xs tracking-[0.2em] uppercase">
              Contact
            </span>
          </div>
          
          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-mono font-bold mb-6">
            Get in{' '}
            <span className="bg-gradient-to-r from-[hsl(220_10%_95%)] to-[hsl(220_10%_55%)] bg-clip-text text-transparent">
              Touch
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-[hsl(220_10%_55%)] text-lg">
            Questions, feedback, or need help? We're here for you.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {/* Wiki Card */}
          <div className="group flex flex-col p-8 rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/10 hover:border-[hsl(220_80%_72%_/_0.3)] transition-all duration-300">
            {/* Icon */}
            <div className="w-14 h-14 rounded-xl bg-[hsl(220_80%_72%_/_0.1)] flex items-center justify-center mb-5">
              <BookOpen size={28} className="text-[hsl(220_80%_72%)]" />
            </div>
            
            {/* Title */}
            <h2 className="font-mono font-semibold text-xl mb-2 text-[hsl(220_10%_95%)]">
              Wiki
            </h2>
            
            {/* Description */}
            <p className="text-[hsl(220_10%_55%)] text-sm mb-6 leading-relaxed flex-1">
              Find quick answers for your problems. Browse guides, tutorials, and documentation.
            </p>
            
            {/* Button */}
            <Link 
              to={ROUTES.WIKI}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-[hsl(220_80%_72%)] text-[hsl(220_15%_10%)] font-mono text-sm uppercase tracking-wider rounded-md hover:bg-[hsl(220_80%_72%_/_0.9)] transition-all"
            >
              Browse Wiki
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Support Card */}
          <div className="group flex flex-col p-8 rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/10 hover:border-[hsl(220_80%_72%_/_0.3)] transition-all duration-300">
            {/* Icon */}
            <div className="w-14 h-14 rounded-xl bg-[hsl(220_80%_72%_/_0.1)] flex items-center justify-center mb-5">
              <Headset size={28} className="text-[hsl(220_80%_72%)]" />
            </div>
            
            {/* Title */}
            <h2 className="font-mono font-semibold text-xl mb-2 text-[hsl(220_10%_95%)]">
              Support
            </h2>
            
            {/* Description */}
            <p className="text-[hsl(220_10%_55%)] text-sm mb-6 leading-relaxed flex-1">
              Need help with a product? Open a support ticket and we'll get back to you.
            </p>
            
            {/* Button */}
            <a 
              href={SUPPORT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-[hsl(220_10%_95%)] font-mono text-sm uppercase tracking-wider rounded-md hover:border-[hsl(220_80%_72%_/_0.3)] hover:bg-white/10 transition-all"
            >
              Open Ticket
              <ExternalLink size={14} />
            </a>
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
          className="mt-5 flex items-center justify-between px-6 py-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-[hsl(220_80%_72%_/_0.2)] hover:bg-white/[0.04] transition-all group"
        >
          <div className="flex items-center gap-4">
            {/* Icon */}
            <div className="w-10 h-10 rounded-lg bg-[hsl(220_80%_72%_/_0.1)] flex items-center justify-center">
              <Facebook size={20} className="text-[hsl(220_80%_72%)]" />
            </div>
            
            {/* Text */}
            <div>
              <span className="font-mono font-medium text-sm text-[hsl(220_10%_95%)]">
                Follow us on Facebook
              </span>
              <p className="text-xs text-[hsl(220_10%_55%)]">
                Updates, news, and community
              </p>
            </div>
          </div>
          
          {/* Arrow */}
          <ExternalLink 
            size={16} 
            className="text-[hsl(220_10%_55%)] group-hover:text-[hsl(220_80%_72%)] transition-colors" 
          />
        </motion.a>
      </div>
    </section>
  );
};

export default ContactPage;
