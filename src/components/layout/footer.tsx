/**
 * Component: Footer
 * Responsibility: Minimal site footer with copyright only
 * Used by: Layout
 */
export function Footer() {
  return (
    <footer data-qa="site-footer" className="py-8 border-t border-border/20">
      <div className="section-container">
        <p className="text-center text-muted-foreground text-sm font-mono">
          © 2026 4Simmers Inc.
        </p>
      </div>
    </footer>
  );
}
