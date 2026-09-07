import React from 'react';
import { View, StyleSheet } from 'react-native';

import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export function MarketplaceLoading() {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      {/* 2-Column Skeleton Grid */}
      <View style={styles.skeletonGrid}>
        {[1, 2, 3, 4].map((key) => (
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
            <View style={[styles.skeletonImage, { backgroundColor: '#F8F9FD' }]} />

            {/* Skeleton Content Details */}
            <View style={styles.skeletonDetails}>
              <View style={[styles.skeletonEmi, { backgroundColor: '#E8ECF4' }]} />
              <View style={[styles.skeletonTitle, { backgroundColor: '#F1F3F9' }]} />
              <View style={[styles.skeletonPriceRow, { backgroundColor: '#F1F3F9' }]} />
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.two,
  },
  skeletonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
    marginTop: 2,
  },
  skeletonCard: {
    width: '48%',
    borderRadius: 14,
    borderWidth: 1,
    overflow: 'hidden',
  },
  skeletonImage: {
    width: '100%',
    height: 135,
  },
  skeletonDetails: {
    padding: 8,
    gap: 6,
  },
  skeletonEmi: {
    width: '60%',
    height: 16,
    borderRadius: 4,
  },
  skeletonTitle: {
    width: '90%',
    height: 24,
    borderRadius: 4,
  },
  skeletonPriceRow: {
    width: '75%',
    height: 14,
    borderRadius: 4,
  },
});
