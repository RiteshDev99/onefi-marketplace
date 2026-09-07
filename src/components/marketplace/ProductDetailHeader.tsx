import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { SymbolView } from 'expo-symbols';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

interface ProductDetailHeaderProps {
  title?: string;
  brand?: string;
}

export function ProductDetailHeader({ title, brand }: ProductDetailHeaderProps) {
  const router = useRouter();
  const theme = useTheme();

  return (
    <View
      style={[
        styles.header,
        {
          backgroundColor: theme.card,
          borderColor: theme.border,
        },
      ]}>
      {/* Back Button */}
      <Pressable
        onPress={() => router.back()}
        accessibilityRole="button"
        accessibilityLabel="Go back to Marketplace"
        style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}>
        <SymbolView
          name={{ ios: 'chevron.left', android: 'arrow_back', web: 'chevron_left' }}
          size={22}
          tintColor={theme.text}
        />
      </Pressable>

      {/* Center Breadcrumb */}
      <View style={styles.centerContainer}>
        <ThemedText style={styles.breadcrumb} numberOfLines={1}>
          Store / {brand ? `${brand} / ` : ''}
          <ThemedText style={styles.currentTitle}>{title || 'Details'}</ThemedText>
        </ThemedText>
      </View>

      {/* Trust Pill */}
      <View style={[styles.trustPill, { backgroundColor: theme.badgeGreen }]}>
        <ThemedText style={[styles.trustPillText, { color: theme.badgeGreenText }]}>
          ✓ Verified
        </ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.three,
    paddingVertical: 12,
    borderBottomWidth: 1,
    gap: Spacing.two,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.7,
  },
  centerContainer: {
    flex: 1,
  },
  breadcrumb: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  currentTitle: {
    color: '#111827',
    fontWeight: '700',
  },
  trustPill: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  trustPillText: {
    fontSize: 10,
    fontWeight: '700',
  },
});
