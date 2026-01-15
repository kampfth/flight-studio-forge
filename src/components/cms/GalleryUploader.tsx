/**
 * Component: GalleryUploader
 * Responsibility: Multiple image upload with reordering
 * Used by: Product forms for gallery images
 */

import { useCallback } from 'react';
import { X, Plus, GripVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CMSMediaItem } from '@/lib/cms';

interface GalleryUploaderProps {
  value: CMSMediaItem[];
  onChange: (value: CMSMediaItem[]) => void;
  maxItems?: number;
  className?: string;
}

export function GalleryUploader({
  value,
  onChange,
  maxItems = 12,
  className,
}: GalleryUploaderProps) {
  const handleAddFiles = useCallback((files: FileList) => {
    const remainingSlots = maxItems - value.length;
    const filesToProcess = Array.from(files).slice(0, remainingSlots);

    filesToProcess.forEach((file) => {
      if (!file.type.startsWith('image/')) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        const mediaItem: CMSMediaItem = {
          id: Math.random().toString(36).substring(2, 9),
          url: dataUrl,
          name: file.name,
          size: file.size,
          type: file.type,
        };
        onChange([...value, mediaItem]);
      };
      reader.readAsDataURL(file);
    });
  }, [value, onChange, maxItems]);

  const handleRemove = useCallback((id: string) => {
    onChange(value.filter((item) => item.id !== id));
  }, [value, onChange]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      handleAddFiles(files);
    }
    // Reset input
    e.target.value = '';
  }, [handleAddFiles]);

  return (
    <div className={cn('space-y-3', className)}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {value.map((item) => (
          <div
            key={item.id}
            className="relative group rounded-lg overflow-hidden border border-border aspect-video"
          >
            <img
              src={item.url}
              alt={item.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => handleRemove(item.id)}
                className="w-8 h-8 rounded-full bg-destructive flex items-center justify-center text-white hover:bg-destructive/90 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <GripVertical className="w-4 h-4 text-white drop-shadow" />
            </div>
          </div>
        ))}

        {/* Add button */}
        {value.length < maxItems && (
          <label className="relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border aspect-video cursor-pointer hover:border-muted-foreground transition-colors">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleChange}
              className="sr-only"
            />
            <Plus className="w-6 h-6 text-muted-foreground" />
            <span className="text-xs text-muted-foreground mt-1">Add Image</span>
          </label>
        )}
      </div>

      <p className="text-xs text-muted-foreground">
        {value.length} / {maxItems} images
      </p>
    </div>
  );
}
