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
          backgroundColor: theme.card,
          borderColor: theme.border,
        },
      ]}>
      {/* Top Badges Row */}
      <View style={styles.topBadgesRow}>
        {discountPercentage ? (
          <View style={[styles.discountBadge, { backgroundColor: '#DC2626' }]}>
            <ThemedText style={styles.discountBadgeText}>
              {discountPercentage}% OFF
            </ThemedText>
          </View>
        ) : (
          <View />
        )}

        <View
          style={[
            styles.stockBadge,
            { backgroundColor: inStock ? theme.badgeGreen : '#FEE2E2' },
          ]}>
          <ThemedText
            style={[
              styles.stockBadgeText,
              { color: inStock ? theme.badgeGreenText : '#DC2626' },
            ]}>
            {inStock ? '● In Stock • Ready to Ship' : 'Out of Stock'}
          </ThemedText>
        </View>
      </View>

      {/* Main Product Image Viewport */}
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

      {/* Bottom Guarantee Banner */}
      <View style={[styles.guaranteeBanner, { backgroundColor: theme.backgroundElement }]}>
        <ThemedText style={styles.guaranteeText}>
          ✓ 100% Brand Sealed & Manufacturer Verified
        </ThemedText>
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
  },
  topBadgesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.three,
    zIndex: 2,
  },
  discountBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  discountBadgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.4,
  },
  stockBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  stockBadgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  imageViewport: {
    width: '100%',
    height: 260,
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
    fontSize: 72,
  },
  guaranteeBanner: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  guaranteeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#475569',
  },
});
