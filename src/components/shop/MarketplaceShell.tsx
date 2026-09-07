import React from 'react';
import { View, StyleSheet } from 'react-native';

import { MarketplaceProductList } from './MarketplaceProductList';

interface MarketplaceShellProps {
  refreshTrigger?: number;
}

export function MarketplaceShell({ refreshTrigger }: MarketplaceShellProps) {
  return (
    <View style={styles.container}>
      <MarketplaceProductList refreshTrigger={refreshTrigger} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});
