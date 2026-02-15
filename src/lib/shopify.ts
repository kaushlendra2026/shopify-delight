import { toast } from "sonner";

const SHOPIFY_API_VERSION = '2025-07';
const SHOPIFY_STORE_PERMANENT_DOMAIN = 'ays4jc-rn.myshopify.com';
const SHOPIFY_STOREFRONT_URL = `https://${SHOPIFY_STORE_PERMANENT_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;
const SHOPIFY_STOREFRONT_TOKEN = 'e2f92bad970594e566f581b885fe9c84';

export interface ShopifyProduct {
  node: {
    id: string;
    title: string;
    description: string;
    handle: string;
    priceRange: {
      minVariantPrice: {
        amount: string;
        currencyCode: string;
      };
    };
    images: {
      edges: Array<{
        node: {
          url: string;
          altText: string | null;
        };
      }>;
    };
    variants: {
      edges: Array<{
        node: {
          id: string;
          title: string;
          price: {
            amount: string;
            currencyCode: string;
          };
          availableForSale: boolean;
          selectedOptions: Array<{
            name: string;
            value: string;
          }>;
        };
      }>;
    };
    options: Array<{
      name: string;
      values: string[];
    }>;
  };
}

const STOREFRONT_QUERY = `
  query GetProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          title
          description
          handle
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 5) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 10) {
            edges {
              node {
                id
                title
                price {
                  amount
                  currencyCode
                }
                availableForSale
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
          options {
            name
            values
          }
        }
      }
    }
  }
`;

const GET_PRODUCT_BY_HANDLE = `
  query GetProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      title
      description
      handle
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 10) {
        edges {
          node {
            url
            altText
          }
        }
      }
      variants(first: 20) {
        edges {
          node {
            id
            title
            price {
              amount
              currencyCode
            }
            availableForSale
            selectedOptions {
              name
              value
            }
          }
        }
      }
      options {
        name
        values
      }
    }
  }
`;

const SHOP_POLICIES_QUERY = `
  query GetShopPolicies {
    shop {
      privacyPolicy {
        id
        title
        body
        handle
      }
      termsOfService {
        id
        title
        body
        handle
      }
      refundPolicy {
        id
        title
        body
        handle
      }
      shippingPolicy {
        id
        title
        body
        handle
      }
    }
  }
`;

export interface ShopPolicy {
  id: string;
  title: string;
  body: string;
  handle: string;
}

export interface ShopPolicies {
  privacyPolicy: ShopPolicy | null;
  termsOfService: ShopPolicy | null;
  refundPolicy: ShopPolicy | null;
  shippingPolicy: ShopPolicy | null;
}

export async function fetchShopPolicies(): Promise<ShopPolicies | null> {
  const data = await storefrontApiRequest(SHOP_POLICIES_QUERY);
  if (!data) return null;
  return data.data.shop;
}

const CART_CREATE_MUTATION = `
  mutation cartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
        totalQuantity
        cost {
          totalAmount {
            amount
            currencyCode
          }
        }
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  product {
                    title
                    handle
                  }
                }
              }
            }
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export async function storefrontApiRequest(query: string, variables: Record<string, unknown> = {}) {
  const response = await fetch(SHOPIFY_STOREFRONT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_TOKEN
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  if (response.status === 402) {
    toast.error("Shopify: Payment required", {
      description: "Shopify API access requires an active Shopify billing plan."
    });
    return null;
  }

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  
  if (data.errors) {
    throw new Error(`Error calling Shopify: ${data.errors.map((e: { message: string }) => e.message).join(', ')}`);
  }

  return data;
}

export async function fetchProducts(limit: number = 20): Promise<ShopifyProduct[]> {
  const data = await storefrontApiRequest(STOREFRONT_QUERY, { first: limit });
  if (!data) return [];
  return data.data.products.edges || [];
}

export async function fetchProductByHandle(handle: string) {
  const data = await storefrontApiRequest(GET_PRODUCT_BY_HANDLE, { handle });
  if (!data) return null;
  return data.data.product;
}

export interface CartItem {
  product: ShopifyProduct;
  variantId: string;
  variantTitle: string;
  price: {
    amount: string;
    currencyCode: string;
  };
  quantity: number;
  selectedOptions: Array<{
    name: string;
    value: string;
  }>;
}

export async function createStorefrontCheckout(items: CartItem[]): Promise<string> {
  try {
    const lines = items.map(item => ({
      quantity: item.quantity,
      merchandiseId: item.variantId,
    }));

    const cartData = await storefrontApiRequest(CART_CREATE_MUTATION, {
      input: {
        lines,
      },
    });

    if (!cartData) {
      throw new Error('Failed to create cart');
    }

    if (cartData.data.cartCreate.userErrors.length > 0) {
      throw new Error(`Cart creation failed: ${cartData.data.cartCreate.userErrors.map((e: { message: string }) => e.message).join(', ')}`);
    }

    const cart = cartData.data.cartCreate.cart;
    
    if (!cart.checkoutUrl) {
      throw new Error('No checkout URL returned from Shopify');
    }

    const url = new URL(cart.checkoutUrl);
    url.searchParams.set('channel', 'online_store');
    return url.toString();
  } catch (error) {
    console.error('Error creating storefront checkout:', error);
    throw error;
  }
}

function getCheckoutLoaderHTML(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Preparing your checkout...</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      display: flex; align-items: center; justify-content: center;
      height: 100vh; background: #0f1117; color: #f2f2f2;
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
      overflow: hidden;
    }
    .container { text-align: center; max-width: 420px; padding: 24px; }
    .luma-wrap { position: relative; width: 70px; height: 70px; margin: 0 auto 32px; }
    .luma-box {
      position: absolute; border-radius: 4px;
      background: #4ade80;
      animation: loaderAnim 2.5s infinite;
      inset: 0 35px 35px 0;
    }
    .luma-box.delayed { animation-delay: -1.25s; }
    @keyframes loaderAnim {
      0% { inset: 0 35px 35px 0; }
      12.5% { inset: 0 35px 0 0; }
      25% { inset: 35px 35px 0 0; }
      37.5% { inset: 35px 0 0 0; }
      50% { inset: 35px 0 0 35px; }
      62.5% { inset: 0 0 0 35px; }
      75% { inset: 0 0 35px 35px; }
      87.5% { inset: 0 0 35px 0; }
      100% { inset: 0 35px 35px 0; }
    }
    h1 { font-size: 22px; font-weight: 700; margin-bottom: 12px; letter-spacing: -0.02em; }
    p { color: #888; font-size: 14px; line-height: 1.6; }
    .progress-bar {
      width: 100%; height: 4px; background: rgba(74, 222, 128, 0.12);
      border-radius: 4px; margin-top: 32px; overflow: hidden;
    }
    .progress-fill {
      height: 100%; width: 0%; background: linear-gradient(90deg, #4ade80, #22c55e);
      border-radius: 4px; animation: fill 4s ease-in-out forwards;
    }
    @keyframes fill { 0% { width: 0%; } 60% { width: 70%; } 100% { width: 95%; } }
    .secure { display: flex; align-items: center; justify-content: center; gap: 6px; margin-top: 20px; color: #666; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="luma-wrap">
      <div class="luma-box"></div>
      <div class="luma-box delayed"></div>
    </div>
    <h1>Preparing your checkout</h1>
    <p>We're securely connecting you to our payment partner. This will only take a moment.</p>
    <div class="progress-bar"><div class="progress-fill"></div></div>
    <div class="secure">🔒 Secured by Shopify</div>
  </div>
</body>
</html>`;
}

// iOS-compatible checkout - opens window synchronously to avoid popup blocker
export async function buyNowCheckout(item: CartItem): Promise<void> {
  const checkoutWindow = window.open('about:blank', '_blank');
  
  if (!checkoutWindow) {
    toast.error('Popup blocked', {
      description: 'Please allow popups for this site to checkout'
    });
    return;
  }

  checkoutWindow.document.write(getCheckoutLoaderHTML());
  checkoutWindow.document.close();

  try {
    const checkoutUrl = await createStorefrontCheckout([item]);
    checkoutWindow.location.href = checkoutUrl;
  } catch (error) {
    console.error('Checkout failed:', error);
    checkoutWindow.close();
    toast.error('Checkout failed', {
      description: 'Please try again or add to cart first'
    });
  }
}

export { getCheckoutLoaderHTML };
