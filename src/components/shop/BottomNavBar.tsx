import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SymbolView } from 'expo-symbols';

import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';

export function BottomNavBar() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const theme = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.card,
          borderTopColor: theme.border,
          paddingBottom: Math.max(insets.bottom, 10),
        },
      ]}>
      {/* 1. Home */}
      <Pressable
        style={styles.tabItem}
        accessibilityRole="button"
        accessibilityLabel="Home">
        <SymbolView
          name={{ ios: 'house', android: 'home', web: 'home' }}
          size={22}
          tintColor="#9CA3AF"
        />
        <ThemedText style={styles.inactiveLabel}>Home</ThemedText>
      </Pressable>

      {/* 2. Shop (Active) */}
      <Pressable
        style={styles.tabItem}
        accessibilityRole="button"
        accessibilityLabel="Shop (Active)">
        {/* Active Top Purple Indicator */}
        <View style={[styles.activeTopIndicator, { backgroundColor: theme.brandPurple }]} />
        <SymbolView
          name={{ ios: 'bag.fill', android: 'shopping_bag', web: 'shopping_bag' }}
          size={22}
          tintColor={theme.brandPurple}
        />
        <ThemedText style={[styles.activeLabel, { color: theme.brandPurple }]}>
          Shop
        </ThemedText>
      </Pressable>

      {/* 3. EMI Dues */}
      <Pressable
        style={styles.tabItem}
        accessibilityRole="button"
        accessibilityLabel="EMI Dues">
        <SymbolView
          name={{ ios: 'indianrupeesign.square', android: 'receipt', web: 'credit_card' }}
          size={22}
          tintColor="#9CA3AF"
        />
        <ThemedText style={styles.inactiveLabel}>EMI Dues</ThemedText>
      </Pressable>

      {/* 4. Limit */}
      <Pressable
        style={styles.tabItem}
        accessibilityRole="button"
        accessibilityLabel="Limit">
        <SymbolView
          name={{ ios: 'chart.line.uptrend.xyaxis', android: 'trending_up', web: 'trending_up' }}
          size={22}
          tintColor="#9CA3AF"
        />
        <ThemedText style={styles.inactiveLabel}>Limit</ThemedText>
      </Pressable>

      {/* 5. Profile */}
      <Pressable
        onPress={() => router.push('/explore')}
        style={styles.tabItem}
        accessibilityRole="button"
        accessibilityLabel="Profile">
        <SymbolView
          name={{ ios: 'person', android: 'person', web: 'person' }}
          size={22}
          tintColor="#9CA3AF"
        />
        <ThemedText style={styles.inactiveLabel}>Profile</ThemedText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 8,
    zIndex: 100,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    gap: 3,
    position: 'relative',
    paddingVertical: 2,
  },
  activeTopIndicator: {
    position: 'absolute',
    top: -8,
    width: 28,
    height: 3,
    borderRadius: 2,
  },
  activeLabel: {
    fontSize: 11,
    fontWeight: '700',
  },
  inactiveLabel: {
    fontSize: 11,
    fontWeight: '500',
    color: '#9CA3AF',
  },
});
