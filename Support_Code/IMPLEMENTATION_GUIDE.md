# Implementation Guide

This guide explains how to implement the Support & Wiki system with a backend.

## Overview

The system consists of:
1. **Contact Page** - Entry point with Wiki/Support cards
2. **Wiki Page** - Knowledge base with search, filters, pagination
3. **Article Modal** - Read articles without leaving the page

---

## Step 1: Database Setup

### Supabase / PostgreSQL

```sql
-- Categories table
CREATE TABLE wiki_categories (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  icon VARCHAR(50) NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Articles table
CREATE TABLE wiki_articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  category VARCHAR(50) REFERENCES wiki_categories(id),
  views INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_wiki_articles_category ON wiki_articles(category);
CREATE INDEX idx_wiki_articles_views ON wiki_articles(views DESC);
CREATE INDEX idx_wiki_articles_slug ON wiki_articles(slug);

-- Full-text search (optional but recommended)
ALTER TABLE wiki_articles ADD COLUMN search_vector tsvector;

CREATE OR REPLACE FUNCTION wiki_articles_search_trigger() RETURNS trigger AS $$
BEGIN
  NEW.search_vector := 
    setweight(to_tsvector('english', COALESCE(NEW.title, '')), 'A') ||
    setweight(to_tsvector('english', COALESCE(NEW.excerpt, '')), 'B') ||
    setweight(to_tsvector('english', COALESCE(NEW.content, '')), 'C');
  RETURN NEW;
END
$$ LANGUAGE plpgsql;

CREATE TRIGGER wiki_articles_search_update
  BEFORE INSERT OR UPDATE ON wiki_articles
  FOR EACH ROW EXECUTE FUNCTION wiki_articles_search_trigger();

CREATE INDEX idx_wiki_articles_search ON wiki_articles USING GIN(search_vector);
```

### Seed Data

```sql
-- Insert categories
INSERT INTO wiki_categories (id, name, icon, sort_order) VALUES
  ('getting-started', 'Getting Started', 'rocket', 1),
  ('installation', 'Installation', 'download', 2),
  ('troubleshooting', 'Troubleshooting', 'wrench', 3),
  ('liveries', 'Liveries', 'palette', 4),
  ('utilities', 'Utilities', 'settings', 5);

-- Insert sample articles (use the mock data from wiki-mock-data.ts)
```

---

## Step 2: API Endpoints

### Using Supabase Edge Functions

```typescript
// supabase/functions/wiki-articles/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

serve(async (req) => {
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_ANON_KEY')!
  )

  const url = new URL(req.url)
  const page = parseInt(url.searchParams.get('page') || '1')
  const limit = parseInt(url.searchParams.get('limit') || '10')
  const category = url.searchParams.get('category')
  const search = url.searchParams.get('search')

  let query = supabase
    .from('wiki_articles')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range((page - 1) * limit, page * limit - 1)

  if (category) {
    query = query.eq('category', category)
  }

  if (search) {
    query = query.textSearch('search_vector', search)
  }

  const { data, count, error } = await query

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  return new Response(JSON.stringify({
    data,
    pagination: {
      currentPage: page,
      totalPages: Math.ceil((count || 0) / limit),
      totalItems: count,
      itemsPerPage: limit
    }
  }), {
    headers: { 'Content-Type': 'application/json' }
  })
})
```

### API Routes Summary

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/wiki/articles` | List articles (paginated) |
| GET | `/api/wiki/articles/:slug` | Get single article |
| GET | `/api/wiki/articles/search?q=` | Search articles |
| GET | `/api/wiki/categories` | List categories |
| GET | `/api/wiki/most-read?limit=5` | Most viewed articles |
| POST | `/api/wiki/articles/:id/view` | Increment view count |

---

## Step 3: React Hooks

### useWikiArticles Hook

```typescript
// hooks/use-wiki-articles.ts
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

interface UseWikiArticlesOptions {
  page?: number;
  limit?: number;
  category?: string | null;
  search?: string;
}

export function useWikiArticles(options: UseWikiArticlesOptions = {}) {
  const { page = 1, limit = 10, category, search } = options;

  return useQuery({
    queryKey: ['wiki-articles', { page, limit, category, search }],
    queryFn: async () => {
      let query = supabase
        .from('wiki_articles')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range((page - 1) * limit, page * limit - 1);

      if (category) {
        query = query.eq('category', category);
      }

      if (search) {
        query = query.textSearch('search_vector', search);
      }

      const { data, count, error } = await query;

      if (error) throw error;

      return {
        articles: data,
        totalPages: Math.ceil((count || 0) / limit),
        totalItems: count,
      };
    },
  });
}
```

### useWikiCategories Hook

```typescript
// hooks/use-wiki-categories.ts
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

export function useWikiCategories() {
  return useQuery({
    queryKey: ['wiki-categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('wiki_categories')
        .select('*')
        .order('sort_order');

      if (error) throw error;
      return data;
    },
    staleTime: 1000 * 60 * 60, // Cache for 1 hour
  });
}
```

### useMostReadArticles Hook

```typescript
// hooks/use-most-read-articles.ts
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

export function useMostReadArticles(limit = 4) {
  return useQuery({
    queryKey: ['wiki-most-read', limit],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('wiki_articles')
        .select('id, slug, title, views')
        .order('views', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data;
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });
}
```

---

## Step 4: View Tracking

### Increment View Count

```typescript
// lib/wiki-analytics.ts
import { supabase } from '@/lib/supabase';

export async function trackArticleView(articleId: string) {
  // Use RPC for atomic increment
  const { error } = await supabase.rpc('increment_article_views', {
    article_id: articleId
  });

  if (error) {
    console.error('Failed to track view:', error);
  }
}

// SQL function for atomic increment
/*
CREATE OR REPLACE FUNCTION increment_article_views(article_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE wiki_articles
  SET views = views + 1
  WHERE id = article_id;
END;
$$ LANGUAGE plpgsql;
*/
```

---

## Step 5: Markdown Rendering

For article content, use a markdown renderer:

```bash
npm install react-markdown remark-gfm
```

```tsx
// components/ArticleContent.tsx
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export function ArticleContent({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => (
          <h1 className="text-2xl font-mono font-bold mt-6 mb-4">{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-xl font-mono font-semibold mt-6 mb-3">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-lg font-mono font-medium mt-4 mb-2">{children}</h3>
        ),
        p: ({ children }) => (
          <p className="text-muted-foreground leading-relaxed mb-4">{children}</p>
        ),
        code: ({ children }) => (
          <code className="px-1.5 py-0.5 rounded bg-white/10 text-primary text-xs font-mono">
            {children}
          </code>
        ),
        // Add more custom components as needed
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
```

---

## Step 6: Admin CMS (Optional)

For content management, you can:

1. **Use Supabase Dashboard** - Direct database editing
2. **Build custom admin pages** - Using the existing CMS pattern in this project
3. **Use a headless CMS** - Strapi, Contentful, Sanity, etc.

---

## File Structure

```
src/
├── components/
│   └── wiki/
│       ├── WikiSearch.tsx
│       ├── WikiCategories.tsx
│       ├── WikiArticleList.tsx
│       ├── WikiArticleCard.tsx
│       ├── WikiPagination.tsx
│       ├── WikiSidebar.tsx
│       └── WikiArticleModal.tsx
├── hooks/
│   ├── use-wiki-articles.ts
│   ├── use-wiki-categories.ts
│   └── use-most-read-articles.ts
├── lib/
│   ├── wiki-analytics.ts
│   └── wiki-types.ts
└── pages/
    ├── Contact.tsx
    └── Wiki.tsx
```

---

## Performance Tips

1. **Debounce search** - Wait 300ms after typing stops
2. **Prefetch categories** - They rarely change
3. **Infinite scroll** - Alternative to pagination for mobile
4. **Cache articles** - Use React Query's staleTime
5. **Lazy load modal** - Only load article content when opened

---

## SEO Considerations

1. **Meta tags** - Dynamic title/description per article
2. **Structured data** - JSON-LD for FAQ/HowTo articles
3. **Sitemap** - Include all article URLs
4. **Canonical URLs** - Prevent duplicate content

```tsx
// Example: Dynamic meta for article pages
<Helmet>
  <title>{article.title} — Wiki — 4Simmers</title>
  <meta name="description" content={article.excerpt} />
  <link rel="canonical" href={`https://4simmers.com/wiki/${article.slug}`} />
</Helmet>
```
