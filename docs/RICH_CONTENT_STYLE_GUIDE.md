# 4Simmers Rich Content Style Guide

Este documento serve como referência de estilos para replicar os componentes de conteúdo rico do projeto. Use estas classes e estruturas ao criar editores de texto ou CMS.

---

## 📦 Dependências Necessárias

```bash
# Pacotes obrigatórios
npm install lucide-react framer-motion clsx tailwind-merge

# Fontes
npm install @fontsource/ibm-plex-mono @fontsource/inter
```

**Imports no main.tsx:**
```tsx
import '@fontsource/ibm-plex-mono/400.css';
import '@fontsource/ibm-plex-mono/500.css';
import '@fontsource/ibm-plex-mono/600.css';
import '@fontsource/ibm-plex-mono/700.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
```

---

## 🎨 Design Tokens

### Cores Base (HSL) - Adicionar ao CSS

```css
:root {
  --background: 0 0% 2%;           /* Preto profundo */
  --foreground: 0 0% 96%;          /* Branco off-white */
  --card: 0 0% 5%;                 /* Cards */
  --muted: 0 0% 14%;               /* Elementos desativados */
  --muted-foreground: 0 0% 55%;    /* Texto secundário */
  --primary: 220 100% 73%;         /* Azul elétrico #7AA7FF */
  --border: 0 0% 14%;              /* Bordas */
  --accent: 220 100% 73%;          /* Accent color */
  --accent-foreground: 0 0% 96%;   /* Accent text */
}
```

### Tailwind Config

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        mono: ['IBM Plex Mono', 'monospace'],
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        border: 'hsl(var(--border))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
      },
    },
  },
};
```

---

## 🧩 Componentes React/Tailwind

### Utilitário cn (obrigatório)

```tsx
// lib/utils.ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

---

### 1. Paragraph

```tsx
interface ParagraphProps {
  content: string;
  className?: string;
}

export function Paragraph({ content, className }: ParagraphProps) {
  return (
    <p 
      className={cn(
        "text-base md:text-lg text-muted-foreground leading-relaxed",
        className
      )}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
```

**Uso:**
```tsx
<Paragraph content="Texto do parágrafo com <strong>negrito</strong> e <em>itálico</em>." />
```

---

### 2. Heading

```tsx
interface HeadingProps {
  level: 2 | 3 | 4;
  content: string;
  id?: string;
}

export function Heading({ level, content, id }: HeadingProps) {
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
}
```

**Uso:**
```tsx
<Heading level={2} content="Título Principal" />
<Heading level={3} content="Subtítulo" />
<Heading level={4} content="Seção menor" />
```

---

### 3. ContentList (Bullet/Ordered)

```tsx
interface ContentListProps {
  items: string[];
  ordered?: boolean;
}

export function ContentList({ items, ordered = false }: ContentListProps) {
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
}
```

**Uso:**
```tsx
<ContentList items={["Item 1", "Item 2", "Item 3"]} />
<ContentList items={["Primeiro", "Segundo", "Terceiro"]} ordered />
```

---

### 4. ContentImage

```tsx
interface ContentImageProps {
  src: string;
  alt: string;
  caption?: string;
  fullWidth?: boolean;
}

export function ContentImage({ src, alt, caption, fullWidth }: ContentImageProps) {
  return (
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
}
```

**Uso:**
```tsx
<ContentImage src="/image.jpg" alt="Descrição" caption="Legenda opcional" />
<ContentImage src="/hero.jpg" alt="Hero" fullWidth />
```

---

### 5. VideoEmbed

```tsx
interface VideoEmbedProps {
  url: string;
  title?: string;
  aspectRatio?: '16:9' | '4:3' | '1:1';
}

export function VideoEmbed({ url, title, aspectRatio = '16:9' }: VideoEmbedProps) {
  const ratioClass = {
    '16:9': 'aspect-video',
    '4:3': 'aspect-[4/3]',
    '1:1': 'aspect-square',
  }[aspectRatio];

  return (
    <div className="my-8">
      <div className={cn(
        "relative overflow-hidden rounded-lg border border-border/30 bg-muted/20",
        ratioClass
      )}>
        <video 
          src={url}
          controls
          className="absolute inset-0 w-full h-full object-cover"
          title={title}
        />
      </div>
      {title && (
        <p className="mt-3 text-center text-sm text-muted-foreground font-mono">
          {title}
        </p>
      )}
    </div>
  );
}
```

---

### 6. YouTubeEmbed

```tsx
interface YouTubeEmbedProps {
  videoId: string;
  title?: string;
}

export function YouTubeEmbed({ videoId, title }: YouTubeEmbedProps) {
  return (
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
        <p className="mt-3 text-center text-sm text-muted-foreground font-mono">
          {title}
        </p>
      )}
    </div>
  );
}
```

**Uso:**
```tsx
<YouTubeEmbed videoId="dQw4w9WgXcQ" title="Rick Astley - Never Gonna Give You Up" />
```

---

### 7. GifEmbed

```tsx
interface GifEmbedProps {
  src: string;
  alt?: string;
  caption?: string;
}

export function GifEmbed({ src, alt, caption }: GifEmbedProps) {
  return (
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
}
```

---

### 8. Blockquote

```tsx
interface BlockquoteProps {
  content: string;
  author?: string;
  source?: string;
}

export function Blockquote({ content, author, source }: BlockquoteProps) {
  return (
    <blockquote className="my-8 pl-6 border-l-4 border-primary/50 bg-card/20 py-4 pr-4 rounded-r-lg">
      <p className="text-lg md:text-xl italic text-foreground/90 leading-relaxed">
        "{content}"
      </p>
      {(author || source) && (
        <footer className="mt-4 text-sm text-muted-foreground font-mono">
          {author && <span className="font-medium">— {author}</span>}
          {source && <span className="ml-2 text-muted-foreground/70">({source})</span>}
        </footer>
      )}
    </blockquote>
  );
}
```

**Uso:**
```tsx
<Blockquote 
  content="A simplicidade é a sofisticação suprema." 
  author="Leonardo da Vinci" 
/>
```

---

### 9. Callout (Info, Warning, Success, Tip)

```tsx
import { Info, AlertCircle, CheckCircle2, Lightbulb } from 'lucide-react';

interface CalloutProps {
  variant: 'info' | 'warning' | 'success' | 'tip';
  title?: string;
  content: string;
}

export function Callout({ variant, title, content }: CalloutProps) {
  const config = {
    info: { 
      icon: Info, 
      bg: 'bg-blue-500/10', 
      border: 'border-blue-500/30', 
      text: 'text-blue-400' 
    },
    warning: { 
      icon: AlertCircle, 
      bg: 'bg-amber-500/10', 
      border: 'border-amber-500/30', 
      text: 'text-amber-400' 
    },
    success: { 
      icon: CheckCircle2, 
      bg: 'bg-green-500/10', 
      border: 'border-green-500/30', 
      text: 'text-green-400' 
    },
    tip: { 
      icon: Lightbulb, 
      bg: 'bg-primary/10', 
      border: 'border-primary/30', 
      text: 'text-primary' 
    },
  }[variant];

  const Icon = config.icon;

  return (
    <div className={cn("my-6 p-4 rounded-lg border", config.bg, config.border)}>
      <div className="flex items-start gap-3">
        <Icon size={20} className={cn("mt-0.5 flex-shrink-0", config.text)} />
        <div>
          {title && (
            <p className={cn("font-mono font-semibold mb-1", config.text)}>
              {title}
            </p>
          )}
          <p 
            className="text-muted-foreground" 
            dangerouslySetInnerHTML={{ __html: content }} 
          />
        </div>
      </div>
    </div>
  );
}
```

**Uso:**
```tsx
<Callout variant="info" title="Nota" content="Informação importante aqui." />
<Callout variant="warning" title="Atenção" content="Cuidado com este passo." />
<Callout variant="success" title="Sucesso" content="Operação concluída!" />
<Callout variant="tip" title="Dica" content="Experimente esta abordagem." />
```

---

### 10. CodeBlock

```tsx
interface CodeBlockProps {
  language?: string;
  content: string;
}

export function CodeBlock({ language, content }: CodeBlockProps) {
  return (
    <div className="my-6 rounded-lg overflow-hidden border border-border/30">
      {language && (
        <div className="px-4 py-2 bg-muted/30 border-b border-border/30">
          <span className="text-xs font-mono text-muted-foreground uppercase">
            {language}
          </span>
        </div>
      )}
      <pre className="p-4 bg-muted/10 overflow-x-auto">
        <code className="text-sm font-mono text-foreground/90">
          {content}
        </code>
      </pre>
    </div>
  );
}
```

**Uso:**
```tsx
<CodeBlock 
  language="javascript" 
  content={`const greeting = "Hello World";
console.log(greeting);`} 
/>
```

---

### 11. Highlight (Inline)

```tsx
interface HighlightProps {
  content: string;
  color?: 'primary' | 'accent' | 'warning';
}

export function Highlight({ content, color = 'primary' }: HighlightProps) {
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
}
```

**Uso:**
```tsx
<p>
  Este é um texto com <Highlight content="destaque primário" /> e também
  <Highlight content="destaque warning" color="warning" />.
</p>
```

---

### 12. Divider

```tsx
interface DividerProps {
  style?: 'solid' | 'dashed' | 'gradient';
}

export function Divider({ style = 'solid' }: DividerProps) {
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
}
```

**Uso:**
```tsx
<Divider />
<Divider style="dashed" />
<Divider style="gradient" />
```

---

### 13. FeatureGrid

```tsx
interface FeatureGridProps {
  items: Array<{
    title: string;
    description: string;
    icon?: string;
  }>;
}

export function FeatureGrid({ items }: FeatureGridProps) {
  return (
    <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-4">
      {items.map((item, i) => (
        <div 
          key={i} 
          className="p-4 rounded-lg border border-border/30 bg-card/20 hover:bg-card/40 transition-colors"
        >
          <h4 className="font-mono font-semibold text-foreground mb-2">
            {item.title}
          </h4>
          <p className="text-sm text-muted-foreground">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
}
```

**Uso:**
```tsx
<FeatureGrid items={[
  { title: "Performance", description: "Otimizado para máxima velocidade" },
  { title: "Segurança", description: "Proteção de dados avançada" },
  { title: "Escalabilidade", description: "Cresce com sua demanda" },
  { title: "Suporte", description: "Atendimento 24/7" },
]} />
```

---

### 14. ComparisonTable

```tsx
interface ComparisonTableProps {
  headers: string[];
  rows: string[][];
}

export function ComparisonTable({ headers, rows }: ComparisonTableProps) {
  return (
    <div className="my-8 overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            {headers.map((header, i) => (
              <th 
                key={i} 
                className="px-4 py-3 text-left font-mono font-semibold text-foreground bg-muted/30 border border-border/30 first:rounded-tl-lg last:rounded-tr-lg"
              >
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
}
```

**Uso:**
```tsx
<ComparisonTable 
  headers={["Recurso", "Plano Free", "Plano Pro"]}
  rows={[
    ["Usuários", "1", "Ilimitado"],
    ["Armazenamento", "5GB", "100GB"],
    ["Suporte", "Email", "24/7 Chat"],
  ]}
/>
```

---

### 15. LinkBlock

```tsx
import { ExternalLink } from 'lucide-react';

interface LinkBlockProps {
  href: string;
  text: string;
  description?: string;
  external?: boolean;
}

export function LinkBlock({ href, text, description, external }: LinkBlockProps) {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className="my-4 block p-4 rounded-lg border border-border/50 bg-card/30 hover:border-primary/50 hover:bg-card/50 transition-all duration-300 group"
    >
      <div className="flex items-center gap-2">
        <span className="font-mono font-medium text-primary group-hover:underline">
          {text}
        </span>
        {external && <ExternalLink size={14} className="text-muted-foreground" />}
      </div>
      {description && (
        <p className="mt-1 text-sm text-muted-foreground">
          {description}
        </p>
      )}
    </a>
  );
}
```

**Uso:**
```tsx
<LinkBlock 
  href="https://example.com" 
  text="Visite nosso site" 
  description="Conheça mais sobre nossos produtos"
  external 
/>
```

---

### 16. StyledText

```tsx
interface StyledTextProps {
  content: string;
  font?: 'mono' | 'serif' | 'sans';
  size?: 'sm' | 'base' | 'lg' | 'xl';
  color?: string;
  weight?: 'normal' | 'medium' | 'bold';
}

export function StyledText({ 
  content, 
  font = 'sans', 
  size = 'base', 
  color, 
  weight = 'normal' 
}: StyledTextProps) {
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
}
```

---

## 📋 TypeScript Types

```typescript
// types/rich-content.ts
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
```

---

## 🎯 Componente Principal RichContent

```tsx
import { motion } from 'framer-motion';

interface RichContentProps {
  blocks: RichContentBlock[];
  className?: string;
}

function renderBlock(block: RichContentBlock, index: number) {
  const key = `block-${index}`;
  
  switch (block.type) {
    case 'paragraph':
      return <Paragraph key={key} content={block.content} className={block.className} />;
    case 'heading':
      return <Heading key={key} level={block.level} content={block.content} id={block.id} />;
    case 'image':
      return <ContentImage key={key} {...block} />;
    case 'video':
      return <VideoEmbed key={key} {...block} />;
    case 'youtube':
      return <YouTubeEmbed key={key} {...block} />;
    case 'gif':
      return <GifEmbed key={key} {...block} />;
    case 'list':
      return <ContentList key={key} items={block.items} ordered={block.ordered} />;
    case 'link-block':
      return <LinkBlock key={key} {...block} />;
    case 'blockquote':
      return <Blockquote key={key} {...block} />;
    case 'callout':
      return <Callout key={key} {...block} />;
    case 'code':
      return <CodeBlock key={key} {...block} />;
    case 'highlight':
      return <Highlight key={key} {...block} />;
    case 'divider':
      return <Divider key={key} style={block.style} />;
    case 'feature-grid':
      return <FeatureGrid key={key} items={block.items} />;
    case 'comparison-table':
      return <ComparisonTable key={key} {...block} />;
    case 'styled-text':
      return <StyledText key={key} {...block} />;
    default:
      return null;
  }
}

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
```

---

## 📝 Exemplo de Uso Completo

```tsx
const exampleContent: RichContentBlock[] = [
  { type: 'heading', level: 2, content: 'Introdução ao Produto' },
  { type: 'paragraph', content: 'Este é um parágrafo com <strong>texto em negrito</strong> e <em>itálico</em>.' },
  { type: 'callout', variant: 'info', title: 'Nota Importante', content: 'Lembre-se de configurar as variáveis de ambiente.' },
  { type: 'list', items: ['Primeiro item', 'Segundo item', 'Terceiro item'] },
  { type: 'image', src: '/screenshot.jpg', alt: 'Screenshot', caption: 'Interface do aplicativo' },
  { type: 'youtube', videoId: 'dQw4w9WgXcQ', title: 'Tutorial em vídeo' },
  { type: 'feature-grid', items: [
    { title: 'Rápido', description: 'Performance otimizada' },
    { title: 'Seguro', description: 'Criptografia de ponta' },
  ]},
  { type: 'comparison-table', headers: ['Feature', 'Free', 'Pro'], rows: [
    ['Usuários', '1', 'Ilimitado'],
    ['Suporte', 'Email', '24/7'],
  ]},
  { type: 'code', language: 'typescript', content: 'const x: string = "Hello";' },
  { type: 'blockquote', content: 'A simplicidade é a sofisticação suprema.', author: 'Leonardo da Vinci' },
  { type: 'divider', style: 'gradient' },
];

// Renderização
<RichContent blocks={exampleContent} />
```

---

## 🎨 CSS Equivalente (para referência)

```css
/* Paragraph */
.paragraph {
  font-size: 1rem;
  line-height: 1.625;
  color: hsl(0 0% 55%);
}

@media (min-width: 768px) {
  .paragraph { font-size: 1.125rem; }
}

/* Headings */
h2 {
  font-size: 1.5rem;
  font-weight: 700;
  font-family: 'IBM Plex Mono', monospace;
  margin-top: 3rem;
  margin-bottom: 1.5rem;
  color: hsl(0 0% 96%);
}

h3 {
  font-size: 1.25rem;
  font-weight: 600;
  font-family: 'IBM Plex Mono', monospace;
  margin-top: 2.5rem;
  margin-bottom: 1rem;
  color: hsl(0 0% 96%);
}

h4 {
  font-size: 1.125rem;
  font-weight: 500;
  font-family: 'IBM Plex Mono', monospace;
  margin-top: 2rem;
  margin-bottom: 0.75rem;
  color: hsl(0 0% 96%);
}

/* Lists */
ul, ol {
  margin: 1.5rem 0;
  padding-left: 1.5rem;
}

ul { list-style-type: disc; }
ol { list-style-type: decimal; }

ul::marker, ol::marker {
  color: hsl(220 100% 73%);
}

li {
  font-size: 1rem;
  line-height: 1.625;
  color: hsl(0 0% 55%);
  padding-left: 0.5rem;
  margin-bottom: 0.5rem;
}

/* Image */
figure {
  margin: 2rem 0;
}

figure > div {
  overflow: hidden;
  border-radius: 0.5rem;
  border: 1px solid hsl(0 0% 14% / 0.3);
}

figure img {
  width: 100%;
  height: auto;
  object-fit: cover;
  transition: transform 500ms;
}

figure img:hover {
  transform: scale(1.02);
}

figcaption {
  margin-top: 0.75rem;
  text-align: center;
  font-size: 0.875rem;
  color: hsl(0 0% 55%);
  font-family: 'IBM Plex Mono', monospace;
}

/* Blockquote */
blockquote {
  margin: 2rem 0;
  padding: 1rem 1rem 1rem 1.5rem;
  border-left: 4px solid hsl(220 100% 73% / 0.5);
  background: hsl(0 0% 5% / 0.2);
  border-radius: 0 0.5rem 0.5rem 0;
}

blockquote p {
  font-size: 1.125rem;
  font-style: italic;
  color: hsl(0 0% 96% / 0.9);
  line-height: 1.625;
}

/* Callout */
.callout {
  margin: 1.5rem 0;
  padding: 1rem;
  border-radius: 0.5rem;
  display: flex;
  gap: 0.75rem;
}

.callout-info {
  background: hsl(217 91% 60% / 0.1);
  border: 1px solid hsl(217 91% 60% / 0.3);
}

.callout-warning {
  background: hsl(38 92% 50% / 0.1);
  border: 1px solid hsl(38 92% 50% / 0.3);
}

.callout-success {
  background: hsl(142 76% 36% / 0.1);
  border: 1px solid hsl(142 76% 36% / 0.3);
}

.callout-tip {
  background: hsl(220 100% 73% / 0.1);
  border: 1px solid hsl(220 100% 73% / 0.3);
}

/* Code Block */
.code-block {
  margin: 1.5rem 0;
  border-radius: 0.5rem;
  overflow: hidden;
  border: 1px solid hsl(0 0% 14% / 0.3);
}

.code-block-header {
  padding: 0.5rem 1rem;
  background: hsl(0 0% 14% / 0.3);
  border-bottom: 1px solid hsl(0 0% 14% / 0.3);
}

.code-block pre {
  padding: 1rem;
  background: hsl(0 0% 14% / 0.1);
  overflow-x: auto;
  margin: 0;
}

.code-block code {
  font-size: 0.875rem;
  font-family: 'IBM Plex Mono', monospace;
  color: hsl(0 0% 96% / 0.9);
}

/* Feature Grid */
.feature-grid {
  margin: 2rem 0;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

@media (min-width: 768px) {
  .feature-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.feature-card {
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid hsl(0 0% 14% / 0.3);
  background: hsl(0 0% 5% / 0.2);
}

/* Comparison Table */
.comparison-table table {
  width: 100%;
  border-collapse: collapse;
}

.comparison-table th {
  padding: 0.75rem 1rem;
  text-align: left;
  font-family: 'IBM Plex Mono', monospace;
  font-weight: 600;
  color: hsl(0 0% 96%);
  background: hsl(0 0% 14% / 0.3);
  border: 1px solid hsl(0 0% 14% / 0.3);
}

.comparison-table td {
  padding: 0.75rem 1rem;
  color: hsl(0 0% 55%);
  border: 1px solid hsl(0 0% 14% / 0.3);
}

/* Dividers */
.divider-solid {
  margin: 3rem 0;
  height: 1px;
  background: hsl(0 0% 14% / 0.5);
}

.divider-gradient {
  margin: 3rem 0;
  height: 1px;
  background: linear-gradient(to right, transparent, hsl(220 100% 73% / 0.5), transparent);
}
```

---

## 🔗 Ícones Utilizados (Lucide React)

```tsx
import { 
  Info,           // Callout info
  AlertCircle,    // Callout warning
  CheckCircle2,   // Callout success
  Lightbulb,      // Callout tip
  ExternalLink,   // Link block external indicator
} from 'lucide-react';
```
