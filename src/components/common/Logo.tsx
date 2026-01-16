/**
 * Component: Logo
 * Responsibility: Brand logo with optional text, used in header and footer
 * Used by: Header, Footer
 */
import { Link } from 'react-router-dom';
import { BRAND_NAME } from '@/lib/constants';
import { ROUTES } from '@/lib/routes';
import { cn } from '@/lib/utils';

interface LogoProps {
  showText?: boolean;
  className?: string;
  textClassName?: string;
}

export function Logo({ showText = true, className, textClassName }: LogoProps) {
  return (
    <Link 
      to={ROUTES.HOME} 
      className={cn('flex items-center gap-3 group', className)}
      data-qa="site-logo"
      aria-label={`${BRAND_NAME} - Go to homepage`}
    >
      {/* Logo mark */}
      <div className="relative w-9 h-9 flex items-center justify-center">
        <div className="absolute inset-0 bg-primary/10 rounded-md rotate-45 group-hover:rotate-[55deg] transition-transform duration-300" />
        <span className="relative font-mono font-bold text-sm text-primary">
          4S
        </span>
      </div>
      
      {showText && (
        <span className={cn(
          'font-mono font-semibold text-lg tracking-tight',
          textClassName
        )}>
          {BRAND_NAME}
        </span>
      )}
    </Link>
  );
}
