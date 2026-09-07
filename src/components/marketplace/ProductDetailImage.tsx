import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Image } from 'expo-image';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

interface ProductDetailImageProps {
  imageUrl?: string;
  discountPercentage?: number | null;
  inStock?: boolean;
}

export function ProductDetailImage({
  imageUrl,
  discountPercentage,
  inStock = true,
}: ProductDetailImageProps) {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: '#FFFFFF',
          borderColor: theme.border,
        },
      ]}>
      {/* Top Status Indicators */}
      <View style={styles.topRow}>
        {discountPercentage ? (
          <View style={styles.discountBadge}>
            <ThemedText style={styles.discountBadgeText}>
              {discountPercentage}% OFF
            </ThemedText>
          </View>
        ) : (
          <View />
        )}

        {!inStock && (
          <View style={styles.outOfStockBadge}>
            <ThemedText style={styles.outOfStockText}>Out of Stock</ThemedText>
          </View>
        )}
      </View>

      {/* Main Image Viewport */}
      <View style={styles.imageViewport}>
        {imageUrl ? (
          <Image
            source={{ uri: imageUrl }}
            style={styles.image}
            contentFit="contain"
            transition={300}
          />
        ) : (
          <View style={styles.fallback}>
            <ThemedText style={styles.fallbackEmoji}>📱</ThemedText>
          </View>
        )}
      </View>

      {/* Single Clean Dot Indicator */}
      <View style={styles.paginationRow}>
        <View style={[styles.activeDot, { backgroundColor: theme.brandPurple }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    borderWidth: 1,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    marginHorizontal: Spacing.three,
    marginTop: Spacing.two,
    paddingVertical: Spacing.two,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.three,
    minHeight: 24,
  },
  discountBadge: {
    backgroundColor: '#DC2626',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  discountBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  outOfStockBadge: {
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  outOfStockText: {
    color: '#DC2626',
    fontSize: 11,
    fontWeight: '700',
  },
  imageViewport: {
    width: '100%',
    height: 280,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.three,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  fallback: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  fallbackEmoji: {
    fontSize: 64,
  },
  paginationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 8,
    gap: 6,
  },
  activeDot: {
    width: 16,
    height: 4,
    borderRadius: 2,
  },
});

