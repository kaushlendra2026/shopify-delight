import { ShoppingCart, Eye, Zap } from 'lucide-react';
import { ShopifyProduct, CartItem, buyNowCheckout } from '@/lib/shopify';
import { useCartStore } from '@/stores/cartStore';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: ShopifyProduct;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const addItem = useCartStore(state => state.addItem);
  const { node } = product;
  
  const firstVariant = node.variants.edges[0]?.node;
  const firstImage = node.images.edges[0]?.node;
  const price = node.priceRange.minVariantPrice;

  const createCartItem = (): CartItem => ({
    product,
    variantId: firstVariant.id,
    variantTitle: firstVariant.title,
    price: firstVariant.price,
    quantity: 1,
    selectedOptions: firstVariant.selectedOptions || []
  });

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!firstVariant) return;
    addItem(createCartItem());
    toast.success('Added to cart!', {
      description: node.title,
      position: 'top-center'
    });
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!firstVariant) return;
    buyNowCheckout(createCartItem());
  };

  return (
    <Link
      to={`/product/${node.handle}`}
      className="group glass-card overflow-hidden hover:border-primary/50 transition-all duration-300"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        {firstImage ? (
          <img
            src={firstImage.url}
            alt={firstImage.altText || node.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            No Image
          </div>
        )}

        {/* Overlay - visible on hover (desktop) and always subtly accessible on touch */}
        <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 active:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <button
            onClick={handleBuyNow}
            className="p-3 bg-primary text-primary-foreground rounded-full hover:scale-110 transition-transform"
            title="Buy Now"
          >
            <Zap className="w-5 h-5" />
          </button>
          <button
            onClick={handleAddToCart}
            className="p-3 bg-secondary text-foreground rounded-full hover:scale-110 transition-transform"
            title="Add to Cart"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
          <div className="p-3 bg-muted text-foreground rounded-full">
            <Eye className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-display font-bold text-lg mb-1 group-hover:text-primary transition-colors">
          {node.title}
        </h3>
        <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
          {node.description || 'Premium 3D printed collectible'}
        </p>
        <div className="flex items-center justify-between">
          <span className="font-bold text-xl text-primary">
            {price.currencyCode} {parseFloat(price.amount).toFixed(2)}
          </span>
          {firstVariant?.availableForSale ? (
            <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded-full">
              In Stock
            </span>
          ) : (
            <span className="text-xs text-destructive bg-destructive/10 px-2 py-1 rounded-full">
              Sold Out
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
