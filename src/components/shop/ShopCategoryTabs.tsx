import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';

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
      <View style={[styles.tabTrack, { backgroundColor: '#F1F3F9', borderColor: '#E2E8F0' }]}>
        {SHOP_CATEGORY_TABS.map((tab) => {
          const isActive = activeTab === tab.key;

          return (
            <Pressable
              key={tab.key}
              onPress={() => onSelectTab(tab.key)}
              accessibilityRole="tab"
              accessibilityState={{ selected: isActive }}
              accessibilityLabel={tab.label}
              style={({ pressed }) => [
                styles.tabButton,
                isActive && styles.activeTabButton,
                pressed && styles.pressed,
              ]}>
              <ThemedText
                numberOfLines={1}
                ellipsizeMode="tail"
                style={[
                  styles.tabLabel,
                  isActive ? styles.activeTabLabel : styles.inactiveTabLabel,
                ]}>
                {tab.label}
              </ThemedText>

              {isActive && (
                <View style={[styles.activeIndicator, { backgroundColor: theme.brandPurple }]} />
              )}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    paddingHorizontal: Spacing.four,
    marginTop: -14, // Clean, subtle overlap with hero banner
    zIndex: 10,
    width: '100%',
  },
  tabTrack: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 28,
    padding: 3,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 3,
    height: 48,
  },
  tabButton: {
    flex: 1,
    height: '100%',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
    position: 'relative',
  },
  activeTabButton: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  tabLabel: {
    fontSize: 12.5,
    textAlign: 'center',
  },
  activeTabLabel: {
    color: '#6226E3',
    fontWeight: '700',
  },
  inactiveTabLabel: {
    color: '#64748B',
    fontWeight: '600',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 4,
    width: 20,
    height: 2.5,
    borderRadius: 2,
  },
  pressed: {
    opacity: 0.8,
  },
});
