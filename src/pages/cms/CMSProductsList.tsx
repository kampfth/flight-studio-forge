/**
 * Page: CMS Products List
 * Responsibility: List, search, and manage products
 */

import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Search, Pencil, Trash2 } from 'lucide-react';
import { CMSLayout, CMSPageHeader, CMSEmptyState, CMSLoadingState, CMSDeleteDialog } from '@/components/cms';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCMSProducts } from '@/hooks/use-cms-products';
import { CMS_ROUTES, getCMSProductEditRoute } from '@/lib/cms/routes';
import { CMSProduct } from '@/lib/cms';

export default function CMSProductsList() {
  const navigate = useNavigate();
  const { products, loading, deleteProduct } = useCMSProducts();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [deleteTarget, setDeleteTarget] = useState<CMSProduct | null>(null);
  const [deleting, setDeleting] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.slug.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [products, search, statusFilter]);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    await deleteProduct(deleteTarget.id);
    setDeleting(false);
    setDeleteTarget(null);
  };

  const statusBadge = (status: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'outline'> = {
      published: 'default',
      draft: 'secondary',
      archived: 'outline',
    };
    return <Badge variant={variants[status] || 'outline'}>{status}</Badge>;
  };

  return (
    <CMSLayout>
      <CMSPageHeader
        title="Products"
        breadcrumbs={[{ label: 'CMS', href: CMS_ROUTES.DASHBOARD }, { label: 'Products' }]}
        actions={
          <Button asChild>
            <Link to={CMS_ROUTES.PRODUCT_NEW}>
              <Plus className="w-4 h-4 mr-2" />
              New Product
            </Link>
          </Button>
        }
      />

      <div className="flex-1 p-6 overflow-auto">
        {loading ? (
          <CMSLoadingState type="table" />
        ) : products.length === 0 ? (
          <CMSEmptyState
            title="No products yet"
            description="Create your first product to get started."
            action={{ label: 'Create Product', onClick: () => navigate(CMS_ROUTES.PRODUCT_NEW) }}
          />
        ) : (
          <div className="space-y-4">
            {/* Filters */}
            <div className="flex gap-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Table */}
            <div className="border border-border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Version</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Updated</TableHead>
                    <TableHead className="w-24">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.title}</TableCell>
                      <TableCell className="font-mono text-sm">{product.actualVersion}</TableCell>
                      <TableCell>{statusBadge(product.status)}</TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {new Date(product.updatedAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" asChild>
                            <Link to={getCMSProductEditRoute(product.id)}>
                              <Pencil className="w-4 h-4" />
                            </Link>
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => setDeleteTarget(product)}>
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </div>

      <CMSDeleteDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Product"
        description={`Are you sure you want to delete "${deleteTarget?.title}"? This action cannot be undone.`}
        loading={deleting}
      />
    </CMSLayout>
  );
}
