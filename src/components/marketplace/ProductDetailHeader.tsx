import React from 'react';
import { View, StyleSheet, Pressable, Share, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { SymbolView } from 'expo-symbols';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

interface ProductDetailHeaderProps {
  title?: string;
  brand?: string;
  productName?: string;
}

export function ProductDetailHeader({ title, brand, productName }: ProductDetailHeaderProps) {
  const router = useRouter();
  const theme = useTheme();

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out ${productName || title || 'this flagship device'} on 1Fi Marketplace!`,
      });
    } catch {
      // Ignored
    }
  };

  return (
    <View
      style={[
        styles.header,
        {
          backgroundColor: theme.card,
          borderBottomColor: theme.border,
        },
      ]}>
      {/* Left Back Button + Brand Name */}
      <View style={styles.leftGroup}>
        <Pressable
          onPress={() => router.back()}
          accessibilityRole="button"
          accessibilityLabel="Go back to Marketplace"
          style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}>
          <SymbolView
            name={{ ios: 'arrow.backward', android: 'arrow_back', web: 'arrow_back' }}
            size={22}
            tintColor={theme.text}
          />
        </Pressable>

        {brand ? (
          <ThemedText style={styles.headerBrand} numberOfLines={1}>
            {brand}
          </ThemedText>
        ) : null}
      </View>

      {/* Right Action: Share Button */}
      <Pressable
        onPress={handleShare}
        accessibilityRole="button"
        accessibilityLabel="Share product"
        style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}>
        <SymbolView
          name={{ ios: 'square.and.arrow.up', android: 'share', web: 'share' }}
          size={20}
          tintColor={theme.text}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.three,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  leftGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  iconButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.65,
  },
  headerBrand: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
});

