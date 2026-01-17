# Brand Page - Complete Documentation

Este diretório contém toda a documentação e código necessário para reproduzir a página **Brand** do projeto 4Simmers. O objetivo é permitir que outra ferramenta (como Cursor) consiga replicar exatamente o mesmo visual e comportamento.

---

## 📁 Estrutura de Arquivos

```
Brand_Code/
├── README.md                    # Este arquivo (documentação principal)
├── pages/
│   └── Brand.tsx               # Componente principal da página
├── lib/
│   ├── motion.ts               # Variants e helpers de animação Framer Motion
│   └── constants.ts            # Constantes usadas na página
├── styles/
│   ├── index.css               # CSS global com variáveis e classes utilitárias
│   └── tailwind.config.ts      # Configuração do Tailwind CSS
└── docs/
    ├── EFFECTS.md              # Documentação detalhada de cada efeito visual
    ├── TYPOGRAPHY.md           # Guia de tipografia
    └── ANIMATIONS.md           # Guia de animações Framer Motion
```

---

## 🎨 Visão Geral do Design

### Estética
- **Estilo**: Ultra-futurista, "boutique tech studio"
- **Tema**: Dark mode com alto contraste (Black & White)
- **Accent**: Electric Blue (`#7AA7FF` / HSL 220 100% 73%)

### Principais Características Visuais
1. **Glassmorphism** - Uso extensivo de `backdrop-blur` e transparências
2. **Mega Animated Orbs** - Esferas grandes com gradiente radial animadas
3. **Parallax Multi-camada** - Efeitos de scroll em diferentes velocidades
4. **Animações Bidirecionais** - Re-ativam ao scrollar para cima
5. **Grid/Scanline Overlays** - Texturas sutis para atmosfera tech

---

## 🔤 Tipografia

### Fontes
```css
/* Fonte principal para headers */
font-family: 'IBM Plex Mono', monospace;

/* Fonte para corpo de texto */
font-family: 'Inter', system-ui, sans-serif;
```

### Instalação das Fontes
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

### Classes Tailwind
```tsx
// Headers - IBM Plex Mono
<h1 className="font-mono font-bold text-5xl">...</h1>

// Body - Inter (padrão)
<p className="text-lg text-muted-foreground">...</p>
```

---

## 🎭 Seções da Página

### 1. Hero Section (100vh)
- Background com imagem + parallax
- Mega orbs animadas (1000px e 700px de diâmetro)
- Grid overlay pulsante
- Floating particles (15 partículas)
- Light beams horizontais
- Badge com ícone rotativo
- Headline com gradiente animado

### 2. Story Section
- Layout 2 colunas (texto + stats card)
- Background orbs com parallax
- Glassmorphic stats card
- Animação bidirecionais (once: false)

### 3. Values Section
- Grid 3 colunas
- Value cards com hover lift (-15px)
- Gradient reveal on hover
- Ícones com rotação no hover

### 4. Approach Section
- Card grande com gradiente de fundo
- Principles list com slide-in
- CTA button

---

## ⚡ Dependências Necessárias

```json
{
  "dependencies": {
    "framer-motion": "^11.x",
    "lucide-react": "^0.462.x",
    "react-router-dom": "^6.x",
    "tailwindcss": "^3.x",
    "@fontsource/ibm-plex-mono": "^5.x",
    "@fontsource/inter": "^5.x",
    "tailwindcss-animate": "^1.x"
  }
}
```

---

## 🚀 Como Reproduzir

1. **Copie os arquivos** de `Brand_Code/` para seu projeto
2. **Instale as dependências** listadas acima
3. **Configure o Tailwind** usando o `tailwind.config.ts` fornecido
4. **Importe os estilos** do `index.css` no seu entry point
5. **Registre a rota** `/brand` apontando para `Brand.tsx`

---

## 📝 Notas Importantes

- Todas as animações usam `once: false` para serem **bidirecionais**
- O ease padrão é `[0.25, 0.1, 0.25, 1]` (smooth cubic-bezier)
- As cores usam **HSL com CSS variables** para temas
- O blur de glassmorphism varia de `backdrop-blur-xl` a `backdrop-blur-3xl`
