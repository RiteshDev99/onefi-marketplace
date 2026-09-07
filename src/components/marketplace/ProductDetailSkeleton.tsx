import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export function ProductDetailSkeleton() {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      {/* Loading Indicator */}
      <View style={styles.indicatorRow}>
        <ActivityIndicator size="small" color={theme.brandPurple} />
        <ThemedText style={[styles.loadingText, { color: theme.brandPurple }]}>
          Loading device specifications & EMI options...
        </ThemedText>
      </View>

      {/* Skeleton Media Card */}
      <View
        style={[
          styles.skeletonImageCard,
          {
            backgroundColor: theme.card,
            borderColor: theme.border,
          },
        ]}>
        <View style={[styles.imagePlaceholder, { backgroundColor: theme.backgroundElement }]} />
      </View>

      {/* Skeleton Pricing & Details Card */}
      <View
        style={[
          styles.skeletonDetailsCard,
          {
            backgroundColor: theme.card,
            borderColor: theme.border,
          },
        ]}>
        <View style={[styles.skeletonPill, { backgroundColor: theme.backgroundElement }]} />
        <View style={[styles.skeletonTitle, { backgroundColor: theme.backgroundElement }]} />
        <View style={[styles.skeletonPrice, { backgroundColor: theme.backgroundElement }]} />
        <View style={[styles.skeletonBanner, { backgroundColor: theme.backgroundElement }]} />
      </View>

      {/* Skeleton Description Card */}
      <View
        style={[
          styles.skeletonDescCard,
          {
            backgroundColor: theme.card,
            borderColor: theme.border,
          },
        ]}>
        <View style={[styles.skeletonDescLine1, { backgroundColor: theme.backgroundElement }]} />
        <View style={[styles.skeletonDescLine2, { backgroundColor: theme.backgroundElement }]} />
        <View style={[styles.skeletonDescLine3, { backgroundColor: theme.backgroundElement }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: Spacing.four,
  },
  indicatorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: Spacing.three,
  },
  loadingText: {
    fontSize: 13,
    fontWeight: '600',
  },
  skeletonImageCard: {
    borderRadius: 20,
    borderWidth: 1,
    padding: Spacing.four,
    marginHorizontal: Spacing.three,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagePlaceholder: {
    width: '80%',
    height: 220,
    borderRadius: 16,
    opacity: 0.6,
  },
  skeletonDetailsCard: {
    borderRadius: 20,
    borderWidth: 1,
    padding: Spacing.four,
    marginHorizontal: Spacing.three,
    marginTop: Spacing.three,
    gap: 12,
  },
  skeletonPill: {
    width: 70,
    height: 22,
    borderRadius: 8,
    opacity: 0.6,
  },
  skeletonTitle: {
    width: '75%',
    height: 26,
    borderRadius: 8,
    opacity: 0.7,
  },
  skeletonPrice: {
    width: '45%',
    height: 30,
    borderRadius: 8,
    opacity: 0.6,
  },
  skeletonBanner: {
    width: '100%',
    height: 50,
    borderRadius: 12,
    opacity: 0.5,
    marginTop: 4,
  },
  skeletonDescCard: {
    borderRadius: 20,
    borderWidth: 1,
    padding: Spacing.four,
    marginHorizontal: Spacing.three,
    marginTop: Spacing.three,
    gap: 10,
  },
  skeletonDescLine1: {
    width: '90%',
    height: 16,
    borderRadius: 4,
    opacity: 0.5,
  },
  skeletonDescLine2: {
    width: '100%',
    height: 16,
    borderRadius: 4,
    opacity: 0.5,
  },
  skeletonDescLine3: {
    width: '60%',
    height: 16,
    borderRadius: 4,
    opacity: 0.5,
  },
});
