import React from 'react';
import { View, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export function MarketplaceShell() {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      {/* Section Header */}
      <View style={styles.headerRow}>
        <View>
          <ThemedText style={styles.sectionTitle}>1Fi Marketplace</ThemedText>
          <ThemedText style={styles.sectionSubtitle} themeColor="textSecondary">
            Flagship Smartphones on Zero-Cost EMI
          </ThemedText>
        </View>

        <View style={[styles.liveBadge, { backgroundColor: theme.badgeGreen }]}>
          <ThemedText style={[styles.liveBadgeText, { color: theme.badgeGreenText }]}>
            ● Live Catalog
          </ThemedText>
        </View>
      </View>

      {/* Feature / Highlight Card Shell */}
      <View
        style={[
          styles.mainCard,
          {
            backgroundColor: theme.card,
            borderColor: theme.border,
          },
        ]}>
        <View style={[styles.iconContainer, { backgroundColor: theme.brandPurpleLight }]}>
          <ThemedText style={styles.iconEmoji}>📱</ThemedText>
        </View>

        <ThemedText style={styles.cardTitle}>Official Online Marketplace</ThemedText>
        <ThemedText style={styles.cardSubtitle} themeColor="textSecondary">
          Explore top smartphones from Apple, Samsung, and OnePlus with flexible monthly EMI plans backed by your mutual funds.
        </ThemedText>

        {/* 3 Quick Benefit Chips */}
        <View style={styles.benefitsRow}>
          <View style={[styles.benefitChip, { backgroundColor: '#F0FDF4', borderColor: '#DCFCE7' }]}>
            <ThemedText style={styles.benefitText}>✓ 0% Interest</ThemedText>
          </View>
          <View style={[styles.benefitChip, { backgroundColor: '#EFF6FF', borderColor: '#DBEAFE' }]}>
            <ThemedText style={styles.benefitText}>✓ Instant KYC</ThemedText>
          </View>
          <View style={[styles.benefitChip, { backgroundColor: '#FAF5FF', borderColor: '#F3E8FF' }]}>
            <ThemedText style={styles.benefitText}>✓ Brand Warranty</ThemedText>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.three,
    gap: Spacing.two,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.one,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  sectionSubtitle: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  liveBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  liveBadgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  mainCard: {
    padding: Spacing.four,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.two,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  iconEmoji: {
    fontSize: 26,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
  },
  cardSubtitle: {
    fontSize: 13,
    lineHeight: 18,
    textAlign: 'center',
    maxWidth: 300,
  },
  benefitsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    marginTop: Spacing.one,
  },
  benefitChip: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    borderWidth: 1,
  },
  benefitText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#374151',
  },
});
