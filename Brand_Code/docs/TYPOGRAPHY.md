# Guia de Tipografia - Brand Page

---

## Fontes Utilizadas

### 1. IBM Plex Mono
- **Uso**: Headers, badges, labels técnicos
- **Pesos disponíveis**: 400, 500, 600, 700
- **Classe Tailwind**: `font-mono`

### 2. Inter
- **Uso**: Body text, descrições, parágrafos
- **Pesos disponíveis**: 400, 500, 600
- **Classe Tailwind**: `font-sans` (padrão)

---

## Instalação

```bash
npm install @fontsource/ibm-plex-mono @fontsource/inter
```

### Imports no CSS
```css
@import '@fontsource/ibm-plex-mono/400.css';
@import '@fontsource/ibm-plex-mono/500.css';
@import '@fontsource/ibm-plex-mono/600.css';
@import '@fontsource/ibm-plex-mono/700.css';
@import '@fontsource/inter/400.css';
@import '@fontsource/inter/500.css';
@import '@fontsource/inter/600.css';
```

---

## Hierarquia Tipográfica

### H1 - Hero Headline
```tsx
<h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-mono font-bold leading-[0.95]">
  From Simmers,
  <span className="block">For Simmers</span>
</h1>
```

| Breakpoint | Tamanho | Equivalente |
|------------|---------|-------------|
| Base | text-5xl | 48px |
| sm | text-6xl | 60px |
| md | text-7xl | 72px |
| lg | text-8xl | 96px |

### H2 - Section Headlines
```tsx
<h2 className="text-4xl md:text-5xl lg:text-6xl font-mono font-bold mb-6">
  What We Stand For
</h2>
```

| Breakpoint | Tamanho | Equivalente |
|------------|---------|-------------|
| Base | text-4xl | 36px |
| md | text-5xl | 48px |
| lg | text-6xl | 60px |

### H3 - Card Titles
```tsx
<h3 className="font-mono font-bold text-2xl mb-4">
  Precision First
</h3>
```

### H4 - Principle Titles
```tsx
<h4 className="font-mono font-semibold text-lg mb-2">
  Performance Matters
</h4>
```

---

## Body Text

### Hero Description
```tsx
<p className="text-xl md:text-2xl text-muted-foreground max-w-3xl leading-relaxed">
  Founded in early 2021...
</p>
```

### Story Paragraphs
```tsx
<div className="space-y-5 text-muted-foreground text-lg leading-relaxed">
  <p>...</p>
  <p>...</p>
</div>
```

### Card Descriptions
```tsx
<p className="text-muted-foreground text-lg leading-relaxed">
  Every texture, feature...
</p>
```

### Smaller Descriptions
```tsx
<p className="text-muted-foreground">
  We maintain and update...
</p>
```

---

## Labels & Badges

### Section Badge
```tsx
<span className="font-mono text-muted-foreground text-xs tracking-[0.2em] uppercase">
  Our Values
</span>
```

### Hero Badge (destaque)
```tsx
<span className="font-mono text-foreground/80 text-xs tracking-[0.25em] uppercase">
  The Philosophy
</span>
```

---

## Cores de Texto

| Classe | Uso |
|--------|-----|
| `text-foreground` | Texto principal (branco) |
| `text-foreground/80` | Texto principal com leve transparência |
| `text-muted-foreground` | Texto secundário (cinza) |
| `text-primary` | Accent color (azul elétrico) |

---

## Leading (Line Height)

| Classe | Valor | Uso |
|--------|-------|-----|
| `leading-[0.95]` | 0.95 | Headlines grandes |
| `leading-tight` | 1.25 | Section headers |
| `leading-relaxed` | 1.625 | Body text |

---

## Letter Spacing

| Classe | Valor | Uso |
|--------|-------|-----|
| `tracking-[0.2em]` | 0.2em | Badge labels |
| `tracking-[0.25em]` | 0.25em | Hero badge (mais espaçado) |

---

## Gradient Text

```tsx
<motion.span 
  className="bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] bg-clip-text text-transparent"
  animate={{ backgroundPosition: ['0%', '200%'] }}
  transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
>
  Stand For
</motion.span>
```

### Como funciona
1. `bg-gradient-to-r` - Gradiente horizontal
2. `from-primary via-accent to-primary` - Cores do gradiente
3. `bg-[length:200%_auto]` - Gradiente 2x mais largo
4. `bg-clip-text text-transparent` - Aplica gradiente ao texto
5. Animação de `backgroundPosition` move o gradiente
