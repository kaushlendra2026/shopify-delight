import { useEffect, useState } from 'react';
import { fetchShopPolicies, ShopPolicies } from '@/lib/shopify';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Loader2, Package, RefreshCw, Truck, Shield } from 'lucide-react';

const defaultFAQs = [
  {
    question: "What materials are used for 3D printing?",
    answer: "We use premium PLA and resin materials for our 3D printed collectibles. Each piece is carefully crafted to ensure durability and exceptional detail."
  },
  {
    question: "How long does shipping take?",
    answer: "Orders are typically processed within 2-3 business days. Shipping times vary by location - domestic orders usually arrive within 5-7 business days, while international orders may take 10-15 business days."
  },
  {
    question: "Can I customize my order?",
    answer: "Yes! We offer customization options for select products. Please contact us through our contact form with your specific requirements and we'll get back to you within 24 hours."
  },
  {
    question: "What is your return policy?",
    answer: "We accept returns within 30 days of delivery for unused items in original packaging. Custom orders are non-refundable. Please see our full refund policy for more details."
  },
];

const ProductFAQ = () => {
  const [policies, setPolicies] = useState<ShopPolicies | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPolicies = async () => {
      try {
        const data = await fetchShopPolicies();
        setPolicies(data);
      } catch (err) {
        console.error('Failed to fetch policies:', err);
      } finally {
        setLoading(false);
      }
    };
    loadPolicies();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  const policyItems = [
    { 
      policy: policies?.shippingPolicy, 
      icon: Truck, 
      fallbackTitle: "Shipping Policy",
      fallbackContent: "We ship worldwide! Domestic orders are processed within 2-3 business days. International shipping times vary by destination."
    },
    { 
      policy: policies?.refundPolicy, 
      icon: RefreshCw, 
      fallbackTitle: "Refund Policy",
      fallbackContent: "We offer a 30-day return policy for unused items in original packaging. Contact us for return authorization."
    },
    { 
      policy: policies?.privacyPolicy, 
      icon: Shield, 
      fallbackTitle: "Privacy Policy",
      fallbackContent: "Your privacy is important to us. We only collect necessary information to process your orders and never share your data with third parties."
    },
    { 
      policy: policies?.termsOfService, 
      icon: Package, 
      fallbackTitle: "Terms of Service",
      fallbackContent: "By using our website and purchasing our products, you agree to our terms of service. All products are for personal use only."
    },
  ];

  // Function to strip HTML tags and decode entities
  const stripHtml = (html: string) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  };

  return (
    <div className="border-t border-border/50 pt-12 mt-12">
      <h2 className="font-display font-bold text-2xl mb-6">Frequently Asked Questions</h2>
      
      <Accordion type="single" collapsible className="w-full space-y-2">
        {defaultFAQs.map((faq, index) => (
          <AccordionItem 
            key={`faq-${index}`} 
            value={`faq-${index}`}
            className="border border-border/50 rounded-lg px-4 bg-card/30"
          >
            <AccordionTrigger className="text-left hover:no-underline">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {/* Policies Section */}
      <h3 className="font-display font-bold text-xl mt-10 mb-4">Policies</h3>
      <Accordion type="single" collapsible className="w-full space-y-2">
        {policyItems.map((item, index) => {
          const Icon = item.icon;
          const title = item.policy?.title || item.fallbackTitle;
          const content = item.policy?.body 
            ? stripHtml(item.policy.body) 
            : item.fallbackContent;
          
          return (
            <AccordionItem 
              key={`policy-${index}`} 
              value={`policy-${index}`}
              className="border border-border/50 rounded-lg px-4 bg-card/30"
            >
              <AccordionTrigger className="text-left hover:no-underline">
                <span className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-primary flex-shrink-0" />
                  {title}
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground whitespace-pre-wrap">
                {content.length > 500 ? content.slice(0, 500) + '...' : content}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
};

export default ProductFAQ;
