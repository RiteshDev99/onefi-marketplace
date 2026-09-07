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
  startingEMI,
  variantCount = 1,
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
      {/* Brand & Category Row */}
      <View style={styles.tagsRow}>
        <View style={[styles.brandPill, { backgroundColor: theme.brandPurpleLight }]}>
          <ThemedText style={[styles.brandText, { color: theme.brandPurple }]}>
            {brand}
          </ThemedText>
        </View>

        {category ? (
          <View style={[styles.categoryPill, { backgroundColor: theme.backgroundElement }]}>
            <ThemedText style={styles.categoryText} themeColor="textSecondary">
              {category}
            </ThemedText>
          </View>
        ) : null}

        {variantCount > 1 ? (
          <ThemedText style={styles.variantCountText} themeColor="textSecondary">
            {variantCount} configurations available
          </ThemedText>
        ) : null}
      </View>

      {/* Product Name */}
      <ThemedText style={styles.productName}>{name}</ThemedText>

      {/* Price Block */}
      <View style={styles.pricingBlock}>
        <View style={styles.priceRow}>
          {price ? (
            <ThemedText style={styles.sellingPrice}>
              {formatCurrency(price)}
            </ThemedText>
          ) : null}

          {mrp && mrp > (price || 0) ? (
            <ThemedText style={styles.mrpPrice}>
              MRP {formatCurrency(mrp)}
            </ThemedText>
          ) : null}

          {discountPercentage ? (
            <View style={[styles.discountPill, { backgroundColor: '#DCFCE7' }]}>
              <ThemedText style={styles.discountPillText}>
                {discountPercentage}% OFF
              </ThemedText>
            </View>
          ) : null}
        </View>

        <ThemedText style={styles.inclusiveText} themeColor="textSecondary">
          Inclusive of all taxes & insurance
        </ThemedText>
      </View>

      {/* Starting EMI Highlight Banner */}
      {startingEMI ? (
        <View
          style={[
            styles.emiBanner,
            {
              backgroundColor: theme.brandPurpleLight,
              borderColor: theme.border,
            },
          ]}>
          <View style={styles.emiRow}>
            <ThemedText style={styles.emiIcon}>⚡</ThemedText>
            <View style={styles.emiTextCol}>
              <ThemedText style={[styles.emiTitle, { color: theme.brandPurple }]}>
                Flexible Financing Starting at{' '}
                <ThemedText style={styles.emiBold}>{formatCurrency(startingEMI)}/mo</ThemedText>
              </ThemedText>
              <ThemedText style={[styles.emiSubtitle, { color: theme.brandPurple }]}>
                0% Interest Plans & Instant Paperless Approvals
              </ThemedText>
            </View>
          </View>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    borderWidth: 1,
    padding: Spacing.four,
    marginHorizontal: Spacing.three,
    marginTop: Spacing.three,
    gap: Spacing.two,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  tagsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  brandPill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  brandText: {
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  categoryPill: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '600',
  },
  variantCountText: {
    fontSize: 11,
    fontWeight: '500',
    marginLeft: 'auto',
  },
  productName: {
    fontSize: 22,
    fontWeight: '800',
    color: '#111827',
    lineHeight: 28,
  },
  pricingBlock: {
    gap: 4,
    marginTop: 4,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 10,
    flexWrap: 'wrap',
  },
  sellingPrice: {
    fontSize: 26,
    fontWeight: '800',
    color: '#111827',
  },
  mrpPrice: {
    fontSize: 15,
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
    fontWeight: '500',
  },
  discountPill: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  discountPillText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#15803D',
  },
  inclusiveText: {
    fontSize: 12,
    marginTop: 2,
  },
  emiBanner: {
    padding: Spacing.three,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    marginTop: 6,
  },
  emiRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  emiIcon: {
    fontSize: 20,
  },
  emiTextCol: {
    flex: 1,
    gap: 2,
  },
  emiTitle: {
    fontSize: 13,
    fontWeight: '600',
  },
  emiBold: {
    fontWeight: '800',
    fontSize: 14,
  },
  emiSubtitle: {
    fontSize: 11,
    fontWeight: '500',
    opacity: 0.85,
  },
});
