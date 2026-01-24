import { useEffect, useMemo, useState } from "react";
import { fetchProducts, type ShopifyProduct } from "@/lib/shopify";
import ProductCard from "@/components/ProductCard";
import { Input } from "@/components/ui/input";
import { Loader2, Package, Search } from "lucide-react";

export default function ShopCatalogPage() {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts(60);
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter((p) => {
      const title = p.node.title?.toLowerCase() ?? "";
      const desc = p.node.description?.toLowerCase() ?? "";
      return title.includes(q) || desc.includes(q);
    });
  }, [products, query]);

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <header className="max-w-3xl">
          <h1 className="font-display font-black text-3xl md:text-5xl">Shop</h1>
          <p className="text-muted-foreground mt-3">
            Browse the full catalog of premium 3D printed collectibles.
          </p>
        </header>

        <div className="mt-8 flex items-center gap-3">
          <div className="relative w-full max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="pl-10"
            />
          </div>
        </div>

        <div className="mt-10">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-10 h-10 animate-spin text-primary" />
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-destructive">{error}</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-bold mb-2">No products found</h2>
              <p className="text-muted-foreground">Try a different search.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((product) => (
                <ProductCard key={product.node.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
