/**
 * Page: CMS Patch Notes List
 * Responsibility: List, search, and manage patch notes
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
import { useCMSPatchNotes } from '@/hooks/use-cms-patch-notes';
import { useCMSProducts } from '@/hooks/use-cms-products';
import { CMS_ROUTES, getCMSPatchNoteEditRoute } from '@/lib/cms/routes';
import { CMSPatchNote } from '@/lib/cms';

export default function CMSPatchNotesList() {
  const navigate = useNavigate();
  const { patchNotes, loading, deletePatchNote } = useCMSPatchNotes();
  const { products } = useCMSProducts();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [productFilter, setProductFilter] = useState<string>('all');
  const [deleteTarget, setDeleteTarget] = useState<CMSPatchNote | null>(null);
  const [deleting, setDeleting] = useState(false);

  const filteredNotes = useMemo(() => {
    return patchNotes.filter((n) => {
      const matchesSearch = n.title.toLowerCase().includes(search.toLowerCase()) ||
        n.version.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === 'all' || n.status === statusFilter;
      const matchesProduct = productFilter === 'all' || n.productId === productFilter;
      return matchesSearch && matchesStatus && matchesProduct;
    });
  }, [patchNotes, search, statusFilter, productFilter]);

  const getProductName = (productId: string) => {
    return products.find((p) => p.id === productId)?.title || 'Unknown';
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    await deletePatchNote(deleteTarget.id);
    setDeleting(false);
    setDeleteTarget(null);
  };

  return (
    <CMSLayout>
      <CMSPageHeader
        title="Patch Notes"
        breadcrumbs={[{ label: 'CMS', href: CMS_ROUTES.DASHBOARD }, { label: 'Patch Notes' }]}
        actions={
          <Button asChild>
            <Link to={CMS_ROUTES.PATCH_NOTE_NEW}>
              <Plus className="w-4 h-4 mr-2" />
              New Patch Note
            </Link>
          </Button>
        }
      />

      <div className="flex-1 p-6 overflow-auto">
        {loading ? (
          <CMSLoadingState type="table" />
        ) : patchNotes.length === 0 ? (
          <CMSEmptyState
            title="No patch notes yet"
            description="Create your first patch note to get started."
            action={{ label: 'Create Patch Note', onClick: () => navigate(CMS_ROUTES.PATCH_NOTE_NEW) }}
          />
        ) : (
          <div className="space-y-4">
            {/* Filters */}
            <div className="flex gap-4 flex-wrap">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
              </div>
              <Select value={productFilter} onValueChange={setProductFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="All Products" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Products</SelectItem>
                  {products.map((p) => (
                    <SelectItem key={p.id} value={p.id}>{p.title}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Table */}
            <div className="border border-border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Version</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="w-24">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredNotes.map((note) => (
                    <TableRow key={note.id}>
                      <TableCell className="font-medium">{note.title}</TableCell>
                      <TableCell className="text-muted-foreground">{getProductName(note.productId)}</TableCell>
                      <TableCell className="font-mono text-sm">{note.version}</TableCell>
                      <TableCell>
                        <Badge variant={note.status === 'published' ? 'default' : 'secondary'}>{note.status}</Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {new Date(note.releaseDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" asChild>
                            <Link to={getCMSPatchNoteEditRoute(note.id)}><Pencil className="w-4 h-4" /></Link>
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => setDeleteTarget(note)}>
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
        title="Delete Patch Note"
        description={`Are you sure you want to delete "${deleteTarget?.title}"? This action cannot be undone.`}
        loading={deleting}
      />
    </CMSLayout>
  );
}
