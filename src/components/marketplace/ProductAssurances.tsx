import React from 'react';
import { View, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

const ASSURANCES = [
  {
    icon: '🚀',
    title: 'Express Insured Delivery',
    subtitle: 'Free & insured shipping directly from manufacturer',
  },
  {
    icon: '🛡️',
    title: '1-Year Official Warranty',
    subtitle: '100% authentic brand sealed product with pan-India warranty',
  },
  {
    icon: '📄',
    title: 'Instant Paperless KYC',
    subtitle: 'Zero documentation required • Backed by mutual funds',
  },
  {
    icon: '🔒',
    title: 'Bank-Grade Security',
    subtitle: '256-bit encrypted transactions & zero hidden fees',
  },
];

export function ProductAssurances() {
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
      <ThemedText style={styles.sectionTitle}>1Fi Trust & Assurances</ThemedText>

      <View style={styles.grid}>
        {ASSURANCES.map((item, index) => (
          <View key={index} style={styles.itemRow}>
            <View style={[styles.iconBox, { backgroundColor: theme.backgroundElement }]}>
              <ThemedText style={styles.icon}>{item.icon}</ThemedText>
            </View>
            <View style={styles.textCol}>
              <ThemedText style={styles.title}>{item.title}</ThemedText>
              <ThemedText style={styles.subtitle} themeColor="textSecondary">
                {item.subtitle}
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
    borderRadius: 20,
    borderWidth: 1,
    padding: Spacing.four,
    marginHorizontal: Spacing.three,
    marginTop: Spacing.three,
    marginBottom: Spacing.four,
    gap: Spacing.three,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  grid: {
    gap: Spacing.three,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 18,
  },
  textCol: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
  },
  subtitle: {
    fontSize: 12,
    lineHeight: 16,
  },
});
