/**
 * Brand Page Component
 * 
 * @description Página institucional "Brand" com visual ultra-futurista
 * @features 
 * - Hero section com parallax multi-camada
 * - Mega animated orbs (esferas gigantes com blur)
 * - Glassmorphism cards
 * - Animações bidirecionais (scroll up/down)
 * - Floating particles
 * - Grid/Scanline overlays
 * 
 * @dependencies
 * - framer-motion: Animações e scroll tracking
 * - lucide-react: Ícones
 * - react-router-dom: Navegação
 */

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Crosshair, MessageSquare, Wrench, Sparkles, ArrowRight, Zap, Shield, Heart, Star, Cpu, Globe } from 'lucide-react';
import { Layout } from '@/components/layout/layout';
import { staggerContainer, staggerItem, staggerGrid, gridItem } from '@/lib/motion';
import { PLACEHOLDERS } from '@/lib/constants';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

// =============================================================================
// DATA - Valores, Princípios e Estatísticas
// =============================================================================

/**
 * Values Array
 * @description Cards principais da seção "Our Values"
 * @property icon - Componente Lucide icon
 * @property title - Título do valor
 * @property description - Descrição do valor
 * @property gradient - Classes Tailwind para gradiente de hover
 * @property accent - Cor de destaque (não usado atualmente)
 */
const values = [
  {
    icon: Crosshair,
    title: 'Precision First',
    description: 'Every texture, feature, and system is deliberately refined. We don\'t ship fast—we ship right.',
    gradient: 'from-blue-500/20 to-cyan-500/20',
    accent: 'blue',
  },
  {
    icon: MessageSquare,
    title: 'Built With the Community',
    description: 'Our roadmap is shaped by real users. Many features exist because someone asked for them.',
    gradient: 'from-purple-500/20 to-pink-500/20',
    accent: 'purple',
  },
  {
    icon: Wrench,
    title: 'Pioneering Utilities',
    description: 'We build tools that expand what\'s possible in the simulator, across all platforms.',
    gradient: 'from-amber-500/20 to-orange-500/20',
    accent: 'amber',
  },
];

/**
 * Principles Array
 * @description Cards da seção "Our Approach"
 */
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

/**
 * Stats Array
 * @description Estatísticas exibidas no glassmorphic card
 */
const stats = [
  { value: '2021', label: 'Founded', icon: Star },
  { value: '150+', label: 'Products', icon: Cpu },
  { value: 'PC & Xbox', label: 'Platforms', icon: Globe },
];

// =============================================================================
// COMPONENT
// =============================================================================

const Brand = () => {
  // Refs para tracking de scroll por seção
  const heroRef = useRef<HTMLElement>(null);
  const storyRef = useRef<HTMLElement>(null);
  const valuesRef = useRef<HTMLElement>(null);
  
  // ==========================================================================
  // SCROLL TRACKING
  // useScroll com target permite trackear o progresso de scroll de uma seção
  // offset: ['start start', 'end start'] = do início ao fim da seção
  // ==========================================================================
  
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const { scrollYProgress: storyProgress } = useScroll({
    target: storyRef,
    offset: ['start end', 'end start'],
  });

  const { scrollYProgress: valuesProgress } = useScroll({
    target: valuesRef,
    offset: ['start end', 'end start'],
  });

  // ==========================================================================
  // TRANSFORMS - Efeitos de parallax baseados no scroll
  // useTransform(progress, [input range], [output range])
  // ==========================================================================
  
  // Hero section transforms
  const heroY = useTransform(heroProgress, [0, 1], [0, 300]);        // Move 300px para baixo
  const heroOpacity = useTransform(heroProgress, [0, 0.6], [1, 0]);  // Fade out em 60% do scroll
  const heroScale = useTransform(heroProgress, [0, 0.6], [1, 1.15]); // Zoom in sutil
  const heroBlur = useTransform(heroProgress, [0, 0.5], [0, 10]);    // Blur progressivo

  // Story section orb transforms
  const storyOrbY = useTransform(storyProgress, [0, 1], [100, -100]);
  const storyOrbScale = useTransform(storyProgress, [0, 0.5, 1], [0.8, 1.2, 0.8]);

  // Values section orb transforms  
  const valuesOrbY = useTransform(valuesProgress, [0, 1], [80, -80]);

  return (
    <Layout>
      {/* ================================================================== */}
      {/* HERO SECTION - Ultra Immersive (100vh)                            */}
      {/* ================================================================== */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
        
        {/* -------------------------------------------------------------- */}
        {/* BACKGROUND LAYER 1: Imagem com parallax                        */}
        {/* -------------------------------------------------------------- */}
        <motion.div 
          className="absolute inset-0"
          style={{ y: heroY, scale: heroScale }}
        >
          {/* Imagem de fundo */}
          <div 
            className="absolute inset-0 bg-cover bg-center scale-125"
            style={{ backgroundImage: `url(${PLACEHOLDERS.hero[1]})` }}
          />
          
          {/* Overlay gradiente com blur dinâmico */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/50 to-background"
            style={{ backdropFilter: `blur(${heroBlur}px)` }}
          />
          
          {/* Vignette lateral */}
          <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background" />
        </motion.div>

        {/* -------------------------------------------------------------- */}
        {/* MEGA ANIMATED ORBS                                             */}
        {/* Esferas gigantes com gradiente radial e blur pesado           */}
        {/* -------------------------------------------------------------- */}
        
        {/* Orb 1 - Superior esquerda (1000px) */}
        <motion.div
          className="absolute w-[1000px] h-[1000px] rounded-full pointer-events-none"
          style={{
            // Gradiente radial com cor primária
            background: 'radial-gradient(circle, hsl(var(--primary) / 0.15) 0%, transparent 50%)',
            filter: 'blur(100px)',
            top: '-30%',
            left: '-20%',
          }}
          animate={{
            x: [0, 200, 100, 0],
            y: [0, -100, 50, 0],
            scale: [1, 1.4, 1.1, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        
        {/* Orb 2 - Inferior direita (700px) */}
        <motion.div
          className="absolute w-[700px] h-[700px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, hsl(var(--accent) / 0.12) 0%, transparent 50%)',
            filter: 'blur(80px)',
            bottom: '-20%',
            right: '-10%',
          }}
          animate={{
            x: [0, -150, -50, 0],
            y: [0, 80, -30, 0],
            scale: [1, 1.3, 1.15, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 5,
          }}
        />

        {/* -------------------------------------------------------------- */}
        {/* GRID OVERLAY - Textura de grade animada                        */}
        {/* Classes definidas em index.css                                 */}
        {/* -------------------------------------------------------------- */}
        <motion.div 
          className="absolute inset-0 grid-overlay opacity-30 pointer-events-none"
          animate={{ opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        
        {/* SCANLINES - Linhas horizontais sutis */}
        <motion.div 
          className="absolute inset-0 scanlines opacity-20 pointer-events-none"
          animate={{ opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 5, repeat: Infinity }}
        />

        {/* -------------------------------------------------------------- */}
        {/* FLOATING PARTICLES                                             */}
        {/* 15 partículas animadas com timing diferente cada               */}
        {/* -------------------------------------------------------------- */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary/40 pointer-events-none"
            style={{
              width: `${2 + (i % 4)}px`,   // 2-5px de diâmetro
              height: `${2 + (i % 4)}px`,
              left: `${5 + i * 6}%`,       // Distribuídas horizontalmente
              top: `${15 + (i % 5) * 18}%`, // Distribuídas verticalmente
              boxShadow: '0 0 12px hsl(var(--primary) / 0.5)',
            }}
            animate={{
              y: [0, -60 - i * 3, 0],      // Movimento vertical
              x: [0, (i % 2 === 0 ? 25 : -25), 0], // Movimento lateral alternado
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 5 + i * 0.4,       // Duração variada por partícula
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.3,
            }}
          />
        ))}

        {/* -------------------------------------------------------------- */}
        {/* LIGHT BEAM - Linha horizontal animada                          */}
        {/* -------------------------------------------------------------- */}
        <motion.div
          className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent pointer-events-none"
          style={{ top: '35%' }}
          animate={{ opacity: [0.2, 0.6, 0.2], scaleX: [0.5, 1, 0.5] }}
          transition={{ duration: 10, repeat: Infinity }}
        />

        {/* -------------------------------------------------------------- */}
        {/* HERO CONTENT                                                   */}
        {/* -------------------------------------------------------------- */}
        <motion.div 
          className="section-container relative z-10 pt-20"
          style={{ opacity: heroOpacity }}
        >
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="max-w-5xl"
          >
            {/* Badge - "The Philosophy" */}
            <motion.div variants={staggerItem} className="mb-8">
              <motion.div 
                className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/[0.06] backdrop-blur-2xl border border-white/[0.12] shadow-[0_8px_40px_rgba(0,0,0,0.3)]"
                whileHover={{ scale: 1.03 }}
              >
                {/* Ícone rotativo infinito */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                >
                  <Sparkles size={16} className="text-primary" />
                </motion.div>
                
                <span className="font-mono text-foreground/80 text-xs tracking-[0.25em] uppercase">
                  The Philosophy
                </span>
                
                {/* Ponto pulsante */}
                <motion.div
                  className="w-2 h-2 rounded-full bg-primary"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
            </motion.div>

            {/* Headline Principal */}
            <motion.h1
              variants={staggerItem}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-mono font-bold mb-8 leading-[0.95]"
            >
              <span className="block">From Simmers,</span>
              {/* Texto com gradiente animado */}
              <motion.span 
                className="block bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] bg-clip-text text-transparent"
                animate={{ backgroundPosition: ['0%', '200%'] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
              >
                For Simmers
              </motion.span>
            </motion.h1>

            {/* Descrição */}
            <motion.p
              variants={staggerItem}
              className="text-xl md:text-2xl text-muted-foreground max-w-3xl leading-relaxed"
            >
              Founded in early 2021 by long-time flight simulation enthusiasts who wanted more from the ecosystem.
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Gradiente inferior para transição suave */}
        <div className="absolute bottom-0 left-0 right-0 h-60 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none" />
      </section>

      {/* ================================================================== */}
      {/* STORY SECTION - Layout 2 colunas                                  */}
      {/* ================================================================== */}
      <section ref={storyRef} className="relative py-32 md:py-40 overflow-hidden">
        
        {/* Background Orbs com parallax */}
        <motion.div 
          className="absolute w-[700px] h-[700px] rounded-full pointer-events-none"
          style={{ 
            y: storyOrbY, 
            scale: storyOrbScale,
            background: 'radial-gradient(circle, hsl(var(--primary) / 0.08) 0%, transparent 60%)',
            filter: 'blur(80px)',
            top: '10%',
            left: '-15%',
          }}
        />
        <motion.div 
          className="absolute w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ 
            y: useTransform(storyProgress, [0, 1], [-60, 60]),
            background: 'radial-gradient(circle, hsl(var(--accent) / 0.06) 0%, transparent 60%)',
            filter: 'blur(60px)',
            bottom: '20%',
            right: '-10%',
          }}
        />
        
        <div className="absolute inset-0 grid-overlay opacity-10 pointer-events-none" />
        
        <div className="section-container relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            {/* Coluna Esquerda - Texto */}
            {/* BIDIRECTIONAL: once: false permite re-animar ao scrollar para cima */}
            <motion.div
              initial={{ opacity: 0, x: -80, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {/* Badge "Our Story" */}
              <motion.div 
                className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/[0.05] backdrop-blur-xl border border-white/[0.1] mb-8 shadow-[0_8px_32px_rgba(0,0,0,0.2)]"
                whileHover={{ scale: 1.02 }}
              >
                <motion.div
                  className="w-2 h-2 rounded-full bg-primary"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="font-mono text-muted-foreground text-xs tracking-[0.2em] uppercase">
                  Our Story
                </span>
              </motion.div>

              <h2 className="text-4xl md:text-5xl font-mono font-bold mb-8 leading-tight">
                What started with curiosity, became a{' '}
                <motion.span 
                  className="bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] bg-clip-text text-transparent"
                  animate={{ backgroundPosition: ['0%', '200%'] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                >
                  mission
                </motion.span>
              </h2>

              <div className="space-y-5 text-muted-foreground text-lg leading-relaxed">
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

            {/* Coluna Direita - Stats Card Glassmorphic */}
            <motion.div
              initial={{ opacity: 0, x: 80, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <motion.div 
                className="relative rounded-3xl bg-white/[0.04] backdrop-blur-3xl border border-white/[0.1] p-10 overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.3)]"
                whileHover={{ borderColor: 'rgba(255,255,255,0.15)' }}
              >
                {/* Decorações de fundo do card */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
                <motion.div 
                  className="absolute top-0 right-0 w-60 h-60 bg-gradient-to-br from-primary/15 to-transparent rounded-bl-full"
                  animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 8, repeat: Infinity }}
                />
                <motion.div 
                  className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-accent/10 to-transparent rounded-tr-full"
                  animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 10, repeat: Infinity, delay: 2 }}
                />
                
                {/* Stats items */}
                <div className="relative z-10 space-y-8">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: false }}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                      className="flex items-center gap-5"
                    >
                      <motion.div 
                        className="w-16 h-16 rounded-2xl bg-white/[0.06] backdrop-blur border border-white/[0.1] flex items-center justify-center"
                        whileHover={{ scale: 1.05, borderColor: 'rgba(255,255,255,0.2)' }}
                      >
                        <stat.icon size={24} className="text-primary" />
                      </motion.div>
                      <div>
                        <motion.div 
                          className="font-mono font-bold text-3xl"
                          animate={{ opacity: [0.9, 1, 0.9] }}
                          transition={{ duration: 3, repeat: Infinity }}
                        >
                          {stat.value}
                        </motion.div>
                        <div className="text-muted-foreground text-sm">{stat.label}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* VALUES SECTION - Grid de 3 colunas                                */}
      {/* ================================================================== */}
      <section ref={valuesRef} className="relative py-32 md:py-40 overflow-hidden">
        
        {/* Background orbs */}
        <motion.div 
          className="absolute w-[800px] h-[800px] rounded-full pointer-events-none"
          style={{ 
            y: valuesOrbY,
            background: 'radial-gradient(circle, hsl(var(--primary) / 0.1) 0%, transparent 50%)',
            filter: 'blur(100px)',
            top: '0%',
            left: '-20%',
          }}
        />
        <motion.div 
          className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ 
            y: useTransform(valuesProgress, [0, 1], [-50, 50]),
            background: 'radial-gradient(circle, hsl(var(--accent) / 0.08) 0%, transparent 50%)',
            filter: 'blur(80px)',
            bottom: '10%',
            right: '-15%',
          }}
        />
        
        <div className="absolute inset-0 grid-overlay opacity-15 pointer-events-none" />

        <div className="section-container relative z-10">
          
          {/* Header da seção */}
          <motion.div
            initial={{ opacity: 0, y: 60, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <motion.div 
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/[0.05] backdrop-blur-xl border border-white/[0.1] mb-8 shadow-[0_8px_32px_rgba(0,0,0,0.2)]"
            >
              <motion.div
                className="w-2 h-2 rounded-full bg-primary"
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="font-mono text-muted-foreground text-xs tracking-[0.2em] uppercase">
                Our Values
              </span>
            </motion.div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-mono font-bold mb-6">
              What We{' '}
              <motion.span 
                className="bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] bg-clip-text text-transparent"
                animate={{ backgroundPosition: ['0%', '200%'] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
              >
                Stand For
              </motion.span>
            </h2>
          </motion.div>

          {/* Grid de Values cards */}
          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            variants={staggerGrid}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
          >
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                variants={gridItem}
                custom={index}
              >
                <motion.div
                  className="group relative h-full p-10 rounded-3xl bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.2)]"
                  whileHover={{ y: -15, borderColor: 'rgba(255,255,255,0.15)' }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                >
                  {/* Gradient que aparece no hover */}
                  <motion.div 
                    className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />
                  
                  {/* Glow externo no hover */}
                  <motion.div 
                    className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-primary/15 via-transparent to-accent/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl"
                  />
                  
                  {/* Conteúdo do card */}
                  <div className="relative z-10">
                    <motion.div 
                      className="w-20 h-20 rounded-2xl bg-white/[0.06] backdrop-blur flex items-center justify-center mb-8 border border-white/[0.1] group-hover:border-primary/30 transition-all duration-300"
                      whileHover={{ rotate: 5, scale: 1.05 }}
                    >
                      <value.icon size={32} className="text-primary" />
                    </motion.div>
                    
                    <h3 className="font-mono font-bold text-2xl mb-4">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* APPROACH SECTION - Card grande com CTA                            */}
      {/* ================================================================== */}
      <section className="relative py-32 md:py-40 overflow-hidden">
        <div className="absolute inset-0 grid-overlay opacity-10 pointer-events-none" />
        
        {/* Background orb animada */}
        <motion.div 
          className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, hsl(var(--primary) / 0.08) 0%, transparent 60%)',
            filter: 'blur(80px)',
            top: '20%',
            right: '-10%',
          }}
          animate={{ y: [0, -30, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        
        <div className="section-container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 80, filter: 'blur(12px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="relative rounded-3xl bg-white/[0.03] backdrop-blur-3xl border border-white/[0.08] overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.3)]"
              whileHover={{ borderColor: 'rgba(255,255,255,0.12)' }}
            >
              {/* Decorações de fundo */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
              <motion.div 
                className="absolute top-0 left-0 w-80 h-80 bg-gradient-to-br from-primary/10 to-transparent rounded-br-full"
                animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 10, repeat: Infinity }}
              />
              <motion.div 
                className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-accent/10 to-transparent rounded-tl-full"
                animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 12, repeat: Infinity, delay: 3 }}
              />

              <div className="relative z-10 p-10 md:p-16 lg:p-20">
                <div className="grid lg:grid-cols-2 gap-16">
                  
                  {/* Coluna esquerda - Texto + CTA */}
                  <div>
                    <motion.div 
                      className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/[0.05] backdrop-blur-xl border border-white/[0.1] mb-8"
                    >
                      <motion.div
                        className="w-2 h-2 rounded-full bg-accent"
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <span className="font-mono text-muted-foreground text-xs tracking-[0.2em] uppercase">
                        Our Approach
                      </span>
                    </motion.div>

                    <h2 className="text-4xl md:text-5xl font-mono font-bold mb-8">
                      Built to{' '}
                      <motion.span 
                        className="bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] bg-clip-text text-transparent"
                        animate={{ backgroundPosition: ['0%', '200%'] }}
                        transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                      >
                        Last
                      </motion.span>
                    </h2>

                    <p className="text-xl text-muted-foreground leading-relaxed mb-10">
                      We build products meant to stay relevant—maintained, refined, and supported long after release. Our products are not disposable releases—they are systems designed to evolve.
                    </p>

                    {/* CTA Button */}
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button asChild className="group bg-foreground text-background hover:bg-foreground/90 px-8 py-6 rounded-xl text-base shadow-[0_10px_40px_rgba(0,0,0,0.3)]">
                        <Link to="/products">
                          <span className="flex items-center gap-2 font-mono">
                            Explore Products
                            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                          </span>
                        </Link>
                      </Button>
                    </motion.div>
                  </div>

                  {/* Coluna direita - Principles cards */}
                  <div className="space-y-5">
                    {principles.map((principle, index) => (
                      <motion.div
                        key={principle.title}
                        initial={{ opacity: 0, x: 60, filter: 'blur(8px)' }}
                        whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <motion.div 
                          className="group p-6 rounded-2xl bg-white/[0.04] border border-white/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.15)]"
                          whileHover={{ borderColor: 'rgba(255,255,255,0.15)', x: 10 }}
                          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                        >
                          <div className="flex items-start gap-5">
                            <motion.div 
                              className="w-12 h-12 rounded-xl bg-white/[0.06] border border-white/[0.1] flex items-center justify-center flex-shrink-0 group-hover:border-primary/30 transition-colors"
                              whileHover={{ rotate: 5, scale: 1.05 }}
                            >
                              <principle.icon size={20} className="text-primary" />
                            </motion.div>
                            <div>
                              <h4 className="font-mono font-semibold text-lg mb-2">{principle.title}</h4>
                              <p className="text-muted-foreground">{principle.description}</p>
                            </div>
                          </div>
                        </motion.div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Brand;
