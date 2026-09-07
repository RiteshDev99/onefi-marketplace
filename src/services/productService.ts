import { Product } from '@/types/product';

const API_BASE_URL = 'https://emistore.onrender.com/api';
const TIMEOUT_MS = 15000;

class ProductService {
  /**
   * Fetches all products from the deployed live backend.
   */
  async getProducts(): Promise<Product[]> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

    try {
      const response = await fetch(`${API_BASE_URL}/products`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.status} ${response.statusText}`);
      }

      const json = await response.json();
      if (Array.isArray(json)) {
        return json;
      }
      if (json && Array.isArray(json.data)) {
        return json.data;
      }
      return [];
    } catch (error: any) {
      if (error.name === 'AbortError') {
        throw new Error('Connection timed out while fetching products. Please try again.');
      }
      throw new Error(error.message || 'An unexpected error occurred while fetching products.');
    } finally {
      clearTimeout(timeoutId);
    }
  }

  /**
   * Fetches a single product by slug or id from the deployed live backend.
   */
  async getProductBySlug(slug: string): Promise<Product | null> {
    try {
      // First try fetching all products and matching slug
      const products = await this.getProducts();
      const product = products.find((p) => p.slug === slug || p._id === slug);
      if (product) return product;

      // Fallback: try direct id query if valid hex
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);
      try {
        const response = await fetch(`${API_BASE_URL}/products/${slug}`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          signal: controller.signal,
        });

        if (response.ok) {
          const json = await response.json();
          return json.data || json;
        }
      } catch {
        // Silently fallback if direct endpoint not available
      } finally {
        clearTimeout(timeoutId);
      }

      return null;
    } catch (error: any) {
      throw new Error(error.message || 'An unexpected error occurred.');
    }
  }
}

export const productService = new ProductService();
