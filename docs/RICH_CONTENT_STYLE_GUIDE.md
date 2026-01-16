# 4Simmers Rich Content Style Guide

Este documento serve como referência de estilos para replicar os componentes de conteúdo rico do projeto. Use estas classes e estruturas ao criar editores de texto ou CMS.

## Design Tokens

### Cores Base (HSL)
```css
--background: 0 0% 2%;           /* Preto profundo */
--foreground: 0 0% 96%;          /* Branco off-white */
--card: 0 0% 5%;                 /* Cards */
--muted: 0 0% 14%;               /* Elementos desativados */
--muted-foreground: 0 0% 55%;    /* Texto secundário */
--primary: 220 100% 73%;         /* Azul elétrico #7AA7FF */
--border: 0 0% 14%;              /* Bordas */
```

### Fontes
- **Headers/Monospace**: `font-family: 'IBM Plex Mono', monospace;`
- **Body/Text**: `font-family: 'Inter', sans-serif;`

---

## Componentes

### 1. Parágrafo

```tsx
<p className="text-base md:text-lg text-muted-foreground leading-relaxed">
  Conteúdo do parágrafo aqui...
</p>
```

**CSS equivalente:**
```css
.paragraph {
  font-size: 1rem;           /* md: 1.125rem */
  line-height: 1.625;
  color: hsl(0 0% 55%);      /* --muted-foreground */
}
```

---

### 2. Headings

```tsx
/* H2 */
<h2 className="text-2xl md:text-3xl font-bold font-mono mt-12 mb-6 text-foreground">
  Título H2
</h2>

/* H3 */
<h3 className="text-xl md:text-2xl font-semibold font-mono mt-10 mb-4 text-foreground">
  Título H3
</h3>

/* H4 */
<h4 className="text-lg md:text-xl font-medium font-mono mt-8 mb-3 text-foreground">
  Título H4
</h4>
```

**CSS equivalente:**
```css
h2 {
  font-size: 1.5rem;         /* md: 1.875rem */
  font-weight: 700;
  font-family: 'IBM Plex Mono', monospace;
  margin-top: 3rem;
  margin-bottom: 1.5rem;
  color: hsl(0 0% 96%);      /* --foreground */
}

h3 {
  font-size: 1.25rem;        /* md: 1.5rem */
  font-weight: 600;
  font-family: 'IBM Plex Mono', monospace;
  margin-top: 2.5rem;
  margin-bottom: 1rem;
  color: hsl(0 0% 96%);
}

h4 {
  font-size: 1.125rem;       /* md: 1.25rem */
  font-weight: 500;
  font-family: 'IBM Plex Mono', monospace;
  margin-top: 2rem;
  margin-bottom: 0.75rem;
  color: hsl(0 0% 96%);
}
```

---

### 3. Listas (Bullets/Numbered)

```tsx
/* Lista não ordenada */
<ul className="my-6 space-y-2 pl-6 list-disc marker:text-primary">
  <li className="text-base md:text-lg text-muted-foreground leading-relaxed pl-2">
    Item da lista
  </li>
</ul>

/* Lista ordenada */
<ol className="my-6 space-y-2 pl-6 list-decimal marker:text-primary">
  <li className="text-base md:text-lg text-muted-foreground leading-relaxed pl-2">
    Item numerado
  </li>
</ol>
```

**CSS equivalente:**
```css
ul, ol {
  margin: 1.5rem 0;
  padding-left: 1.5rem;
}

ul { list-style-type: disc; }
ol { list-style-type: decimal; }

ul::marker, ol::marker {
  color: hsl(220 100% 73%);  /* --primary azul */
}

li {
  font-size: 1rem;           /* md: 1.125rem */
  line-height: 1.625;
  color: hsl(0 0% 55%);
  padding-left: 0.5rem;
  margin-bottom: 0.5rem;
}
```

---

### 4. Imagem

```tsx
<figure className="my-8">
  <div className="overflow-hidden rounded-lg border border-border/30">
    <img 
      src="url" 
      alt="descrição"
      className="w-full h-auto object-cover transition-transform duration-500 hover:scale-[1.02]"
    />
  </div>
  <figcaption className="mt-3 text-center text-sm text-muted-foreground font-mono">
    Legenda da imagem
  </figcaption>
</figure>
```

**CSS equivalente:**
```css
figure {
  margin: 2rem 0;
}

figure > div {
  overflow: hidden;
  border-radius: 0.5rem;
  border: 1px solid hsl(0 0% 14% / 0.3);  /* border-border/30 */
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
```

---

### 5. Vídeo / YouTube Embed

```tsx
/* YouTube */
<div className="my-8">
  <div className="relative aspect-video overflow-hidden rounded-lg border border-border/30 bg-muted/20">
    <iframe
      src="https://www.youtube.com/embed/VIDEO_ID"
      className="absolute inset-0 w-full h-full"
      allowFullScreen
    />
  </div>
  <p className="mt-3 text-center text-sm text-muted-foreground font-mono">
    Título do vídeo
  </p>
</div>
```

**CSS equivalente:**
```css
.video-container {
  margin: 2rem 0;
}

.video-wrapper {
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border-radius: 0.5rem;
  border: 1px solid hsl(0 0% 14% / 0.3);
  background: hsl(0 0% 14% / 0.2);
}

.video-wrapper iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}
```

---

### 6. Blockquote (Citação)

```tsx
<blockquote className="my-8 pl-6 border-l-4 border-primary/50 bg-card/20 py-4 pr-4 rounded-r-lg">
  <p className="text-lg md:text-xl italic text-foreground/90 leading-relaxed">
    "Texto da citação aqui"
  </p>
  <footer className="mt-4 text-sm text-muted-foreground font-mono">
    <span className="font-medium">— Autor</span>
    <span className="ml-2 text-muted-foreground/70">(Fonte)</span>
  </footer>
</blockquote>
```

**CSS equivalente:**
```css
blockquote {
  margin: 2rem 0;
  padding: 1rem 1rem 1rem 1.5rem;
  border-left: 4px solid hsl(220 100% 73% / 0.5);  /* primary/50 */
  background: hsl(0 0% 5% / 0.2);                   /* card/20 */
  border-radius: 0 0.5rem 0.5rem 0;
}

blockquote p {
  font-size: 1.125rem;       /* md: 1.25rem */
  font-style: italic;
  color: hsl(0 0% 96% / 0.9);
  line-height: 1.625;
}

blockquote footer {
  margin-top: 1rem;
  font-size: 0.875rem;
  color: hsl(0 0% 55%);
  font-family: 'IBM Plex Mono', monospace;
}
```

---

### 7. Callouts (Info, Warning, Success, Tip)

```tsx
/* Estrutura base */
<div className="my-6 p-4 rounded-lg border [VARIANT_CLASSES]">
  <div className="flex items-start gap-3">
    <Icon size={20} className="mt-0.5 flex-shrink-0 [ICON_COLOR]" />
    <div>
      <p className="font-mono font-semibold mb-1 [TITLE_COLOR]">Título</p>
      <p className="text-muted-foreground">Conteúdo do callout</p>
    </div>
  </div>
</div>
```

**Variantes:**

| Tipo | Background | Border | Texto/Ícone |
|------|------------|--------|-------------|
| **info** | `bg-blue-500/10` | `border-blue-500/30` | `text-blue-400` |
| **warning** | `bg-amber-500/10` | `border-amber-500/30` | `text-amber-400` |
| **success** | `bg-green-500/10` | `border-green-500/30` | `text-green-400` |
| **tip** | `bg-primary/10` | `border-primary/30` | `text-primary` |

**CSS equivalente (exemplo info):**
```css
.callout-info {
  margin: 1.5rem 0;
  padding: 1rem;
  border-radius: 0.5rem;
  background: hsl(217 91% 60% / 0.1);   /* blue-500/10 */
  border: 1px solid hsl(217 91% 60% / 0.3);
}

.callout-info .icon {
  color: hsl(217 91% 65%);              /* blue-400 */
  flex-shrink: 0;
  margin-top: 0.125rem;
}

.callout-info .title {
  font-family: 'IBM Plex Mono', monospace;
  font-weight: 600;
  color: hsl(217 91% 65%);
  margin-bottom: 0.25rem;
}

.callout-info .content {
  color: hsl(0 0% 55%);
}
```

**Ícones (Lucide React):**
- info: `<Info />`
- warning: `<AlertCircle />`
- success: `<CheckCircle2 />`
- tip: `<Lightbulb />`

---

### 8. Code Block

```tsx
<div className="my-6 rounded-lg overflow-hidden border border-border/30">
  {/* Header com linguagem */}
  <div className="px-4 py-2 bg-muted/30 border-b border-border/30">
    <span className="text-xs font-mono text-muted-foreground uppercase">javascript</span>
  </div>
  {/* Código */}
  <pre className="p-4 bg-muted/10 overflow-x-auto">
    <code className="text-sm font-mono text-foreground/90">
      const example = "código aqui";
    </code>
  </pre>
</div>
```

**CSS equivalente:**
```css
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

.code-block-header span {
  font-size: 0.75rem;
  font-family: 'IBM Plex Mono', monospace;
  color: hsl(0 0% 55%);
  text-transform: uppercase;
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
```

---

### 9. Highlight (Destaque inline)

```tsx
<span className="px-2 py-1 rounded font-medium [COLOR_VARIANT]">
  texto destacado
</span>
```

**Variantes:**

| Cor | Classes |
|-----|---------|
| **primary** | `bg-primary/20 text-primary` |
| **accent** | `bg-accent/30 text-accent-foreground` |
| **warning** | `bg-amber-500/20 text-amber-400` |

**CSS equivalente:**
```css
.highlight-primary {
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-weight: 500;
  background: hsl(220 100% 73% / 0.2);
  color: hsl(220 100% 73%);
}

.highlight-warning {
  background: hsl(38 92% 50% / 0.2);
  color: hsl(38 92% 60%);
}
```

---

### 10. Divider (Separador)

```tsx
/* Solid */
<hr className="my-12 border-0 h-px bg-border/50" />

/* Dashed */
<hr className="my-12 border-t border-dashed border-border/50 bg-transparent" />

/* Gradient */
<div className="my-12 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
```

**CSS equivalente:**
```css
.divider-solid {
  margin: 3rem 0;
  border: none;
  height: 1px;
  background: hsl(0 0% 14% / 0.5);
}

.divider-dashed {
  margin: 3rem 0;
  border-top: 1px dashed hsl(0 0% 14% / 0.5);
  background: transparent;
}

.divider-gradient {
  margin: 3rem 0;
  height: 1px;
  background: linear-gradient(to right, transparent, hsl(220 100% 73% / 0.5), transparent);
}
```

---

### 11. Feature Grid (Cards de Features)

```tsx
<div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-4">
  <div className="p-4 rounded-lg border border-border/30 bg-card/20">
    <h4 className="font-mono font-semibold text-foreground mb-2">
      Título da Feature
    </h4>
    <p className="text-sm text-muted-foreground">
      Descrição da feature aqui
    </p>
  </div>
</div>
```

**CSS equivalente:**
```css
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

.feature-card h4 {
  font-family: 'IBM Plex Mono', monospace;
  font-weight: 600;
  color: hsl(0 0% 96%);
  margin-bottom: 0.5rem;
}

.feature-card p {
  font-size: 0.875rem;
  color: hsl(0 0% 55%);
}
```

---

### 12. Comparison Table (Tabela Comparativa)

```tsx
<div className="my-8 overflow-x-auto">
  <table className="w-full border-collapse">
    <thead>
      <tr>
        <th className="px-4 py-3 text-left font-mono font-semibold text-foreground bg-muted/30 border border-border/30 first:rounded-tl-lg last:rounded-tr-lg">
          Header
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td className="px-4 py-3 text-muted-foreground border border-border/30">
          Conteúdo
        </td>
      </tr>
    </tbody>
  </table>
</div>
```

**CSS equivalente:**
```css
.comparison-table {
  margin: 2rem 0;
  overflow-x: auto;
}

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

.comparison-table th:first-child {
  border-top-left-radius: 0.5rem;
}

.comparison-table th:last-child {
  border-top-right-radius: 0.5rem;
}

.comparison-table td {
  padding: 0.75rem 1rem;
  color: hsl(0 0% 55%);
  border: 1px solid hsl(0 0% 14% / 0.3);
}
```

---

### 13. Link Block (Card de Link)

```tsx
<a
  href="url"
  className="my-4 block p-4 rounded-lg border border-border/50 bg-card/30 hover:border-primary/50 hover:bg-card/50 transition-all duration-300 group"
>
  <div className="flex items-center gap-2">
    <span className="font-mono font-medium text-primary group-hover:underline">
      Texto do Link
    </span>
    <ExternalLink size={14} className="text-muted-foreground" />
  </div>
  <p className="mt-1 text-sm text-muted-foreground">
    Descrição opcional
  </p>
</a>
```

**CSS equivalente:**
```css
.link-block {
  display: block;
  margin: 1rem 0;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid hsl(0 0% 14% / 0.5);
  background: hsl(0 0% 5% / 0.3);
  transition: all 300ms;
}

.link-block:hover {
  border-color: hsl(220 100% 73% / 0.5);
  background: hsl(0 0% 5% / 0.5);
}

.link-block .title {
  font-family: 'IBM Plex Mono', monospace;
  font-weight: 500;
  color: hsl(220 100% 73%);
}

.link-block:hover .title {
  text-decoration: underline;
}

.link-block .description {
  margin-top: 0.25rem;
  font-size: 0.875rem;
  color: hsl(0 0% 55%);
}
```

---

## Estrutura JSON dos Blocos

Para referência, aqui está a tipagem TypeScript de todos os blocos suportados:

```typescript
type RichContentBlock =
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

## Exemplo Completo de Uso

```json
[
  { "type": "heading", "level": 2, "content": "Introdução" },
  { "type": "paragraph", "content": "Texto do parágrafo com <strong>negrito</strong> e <em>itálico</em>." },
  { "type": "callout", "variant": "info", "title": "Nota", "content": "Informação importante aqui." },
  { "type": "list", "items": ["Item 1", "Item 2", "Item 3"], "ordered": false },
  { "type": "image", "src": "/imagem.jpg", "alt": "Descrição", "caption": "Legenda" },
  { "type": "feature-grid", "items": [
    { "title": "Feature 1", "description": "Descrição da feature" },
    { "title": "Feature 2", "description": "Outra descrição" }
  ]},
  { "type": "divider", "style": "gradient" }
]
```

---

## Dependências Necessárias

- **Tailwind CSS** - Framework de estilos
- **Lucide React** - Ícones (Info, AlertCircle, CheckCircle2, Lightbulb, ExternalLink)
- **IBM Plex Mono** - Fonte monospace (`@fontsource/ibm-plex-mono`)
- **Inter** - Fonte body (`@fontsource/inter`)
