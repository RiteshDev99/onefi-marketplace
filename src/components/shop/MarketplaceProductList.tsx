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
    } catch (err: any) {
      setError(err.message || 'Failed to load products');
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
        <View style={styles.titleColumn}>
          <ThemedText style={styles.sectionTitle}>1Fi Marketplace</ThemedText>
          <ThemedText style={styles.sectionSubtitle} themeColor="textSecondary">
            {loading
              ? 'Fetching flagship devices...'
              : products.length > 0
              ? `${products.length} Flagship Devices Available on Zero-Cost EMI`
              : 'Smartphones & Electronics'}
          </ThemedText>
        </View>

        <View style={[styles.liveBadge, { backgroundColor: theme.badgeGreen }]}>
          <ThemedText style={[styles.liveBadgeText, { color: theme.badgeGreenText }]}>
            ● Live Catalog
          </ThemedText>
        </View>
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
        <View style={styles.cardsList}>
          {products.map((product) => (
            <MarketplaceProductCard key={product._id || product.slug} product={product} />
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.three,
    gap: Spacing.two,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.one,
  },
  titleColumn: {
    flex: 1,
    gap: 2,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  sectionSubtitle: {
    fontSize: 12,
    color: '#6B7280',
    lineHeight: 16,
  },
  liveBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
    marginLeft: 8,
  },
  liveBadgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  cardsList: {
    marginTop: Spacing.one,
  },
  emptyCard: {
    padding: Spacing.five,
    borderRadius: 18,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.two,
  },
  emptyEmoji: {
    fontSize: 36,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  emptySubtitle: {
    fontSize: 13,
    textAlign: 'center',
  },
});
