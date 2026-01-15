/**
 * Component: CMSEmptyState
 * Responsibility: Empty state placeholder for lists with no data
 * Used by: CMS list pages
 */

import { ReactNode } from 'react';
import { LucideIcon, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CMSEmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function CMSEmptyState({ 
  icon: Icon = Package, 
  title, 
  description, 
  action 
}: CMSEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground text-center max-w-sm mb-6">
        {description}
      </p>
      {action && (
        <Button onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  );
}
