import React from 'react';
import { View, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

interface StoreItem {
  id: string;
  name: string;
  address: string;
  distance: string;
  logoEmoji: string;
  logoBg: string;
  logoColor: string;
}

const NEARBY_STORES_DATA: StoreItem[] = [
  {
    id: '1',
    name: 'TripBouquet',
    address: '241, Tower B, Spazedge, near Dmart, Gurugram, Haryana, 122018',
    distance: '628 KM',
    logoEmoji: '📍',
    logoBg: '#FEF2F2',
    logoColor: '#DC2626',
  },
  {
    id: '2',
    name: 'Atelier Forbidden Jour...',
    address: 'Sector 40, Gurugram, Haryana, 122001',
    distance: '628 KM',
    logoEmoji: '🏵️',
    logoBg: '#FFFBEB',
    logoColor: '#D97706',
  },
  {
    id: '3',
    name: 'Charger On Wheels',
    address: 'Orchid Business Park, Near Subhash Chowk, Gurugram, Haryana, 122101',
    distance: '628 KM',
    logoEmoji: '⚡',
    logoBg: '#F0FDF4',
    logoColor: '#16A34A',
  },
];

export function NearbyStoresPlaceholder() {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      {/* Header with Title and Location Filter */}
      <View style={styles.headerRow}>
        <ThemedText style={styles.sectionTitle}>Nearby Stores</ThemedText>

        <View style={[styles.locationPill, { backgroundColor: theme.brandPurpleLight, borderColor: theme.border }]}>
          <ThemedText style={[styles.locationText, { color: theme.brandPurple }]}>
            Jaunpur ⌄
          </ThemedText>
        </View>
      </View>

      {/* Stores List */}
      <View style={styles.cardsList}>
        {NEARBY_STORES_DATA.map((store) => (
          <View
            key={store.id}
            style={[
              styles.card,
              {
                backgroundColor: theme.card,
                borderColor: theme.border,
              },
            ]}>
            {/* Store Icon Box */}
            <View style={[styles.logoBox, { backgroundColor: store.logoBg, borderColor: theme.border }]}>
              <ThemedText style={styles.logoEmoji}>{store.logoEmoji}</ThemedText>
            </View>

            {/* Store Info */}
            <View style={styles.infoColumn}>
              <View style={styles.storeTopRow}>
                <ThemedText style={styles.storeName}>{store.name}</ThemedText>
                <View style={styles.distanceBadge}>
                  <ThemedText style={styles.distanceText}>{store.distance}</ThemedText>
                </View>
              </View>

              <ThemedText style={styles.storeAddress} themeColor="textSecondary" numberOfLines={2}>
                {store.address}
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
  locationPill: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 16,
    borderWidth: 1,
  },
  locationText: {
    fontSize: 12,
    fontWeight: '700',
  },
  cardsList: {
    gap: Spacing.three,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: Spacing.three,
    borderRadius: 16,
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
    borderRadius: 14,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoEmoji: {
    fontSize: 26,
  },
  infoColumn: {
    flex: 1,
    gap: 4,
  },
  storeTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  storeName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
    flex: 1,
  },
  distanceBadge: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  distanceText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#6B7280',
    letterSpacing: 0.3,
  },
  storeAddress: {
    fontSize: 12,
    lineHeight: 16,
    color: '#6B7280',
    fontWeight: '400',
  },
});
