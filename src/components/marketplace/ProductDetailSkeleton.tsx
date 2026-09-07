import React from 'react';
import { View, StyleSheet } from 'react-native';

import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export function ProductDetailSkeleton() {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      {/* 1. Skeleton Pricing & Title Card */}
      <View
        style={[
          styles.skeletonCard,
          {
            backgroundColor: theme.card,
            borderColor: theme.border,
          },
        ]}>
        <View style={styles.badgePlaceholder} />
        <View style={styles.priceRowPlaceholder}>
          <View style={styles.pricePlaceholder} />
          <View style={styles.mrpPlaceholder} />
          <View style={styles.discountPlaceholder} />
        </View>
        <View style={styles.titlePlaceholder} />
      </View>

      {/* 2. Skeleton Media Viewport */}
      <View
        style={[
          styles.skeletonCard,
          {
            backgroundColor: theme.card,
            borderColor: theme.border,
          },
        ]}>
        <View style={styles.imagePlaceholder} />
        <View style={styles.dotsPlaceholder}>
          <View style={[styles.dot, styles.dotActive]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>
      </View>

      {/* 3. Skeleton Variant Selector Card */}
      <View
        style={[
          styles.skeletonCard,
          {
            backgroundColor: theme.card,
            borderColor: theme.border,
          },
        ]}>
        <View style={styles.sectionHeaderPlaceholder} />
        <View style={styles.variantItemPlaceholder} />
        <View style={styles.variantItemPlaceholder} />
      </View>

      {/* 4. Skeleton EMI Plan Selector Card */}
      <View
        style={[
          styles.skeletonCard,
          {
            backgroundColor: theme.card,
            borderColor: theme.border,
          },
        ]}>
        <View style={styles.sectionHeaderPlaceholder} />
        <View style={styles.emiRowPlaceholder} />
        <View style={styles.emiRowPlaceholder} />
        <View style={styles.emiRowPlaceholder} />
      </View>

      {/* 5. Skeleton Specifications Card */}
      <View
        style={[
          styles.skeletonCard,
          {
            backgroundColor: theme.card,
            borderColor: theme.border,
          },
        ]}>
        <View style={styles.sectionHeaderPlaceholder} />
        <View style={styles.specRowPlaceholder}>
          <View style={styles.specLabelPlaceholder} />
          <View style={styles.specValPlaceholder} />
        </View>
        <View style={styles.specRowPlaceholder}>
          <View style={styles.specLabelPlaceholder} />
          <View style={styles.specValPlaceholder} />
        </View>
        <View style={styles.specRowPlaceholder}>
          <View style={styles.specLabelPlaceholder} />
          <View style={styles.specValPlaceholder} />
        </View>
      </View>

      {/* 6. Skeleton Description Card */}
      <View
        style={[
          styles.skeletonCard,
          {
            backgroundColor: theme.card,
            borderColor: theme.border,
          },
        ]}>
        <View style={styles.sectionHeaderPlaceholder} />
        <View style={styles.descLine1} />
        <View style={styles.descLine2} />
        <View style={styles.descLine3} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: Spacing.four,
    gap: 12,
  },
  skeletonCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    marginHorizontal: Spacing.four,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 3,
    elevation: 1,
  },
  badgePlaceholder: {
    width: 60,
    height: 18,
    borderRadius: 6,
    backgroundColor: '#F1F3F9',
  },
  priceRowPlaceholder: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  pricePlaceholder: {
    width: 110,
    height: 24,
    borderRadius: 6,
    backgroundColor: '#E8ECF4',
  },
  mrpPlaceholder: {
    width: 70,
    height: 18,
    borderRadius: 4,
    backgroundColor: '#F1F3F9',
  },
  discountPlaceholder: {
    width: 50,
    height: 18,
    borderRadius: 4,
    backgroundColor: '#F1F3F9',
  },
  titlePlaceholder: {
    width: '85%',
    height: 20,
    borderRadius: 6,
    backgroundColor: '#F1F3F9',
  },
  imagePlaceholder: {
    width: '100%',
    height: 220,
    borderRadius: 12,
    backgroundColor: '#F8F9FD',
  },
  dotsPlaceholder: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#E2E8F0',
  },
  dotActive: {
    width: 18,
    backgroundColor: '#CBD5E1',
  },
  sectionHeaderPlaceholder: {
    width: 140,
    height: 16,
    borderRadius: 4,
    backgroundColor: '#E8ECF4',
    marginBottom: 2,
  },
  variantItemPlaceholder: {
    width: '100%',
    height: 52,
    borderRadius: 12,
    backgroundColor: '#F8F9FD',
    borderWidth: 1,
    borderColor: '#E8ECF2',
  },
  emiRowPlaceholder: {
    width: '100%',
    height: 56,
    borderRadius: 12,
    backgroundColor: '#F8F9FD',
    borderWidth: 1,
    borderColor: '#E8ECF2',
  },
  specRowPlaceholder: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  specLabelPlaceholder: {
    width: 80,
    height: 14,
    borderRadius: 4,
    backgroundColor: '#F1F3F9',
  },
  specValPlaceholder: {
    width: 120,
    height: 14,
    borderRadius: 4,
    backgroundColor: '#E8ECF4',
  },
  descLine1: {
    width: '95%',
    height: 14,
    borderRadius: 4,
    backgroundColor: '#F1F3F9',
  },
  descLine2: {
    width: '85%',
    height: 14,
    borderRadius: 4,
    backgroundColor: '#F1F3F9',
  },
  descLine3: {
    width: '60%',
    height: 14,
    borderRadius: 4,
    backgroundColor: '#F1F3F9',
  },
});
