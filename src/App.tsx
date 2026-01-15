/**
 * App Root
 * Main application component with route configuration
 */
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ROUTES } from '@/lib/routes';
import { CMS_ROUTES } from '@/lib/cms/routes';

// Public Pages
import Index from '@/pages/Index';
import Products from '@/pages/Products';
import ProductDetail from '@/pages/ProductDetail';
import Brand from '@/pages/Brand';
import Dispatch from '@/pages/Dispatch';
import DispatchPost from '@/pages/DispatchPost';
import Contact from '@/pages/Contact';
import NotFound from '@/pages/NotFound';

// CMS Pages
import { 
  CMSDashboard, 
  CMSProductsList, 
  CMSProductForm, 
  CMSPatchNotesList, 
  CMSPatchNoteForm 
} from '@/pages/cms';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path={ROUTES.HOME} element={<Index />} />
          <Route path={ROUTES.PRODUCTS} element={<Products />} />
          <Route path={ROUTES.PRODUCT_DETAIL} element={<ProductDetail />} />
          <Route path={ROUTES.BRAND} element={<Brand />} />
          <Route path={ROUTES.DISPATCH} element={<Dispatch />} />
          <Route path={ROUTES.DISPATCH_POST} element={<DispatchPost />} />
          <Route path={ROUTES.CONTACT} element={<Contact />} />
          
          {/* CMS Routes */}
          <Route path={CMS_ROUTES.DASHBOARD} element={<CMSDashboard />} />
          <Route path={CMS_ROUTES.PRODUCTS} element={<CMSProductsList />} />
          <Route path={CMS_ROUTES.PRODUCT_NEW} element={<CMSProductForm />} />
          <Route path={CMS_ROUTES.PRODUCT_EDIT} element={<CMSProductForm />} />
          <Route path={CMS_ROUTES.PATCH_NOTES} element={<CMSPatchNotesList />} />
          <Route path={CMS_ROUTES.PATCH_NOTE_NEW} element={<CMSPatchNoteForm />} />
          <Route path={CMS_ROUTES.PATCH_NOTE_EDIT} element={<CMSPatchNoteForm />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
