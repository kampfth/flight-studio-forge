/**
 * Page: CMS Dashboard
 * Responsibility: Overview and quick stats for the CMS
 */

import { Link } from 'react-router-dom';
import { Package, FileText, Plus } from 'lucide-react';
import { CMSLayout, CMSPageHeader } from '@/components/cms';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useCMSProducts } from '@/hooks/use-cms-products';
import { useCMSPatchNotes } from '@/hooks/use-cms-patch-notes';
import { CMS_ROUTES } from '@/lib/cms/routes';

export default function CMSDashboard() {
  const { products, loading: productsLoading } = useCMSProducts();
  const { patchNotes, loading: patchNotesLoading } = useCMSPatchNotes();

  const publishedProducts = products.filter((p) => p.status === 'published').length;
  const draftProducts = products.filter((p) => p.status === 'draft').length;
  const publishedNotes = patchNotes.filter((n) => n.status === 'published').length;

  return (
    <CMSLayout>
      <CMSPageHeader title="Dashboard" />
      
      <div className="flex-1 p-6 space-y-6 overflow-auto">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Products
              </CardTitle>
              <Package className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {productsLoading ? '...' : products.length}
              </div>
              <p className="text-xs text-muted-foreground">
                {publishedProducts} published, {draftProducts} drafts
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Patch Notes
              </CardTitle>
              <FileText className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {patchNotesLoading ? '...' : patchNotes.length}
              </div>
              <p className="text-xs text-muted-foreground">
                {publishedNotes} published
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button asChild size="sm" className="w-full justify-start">
                <Link to={CMS_ROUTES.PRODUCT_NEW}>
                  <Plus className="w-4 h-4 mr-2" />
                  New Product
                </Link>
              </Button>
              <Button asChild size="sm" variant="outline" className="w-full justify-start">
                <Link to={CMS_ROUTES.PATCH_NOTE_NEW}>
                  <Plus className="w-4 h-4 mr-2" />
                  New Patch Note
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Info Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">CMS (Frontend-Only)</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>
              This CMS uses localStorage for persistence. Data will persist across sessions 
              but is local to this browser.
            </p>
            <p>
              <strong>Ready for Supabase:</strong> The repository layer is designed for easy 
              migration to a real backend when needed.
            </p>
          </CardContent>
        </Card>
      </div>
    </CMSLayout>
  );
}
