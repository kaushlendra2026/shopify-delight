import { useEffect, useMemo, useState } from "react";
import { fetchProducts, fetchCollections, fetchCollectionProducts, type ShopifyProduct, type ShopifyCollection } from "@/lib/shopify";
import ProductCard from "@/components/ProductCard";
import DeliveryCounter from "@/components/DeliveryCounter";
import { Input } from "@/components/ui/input";
import { Loader2, Package, Search, LayoutGrid } from "lucide-react";

export default function ShopCatalogPage() {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [collections, setCollections] = useState<ShopifyCollection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [selectedCollection, setSelectedCollection] = useState("All");

  useEffect(() => {
    const load = async () => {
      try {
        const [prodData, collData] = await Promise.all([
          fetchProducts(60),
          fetchCollections(20),
        ]);
        setProducts(prodData);
        setCollections(collData);
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleCollectionSelect = async (handle: string) => {
    setSelectedCollection(handle);
    if (handle === "All") return;
    setLoading(true);
    try {
      const collProducts = await fetchCollectionProducts(handle, 60);
      setProducts((prev) => {
        // Merge fetched collection products, keeping cache
        const existing = new Map(prev.map((p) => [p.node.id, p]));
        collProducts.forEach((p) => existing.set(p.node.id, p));
        return Array.from(existing.values());
      });
    } catch (err) {
      console.error("Failed to fetch collection products:", err);
    } finally {
      setLoading(false);
    }
  };

  // When "All" is selected, show all products; otherwise filter by collection products
  const [collectionProductIds, setCollectionProductIds] = useState<Set<string> | null>(null);

  useEffect(() => {
    if (selectedCollection === "All") {
      setCollectionProductIds(null);
      return;
    }
    const fetchIds = async () => {
      try {
        const collProducts = await fetchCollectionProducts(selectedCollection, 60);
        setCollectionProductIds(new Set(collProducts.map((p) => p.node.id)));
      } catch {
        setCollectionProductIds(null);
      }
    };
    fetchIds();
  }, [selectedCollection]);

  const filtered = useMemo(() => {
    let result = products;

    // Collection filter
    if (selectedCollection !== "All" && collectionProductIds) {
      result = result.filter((p) => collectionProductIds.has(p.node.id));
    }

    // Search filter
    const q = query.trim().toLowerCase();
    if (q) {
      result = result.filter((p) => {
        const title = p.node.title?.toLowerCase() ?? "";
        const desc = p.node.description?.toLowerCase() ?? "";
        return title.includes(q) || desc.includes(q);
      });
    }

    return result;
  }, [products, query, selectedCollection, collectionProductIds]);

  const categoryButtons = useMemo(() => {
    return [
      { title: "All", handle: "All" },
      ...collections
        .filter((c) => c.node.productsCount.count > 0)
        .map((c) => ({ title: c.node.title, handle: c.node.handle })),
    ];
  }, [collections]);

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <header className="max-w-3xl">
            <h1 className="font-display font-black text-3xl md:text-5xl">Shop</h1>
            <p className="text-muted-foreground mt-3">
              Browse the full catalog of premium 3D printed collectibles.
            </p>
          </header>
          <DeliveryCounter count={1250} />
        </div>

        {/* Search + Filters */}
        <div className="mt-8 space-y-4">
          <div className="relative w-full max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="pl-10"
            />
          </div>

          {/* Collection Filters */}
          {categoryButtons.length > 1 && (
            <div className="flex items-center gap-2 flex-wrap">
              <LayoutGrid className="w-4 h-4 text-muted-foreground mr-1" />
              {categoryButtons.map((cat) => (
                <button
                  key={cat.handle}
                  onClick={() => {
                    setSelectedCollection(cat.handle);
                    if (cat.handle !== "All") handleCollectionSelect(cat.handle);
                  }}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all border ${
                    selectedCollection === cat.handle
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-secondary text-secondary-foreground border-border hover:border-primary/50"
                  }`}
                >
                  {cat.title}
                </button>
              ))}
            </div>
          )}
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
              <p className="text-muted-foreground">Try a different search or category.</p>
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
