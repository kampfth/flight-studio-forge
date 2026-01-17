/**
 * Tailwind CSS Configuration
 * 
 * @description Configuração completa do Tailwind para o projeto
 * @requires tailwindcss-animate plugin
 */

import type { Config } from "tailwindcss";

export default {
  // Dark mode via classe (permite toggle manual)
  darkMode: ["class"],
  
  // Arquivos a serem escaneados
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}"
  ],
  
  prefix: "",
  
  theme: {
    // Container centralizado com max-width definido
    container: {
      center: true,
      padding: "1.25rem",  // 20px
      screens: {
        "2xl": "1200px",   // Max width do container
      },
    },
    
    extend: {
      // =========================================
      // FONTS
      // =========================================
      fontFamily: {
        // Fonte padrão para body text
        sans: ["Inter", "system-ui", "sans-serif"],
        // Fonte para headers e elementos técnicos
        mono: ["IBM Plex Mono", "monospace"],
      },
      
      // =========================================
      // COLORS
      // Mapeamento de CSS variables para classes
      // =========================================
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Custom colors
        glow: "hsl(var(--glow))",
        "surface-elevated": "hsl(var(--surface-elevated))",
        "surface-hover": "hsl(var(--surface-hover))",
      },
      
      // =========================================
      // BORDER RADIUS
      // =========================================
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      
      // =========================================
      // SPACING
      // Tokens semânticos para espaçamento de seções
      // =========================================
      spacing: {
        'section': '3.5rem',     // 56px
        'section-md': '5rem',    // 80px
        'section-lg': '6rem',    // 96px
      },
      
      // =========================================
      // KEYFRAMES
      // Animações CSS customizadas
      // =========================================
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-subtle": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
      },
      
      // =========================================
      // ANIMATIONS
      // Classes de animação prontas para uso
      // =========================================
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.4s ease-out",
        "fade-in-up": "fade-in-up 0.5s ease-out",
        "slide-up": "slide-up 0.6s ease-out",
        "pulse-subtle": "pulse-subtle 2s ease-in-out infinite",
      },
      
      // =========================================
      // BACKGROUND IMAGES
      // Gradientes customizados via CSS variables
      // =========================================
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-subtle": "var(--gradient-subtle)",
        "gradient-hero": "var(--gradient-hero)",
        "gradient-card": "var(--gradient-card)",
      },
      
      // =========================================
      // BOX SHADOWS
      // Shadows customizados via CSS variables
      // =========================================
      boxShadow: {
        "glow": "var(--shadow-glow)",
        "glow-sm": "var(--shadow-glow-sm)",
        "card": "var(--shadow-card)",
      },
    },
  },
  
  // Plugin para animações do Radix UI
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
