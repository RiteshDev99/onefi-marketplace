import React from 'react';
import { View, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { formatCurrency } from '@/utils/productUtils';

interface ProductPricingProps {
  brand: string;
  name: string;
  category?: string;
  price?: number;
  mrp?: number;
  discountPercentage?: number | null;
  startingEMI?: number | null;
  variantCount?: number;
}

export function ProductPricing({
  brand,
  name,
  category,
  price,
  mrp,
  discountPercentage,
}: ProductPricingProps) {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.card,
          borderColor: theme.border,
        },
      ]}>
      {/* Product Name & Brand */}
      <View style={styles.titleContainer}>
        <ThemedText style={styles.productName}>{name}</ThemedText>
      </View>

      {/* Main Pricing Row: ₹Price  ₹MRP  (X% off) */}
      <View style={styles.priceRow}>
        {price ? (
          <ThemedText style={styles.sellingPrice}>
            {formatCurrency(price)}
          </ThemedText>
        ) : null}

        {mrp && mrp > (price || 0) ? (
          <ThemedText style={styles.mrpPrice}>
            {formatCurrency(mrp)}
          </ThemedText>
        ) : null}

        {discountPercentage ? (
          <ThemedText style={styles.discountText}>
            ({discountPercentage}% off)
          </ThemedText>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    borderWidth: 1,
    padding: Spacing.four,
    marginHorizontal: Spacing.three,
    marginTop: Spacing.two,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  titleContainer: {
    gap: 2,
  },
  productName: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111827',
    lineHeight: 26,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 10,
    flexWrap: 'wrap',
    marginTop: 2,
  },
  sellingPrice: {
    fontSize: 24,
    fontWeight: '800',
    color: '#111827',
  },
  mrpPrice: {
    fontSize: 15,
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
    fontWeight: '500',
  },
  discountText: {
    fontSize: 14,
    color: '#15803D',
    fontWeight: '700',
  },
});

