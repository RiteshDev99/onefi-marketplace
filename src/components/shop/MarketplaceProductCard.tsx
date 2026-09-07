import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { Product } from '@/types/product';
import {
  formatCurrency,
  getDiscountPercentage,
  getRepresentativeVariant,
  getStartingEMI,
} from '@/utils/productUtils';

interface MarketplaceProductCardProps {
  product: Product;
}

export function MarketplaceProductCard({ product }: MarketplaceProductCardProps) {
  const router = useRouter();
  const theme = useTheme();

  const variant = getRepresentativeVariant(product);
  const startingEMI = getStartingEMI(variant);
  const discount = getDiscountPercentage(variant?.mrp, variant?.price);
  const variantCount = product.variants?.length || 0;

  const handlePress = () => {
    router.push({
      pathname: '/products/[slug]',
      params: { slug: product.slug },
    });
  };

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        styles.cardContainer,
        {
          backgroundColor: theme.card,
          borderColor: theme.border,
        },
        pressed && styles.cardPressed,
      ]}>
      {/* Top Media Viewport */}
      <View style={[styles.imageContainer, { backgroundColor: theme.backgroundElement }]}>
        {/* Discount Badge */}
        {discount ? (
          <View style={[styles.discountBadge, { backgroundColor: '#DC2626' }]}>
            <ThemedText style={styles.discountBadgeText}>{discount}% OFF</ThemedText>
          </View>
        ) : null}

        {/* In-Stock Status Pill */}
        <View
          style={[
            styles.stockPill,
            { backgroundColor: variant?.inStock ? theme.badgeGreen : '#FEE2E2' },
          ]}>
          <ThemedText
            style={[
              styles.stockText,
              { color: variant?.inStock ? theme.badgeGreenText : '#DC2626' },
            ]}>
            {variant?.inStock ? '● In Stock' : 'Out of Stock'}
          </ThemedText>
        </View>

        {/* Product Image */}
        {variant?.image ? (
          <Image
            source={{ uri: variant.image }}
            style={styles.productImage}
            contentFit="contain"
            transition={200}
          />
        ) : (
          <View style={styles.imageFallback}>
            <ThemedText style={styles.fallbackEmoji}>📱</ThemedText>
          </View>
        )}
      </View>

      {/* Product Content Details */}
      <View style={styles.detailsContainer}>
        {/* Brand & Variant Count Row */}
        <View style={styles.metaRow}>
          <View style={[styles.brandPill, { backgroundColor: theme.brandPurpleLight }]}>
            <ThemedText style={[styles.brandPillText, { color: theme.brandPurple }]}>
              {product.brand}
            </ThemedText>
          </View>
          {variantCount > 1 && (
            <ThemedText style={styles.variantCountText} themeColor="textSecondary">
              {variantCount} configurations
            </ThemedText>
          )}
        </View>

        {/* Product Title */}
        <ThemedText style={styles.productTitle} numberOfLines={1}>
          {product.name}
        </ThemedText>

        {/* Variant Info (e.g. 128GB • Deep Blue) */}
        {variant && (
          <ThemedText style={styles.variantInfo} themeColor="textSecondary" numberOfLines={1}>
            {variant.storage} • {variant.color}
          </ThemedText>
        )}

        {/* Price & MRP Row */}
        <View style={styles.pricingRow}>
          {variant?.price ? (
            <ThemedText style={styles.sellingPrice}>
              {formatCurrency(variant.price)}
            </ThemedText>
          ) : null}

          {variant?.mrp && variant.mrp > (variant.price || 0) ? (
            <ThemedText style={styles.mrpPrice}>
              {formatCurrency(variant.mrp)}
            </ThemedText>
          ) : null}
        </View>

        {/* Starting EMI Pill Banner */}
        {startingEMI ? (
          <View
            style={[
              styles.emiBanner,
              {
                backgroundColor: theme.brandPurpleLight,
                borderColor: theme.border,
              },
            ]}>
            <View style={styles.emiHeaderRow}>
              <ThemedText style={[styles.emiLabel, { color: theme.brandPurple }]}>
                EMIs from <ThemedText style={styles.emiAmount}>{formatCurrency(startingEMI)}</ThemedText>/mo
              </ThemedText>
            </View>
            <ThemedText style={[styles.emiBenefitText, { color: theme.brandPurple }]}>
              ✓ 0% Interest Plans Available
            </ThemedText>
          </View>
        ) : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 18,
    borderWidth: 1,
    overflow: 'hidden',
    marginBottom: Spacing.three,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardPressed: {
    opacity: 0.92,
    transform: [{ scale: 0.995 }],
  },
  imageContainer: {
    width: '100%',
    height: 180,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    padding: Spacing.three,
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  imageFallback: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  fallbackEmoji: {
    fontSize: 48,
  },
  discountBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    zIndex: 2,
  },
  discountBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  stockPill: {
    position: 'absolute',
    top: 10,
    right: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    zIndex: 2,
  },
  stockText: {
    fontSize: 10,
    fontWeight: '700',
  },
  detailsContainer: {
    padding: Spacing.three,
    gap: 6,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  brandPill: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  brandPillText: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  variantCountText: {
    fontSize: 11,
    fontWeight: '500',
  },
  productTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  variantInfo: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: -2,
  },
  pricingRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
    marginTop: 4,
  },
  sellingPrice: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111827',
  },
  mrpPrice: {
    fontSize: 13,
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
    fontWeight: '500',
  },
  emiBanner: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
    marginTop: 6,
    gap: 2,
  },
  emiHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emiLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
  emiAmount: {
    fontSize: 13,
    fontWeight: '800',
  },
  emiBenefitText: {
    fontSize: 10,
    fontWeight: '600',
    opacity: 0.9,
  },
});
