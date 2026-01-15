/**
 * Component: CMSLoadingState
 * Responsibility: Loading skeleton for CMS pages
 * Used by: CMS list and form pages
 */

import { Skeleton } from '@/components/ui/skeleton';

interface CMSLoadingStateProps {
  type?: 'table' | 'form';
  rows?: number;
}

export function CMSLoadingState({ type = 'table', rows = 5 }: CMSLoadingStateProps) {
  if (type === 'form') {
    return (
      <div className="space-y-6 p-6">
        <Skeleton className="h-10 w-1/3" />
        <div className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-24 w-full" />
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-4">
      {/* Search/Filter bar */}
      <div className="flex gap-4">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-10 w-32" />
      </div>
      
      {/* Table header */}
      <Skeleton className="h-12 w-full" />
      
      {/* Table rows */}
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} className="h-16 w-full" />
      ))}
    </div>
  );
}
