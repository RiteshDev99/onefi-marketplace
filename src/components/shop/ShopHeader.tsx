import React from 'react';
import { View, StyleSheet, TextInput, Platform } from 'react-native';
import { SymbolView } from 'expo-symbols';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export function ShopHeader() {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      {/* Top Bar: Brand & Location */}
      <View style={styles.topRow}>
        <View style={styles.brandContainer}>
          <View style={[styles.brandBadge, { backgroundColor: theme.brandPrimary }]}>
            <ThemedText style={styles.brandBadgeText}>1Fi</ThemedText>
          </View>
          <View>
            <ThemedText type="smallBold" style={styles.shopTitle}>
              1Fi Shop
            </ThemedText>
            <ThemedText type="small" themeColor="textSecondary" style={styles.shopSubtitle}>
              Smart Financing & Zero-Cost EMIs
            </ThemedText>
          </View>
        </View>

        <View style={[styles.deliveryChip, { backgroundColor: theme.badgeGreen, borderColor: theme.border }]}>
          <ThemedText style={[styles.deliveryText, { color: theme.badgeGreenText }]}>
            ⚡ Express 24h Delivery
          </ThemedText>
        </View>
      </View>

      {/* Search Input Bar (Shell) */}
      <ThemedView type="backgroundElement" style={[styles.searchBar, { borderColor: theme.border }]}>
        <SymbolView
          tintColor={theme.textSecondary}
          name={{ ios: 'magnifyingglass', android: 'search', web: 'search' }}
          size={16}
          style={styles.searchIcon}
        />
        <TextInput
          placeholder="Search smartphones, electronics & EMI deals..."
          placeholderTextColor={theme.textSecondary}
          style={[styles.searchInput, { color: theme.text }]}
          editable={false}
          selectTextOnFocus={false}
        />
      </ThemedView>

      {/* Trust & Promotion Highlight Banner */}
      <View style={[styles.bannerContainer, { backgroundColor: theme.backgroundElement, borderColor: theme.border }]}>
        <View style={styles.bannerItem}>
          <ThemedText style={[styles.bannerDot, { color: theme.brandPrimary }]}>●</ThemedText>
          <ThemedText type="small" themeColor="textSecondary" style={styles.bannerText}>
            Paperless Instant Approvals
          </ThemedText>
        </View>
        <View style={styles.bannerDivider} />
        <View style={styles.bannerItem}>
          <ThemedText style={[styles.bannerDot, { color: theme.brandPrimary }]}>●</ThemedText>
          <ThemedText type="small" themeColor="textSecondary" style={styles.bannerText}>
            0% Interest EMI Plans
          </ThemedText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.three,
    paddingTop: Spacing.two,
    paddingBottom: Spacing.two,
    gap: Spacing.two,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: Spacing.two,
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  brandBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandBadgeText: {
    color: '#0B0F19',
    fontWeight: '800',
    fontSize: 14,
    letterSpacing: 0.5,
  },
  shopTitle: {
    fontSize: 16,
    lineHeight: 20,
  },
  shopSubtitle: {
    fontSize: 11,
    lineHeight: 14,
  },
  deliveryChip: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: StyleSheet.hairlineWidth,
  },
  deliveryText: {
    fontSize: 11,
    fontWeight: '600',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.three,
    paddingVertical: Platform.OS === 'ios' ? Spacing.two : Spacing.one,
    borderRadius: 12,
    borderWidth: 1,
    gap: Spacing.two,
  },
  searchIcon: {
    marginRight: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    paddingVertical: 4,
  },
  bannerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
  },
  bannerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  bannerDot: {
    fontSize: 8,
  },
  bannerText: {
    fontSize: 11,
    fontWeight: '500',
  },
  bannerDivider: {
    width: 1,
    height: 12,
    backgroundColor: '#CBD5E1',
  },
});
