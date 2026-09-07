import React from 'react';
import { View, StyleSheet, TextInput, Platform } from 'react-native';
import { SymbolView } from 'expo-symbols';

import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { ShopCategoryTabKey } from '@/types/shop';

interface ShopSearchBarProps {
  activeTab: ShopCategoryTabKey;
}

export function ShopSearchBar({ activeTab }: ShopSearchBarProps) {
  const theme = useTheme();

  const placeholderText =
    activeTab === 'top_brands'
      ? 'Search online stores...'
      : activeTab === 'nearby_stores'
      ? 'Search stores...'
      : 'Search smartphones, electronics & EMI deals...';

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.searchBar,
          {
            backgroundColor: theme.card,
            borderColor: theme.border,
          },
        ]}>
        <SymbolView
          tintColor="#9CA3AF"
          name={{ ios: 'magnifyingglass', android: 'search', web: 'search' }}
          size={18}
          style={styles.icon}
        />
        <TextInput
          placeholder={placeholderText}
          placeholderTextColor="#9CA3AF"
          style={[styles.input, { color: theme.text }]}
          editable={false}
          selectTextOnFocus={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.three,
    marginTop: Spacing.three,
    marginBottom: Spacing.two,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.three,
    paddingVertical: Platform.OS === 'ios' ? 12 : 8,
    borderRadius: 26,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 14,
    fontWeight: '400',
  },
});
