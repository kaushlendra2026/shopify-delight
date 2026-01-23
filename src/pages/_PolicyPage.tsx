import { useEffect, useMemo, useState } from "react";
import PageLayout from "@/components/PageLayout";
import { fetchShopPolicies, type ShopPolicies, type ShopPolicy } from "@/lib/shopify";
import { Loader2 } from "lucide-react";

type PolicyKey = "termsOfService" | "refundPolicy" | "shippingPolicy";

type PolicyPageProps = {
  policyKey: PolicyKey;
  fallbackTitle: string;
};

export default function PolicyPage({ policyKey, fallbackTitle }: PolicyPageProps) {
  const [policies, setPolicies] = useState<ShopPolicies | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchShopPolicies();
        setPolicies(data);
      } catch (e) {
        console.error("Failed to fetch policies:", e);
        setError("Failed to load policy content");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const policy: ShopPolicy | null = useMemo(() => {
    if (!policies) return null;
    return policies[policyKey];
  }, [policies, policyKey]);

  const title = policy?.title || fallbackTitle;

  return (
    <PageLayout>
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <header className="max-w-3xl">
            <h1 className="font-display font-black text-3xl md:text-5xl">
              {title}
            </h1>
            <p className="text-muted-foreground mt-3">
              This page is provided for payment gateway compliance and customer transparency.
            </p>
          </header>

          <div className="mt-10 glass-card p-6 md:p-8">
            {loading ? (
              <div className="flex items-center justify-center py-10">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : error ? (
              <p className="text-destructive">{error}</p>
            ) : policy?.body ? (
              <div
                className="prose prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: policy.body }}
              />
            ) : (
              <div className="space-y-3">
                <p className="text-muted-foreground">
                  Policy content is not available yet. Please add it in Shopify Admin → Settings → Policies.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
