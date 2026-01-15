/**
 * Page: CMS Patch Note Form (New/Edit)
 * Responsibility: Create and edit patch notes with tabbed form
 */

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CMSLayout, CMSPageHeader, CMSLoadingState, ImageUploader, RepeaterField } from '@/components/cms';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useCMSPatchNotes } from '@/hooks/use-cms-patch-notes';
import { useCMSProducts } from '@/hooks/use-cms-products';
import { CMS_ROUTES } from '@/lib/cms/routes';
import { CMSPatchNote, PatchNoteSection, PatchNoteSectionType } from '@/lib/cms';

const patchNoteSchema = z.object({
  productId: z.string().min(1, 'Product is required'),
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required'),
  version: z.string().min(1, 'Version is required'),
  releaseDate: z.string().min(1, 'Release date is required'),
  summary: z.string().min(1, 'Summary is required'),
  status: z.enum(['draft', 'published'] as const),
  tags: z.string(),
});

type PatchNoteFormData = z.infer<typeof patchNoteSchema>;

const SECTION_TYPES: PatchNoteSectionType[] = ['Added', 'Improved', 'Fixed', 'Breaking', 'Known Issues', 'Other'];

export default function CMSPatchNoteForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;
  const { createPatchNote, updatePatchNote, getPatchNote } = useCMSPatchNotes();
  const { products } = useCMSProducts();
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [bannerImage, setBannerImage] = useState<CMSPatchNote['bannerImage']>(null);
  const [sections, setSections] = useState<PatchNoteSection[]>([]);

  const form = useForm<PatchNoteFormData>({
    resolver: zodResolver(patchNoteSchema),
    defaultValues: {
      productId: '', title: '', slug: '', version: '1.0.0',
      releaseDate: new Date().toISOString().split('T')[0],
      summary: '', status: 'draft', tags: '',
    },
  });

  useEffect(() => {
    if (isEdit && id) {
      getPatchNote(id).then((note) => {
        if (note) {
          form.reset({
            productId: note.productId, title: note.title, slug: note.slug, version: note.version,
            releaseDate: note.releaseDate, summary: note.summary, status: note.status,
            tags: note.tags.join(', '),
          });
          setBannerImage(note.bannerImage);
          setSections(note.sections);
        }
        setLoading(false);
      });
    }
  }, [id, isEdit, getPatchNote, form]);

  const onSubmit = async (data: PatchNoteFormData) => {
    setSaving(true);
    const noteData = {
      productId: data.productId,
      title: data.title,
      slug: data.slug,
      version: data.version,
      releaseDate: data.releaseDate,
      summary: data.summary,
      status: data.status,
      bannerImage,
      sections,
      images: [],
      tags: data.tags.split(',').map((t) => t.trim()).filter(Boolean),
    };

    const result = isEdit && id
      ? await updatePatchNote(id, noteData)
      : await createPatchNote(noteData);

    setSaving(false);
    if (result) navigate(CMS_ROUTES.PATCH_NOTES);
  };

  const createSection = (): PatchNoteSection => ({
    id: Math.random().toString(36).substring(2, 9), type: 'Added', items: [''],
  });

  if (loading) {
    return <CMSLayout><CMSPageHeader title="Loading..." /><CMSLoadingState type="form" /></CMSLayout>;
  }

  return (
    <CMSLayout>
      <CMSPageHeader
        title={isEdit ? 'Edit Patch Note' : 'New Patch Note'}
        breadcrumbs={[
          { label: 'CMS', href: CMS_ROUTES.DASHBOARD },
          { label: 'Patch Notes', href: CMS_ROUTES.PATCH_NOTES },
          { label: isEdit ? 'Edit' : 'New' },
        ]}
        actions={
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate(CMS_ROUTES.PATCH_NOTES)}>Cancel</Button>
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
              <TabsList className="grid grid-cols-4 w-full">
                <TabsTrigger value="basics">Basics</TabsTrigger>
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="media">Media</TabsTrigger>
                <TabsTrigger value="tags">Tags</TabsTrigger>
              </TabsList>

              <TabsContent value="basics" className="space-y-4">
                <FormField control={form.control} name="productId" render={({ field }) => (
                  <FormItem><FormLabel>Product</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Select product" /></SelectTrigger></FormControl>
                      <SelectContent>
                        {products.map((p) => <SelectItem key={p.id} value={p.id}>{p.title}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  <FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="title" render={({ field }) => (
                  <FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="slug" render={({ field }) => (
                  <FormItem><FormLabel>Slug</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <div className="grid grid-cols-3 gap-4">
                  <FormField control={form.control} name="version" render={({ field }) => (
                    <FormItem><FormLabel>Version</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="releaseDate" render={({ field }) => (
                    <FormItem><FormLabel>Release Date</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="status" render={({ field }) => (
                    <FormItem><FormLabel>Status</FormLabel>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                        <SelectContent>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="published">Published</SelectItem>
                        </SelectContent>
                      </Select>
                    <FormMessage /></FormItem>
                  )} />
                </div>
              </TabsContent>

              <TabsContent value="content" className="space-y-4">
                <FormField control={form.control} name="summary" render={({ field }) => (
                  <FormItem><FormLabel>Summary</FormLabel><FormControl><Textarea rows={3} {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <div>
                  <h3 className="text-sm font-medium mb-3">Sections</h3>
                  <RepeaterField
                    value={sections}
                    onChange={setSections}
                    createItem={createSection}
                    addLabel="Add Section"
                    emptyMessage="No sections yet. Add your first changelog section."
                    renderItem={(item, _, onChange) => (
                      <div className="space-y-3">
                        <Select value={item.type} onValueChange={(v) => onChange({ ...item, type: v as PatchNoteSectionType })}>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>
                            {SECTION_TYPES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                          </SelectContent>
                        </Select>
                        <Textarea
                          placeholder="One item per line"
                          rows={4}
                          value={item.items.join('\n')}
                          onChange={(e) => onChange({ ...item, items: e.target.value.split('\n') })}
                        />
                      </div>
                    )}
                  />
                </div>
              </TabsContent>

              <TabsContent value="media" className="space-y-6">
                <div><h3 className="text-sm font-medium mb-2">Banner Image</h3><ImageUploader value={bannerImage} onChange={setBannerImage} /></div>
              </TabsContent>

              <TabsContent value="tags" className="space-y-4">
                <FormField control={form.control} name="tags" render={({ field }) => (
                  <FormItem><FormLabel>Tags (comma separated)</FormLabel><FormControl><Input placeholder="update, bugfix, feature" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
              </TabsContent>
            </Tabs>
          </form>
        </Form>
      </div>
    </CMSLayout>
  );
}
