import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Crosshair, MessageSquare, Wrench, Sparkles, ArrowRight, Zap, Shield, Heart } from 'lucide-react';
import { Layout } from '@/components/layout/layout';
import { staggerContainer, staggerItem, fadeUp } from '@/lib/motion';
import { PLACEHOLDERS } from '@/lib/constants';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const values = [
  {
    icon: Crosshair,
    title: 'Precision First',
    description: 'Every texture, feature, and system is deliberately refined. We don\'t ship fast—we ship right.',
    gradient: 'from-blue-500/20 to-cyan-500/20',
  },
  {
    icon: MessageSquare,
    title: 'Built With the Community',
    description: 'Our roadmap is shaped by real users. Many features exist because someone asked for them.',
    gradient: 'from-purple-500/20 to-pink-500/20',
  },
  {
    icon: Wrench,
    title: 'Pioneering Utilities',
    description: 'We build tools that expand what\'s possible in the simulator, across all platforms.',
    gradient: 'from-amber-500/20 to-orange-500/20',
  },
];

const principles = [
  {
    icon: Zap,
    title: 'Performance Matters',
    description: 'Every product is optimized to run smoothly on both high-end PCs and Xbox.',
  },
  {
    icon: Shield,
    title: 'Long-Term Support',
    description: 'We maintain and update our products for years, not months.',
  },
  {
    icon: Heart,
    title: 'Passion-Driven',
    description: 'We\'re simmers first. We build what we want to use ourselves.',
  },
];

const Brand = () => {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);

  return (
    <Layout>
      {/* Hero Section with Parallax */}
      <section ref={heroRef} className="relative min-h-[80vh] flex items-center overflow-hidden">
        {/* Background with parallax */}
        <motion.div 
          className="absolute inset-0"
          style={{ y, scale }}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${PLACEHOLDERS.hero[1]})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background" />
        </motion.div>

        {/* Animated orbs */}
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, hsl(var(--primary) / 0.15) 0%, transparent 70%)',
            filter: 'blur(80px)',
            top: '5%',
            left: '10%',
          }}
          animate={{
            x: [0, 100, 0],
            y: [0, -60, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        <div className="absolute inset-0 grid-overlay opacity-30" />
        <div className="absolute inset-0 scanlines opacity-20" />

        {/* Content */}
        <motion.div 
          className="section-container relative z-10 pt-20"
          style={{ opacity }}
        >
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="max-w-4xl"
          >
            {/* Badge */}
            <motion.div variants={staggerItem} className="mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10">
                <Sparkles size={14} className="text-primary" />
                <span className="font-mono text-muted-foreground text-xs tracking-[0.2em] uppercase">
                  The Philosophy
                </span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={staggerItem}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-mono font-bold mb-6 leading-[1.05]"
            >
              <span className="block">From Simmers,</span>
              <span className="block text-gradient bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                For Simmers
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={staggerItem}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed"
            >
              Founded in early 2021 by long-time flight simulation enthusiasts who wanted more from the ecosystem.
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Story Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 grid-overlay opacity-10" />
        
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Text content */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <motion.div 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 mb-6"
                whileHover={{ scale: 1.02 }}
              >
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="font-mono text-muted-foreground text-xs tracking-[0.2em] uppercase">
                  Our Story
                </span>
              </motion.div>

              <h2 className="text-3xl md:text-4xl font-mono font-bold mb-6">
                What started with curiosity, became a{' '}
                <span className="text-gradient bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  mission
                </span>
              </h2>

              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  What started with general aviation flying and technical curiosity quickly evolved into a focused effort to build tools and environments that felt complete, polished, and genuinely useful.
                </p>
                <p>
                  As Microsoft Flight Simulator expanded to new platforms, we identified a clear gap, especially for Xbox users who lacked access to high-quality, well-supported content.
                </p>
                <p>
                  For Simmers moved early, committing to deliver the same level of precision and care across PC and Xbox, without compromise.
                </p>
              </div>
            </motion.div>

            {/* Stats card with glassmorphism */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="relative rounded-3xl bg-white/[0.03] backdrop-blur-2xl border border-white/10 p-8 overflow-hidden">
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full" />
                
                <div className="relative z-10 space-y-8">
                  {[
                    { value: '2021', label: 'Founded', desc: 'Starting our journey' },
                    { value: '150+', label: 'Products', desc: 'And counting' },
                    { value: 'PC & Xbox', label: 'Platforms', desc: 'Full support' },
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                      className="flex items-center gap-4"
                    >
                      <div className="w-16 h-16 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                        <span className="font-mono font-bold text-xl text-primary">
                          {stat.value.slice(0, 2)}
                        </span>
                      </div>
                      <div>
                        <div className="font-mono font-bold text-2xl">{stat.value}</div>
                        <div className="text-muted-foreground text-sm">{stat.desc}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px]" />
        </div>
        <div className="absolute inset-0 grid-overlay opacity-15" />

        <div className="section-container relative">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="font-mono text-muted-foreground text-xs tracking-[0.2em] uppercase">
                Our Values
              </span>
            </motion.div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-mono font-bold mb-4">
              What We{' '}
              <span className="text-gradient bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Stand For
              </span>
            </h2>
          </motion.div>

          {/* Values grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.15,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
              >
                <motion.div
                  className="group relative h-full p-8 rounded-3xl bg-white/[0.03] backdrop-blur-2xl border border-white/10 overflow-hidden transition-all duration-500 hover:border-white/20"
                  whileHover={{ y: -10 }}
                >
                  {/* Gradient background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  {/* Glow */}
                  <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-primary/20 via-transparent to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <motion.div 
                      className="w-16 h-16 rounded-2xl bg-white/5 backdrop-blur flex items-center justify-center mb-6 border border-white/10 group-hover:border-primary/30 transition-colors"
                      whileHover={{ rotate: 5, scale: 1.05 }}
                    >
                      <value.icon size={28} className="text-primary" />
                    </motion.div>
                    
                    <h3 className="font-mono font-bold text-xl mb-3">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 grid-overlay opacity-10" />
        
        <div className="section-container relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative rounded-3xl bg-white/[0.03] backdrop-blur-2xl border border-white/10 overflow-hidden"
          >
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
            <div className="absolute top-0 left-0 w-60 h-60 bg-gradient-to-br from-primary/10 to-transparent rounded-br-full" />
            <div className="absolute bottom-0 right-0 w-60 h-60 bg-gradient-to-tl from-accent/10 to-transparent rounded-tl-full" />

            <div className="relative z-10 p-8 md:p-12 lg:p-16">
              <div className="grid lg:grid-cols-2 gap-12">
                {/* Left content */}
                <div>
                  <motion.div 
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 mb-6"
                  >
                    <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                    <span className="font-mono text-muted-foreground text-xs tracking-[0.2em] uppercase">
                      Our Approach
                    </span>
                  </motion.div>

                  <h2 className="text-3xl md:text-4xl font-mono font-bold mb-6">
                    Built to{' '}
                    <span className="text-gradient bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                      Last
                    </span>
                  </h2>

                  <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                    We build products meant to stay relevant—maintained, refined, and supported long after release. Our products are not disposable releases—they are systems designed to evolve.
                  </p>

                  <Button asChild className="group bg-foreground text-background hover:bg-foreground/90">
                    <Link to="/products">
                      Explore Products
                      <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>

                {/* Right - Principles */}
                <div className="space-y-4">
                  {principles.map((principle, index) => (
                    <motion.div
                      key={principle.title}
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="group p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all duration-300"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:border-primary/30 transition-colors">
                          <principle.icon size={18} className="text-primary" />
                        </div>
                        <div>
                          <h4 className="font-mono font-semibold mb-1">{principle.title}</h4>
                          <p className="text-sm text-muted-foreground">{principle.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Brand;
