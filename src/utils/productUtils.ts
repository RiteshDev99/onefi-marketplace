import { Product, ProductVariant } from '@/types/product';

/**
 * Deterministically chooses a presentation variant for a product.
 * Returns the first in-stock variant if available, otherwise the first variant.
 */
export function getRepresentativeVariant(product: Product): ProductVariant | undefined {
  if (!product.variants || product.variants.length === 0) {
    return undefined;
  }
  const inStockVariant = product.variants.find((v) => v.inStock);
  return inStockVariant || product.variants[0];
}

/**
 * Calculates the lowest starting monthly EMI payment for a variant from its emiPlans.
 */
export function getStartingEMI(variant?: ProductVariant): number | null {
  if (!variant || !variant.emiPlans || variant.emiPlans.length === 0) {
    return null;
  }
  const monthlyPayments = variant.emiPlans
    .map((p) => p.monthlyPayment)
    .filter((amount) => typeof amount === 'number' && amount > 0);

  if (monthlyPayments.length === 0) return null;
  return Math.min(...monthlyPayments);
}

/**
 * Calculates the percentage discount between MRP and selling price.
 */
export function getDiscountPercentage(mrp?: number, price?: number): number | null {
  if (!mrp || !price || mrp <= price) return null;
  return Math.round(((mrp - price) / mrp) * 100);
}

/**
 * Formats a number into Indian Rupee format (e.g. ₹1,29,999).
 */
export function formatCurrency(amount: number): string {
  if (typeof amount !== 'number' || isNaN(amount)) return '₹0';
  return `₹${amount.toLocaleString('en-IN')}`;
}
