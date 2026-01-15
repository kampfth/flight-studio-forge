/**
 * Component: ImageUploader
 * Responsibility: Image upload with preview and remove functionality
 * Used by: Product and Patch Note forms
 */

import { useCallback, useState } from 'react';
import { X, Upload, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CMSMediaItem } from '@/lib/cms';

interface ImageUploaderProps {
  value: CMSMediaItem | null;
  onChange: (value: CMSMediaItem | null) => void;
  label?: string;
  accept?: string;
  className?: string;
}

export function ImageUploader({
  value,
  onChange,
  label = 'Upload Image',
  accept = 'image/*',
  className,
}: ImageUploaderProps) {
  const [dragActive, setDragActive] = useState(false);

  const handleFile = useCallback((file: File) => {
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
      onChange(mediaItem);
    };
    reader.readAsDataURL(file);
  }, [onChange]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleFile(file);
    }
  }, [handleFile]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  }, [handleFile]);

  const handleRemove = useCallback(() => {
    onChange(null);
  }, [onChange]);

  if (value) {
    return (
      <div className={cn('relative rounded-lg overflow-hidden border border-border', className)}>
        <img
          src={value.url}
          alt={value.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={handleRemove}
          >
            <X className="w-4 h-4 mr-1" />
            Remove
          </Button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-black/70 px-3 py-2">
          <p className="text-xs text-white truncate">{value.name}</p>
        </div>
      </div>
    );
  }

  return (
    <label
      className={cn(
        'relative flex flex-col items-center justify-center h-48 border-2 border-dashed border-border rounded-lg cursor-pointer transition-colors',
        dragActive ? 'border-primary bg-primary/5' : 'hover:border-muted-foreground',
        className
      )}
      onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
      onDragLeave={() => setDragActive(false)}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept={accept}
        onChange={handleChange}
        className="sr-only"
      />
      <div className="flex flex-col items-center gap-2 text-muted-foreground">
        {dragActive ? (
          <ImageIcon className="w-8 h-8 text-primary" />
        ) : (
          <Upload className="w-8 h-8" />
        )}
        <span className="text-sm font-medium">
          {dragActive ? 'Drop image here' : label}
        </span>
        <span className="text-xs">or click to browse</span>
      </div>
    </label>
  );
}
