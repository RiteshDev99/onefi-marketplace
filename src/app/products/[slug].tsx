import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SymbolView } from 'expo-symbols';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export default function ProductDetailScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const theme = useTheme();

  return (
    <ThemedView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Top Header with Back Navigation */}
      <View
        style={[
          styles.header,
          {
            paddingTop: insets.top + Spacing.two,
            backgroundColor: theme.card,
            borderColor: theme.border,
          },
        ]}>
        <Pressable
          onPress={() => router.back()}
          style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}>
          <SymbolView
            name={{ ios: 'chevron.left', android: 'arrow_back', web: 'chevron_left' }}
            size={22}
            tintColor={theme.text}
          />
        </Pressable>

        <View style={styles.headerTitleContainer}>
          <ThemedText style={styles.headerTitle} numberOfLines={1}>
            Product Details
          </ThemedText>
        </View>

        <View style={styles.headerRightPlaceholder} />
      </View>

      {/* Placeholder Content Area for Step 3 */}
      <View style={styles.content}>
        <View
          style={[
            styles.infoCard,
            {
              backgroundColor: theme.card,
              borderColor: theme.border,
            },
          ]}>
          <View style={[styles.badge, { backgroundColor: theme.brandPurpleLight }]}>
            <ThemedText style={[styles.badgeText, { color: theme.brandPurple }]}>
              Step 2 Navigation Established
            </ThemedText>
          </View>

          <ThemedText style={styles.slugTitle}>
            {slug ? String(slug) : 'Product'}
          </ThemedText>

          <ThemedText style={styles.description} themeColor="textSecondary">
            Route `/products/${slug}` is active and connected to the marketplace catalog. Product specs, variant switcher, and interactive EMI financing plans will be built in Step 3.
          </ThemedText>

          <Pressable
            onPress={() => router.back()}
            style={({ pressed }) => [
              styles.backToCatalogBtn,
              { backgroundColor: theme.brandPurple },
              pressed && styles.pressed,
            ]}>
            <ThemedText style={styles.backBtnText}>← Back to 1Fi Shop</ThemedText>
          </Pressable>
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.three,
    paddingBottom: Spacing.three,
    borderBottomWidth: 1,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
  },
  headerRightPlaceholder: {
    width: 40,
  },
  content: {
    flex: 1,
    padding: Spacing.four,
    justifyContent: 'center',
  },
  infoCard: {
    padding: Spacing.five,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: 'center',
    gap: Spacing.three,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 14,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  slugTitle: {
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'center',
    color: '#111827',
  },
  description: {
    fontSize: 13,
    lineHeight: 19,
    textAlign: 'center',
    maxWidth: 300,
  },
  backToCatalogBtn: {
    marginTop: Spacing.two,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
  },
  backBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.8,
  },
});
