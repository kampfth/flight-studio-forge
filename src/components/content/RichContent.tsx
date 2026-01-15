/**
 * Component: RichContent
 * Responsibility: Renders rich text content with various formatting elements
 * Used by: ProductIntro, DispatchPost, and any page needing formatted content
 * 
 * Supports: headings, paragraphs, links, lists, images, videos, embeds, 
 * blockquotes, code blocks, highlights, and custom styled text
 */
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ExternalLink, AlertCircle, Info, CheckCircle2, Lightbulb } from 'lucide-react';

// Types for rich content blocks
export type RichContentBlock =
  | { type: 'paragraph'; content: string; className?: string }
  | { type: 'heading'; level: 2 | 3 | 4; content: string; id?: string }
  | { type: 'image'; src: string; alt: string; caption?: string; fullWidth?: boolean }
  | { type: 'video'; url: string; title?: string; aspectRatio?: '16:9' | '4:3' | '1:1' }
  | { type: 'youtube'; videoId: string; title?: string }
  | { type: 'gif'; src: string; alt?: string; caption?: string }
  | { type: 'list'; items: string[]; ordered?: boolean }
  | { type: 'link-block'; href: string; text: string; description?: string; external?: boolean }
  | { type: 'blockquote'; content: string; author?: string; source?: string }
  | { type: 'callout'; variant: 'info' | 'warning' | 'success' | 'tip'; title?: string; content: string }
  | { type: 'code'; language?: string; content: string }
  | { type: 'highlight'; content: string; color?: 'primary' | 'accent' | 'warning' }
  | { type: 'divider'; style?: 'solid' | 'dashed' | 'gradient' }
  | { type: 'feature-grid'; items: Array<{ title: string; description: string; icon?: string }> }
  | { type: 'comparison-table'; headers: string[]; rows: string[][] }
  | { type: 'styled-text'; content: string; font?: 'mono' | 'serif' | 'sans'; size?: 'sm' | 'base' | 'lg' | 'xl'; color?: string; weight?: 'normal' | 'medium' | 'bold' };

interface RichContentProps {
  blocks: RichContentBlock[];
  className?: string;
}

// Individual block renderers
const Paragraph = ({ content, className }: { content: string; className?: string }) => (
  <p 
    className={cn("text-base md:text-lg text-muted-foreground leading-relaxed", className)}
    dangerouslySetInnerHTML={{ __html: content }}
  />
);

const Heading = ({ level, content, id }: { level: 2 | 3 | 4; content: string; id?: string }) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  const styles = {
    2: 'text-2xl md:text-3xl font-bold font-mono mt-12 mb-6 text-foreground',
    3: 'text-xl md:text-2xl font-semibold font-mono mt-10 mb-4 text-foreground',
    4: 'text-lg md:text-xl font-medium font-mono mt-8 mb-3 text-foreground',
  };
  
  return (
    <Tag id={id} className={styles[level]}>
      {content}
    </Tag>
  );
};

const ContentImage = ({ src, alt, caption, fullWidth }: { src: string; alt: string; caption?: string; fullWidth?: boolean }) => (
  <figure className={cn("my-8", fullWidth && "mx-[-1rem] md:mx-[-2rem]")}>
    <div className={cn(
      "overflow-hidden rounded-lg border border-border/30",
      fullWidth && "rounded-none md:rounded-lg"
    )}>
      <img 
        src={src} 
        alt={alt}
        loading="lazy"
        className="w-full h-auto object-cover transition-transform duration-500 hover:scale-[1.02]"
      />
    </div>
    {caption && (
      <figcaption className="mt-3 text-center text-sm text-muted-foreground font-mono">
        {caption}
      </figcaption>
    )}
  </figure>
);

const VideoEmbed = ({ url, title, aspectRatio = '16:9' }: { url: string; title?: string; aspectRatio?: string }) => {
  const ratioClass = {
    '16:9': 'aspect-video',
    '4:3': 'aspect-[4/3]',
    '1:1': 'aspect-square',
  }[aspectRatio] || 'aspect-video';

  return (
    <div className="my-8">
      <div className={cn("relative overflow-hidden rounded-lg border border-border/30 bg-muted/20", ratioClass)}>
        <video 
          src={url}
          controls
          className="absolute inset-0 w-full h-full object-cover"
          title={title}
        />
      </div>
      {title && (
        <p className="mt-3 text-center text-sm text-muted-foreground font-mono">{title}</p>
      )}
    </div>
  );
};

const YouTubeEmbed = ({ videoId, title }: { videoId: string; title?: string }) => (
  <div className="my-8">
    <div className="relative aspect-video overflow-hidden rounded-lg border border-border/30 bg-muted/20">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title || 'YouTube video'}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 w-full h-full"
      />
    </div>
    {title && (
      <p className="mt-3 text-center text-sm text-muted-foreground font-mono">{title}</p>
    )}
  </div>
);

const GifEmbed = ({ src, alt, caption }: { src: string; alt?: string; caption?: string }) => (
  <figure className="my-8">
    <div className="overflow-hidden rounded-lg border border-border/30 bg-muted/10">
      <img 
        src={src} 
        alt={alt || 'Animated GIF'}
        className="w-full h-auto"
      />
    </div>
    {caption && (
      <figcaption className="mt-3 text-center text-sm text-muted-foreground font-mono">
        {caption}
      </figcaption>
    )}
  </figure>
);

const ContentList = ({ items, ordered }: { items: string[]; ordered?: boolean }) => {
  const Tag = ordered ? 'ol' : 'ul';
  return (
    <Tag className={cn(
      "my-6 space-y-2 pl-6",
      ordered ? "list-decimal" : "list-disc",
      "marker:text-primary"
    )}>
      {items.map((item, i) => (
        <li 
          key={i} 
          className="text-base md:text-lg text-muted-foreground leading-relaxed pl-2"
          dangerouslySetInnerHTML={{ __html: item }}
        />
      ))}
    </Tag>
  );
};

const LinkBlock = ({ href, text, description, external }: { href: string; text: string; description?: string; external?: boolean }) => (
  <a
    href={href}
    target={external ? '_blank' : undefined}
    rel={external ? 'noopener noreferrer' : undefined}
    className="my-4 block p-4 rounded-lg border border-border/50 bg-card/30 hover:border-primary/50 hover:bg-card/50 transition-all duration-300 group"
  >
    <div className="flex items-center gap-2">
      <span className="font-mono font-medium text-primary group-hover:underline">{text}</span>
      {external && <ExternalLink size={14} className="text-muted-foreground" />}
    </div>
    {description && (
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
    )}
  </a>
);

const Blockquote = ({ content, author, source }: { content: string; author?: string; source?: string }) => (
  <blockquote className="my-8 pl-6 border-l-4 border-primary/50 bg-card/20 py-4 pr-4 rounded-r-lg">
    <p className="text-lg md:text-xl italic text-foreground/90 leading-relaxed">"{content}"</p>
    {(author || source) && (
      <footer className="mt-4 text-sm text-muted-foreground font-mono">
        {author && <span className="font-medium">— {author}</span>}
        {source && <span className="ml-2 text-muted-foreground/70">({source})</span>}
      </footer>
    )}
  </blockquote>
);

const Callout = ({ variant, title, content }: { variant: 'info' | 'warning' | 'success' | 'tip'; title?: string; content: string }) => {
  const config = {
    info: { icon: Info, bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400' },
    warning: { icon: AlertCircle, bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-400' },
    success: { icon: CheckCircle2, bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-400' },
    tip: { icon: Lightbulb, bg: 'bg-primary/10', border: 'border-primary/30', text: 'text-primary' },
  }[variant];

  const Icon = config.icon;

  return (
    <div className={cn("my-6 p-4 rounded-lg border", config.bg, config.border)}>
      <div className="flex items-start gap-3">
        <Icon size={20} className={cn("mt-0.5 flex-shrink-0", config.text)} />
        <div>
          {title && <p className={cn("font-mono font-semibold mb-1", config.text)}>{title}</p>}
          <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </div>
    </div>
  );
};

const CodeBlock = ({ language, content }: { language?: string; content: string }) => (
  <div className="my-6 rounded-lg overflow-hidden border border-border/30">
    {language && (
      <div className="px-4 py-2 bg-muted/30 border-b border-border/30">
        <span className="text-xs font-mono text-muted-foreground uppercase">{language}</span>
      </div>
    )}
    <pre className="p-4 bg-muted/10 overflow-x-auto">
      <code className="text-sm font-mono text-foreground/90">{content}</code>
    </pre>
  </div>
);

const Highlight = ({ content, color = 'primary' }: { content: string; color?: 'primary' | 'accent' | 'warning' }) => {
  const colorClass = {
    primary: 'bg-primary/20 text-primary',
    accent: 'bg-accent/30 text-accent-foreground',
    warning: 'bg-amber-500/20 text-amber-400',
  }[color];

  return (
    <span 
      className={cn("px-2 py-1 rounded font-medium", colorClass)}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

const Divider = ({ style = 'solid' }: { style?: 'solid' | 'dashed' | 'gradient' }) => {
  if (style === 'gradient') {
    return (
      <div className="my-12 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
    );
  }
  return (
    <hr className={cn(
      "my-12 border-0 h-px bg-border/50",
      style === 'dashed' && "border-t border-dashed border-border/50 bg-transparent"
    )} />
  );
};

const FeatureGrid = ({ items }: { items: Array<{ title: string; description: string; icon?: string }> }) => (
  <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-4">
    {items.map((item, i) => (
      <div key={i} className="p-4 rounded-lg border border-border/30 bg-card/20">
        <h4 className="font-mono font-semibold text-foreground mb-2">{item.title}</h4>
        <p className="text-sm text-muted-foreground">{item.description}</p>
      </div>
    ))}
  </div>
);

const ComparisonTable = ({ headers, rows }: { headers: string[]; rows: string[][] }) => (
  <div className="my-8 overflow-x-auto">
    <table className="w-full border-collapse">
      <thead>
        <tr>
          {headers.map((header, i) => (
            <th key={i} className="px-4 py-3 text-left font-mono font-semibold text-foreground bg-muted/30 border border-border/30 first:rounded-tl-lg last:rounded-tr-lg">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i}>
            {row.map((cell, j) => (
              <td 
                key={j} 
                className="px-4 py-3 text-muted-foreground border border-border/30"
                dangerouslySetInnerHTML={{ __html: cell }}
              />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const StyledText = ({ content, font = 'sans', size = 'base', color, weight = 'normal' }: {
  content: string;
  font?: 'mono' | 'serif' | 'sans';
  size?: 'sm' | 'base' | 'lg' | 'xl';
  color?: string;
  weight?: 'normal' | 'medium' | 'bold';
}) => {
  const fontClass = { mono: 'font-mono', serif: 'font-serif', sans: 'font-sans' }[font];
  const sizeClass = { sm: 'text-sm', base: 'text-base', lg: 'text-lg', xl: 'text-xl' }[size];
  const weightClass = { normal: 'font-normal', medium: 'font-medium', bold: 'font-bold' }[weight];
  
  return (
    <span 
      className={cn(fontClass, sizeClass, weightClass)}
      style={color ? { color } : undefined}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

// Block renderer
const renderBlock = (block: RichContentBlock, index: number) => {
  const key = `block-${index}`;
  
  switch (block.type) {
    case 'paragraph':
      return <Paragraph key={key} content={block.content} className={block.className} />;
    case 'heading':
      return <Heading key={key} level={block.level} content={block.content} id={block.id} />;
    case 'image':
      return <ContentImage key={key} src={block.src} alt={block.alt} caption={block.caption} fullWidth={block.fullWidth} />;
    case 'video':
      return <VideoEmbed key={key} url={block.url} title={block.title} aspectRatio={block.aspectRatio} />;
    case 'youtube':
      return <YouTubeEmbed key={key} videoId={block.videoId} title={block.title} />;
    case 'gif':
      return <GifEmbed key={key} src={block.src} alt={block.alt} caption={block.caption} />;
    case 'list':
      return <ContentList key={key} items={block.items} ordered={block.ordered} />;
    case 'link-block':
      return <LinkBlock key={key} href={block.href} text={block.text} description={block.description} external={block.external} />;
    case 'blockquote':
      return <Blockquote key={key} content={block.content} author={block.author} source={block.source} />;
    case 'callout':
      return <Callout key={key} variant={block.variant} title={block.title} content={block.content} />;
    case 'code':
      return <CodeBlock key={key} language={block.language} content={block.content} />;
    case 'highlight':
      return <Highlight key={key} content={block.content} color={block.color} />;
    case 'divider':
      return <Divider key={key} style={block.style} />;
    case 'feature-grid':
      return <FeatureGrid key={key} items={block.items} />;
    case 'comparison-table':
      return <ComparisonTable key={key} headers={block.headers} rows={block.rows} />;
    case 'styled-text':
      return <StyledText key={key} content={block.content} font={block.font} size={block.size} color={block.color} weight={block.weight} />;
    default:
      return null;
  }
};

export function RichContent({ blocks, className }: RichContentProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn("rich-content", className)}
    >
      {blocks.map((block, index) => renderBlock(block, index))}
    </motion.div>
  );
}

export default RichContent;
