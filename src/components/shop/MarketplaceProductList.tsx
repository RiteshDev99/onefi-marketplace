import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { productService } from '@/services/productService';
import { Product } from '@/types/product';
import { MarketplaceProductCard } from './MarketplaceProductCard';
import { MarketplaceLoading } from './MarketplaceLoading';
import { MarketplaceError } from './MarketplaceError';

interface MarketplaceProductListProps {
  onProductsLoaded?: (count: number) => void;
  refreshTrigger?: number;
}

export function MarketplaceProductList({ onProductsLoaded, refreshTrigger }: MarketplaceProductListProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const theme = useTheme();

  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await productService.getProducts();
      setProducts(data);
      onProductsLoaded?.(data.length);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to load products';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [onProductsLoaded]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts, refreshTrigger]);

  return (
    <View style={styles.container}>
      {/* Header Row with Title and Catalog Status */}
      <View style={styles.headerRow}>
        
      </View>

      {/* Main Content Area */}
      {loading ? (
        <MarketplaceLoading />
      ) : error ? (
        <MarketplaceError message={error} onRetry={loadProducts} />
      ) : products.length === 0 ? (
        <View
          style={[
            styles.emptyCard,
            {
              backgroundColor: theme.card,
              borderColor: theme.border,
            },
          ]}>
          <ThemedText style={styles.emptyEmoji}>📦</ThemedText>
          <ThemedText style={styles.emptyTitle}>No Products Available</ThemedText>
          <ThemedText style={styles.emptySubtitle} themeColor="textSecondary">
            Check back soon for new smartphones and electronics.
          </ThemedText>
        </View>
      ) : (
        <View style={styles.gridList}>
          {products.map((product) => (
            <View key={product._id || product.slug} style={styles.gridItem}>
              <MarketplaceProductCard product={product} />
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.four,
    gap: 4,
    width: '100%',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  titleColumn: {
    flex: 1,
    gap: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  sectionSubtitle: {
    fontSize: 11.5,
    color: '#6B7280',
    lineHeight: 15,
  },
  liveBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3.5,
    borderRadius: 12,
    marginLeft: 6,
  },
  liveBadgeText: {
    fontSize: 10,
    fontWeight: '700',
  },
  gridList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
    marginTop: 2,
  },
  gridItem: {
    width: '48%',
  },
  emptyCard: {
    padding: Spacing.five,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.two,
  },
  emptyEmoji: {
    fontSize: 32,
  },
  emptyTitle: {
    fontSize: 15,
    fontWeight: '700',
  },
  emptySubtitle: {
    fontSize: 12,
    textAlign: 'center',
  },
});
