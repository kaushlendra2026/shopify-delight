import { useEffect, useState } from 'react';
import { fetchProducts, ShopifyProduct } from '@/lib/shopify';
import ProductCard from './ProductCard';
import { Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface RelatedProductsProps {
  currentHandle: string;
  productType?: string;
  tags?: string[];
}

const RelatedProducts = ({ currentHandle, productType, tags }: RelatedProductsProps) => {
  const [related, setRelated] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const all = await fetchProducts(60);
        // Filter out current product, then score by type/tag match
        const others = all.filter((p) => p.node.handle !== currentHandle);

        const scored = others.map((p) => {
          let score = 0;
          if (productType && p.node.productType === productType) score += 3;
          if (tags?.length) {
            const pTags = p.node.tags || [];
            tags.forEach((t) => {
              if (pTags.includes(t)) score += 1;
            });
          }
          return { product: p, score };
        });

        scored.sort((a, b) => b.score - a.score);
        setRelated(scored.slice(0, 4).map((s) => s.product));
      } catch (err) {
        console.error('Failed to load related products:', err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [currentHandle, productType, tags]);

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (related.length === 0) return null;

  return (
    <section className="mt-16 pt-12 border-t border-border">
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-display font-black text-2xl md:text-3xl">
          You May Also <span className="text-neon">Like</span>
        </h2>
        <Link
          to="/shop"
          className="text-sm text-primary hover:underline hidden sm:block"
        >
          View All →
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {related.map((product) => (
          <ProductCard key={product.node.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default RelatedProducts;
