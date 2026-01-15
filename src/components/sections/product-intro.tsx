/**
 * Component: ProductIntro
 * Responsibility: Product description section with rich content support
 * Used by: ProductDetail page
 * 
 * Supports:
 * - Simple text description (string)
 * - Rich content blocks (RichContentBlock[]) for complex formatting
 * - Copy button to export formatted content for CMS/editors
 * 
 * Layout constraints:
 * - Container: max-w-4xl for optimal reading width (~65-75 chars per line)
 * - Prose width: Rich content uses full container width
 * - Images: Can be fullWidth to break out of prose container
 */
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';
import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { RichContent, type RichContentBlock } from '@/components/content/RichContent';
import { toast } from 'sonner';

interface ProductIntroProps {
  /** Simple text description */
  description: string;
  /** Rich formatted content blocks (optional - takes precedence over description) */
  richDescription?: RichContentBlock[];
}

/**
 * Converts RichContentBlock[] to HTML string for clipboard
 * Compatible with most CMS editors (WordPress, Notion, etc.)
 */
function richContentToHtml(blocks: RichContentBlock[]): string {
  return blocks.map(block => {
    switch (block.type) {
      case 'paragraph':
        return `<p>${block.content}</p>`;
      
      case 'heading':
        const tag = `h${block.level}`;
        return `<${tag}>${block.content}</${tag}>`;
      
      case 'image':
        const caption = block.caption ? `<figcaption>${block.caption}</figcaption>` : '';
        return `<figure><img src="${block.src}" alt="${block.alt}" />${caption}</figure>`;
      
      case 'video':
        return `<video src="${block.url}" controls title="${block.title || ''}"></video>`;
      
      case 'youtube':
        return `<iframe src="https://www.youtube.com/embed/${block.videoId}" title="${block.title || 'YouTube video'}"></iframe>`;
      
      case 'gif':
        return `<figure><img src="${block.src}" alt="${block.alt || 'GIF'}" />${block.caption ? `<figcaption>${block.caption}</figcaption>` : ''}</figure>`;
      
      case 'list':
        const listTag = block.ordered ? 'ol' : 'ul';
        const items = block.items.map(item => `<li>${item}</li>`).join('\n');
        return `<${listTag}>\n${items}\n</${listTag}>`;
      
      case 'blockquote':
        return `<blockquote><p>${block.content}</p>${block.author ? `<cite>— ${block.author}</cite>` : ''}</blockquote>`;
      
      case 'callout':
        return `<div class="callout callout-${block.variant}"><p>${block.content}</p></div>`;
      
      case 'code':
        return `<pre><code class="language-${block.language || 'text'}">${block.content}</code></pre>`;
      
      case 'divider':
        return '<hr />';
      
      case 'link-block':
        return `<p><a href="${block.href}">${block.text}</a>${block.description ? ` - ${block.description}` : ''}</p>`;
      
      case 'styled-text':
        let style = '';
        if (block.color) style += `color: ${block.color};`;
        if (block.font) style += `font-family: ${block.font};`;
        if (block.size) style += `font-size: ${block.size};`;
        if (block.weight) style += `font-weight: ${block.weight};`;
        return `<p style="${style}">${block.content}</p>`;
      
      case 'comparison-table':
        const headerCells = block.headers.map(h => `<th>${h}</th>`).join('');
        const tableRows = block.rows.map(row => 
          `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`
        ).join('\n');
        return `<table><thead><tr>${headerCells}</tr></thead><tbody>\n${tableRows}\n</tbody></table>`;
      
      case 'feature-grid':
        const features = block.items.map(f => 
          `<div class="feature"><h4>${f.title}</h4><p>${f.description}</p></div>`
        ).join('\n');
        return `<div class="feature-grid">\n${features}\n</div>`;
      
      case 'highlight':
        return `<mark class="highlight-${block.color || 'primary'}">${block.content}</mark>`;
      
      default:
        return '';
    }
  }).join('\n\n');
}

/**
 * Converts RichContentBlock[] to Markdown string
 * Compatible with GitHub, Notion, most modern editors
 */
function richContentToMarkdown(blocks: RichContentBlock[]): string {
  return blocks.map(block => {
    switch (block.type) {
      case 'paragraph':
        return block.content;
      
      case 'heading':
        const hashes = '#'.repeat(block.level);
        return `${hashes} ${block.content}`;
      
      case 'image':
        const md = `![${block.alt}](${block.src})`;
        return block.caption ? `${md}\n*${block.caption}*` : md;
      
      case 'video':
        return `[▶️ ${block.title || 'Watch Video'}](${block.url})`;
      
      case 'youtube':
        return `[▶️ ${block.title || 'YouTube Video'}](https://www.youtube.com/watch?v=${block.videoId})`;
      
      case 'gif':
        return `![${block.alt || 'GIF'}](${block.src})`;
      
      case 'list':
        return block.items.map((item, i) => 
          block.ordered ? `${i + 1}. ${item}` : `- ${item}`
        ).join('\n');
      
      case 'blockquote':
        const quote = `> ${block.content}`;
        return block.author ? `${quote}\n> — *${block.author}*` : quote;
      
      case 'callout':
        const emoji = { info: 'ℹ️', warning: '⚠️', success: '✅', tip: '💡' }[block.variant];
        return `> ${emoji} **${block.variant.toUpperCase()}:** ${block.content}`;
      
      case 'code':
        return `\`\`\`${block.language || ''}\n${block.content}\n\`\`\``;
      
      case 'divider':
        return '---';
      
      case 'link-block':
        return `[${block.text}](${block.href})${block.description ? ` - ${block.description}` : ''}`;
      
      case 'styled-text':
        return `**${block.content}**`;
      
      case 'comparison-table':
        const header = `| ${block.headers.join(' | ')} |`;
        const separator = `|${block.headers.map(() => '---').join('|')}|`;
        const rows = block.rows.map(row => `| ${row.join(' | ')} |`).join('\n');
        return `${header}\n${separator}\n${rows}`;
      
      case 'feature-grid':
        return block.items.map(f => 
          `### ${f.title}\n${f.description}`
        ).join('\n\n');
      
      case 'highlight':
        return `==${block.content}==`;
      
      default:
        return '';
    }
  }).join('\n\n');
}

export function ProductIntro({ description, richDescription }: ProductIntroProps) {
  const hasRichContent = richDescription && richDescription.length > 0;
  const [copied, setCopied] = useState<'html' | 'md' | null>(null);

  const handleCopy = useCallback(async (format: 'html' | 'md') => {
    if (!richDescription) return;
    
    const content = format === 'html' 
      ? richContentToHtml(richDescription)
      : richContentToMarkdown(richDescription);
    
    try {
      await navigator.clipboard.writeText(content);
      setCopied(format);
      toast.success(`Copiado como ${format === 'html' ? 'HTML' : 'Markdown'}!`);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      toast.error('Erro ao copiar');
    }
  }, [richDescription]);

  return (
    <section className="py-16 md:py-24 bg-card/30">
      <div className="section-container">
        {/* 
          Content area constraints:
          - max-w-4xl: Optimal reading width (896px)
          - This keeps text at comfortable 65-75 characters per line
          - Rich content images can break out with fullWidth option
        */}
        <div className="max-w-4xl">
          {hasRichContent ? (
            <>
              <RichContent blocks={richDescription} />
              
              {/* Copy Buttons for CMS compatibility */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="mt-12 pt-8 border-t border-border/50"
              >
                <p className="text-sm text-muted-foreground mb-4">
                  Copie esta descrição formatada para usar em seu CMS ou editor:
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopy('html')}
                    className="gap-2"
                  >
                    {copied === 'html' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    Copiar como HTML
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopy('md')}
                    className="gap-2"
                  >
                    {copied === 'md' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    Copiar como Markdown
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground/60 mt-3">
                  HTML: WordPress, Webflow, Shopify • Markdown: Notion, GitHub, Ghost
                </p>
              </motion.div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                {description}
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}