import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export function MarketplaceLoading() {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      {/* Top Loading Indicator */}
      <View style={styles.indicatorContainer}>
        <ActivityIndicator size="small" color={theme.brandPurple} />
        <ThemedText style={[styles.loadingText, { color: theme.brandPurple }]}>
          Loading 1Fi Marketplace catalog...
        </ThemedText>
      </View>

      {/* 2 Skeleton Cards */}
      {[1, 2].map((key) => (
        <View
          key={key}
          style={[
            styles.skeletonCard,
            {
              backgroundColor: theme.card,
              borderColor: theme.border,
            },
          ]}>
          {/* Skeleton Media Viewport */}
          <View style={[styles.skeletonImage, { backgroundColor: theme.backgroundElement }]} />

          {/* Skeleton Content Details */}
          <View style={styles.skeletonDetails}>
            <View style={[styles.skeletonPill, { backgroundColor: theme.backgroundElement }]} />
            <View style={[styles.skeletonTitle, { backgroundColor: theme.backgroundElement }]} />
            <View style={[styles.skeletonPriceRow, { backgroundColor: theme.backgroundElement }]} />
            <View style={[styles.skeletonEmiBanner, { backgroundColor: theme.backgroundElement }]} />
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.three,
  },
  indicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: Spacing.two,
  },
  loadingText: {
    fontSize: 13,
    fontWeight: '600',
  },
  skeletonCard: {
    borderRadius: 18,
    borderWidth: 1,
    overflow: 'hidden',
    marginBottom: Spacing.two,
  },
  skeletonImage: {
    width: '100%',
    height: 180,
    opacity: 0.6,
  },
  skeletonDetails: {
    padding: Spacing.three,
    gap: 10,
  },
  skeletonPill: {
    width: 60,
    height: 20,
    borderRadius: 6,
    opacity: 0.6,
  },
  skeletonTitle: {
    width: '80%',
    height: 22,
    borderRadius: 6,
    opacity: 0.7,
  },
  skeletonPriceRow: {
    width: '45%',
    height: 24,
    borderRadius: 6,
    opacity: 0.6,
  },
  skeletonEmiBanner: {
    width: '100%',
    height: 38,
    borderRadius: 10,
    opacity: 0.6,
    marginTop: 4,
  },
});
