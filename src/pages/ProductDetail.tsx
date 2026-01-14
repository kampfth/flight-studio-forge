import { useParams, Navigate } from 'react-router-dom';
import { Layout } from '@/components/layout/layout';
import { ProductHero } from '@/components/sections/product-hero';
import { ProductIntro } from '@/components/sections/product-intro';
import { ProductFeatures } from '@/components/sections/product-features';
import { ProductFaq } from '@/components/sections/product-faq';
import { ProductGallery } from '@/components/sections/product-gallery';
import { ProductSpecs } from '@/components/sections/product-specs';
import { getProductBySlug } from '@/content/products';

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = slug ? getProductBySlug(slug) : undefined;

  if (!product) {
    return <Navigate to="/products" replace />;
  }

  return (
    <Layout>
      <ProductHero product={product} />
      <ProductIntro description={product.description} />
      <ProductFeatures features={product.features} />
      {product.specs && product.specs.length > 0 && (
        <ProductSpecs specs={product.specs} />
      )}
      <ProductGallery gallery={product.gallery} productName={product.name} />
      <ProductFaq faq={product.faq} />
    </Layout>
  );
};

export default ProductDetail;
