/**
 * Page: CMS Product Form (New/Edit)
 * Responsibility: Create and edit products with tabbed form
 */

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CMSLayout, CMSPageHeader, CMSLoadingState, ImageUploader, GalleryUploader, RepeaterField } from '@/components/cms';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useCMSProducts } from '@/hooks/use-cms-products';
import { CMS_ROUTES } from '@/lib/cms/routes';
import { CMSProduct, CMSFeature, CMSFaqItem, ProductCategory, ProductStatus } from '@/lib/cms';

const productSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required'),
  tagline: z.string().min(1, 'Tagline is required'),
  description: z.string().min(1, 'Description is required'),
  category: z.enum(['livery', 'utility', 'pack'] as const),
  status: z.enum(['draft', 'published', 'archived'] as const),
  actualVersion: z.string().min(1, 'Version is required'),
  releaseDate: z.string().min(1, 'Release date is required'),
  tags: z.string(),
  compatibility: z.string(),
  marketplaceUrl: z.string().optional(),
  discordUrl: z.string().optional(),
  trailerUrl: z.string().optional(),
});

type ProductFormData = z.infer<typeof productSchema>;

export default function CMSProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;
  const { products, createProduct, updateProduct, getProduct } = useCMSProducts();
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [bannerImage, setBannerImage] = useState<CMSProduct['bannerImage']>(null);
  const [gallery, setGallery] = useState<CMSProduct['gallery']>([]);
  const [features, setFeatures] = useState<CMSFeature[]>([]);
  const [faq, setFaq] = useState<CMSFaqItem[]>([]);

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: '', slug: '', tagline: '', description: '', category: 'livery', status: 'draft',
      actualVersion: '1.0.0', releaseDate: new Date().toISOString().split('T')[0],
      tags: '', compatibility: '', marketplaceUrl: '', discordUrl: '', trailerUrl: '',
    },
  });

  useEffect(() => {
    if (isEdit && id) {
      getProduct(id).then((product) => {
        if (product) {
          form.reset({
            title: product.title, slug: product.slug, tagline: product.tagline, description: product.description,
            category: product.category, status: product.status, actualVersion: product.actualVersion,
            releaseDate: product.releaseDate, tags: product.tags.join(', '),
            compatibility: product.compatibility.join('\n'), marketplaceUrl: product.marketplaceUrl || '',
            discordUrl: product.discordUrl || '', trailerUrl: product.trailerUrl || '',
          });
          setBannerImage(product.bannerImage);
          setGallery(product.gallery);
          setFeatures(product.features);
          setFaq(product.faq);
        }
        setLoading(false);
      });
    }
  }, [id, isEdit, getProduct, form]);

  const onSubmit = async (data: ProductFormData) => {
    setSaving(true);
    const productData = {
      title: data.title,
      slug: data.slug,
      tagline: data.tagline,
      description: data.description,
      category: data.category,
      status: data.status,
      actualVersion: data.actualVersion,
      releaseDate: data.releaseDate,
      marketplaceUrl: data.marketplaceUrl,
      discordUrl: data.discordUrl,
      trailerUrl: data.trailerUrl,
      bannerImage,
      gallery,
      features,
      faq,
      tags: data.tags.split(',').map((t) => t.trim()).filter(Boolean),
      compatibility: data.compatibility.split('\n').map((c) => c.trim()).filter(Boolean),
    };

    const result = isEdit && id
      ? await updateProduct(id, productData)
      : await createProduct(productData);

    setSaving(false);
    if (result) navigate(CMS_ROUTES.PRODUCTS);
  };

  const createFeature = (): CMSFeature => ({
    id: Math.random().toString(36).substring(2, 9), title: '', description: '', icon: 'Star',
  });

  const createFaqItem = (): CMSFaqItem => ({
    id: Math.random().toString(36).substring(2, 9), question: '', answer: '',
  });

  if (loading) {
    return <CMSLayout><CMSPageHeader title="Loading..." /><CMSLoadingState type="form" /></CMSLayout>;
  }

  return (
    <CMSLayout>
      <CMSPageHeader
        title={isEdit ? 'Edit Product' : 'New Product'}
        breadcrumbs={[
          { label: 'CMS', href: CMS_ROUTES.DASHBOARD },
          { label: 'Products', href: CMS_ROUTES.PRODUCTS },
          { label: isEdit ? 'Edit' : 'New' },
        ]}
        actions={
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate(CMS_ROUTES.PRODUCTS)}>Cancel</Button>
            <Button onClick={form.handleSubmit(onSubmit)} disabled={saving}>
              {saving ? 'Saving...' : isEdit ? 'Update' : 'Create'}
            </Button>
          </div>
        }
      />

      <div className="flex-1 p-6 overflow-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-4xl">
            <Tabs defaultValue="basics" className="space-y-6">
              <TabsList className="grid grid-cols-5 w-full">
                <TabsTrigger value="basics">Basics</TabsTrigger>
                <TabsTrigger value="release">Release</TabsTrigger>
                <TabsTrigger value="media">Media</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="faq">FAQ</TabsTrigger>
              </TabsList>

              <TabsContent value="basics" className="space-y-4">
                <FormField control={form.control} name="title" render={({ field }) => (
                  <FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="slug" render={({ field }) => (
                  <FormItem><FormLabel>Slug</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="tagline" render={({ field }) => (
                  <FormItem><FormLabel>Tagline</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="description" render={({ field }) => (
                  <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea rows={4} {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <div className="grid grid-cols-2 gap-4">
                  <FormField control={form.control} name="category" render={({ field }) => (
                    <FormItem><FormLabel>Category</FormLabel>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                        <SelectContent>
                          <SelectItem value="livery">Livery</SelectItem>
                          <SelectItem value="utility">Utility</SelectItem>
                          <SelectItem value="pack">Pack</SelectItem>
                        </SelectContent>
                      </Select>
                    <FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="status" render={({ field }) => (
                    <FormItem><FormLabel>Status</FormLabel>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                        <SelectContent>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="published">Published</SelectItem>
                          <SelectItem value="archived">Archived</SelectItem>
                        </SelectContent>
                      </Select>
                    <FormMessage /></FormItem>
                  )} />
                </div>
              </TabsContent>

              <TabsContent value="release" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField control={form.control} name="actualVersion" render={({ field }) => (
                    <FormItem><FormLabel>Version</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="releaseDate" render={({ field }) => (
                    <FormItem><FormLabel>Release Date</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>
                <FormField control={form.control} name="tags" render={({ field }) => (
                  <FormItem><FormLabel>Tags (comma separated)</FormLabel><FormControl><Input placeholder="a320, livery, minimal" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="compatibility" render={({ field }) => (
                  <FormItem><FormLabel>Compatibility (one per line)</FormLabel><FormControl><Textarea rows={3} {...field} /></FormControl><FormMessage /></FormItem>
                )} />
              </TabsContent>

              <TabsContent value="media" className="space-y-6">
                <div><h3 className="text-sm font-medium mb-2">Banner Image</h3><ImageUploader value={bannerImage} onChange={setBannerImage} /></div>
                <div><h3 className="text-sm font-medium mb-2">Gallery</h3><GalleryUploader value={gallery} onChange={setGallery} /></div>
                <FormField control={form.control} name="trailerUrl" render={({ field }) => (
                  <FormItem><FormLabel>Trailer URL</FormLabel><FormControl><Input placeholder="https://youtube.com/..." {...field} /></FormControl><FormMessage /></FormItem>
                )} />
              </TabsContent>

              <TabsContent value="features" className="space-y-4">
                <RepeaterField
                  value={features}
                  onChange={setFeatures}
                  createItem={createFeature}
                  addLabel="Add Feature"
                  emptyMessage="No features yet. Add your first feature."
                  renderItem={(item, _, onChange) => (
                    <div className="space-y-3">
                      <Input placeholder="Feature title" value={item.title} onChange={(e) => onChange({ ...item, title: e.target.value })} />
                      <Textarea placeholder="Feature description" rows={2} value={item.description} onChange={(e) => onChange({ ...item, description: e.target.value })} />
                    </div>
                  )}
                />
              </TabsContent>

              <TabsContent value="faq" className="space-y-4">
                <RepeaterField
                  value={faq}
                  onChange={setFaq}
                  createItem={createFaqItem}
                  addLabel="Add FAQ"
                  emptyMessage="No FAQ items yet."
                  renderItem={(item, _, onChange) => (
                    <div className="space-y-3">
                      <Input placeholder="Question" value={item.question} onChange={(e) => onChange({ ...item, question: e.target.value })} />
                      <Textarea placeholder="Answer" rows={2} value={item.answer} onChange={(e) => onChange({ ...item, answer: e.target.value })} />
                    </div>
                  )}
                />
              </TabsContent>
            </Tabs>
          </form>
        </Form>
      </div>
    </CMSLayout>
  );
}
