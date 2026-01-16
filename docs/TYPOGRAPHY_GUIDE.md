# Typography Guide - 4Simmers

Guia de tipografia do projeto com fontes, pesos e tamanhos para cada elemento.

---

## Fontes Utilizadas

| Fonte | Uso | Pesos Disponíveis |
|-------|-----|-------------------|
| **IBM Plex Mono** | Headlines, taglines, navegação, CTAs, código | 400, 500, 600, 700 |
| **Inter** | Corpo de texto, parágrafos, descrições | 400, 500, 600 |

---

## Mapeamento por Elemento

### Headlines (Títulos Principais)

| Elemento | Fonte | Tamanho (Mobile → Desktop) | Peso | Tracking |
|----------|-------|---------------------------|------|----------|
| H1 Hero | IBM Plex Mono | 30px → 60px (`text-3xl` → `text-6xl`) | 700 (bold) | tight |
| H2 Section | IBM Plex Mono | 24px → 36px (`text-2xl` → `text-4xl`) | 600 (semibold) | tight |
| H3 Card Title | IBM Plex Mono | 18px → 24px (`text-lg` → `text-2xl`) | 600 (semibold) | normal |
| H4 Subheading | IBM Plex Mono | 16px → 18px (`text-base` → `text-lg`) | 500 (medium) | normal |

### Taglines e Labels

| Elemento | Fonte | Tamanho | Peso | Tracking | Transform |
|----------|-------|---------|------|----------|-----------|
| Tagline Hero | IBM Plex Mono | 12px (`text-xs`) | 400 | 0.25em | uppercase |
| Section Label | IBM Plex Mono | 12px (`text-xs`) | 500 | 0.2em | uppercase |
| Badge/Tag | IBM Plex Mono | 12px (`text-xs`) | 500 | 0.05em | uppercase |

### Corpo de Texto

| Elemento | Fonte | Tamanho | Peso | Line Height |
|----------|-------|---------|------|-------------|
| Body Default | Inter | 16px (`text-base`) | 400 | 1.75 (relaxed) |
| Body Small | Inter | 14px (`text-sm`) | 400 | 1.625 |
| Body Large | Inter | 18px (`text-lg`) | 400 | 1.75 |
| Lead Paragraph | Inter | 18px → 20px (`text-lg` → `text-xl`) | 400 | 1.75 |

### Navegação e UI

| Elemento | Fonte | Tamanho | Peso | Tracking |
|----------|-------|---------|------|----------|
| Nav Links | Inter | 14px (`text-sm`) | 500 | normal |
| Button Primary | IBM Plex Mono | 14px (`text-sm`) | 500 | 0.05em |
| Button Secondary | Inter | 14px (`text-sm`) | 500 | normal |
| Footer Links | Inter | 14px (`text-sm`) | 400 | normal |
| Footer Copyright | IBM Plex Mono | 12px (`text-xs`) | 400 | normal |

### Cards e Componentes

| Elemento | Fonte | Tamanho | Peso |
|----------|-------|---------|------|
| Card Title | IBM Plex Mono | 18px (`text-lg`) | 600 |
| Card Description | Inter | 14px (`text-sm`) | 400 |
| Card Meta (date, category) | IBM Plex Mono | 12px (`text-xs`) | 400 |
| Price | IBM Plex Mono | 24px (`text-2xl`) | 700 |

### Rich Content (Descrições de Produto)

| Elemento | Fonte | Tamanho | Peso | Classes Tailwind |
|----------|-------|---------|------|------------------|
| Paragraph | Inter | 16px | 400 | `text-base leading-relaxed text-muted-foreground` |
| Heading H2 | IBM Plex Mono | 24px | 600 | `text-2xl font-mono font-semibold text-foreground` |
| Heading H3 | IBM Plex Mono | 20px | 600 | `text-xl font-mono font-semibold text-foreground` |
| Heading H4 | IBM Plex Mono | 18px | 500 | `text-lg font-mono font-medium text-foreground` |
| List Item | Inter | 16px | 400 | `text-base text-muted-foreground` |
| Blockquote | Inter | 18px | 400 | `text-lg italic text-muted-foreground` |
| Code Inline | IBM Plex Mono | 14px | 400 | `text-sm font-mono bg-muted px-1.5 py-0.5 rounded` |
| Code Block | IBM Plex Mono | 14px | 400 | `text-sm font-mono` |
| Callout Text | Inter | 14px | 500 | `text-sm font-medium` |
| Table Header | IBM Plex Mono | 12px | 600 | `text-xs font-mono font-semibold uppercase tracking-wider` |
| Table Cell | Inter | 14px | 400 | `text-sm` |

---

## Tamanhos de Referência (Tailwind)

| Classe | Tamanho | Uso Recomendado |
|--------|---------|-----------------|
| `text-xs` | 12px (0.75rem) | Labels, meta info, badges |
| `text-sm` | 14px (0.875rem) | Descrições, navegação, botões |
| `text-base` | 16px (1rem) | Corpo de texto padrão |
| `text-lg` | 18px (1.125rem) | Lead paragraphs, card titles |
| `text-xl` | 20px (1.25rem) | Subheadings |
| `text-2xl` | 24px (1.5rem) | Section titles, H3 |
| `text-3xl` | 30px (1.875rem) | H2, hero mobile |
| `text-4xl` | 36px (2.25rem) | H1 tablet |
| `text-5xl` | 48px (3rem) | H1 desktop small |
| `text-6xl` | 60px (3.75rem) | H1 hero desktop |

---

## Classes Utilitárias

```css
/* Aplicar fonte mono */
.font-mono { font-family: 'IBM Plex Mono', monospace; }

/* Aplicar fonte sans (padrão) */
.font-sans { font-family: 'Inter', system-ui, sans-serif; }

/* Classe auxiliar para mono */
.mono { font-family: 'IBM Plex Mono', monospace; }
```

---

## Exemplos de Uso

### Hero Headline
```tsx
<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-mono font-bold tracking-tight">
  Título Principal
</h1>
```

### Tagline
```tsx
<span className="font-mono text-muted-foreground text-xs tracking-[0.25em] uppercase">
  Subtítulo técnico
</span>
```

### Corpo de Texto
```tsx
<p className="text-base text-muted-foreground leading-relaxed">
  Parágrafo com fonte Inter e espaçamento confortável para leitura.
</p>
```

### Botão CTA
```tsx
<button className="font-mono text-sm font-medium tracking-wide">
  Call to Action
</button>
```

### Card Title
```tsx
<h3 className="font-mono text-lg font-semibold text-foreground">
  Título do Card
</h3>
```

---

## Instalação das Fontes

As fontes são instaladas via `@fontsource`:

```bash
npm install @fontsource/ibm-plex-mono @fontsource/inter
```

Importar no CSS principal:

```css
@import '@fontsource/ibm-plex-mono/400.css';
@import '@fontsource/ibm-plex-mono/500.css';
@import '@fontsource/ibm-plex-mono/600.css';
@import '@fontsource/ibm-plex-mono/700.css';
@import '@fontsource/inter/400.css';
@import '@fontsource/inter/500.css';
@import '@fontsource/inter/600.css';
```
