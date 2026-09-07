import React from 'react';
import { View, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

interface BrandItem {
  id: string;
  name: string;
  offer: string;
  bgColor: string;
  iconText: string;
  iconSubtext?: string;
  isApple?: boolean;
}

const TOP_BRANDS_DATA: BrandItem[] = [
  {
    id: '1',
    name: 'Air India',
    offer: 'No-cost EMIs upto 18 months',
    bgColor: '#ED1C24',
    iconText: 'AIR INDIA',
  },
  {
    id: '2',
    name: 'Apple Premium Reseller',
    offer: 'No-cost EMIs upto 24 months',
    bgColor: '#000000',
    iconText: '',
    iconSubtext: 'Premium Reseller',
    isApple: true,
  },
  {
    id: '3',
    name: 'CaratLane',
    offer: 'No-cost EMIs upto 6 months',
    bgColor: '#6B1D8C',
    iconText: 'CARATLANE',
    iconSubtext: 'A TANISHQ Partnership',
  },
];

export function TopBrandsPlaceholder() {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      {/* Section Title */}
      <ThemedText style={styles.sectionTitle}>Top Brands</ThemedText>

      {/* Brand Cards List */}
      <View style={styles.cardsList}>
        {TOP_BRANDS_DATA.map((brand) => (
          <View
            key={brand.id}
            style={[
              styles.card,
              {
                backgroundColor: theme.card,
                borderColor: theme.border,
              },
            ]}>
            {/* Brand Logo Box */}
            <View style={[styles.logoBox, { backgroundColor: brand.bgColor }]}>
              <ThemedText
                style={[
                  styles.logoText,
                  brand.isApple ? styles.appleLogo : styles.standardLogo,
                ]}>
                {brand.iconText}
              </ThemedText>
              {brand.iconSubtext && (
                <ThemedText style={styles.logoSubtext}>{brand.iconSubtext}</ThemedText>
              )}
            </View>

            {/* Brand Information */}
            <View style={styles.infoColumn}>
              <ThemedText style={styles.brandName}>{brand.name}</ThemedText>
              <ThemedText style={styles.brandOffer} themeColor="textSecondary">
                {brand.offer}
              </ThemedText>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.four,
    gap: Spacing.two,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: Spacing.one,
  },
  cardsList: {
    gap: Spacing.two,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.three,
    borderRadius: 14,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
    gap: Spacing.three,
  },
  logoBox: {
    width: 60,
    height: 60,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
  },
  logoText: {
    color: '#FFFFFF',
    fontWeight: '800',
    textAlign: 'center',
  },
  standardLogo: {
    fontSize: 9.5,
    letterSpacing: 0.5,
  },
  appleLogo: {
    fontSize: 20,
    lineHeight: 24,
  },
  logoSubtext: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: 6,
    textAlign: 'center',
    marginTop: 2,
    fontWeight: '600',
  },
  infoColumn: {
    flex: 1,
    gap: 2,
  },
  brandName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
  },
  brandOffer: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6B7280',
  },
});
