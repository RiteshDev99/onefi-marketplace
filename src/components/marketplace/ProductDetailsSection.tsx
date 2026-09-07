import React from 'react';
import { View, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { Product, ProductVariant } from '@/types/product';
import { formatCurrency } from '@/utils/productUtils';

interface ProductDetailsSectionProps {
  product: Product;
  variant?: ProductVariant;
}

export function ProductDetailsSection({ product, variant }: ProductDetailsSectionProps) {
  const theme = useTheme();

  const detailsList: { label: string; value?: string | number | null }[] = [
    { label: 'Brand', value: product.brand },
    { label: 'Category', value: product.category },
    { label: 'Model', value: product.name },
    { label: 'Color', value: variant?.color },
    { label: 'Storage', value: variant?.storage },
    { label: 'Availability', value: variant?.inStock !== false ? 'In Stock' : 'Out of Stock' },
    { label: 'MRP', value: variant?.mrp ? formatCurrency(variant.mrp) : null },
    { label: 'Price', value: variant?.price ? formatCurrency(variant.price) : null },
  ].filter((item) => Boolean(item.value));

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.card,
          borderColor: theme.border,
        },
      ]}>
      <ThemedText style={styles.heading}>Product Details</ThemedText>

      <View style={styles.list}>
        {detailsList.map((item, index) => (
          <View key={index} style={styles.row}>
            <ThemedText style={styles.bullet}>•</ThemedText>
            <ThemedText style={styles.label} themeColor="textSecondary">
              {item.label}:{' '}
              <ThemedText style={styles.value}>{item.value}</ThemedText>
            </ThemedText>
          </View>
        ))}
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
    gap: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  heading: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  list: {
    gap: 6,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  bullet: {
    fontSize: 14,
    color: '#9CA3AF',
    lineHeight: 20,
  },
  label: {
    fontSize: 13,
    lineHeight: 20,
    flex: 1,
  },
  value: {
    fontWeight: '600',
    color: '#111827',
  },
});
