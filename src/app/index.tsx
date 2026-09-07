import React, { useState, useCallback } from 'react';
import { StyleSheet, ScrollView, View, StatusBar, RefreshControl } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedView } from '@/components/themed-view';
import { ShopHeroBanner } from '@/components/shop/ShopHeroBanner';
import { ShopCategoryTabs } from '@/components/shop/ShopCategoryTabs';
import { ShopSearchBar } from '@/components/shop/ShopSearchBar';
import { MarketplaceShell } from '@/components/shop/MarketplaceShell';
import { TopBrandsPlaceholder } from '@/components/shop/TopBrandsPlaceholder';
import { NearbyStoresPlaceholder } from '@/components/shop/NearbyStoresPlaceholder';
import { BottomNavBar } from '@/components/shop/BottomNavBar';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { ShopCategoryTabKey } from '@/types/shop';

export default function ShopScreen() {
  const [activeTab, setActiveTab] = useState<ShopCategoryTabKey>('marketplace');
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0);

  const safeAreaInsets = useSafeAreaInsets();
  const theme = useTheme();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setRefreshTrigger((prev) => prev + 1);
    // Refresh indicator timeout
    setTimeout(() => {
      setRefreshing(false);
    }, 800);
  }, []);

  return (
    <ThemedView style={[styles.outerContainer, { backgroundColor: theme.background }]}>
      <StatusBar barStyle="light-content" backgroundColor="#35169B" />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.contentContainer,
          {
            paddingTop: safeAreaInsets.top,
            paddingBottom: Math.max(safeAreaInsets.bottom, 12) + 64,
          },
        ]}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={theme.brandPurple}
            colors={[theme.brandPurple]}
          />
        }>
        <View style={styles.responsiveWrapper}>
          {/* 1Fi Purple Hero Banner */}
          <ShopHeroBanner />

          {/* Segmented Pill Category Tabs */}
          <ShopCategoryTabs activeTab={activeTab} onSelectTab={setActiveTab} />

          {/* Capsule Search Bar */}
          <ShopSearchBar activeTab={activeTab} />

          {/* Category Tab Content */}
          <View style={styles.tabContent}>
            {activeTab === 'marketplace' && <MarketplaceShell refreshTrigger={refreshTrigger} />}
            {activeTab === 'top_brands' && <TopBrandsPlaceholder />}
            {activeTab === 'nearby_stores' && <NearbyStoresPlaceholder />}
          </View>
        </View>
      </ScrollView>

      {/* 1Fi Bottom Navigation Bar */}
      <BottomNavBar />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    alignItems: 'center',
  },
  responsiveWrapper: {
    width: '100%',
    maxWidth: MaxContentWidth,
  },
  tabContent: {
    paddingBottom: Spacing.four,
  },
});
