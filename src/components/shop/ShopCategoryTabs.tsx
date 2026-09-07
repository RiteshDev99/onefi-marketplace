import React from 'react';
import { View, StyleSheet, Pressable, ScrollView } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { SHOP_CATEGORY_TABS, ShopCategoryTabKey } from '@/types/shop';

interface ShopCategoryTabsProps {
  activeTab: ShopCategoryTabKey;
  onSelectTab: (tab: ShopCategoryTabKey) => void;
}

export function ShopCategoryTabs({ activeTab, onSelectTab }: ShopCategoryTabsProps) {
  const theme = useTheme();

  return (
    <View style={styles.outerContainer}>
      <View style={[styles.tabTrack, { backgroundColor: theme.brandPurpleLight, borderColor: theme.border }]}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}>
          {SHOP_CATEGORY_TABS.map((tab) => {
            const isActive = activeTab === tab.key;

            return (
              <Pressable
                key={tab.key}
                onPress={() => onSelectTab(tab.key)}
                style={({ pressed }) => [
                  styles.tabButton,
                  isActive && styles.activeTabButton,
                  pressed && styles.pressed,
                ]}>
                <ThemedText
                  style={[
                    styles.tabLabel,
                    isActive ? [styles.activeTabLabel, { color: theme.brandPurple }] : styles.inactiveTabLabel,
                  ]}>
                  {tab.label}
                </ThemedText>

                {isActive && (
                  <View style={[styles.activeIndicator, { backgroundColor: theme.brandPurple }]} />
                )}
              </Pressable>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    paddingHorizontal: Spacing.three,
    marginTop: -16, // Gentle overlap over the hero banner as shown in modern fintech UI
    zIndex: 10,
  },
  tabTrack: {
    borderRadius: 30,
    padding: 4,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  scrollContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    minWidth: '100%',
    justifyContent: 'space-around',
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
  },
  activeTabButton: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 3,
    elevation: 2,
  },
  tabLabel: {
    fontSize: 14,
    textAlign: 'center',
  },
  activeTabLabel: {
    fontWeight: '700',
  },
  inactiveTabLabel: {
    color: '#686E82',
    fontWeight: '600',
  },
  activeIndicator: {
    width: 24,
    height: 3,
    borderRadius: 2,
    marginTop: 3,
  },
  pressed: {
    opacity: 0.75,
  },
});
