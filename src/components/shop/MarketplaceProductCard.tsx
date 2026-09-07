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
  const isAvailable = variant?.inStock !== false;

  const handlePress = () => {
    router.push({
      pathname: '/products/[slug]',
      params: { slug: product.slug },
    });
  };

  return (
    <Pressable
      onPress={handlePress}
      accessibilityRole="button"
      accessibilityLabel={`${product.name}, starting from ${
        startingEMI ? formatCurrency(startingEMI) + ' per month' : 'view details'
      }`}
      style={({ pressed }) => [
        styles.cardContainer,
        {
          backgroundColor: theme.card,
          borderColor: theme.border,
        },
        pressed && styles.cardPressed,
      ]}>
      {/* Top Image Section */}
      <View style={styles.imageContainer}>
        {/* Discount Badge if available */}
        {discount ? (
          <View style={styles.discountBadge}>
            <ThemedText numberOfLines={1} style={styles.discountBadgeText}>
              {discount}% off
            </ThemedText>
          </View>
        ) : null}

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

      {/* Card Info Section */}
      <View style={styles.detailsContainer}>
        {/* Prominent Monthly EMI */}
        {startingEMI ? (
          <ThemedText style={styles.emiMonthly}>
            {formatCurrency(startingEMI)}
            <ThemedText style={styles.emiPerMon} themeColor="textSecondary">
              /mon
            </ThemedText>
          </ThemedText>
        ) : variant?.price ? (
          <ThemedText style={styles.emiMonthly}>
            {formatCurrency(variant.price)}
          </ThemedText>
        ) : null}

        {/* Product Name (2 Lines Truncated) */}
        <ThemedText style={styles.productTitle} numberOfLines={2} ellipsizeMode="tail">
          {product.name}
        </ThemedText>

        {/* Pricing Row: Selling Price + MRP + Discount */}
        <View style={styles.pricingRow}>
          {variant?.price ? (
            <ThemedText style={styles.sellingPrice} numberOfLines={1}>
              {formatCurrency(variant.price)}
            </ThemedText>
          ) : null}

          {variant?.mrp && variant.mrp > (variant.price || 0) ? (
            <ThemedText style={styles.mrpPrice} numberOfLines={1}>
              {formatCurrency(variant.mrp)}
            </ThemedText>
          ) : null}

          {discount ? (
            <ThemedText style={styles.discountText} numberOfLines={1}>
              {discount}% off
            </ThemedText>
          ) : null}
        </View>

        {/* Stock / Variant Pill */}
        {!isAvailable ? (
          <View style={styles.outOfStockPill}>
            <ThemedText style={styles.outOfStockText} numberOfLines={1}>
              Out of Stock
            </ThemedText>
          </View>
        ) : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    borderRadius: 14,
    borderWidth: 1,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 2,
    backgroundColor: '#FFFFFF',
  },
  cardPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.985 }],
  },
  imageContainer: {
    width: '100%',
    height: 135,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    padding: Spacing.two,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#F1F5F9',
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
    fontSize: 36,
  },
  discountBadge: {
    position: 'absolute',
    top: 6,
    left: 6,
    backgroundColor: '#DC2626',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    zIndex: 2,
    alignSelf: 'flex-start',
    maxWidth: 60,
  },
  discountBadgeText: {
    color: '#FFFFFF',
    fontSize: 9.5,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
  detailsContainer: {
    padding: 8,
    gap: 2,
  },
  emiMonthly: {
    fontSize: 14.5,
    fontWeight: '800',
    color: '#111827',
  },
  emiPerMon: {
    fontSize: 11.5,
    fontWeight: '500',
  },
  productTitle: {
    fontSize: 12.5,
    fontWeight: '600',
    color: '#1F2937',
    lineHeight: 16,
    minHeight: 32,
  },
  pricingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 5,
    rowGap: 1,
    flexWrap: 'wrap',
    marginTop: 2,
  },
  sellingPrice: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#111827',
  },
  mrpPrice: {
    fontSize: 10,
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
    fontWeight: '500',
  },
  discountText: {
    fontSize: 10,
    color: '#15803D',
    fontWeight: '700',
  },
  outOfStockPill: {
    alignSelf: 'flex-start',
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginTop: 2,
  },
  outOfStockText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#DC2626',
  },
});


