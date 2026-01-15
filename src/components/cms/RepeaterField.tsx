/**
 * Component: RepeaterField
 * Responsibility: Dynamic list field for features, FAQ, sections
 * Used by: Product and Patch Note forms
 */

import { ReactNode } from 'react';
import { Plus, Trash2, GripVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface RepeaterFieldProps<T> {
  value: T[];
  onChange: (value: T[]) => void;
  renderItem: (item: T, index: number, onChange: (item: T) => void) => ReactNode;
  createItem: () => T;
  maxItems?: number;
  addLabel?: string;
  emptyMessage?: string;
  className?: string;
}

export function RepeaterField<T extends { id: string }>({
  value,
  onChange,
  renderItem,
  createItem,
  maxItems = 20,
  addLabel = 'Add Item',
  emptyMessage = 'No items yet',
  className,
}: RepeaterFieldProps<T>) {
  const handleAdd = () => {
    if (value.length < maxItems) {
      onChange([...value, createItem()]);
    }
  };

  const handleRemove = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const handleItemChange = (index: number, item: T) => {
    const newValue = [...value];
    newValue[index] = item;
    onChange(newValue);
  };

  return (
    <div className={cn('space-y-3', className)}>
      {value.length === 0 ? (
        <div className="text-center py-8 text-sm text-muted-foreground border border-dashed border-border rounded-lg">
          {emptyMessage}
        </div>
      ) : (
        <div className="space-y-3">
          {value.map((item, index) => (
            <div
              key={item.id}
              className="relative group border border-border rounded-lg p-4 bg-card"
            >
              {/* Drag handle */}
              <div className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity cursor-move">
                <GripVertical className="w-4 h-4 text-muted-foreground" />
              </div>

              {/* Remove button */}
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-destructive/10"
              >
                <Trash2 className="w-4 h-4 text-destructive" />
              </button>

              {/* Content */}
              <div className="pl-4 pr-8">
                {renderItem(item, index, (updated) => handleItemChange(index, updated))}
              </div>
            </div>
          ))}
        </div>
      )}

      {value.length < maxItems && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleAdd}
          className="w-full"
        >
          <Plus className="w-4 h-4 mr-2" />
          {addLabel}
        </Button>
      )}
    </div>
  );
}
