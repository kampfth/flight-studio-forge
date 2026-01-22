# Support & Wiki System Documentation

This folder contains all the code, styles, and data structures needed to implement the Support and Wiki pages with a backend.

## Structure

```
Support_Code/
├── README.md                 # This file
├── styles/
│   ├── design-tokens.css     # CSS variables, colors, typography
│   ├── components.css        # Component-specific styles
│   └── animations.css        # Animation keyframes and effects
├── components/
│   ├── ContactPage.tsx       # Contact/Support page component
│   ├── WikiPage.tsx          # Wiki knowledge base component
│   └── shared/               # Shared UI components
├── data/
│   ├── wiki-types.ts         # TypeScript interfaces
│   └── wiki-mock-data.ts     # Sample data for development
└── constants.ts              # URLs and configuration
```

## Quick Start

1. Copy the design tokens to your global CSS
2. Import the component styles
3. Use the TypeScript types for your database schema
4. Replace mock data with your backend API calls

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + Custom CSS Variables
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **State**: React useState/useMemo (can be replaced with backend state)

## Database Schema Suggestion

### `wiki_articles` table
```sql
CREATE TABLE wiki_articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  category VARCHAR(50) NOT NULL,
  views INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_wiki_articles_category ON wiki_articles(category);
CREATE INDEX idx_wiki_articles_views ON wiki_articles(views DESC);
```

### `wiki_categories` table
```sql
CREATE TABLE wiki_categories (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  icon VARCHAR(50) NOT NULL,
  sort_order INTEGER DEFAULT 0
);
```

## API Endpoints Suggestion

```
GET  /api/wiki/articles          - List all articles (with pagination)
GET  /api/wiki/articles/:slug    - Get single article
GET  /api/wiki/articles/search   - Search articles
GET  /api/wiki/categories        - List categories
GET  /api/wiki/most-read         - Get most viewed articles
POST /api/wiki/articles/:id/view - Increment view count
```
