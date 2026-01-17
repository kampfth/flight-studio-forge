# Dispatch Page - Complete Code Documentation

Este diretório contém todo o código necessário para replicar a página **Dispatch** (Flight Log) com estilo glassmorphism em outro projeto React/TypeScript.

## 📁 Estrutura de Arquivos

```
Dispatch_Code/
├── README.md                    # Este arquivo
├── pages/
│   ├── Dispatch.tsx            # Página principal de listagem
│   └── DispatchPost.tsx        # Página de post individual
├── hooks/
│   └── use-load-more.ts        # Hook para paginação "Load More"
├── types/
│   └── dispatch.types.ts       # Interfaces TypeScript
├── content/
│   └── dispatch-data.ts        # Dados de exemplo e funções utilitárias
├── lib/
│   ├── motion.ts               # Variantes Framer Motion
│   ├── constants.ts            # Constantes e placeholders
│   └── utils.ts                # Utilitário cn() para classes
└── styles/
    └── dispatch.css            # CSS customizado e variáveis
```

## 📦 Dependências Obrigatórias

```bash
npm install framer-motion react-router-dom lucide-react clsx tailwind-merge
```

## 🚀 Quick Start

### 1. Copie os arquivos para seu projeto

```bash
# Estrutura sugerida
src/
├── pages/
│   ├── Dispatch.tsx
│   └── DispatchPost.tsx
├── hooks/
│   └── use-load-more.ts
├── lib/
│   ├── types.ts          # Adicione as interfaces de dispatch.types.ts
│   ├── motion.ts
│   ├── constants.ts
│   └── utils.ts
├── content/
│   └── dispatch.ts
└── styles/
    └── index.css         # Merge com dispatch.css
```

### 2. Configure as rotas

```tsx
// App.tsx ou routes.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dispatch from './pages/Dispatch';
import DispatchPost from './pages/DispatchPost';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dispatch" element={<Dispatch />} />
        <Route path="/dispatch/:slug" element={<DispatchPost />} />
      </Routes>
    </BrowserRouter>
  );
}
```

### 3. Adicione as variáveis CSS

Adicione as variáveis do `styles/dispatch.css` ao seu CSS global.

## 🎨 Design System

### Cores (HSL)
- **Background**: `0 0% 2%` (quase preto)
- **Foreground**: `0 0% 96%` (quase branco)
- **Primary**: `220 100% 73%` (azul elétrico)
- **Muted**: `0 0% 55%`

### Glassmorphism
- `bg-white/[0.02]` ou `bg-white/5`
- `backdrop-blur-md`
- `border border-white/10`

### Tipografia
- Headers: `font-mono` (IBM Plex Mono)
- Body: `font-sans` (Inter)

## ⚡ Funcionalidades

### Filtros por Tag
- Clique em um chip de tag para filtrar
- "All" mostra todos os posts
- Reset automático da paginação ao trocar filtro

### Load More
- 5 posts iniciais
- Incremento de 5 por clique
- Contagem (X of Y) exibida

### Animações
- Stagger nas cards
- AnimatePresence para transições
- Background orbs animados
- Hover effects nos cards

## 📝 Customização

### Alterar quantidade de posts iniciais
```tsx
// Dispatch.tsx
const INITIAL_POSTS = 5;  // Altere aqui
const LOAD_INCREMENT = 5; // Incremento por Load More
```

### Adicionar novos posts
```tsx
// content/dispatch.ts
export const dispatchPosts: DispatchPost[] = [
  {
    slug: 'novo-post',
    title: 'Título do Novo Post',
    date: '2024-12-17',
    excerpt: 'Resumo curto do post...',
    content: `Conteúdo completo em markdown simples...`,
    image: '/path/to/image.jpg',
    tags: ['update', 'feature'],
    relatedProducts: ['product-slug'], // opcional
  },
  // ... outros posts
];
```

## 🔗 Integrações

### Com Products (opcional)
O sistema suporta `relatedProducts` para vincular posts a produtos. Se não precisar, remova:
- Imports de `getProductBySlug`
- Seção de "Related Products" no DispatchPost
- Campo `relatedProducts` dos dados

### Com CMS
Para integrar com um CMS, substitua:
```tsx
// De:
import { dispatchPosts } from '@/content/dispatch';

// Para:
const { data: dispatchPosts } = useQuery({
  queryKey: ['dispatch-posts'],
  queryFn: fetchDispatchPosts,
});
```

## 📱 Responsividade

- **Mobile**: Cards em coluna única, imagem acima do conteúdo
- **Desktop**: Cards com layout horizontal, imagem à esquerda
- Breakpoints: `md:` (768px), `lg:` (1024px)
