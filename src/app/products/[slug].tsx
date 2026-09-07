import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, ScrollView, View, Pressable, StatusBar } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { ProductDetailHeader } from '@/components/marketplace/ProductDetailHeader';
import { ProductDetailImage } from '@/components/marketplace/ProductDetailImage';
import { ProductPricing } from '@/components/marketplace/ProductPricing';
import { ProductDescription } from '@/components/marketplace/ProductDescription';
import { ProductAssurances } from '@/components/marketplace/ProductAssurances';
import { ProductDetailSkeleton } from '@/components/marketplace/ProductDetailSkeleton';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { productService } from '@/services/productService';
import { Product } from '@/types/product';
import {
  getDiscountPercentage,
  getRepresentativeVariant,
  getStartingEMI,
} from '@/utils/productUtils';

export default function ProductDetailScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const theme = useTheme();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadProduct = useCallback(async () => {
    if (!slug) return;
    setLoading(true);
    setError(null);
    try {
      const data = await productService.getProductBySlug(String(slug));
      setProduct(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load product details');
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    loadProduct();
  }, [loadProduct]);

  const variant = product ? getRepresentativeVariant(product) : undefined;
  const startingEMI = getStartingEMI(variant);
  const discount = getDiscountPercentage(variant?.mrp, variant?.price);

  return (
    <ThemedView style={[styles.outerContainer, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={theme.text === '#F8FAFC' ? 'light-content' : 'dark-content'} />

      {/* Safe Area Top Spacer */}
      <View style={{ height: insets.top, backgroundColor: theme.card }} />

      {/* Top Navigation Header */}
      <ProductDetailHeader title={product?.name} brand={product?.brand} />

      {/* Scrollable Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.contentContainer,
          { paddingBottom: insets.bottom + Spacing.six },
        ]}
        showsVerticalScrollIndicator={false}>
        <View style={styles.responsiveWrapper}>
          {loading ? (
            <ProductDetailSkeleton />
          ) : error ? (
            <View
              style={[
                styles.messageCard,
                {
                  backgroundColor: theme.card,
                  borderColor: theme.border,
                },
              ]}>
              <View style={[styles.iconPill, { backgroundColor: '#FEE2E2' }]}>
                <ThemedText style={styles.errorIcon}>⚠️</ThemedText>
              </View>
              <ThemedText style={styles.cardTitle}>Unable to Load Product</ThemedText>
              <ThemedText style={styles.cardSubtitle} themeColor="textSecondary">
                {error}
              </ThemedText>

              <View style={styles.actionsRow}>
                <Pressable
                  onPress={loadProduct}
                  style={({ pressed }) => [
                    styles.primaryBtn,
                    { backgroundColor: theme.brandPurple },
                    pressed && styles.pressed,
                  ]}>
                  <ThemedText style={styles.primaryBtnText}>Retry</ThemedText>
                </Pressable>

                <Pressable
                  onPress={() => router.back()}
                  style={({ pressed }) => [
                    styles.secondaryBtn,
                    { borderColor: theme.border, backgroundColor: theme.backgroundElement },
                    pressed && styles.pressed,
                  ]}>
                  <ThemedText style={styles.secondaryBtnText}>Back to 1Fi Shop</ThemedText>
                </Pressable>
              </View>
            </View>
          ) : !product ? (
            <View
              style={[
                styles.messageCard,
                {
                  backgroundColor: theme.card,
                  borderColor: theme.border,
                },
              ]}>
              <View style={[styles.iconPill, { backgroundColor: theme.brandPurpleLight }]}>
                <ThemedText style={styles.errorIcon}>🔍</ThemedText>
              </View>
              <ThemedText style={styles.cardTitle}>Product Not Found</ThemedText>
              <ThemedText style={styles.cardSubtitle} themeColor="textSecondary">
                We couldn't find a device matching '{slug}'. It may have been discontinued or removed.
              </ThemedText>

              <Pressable
                onPress={() => router.back()}
                style={({ pressed }) => [
                  styles.primaryBtn,
                  { backgroundColor: theme.brandPurple },
                  pressed && styles.pressed,
                ]}>
                <ThemedText style={styles.primaryBtnText}>Back to 1Fi Shop</ThemedText>
              </Pressable>
            </View>
          ) : (
            <View>
              {/* Product Media */}
              <ProductDetailImage
                imageUrl={variant?.image}
                discountPercentage={discount}
                inStock={variant?.inStock}
              />

              {/* Product Pricing & Metadata */}
              <ProductPricing
                brand={product.brand}
                name={product.name}
                category={product.category}
                price={variant?.price}
                mrp={variant?.mrp}
                discountPercentage={discount}
                startingEMI={startingEMI}
                variantCount={product.variants?.length}
              />

              {/* Product Description */}
              <ProductDescription description={product.description} />

              {/* 1Fi Trust & Assurances */}
              <ProductAssurances />
            </View>
          )}
        </View>
      </ScrollView>
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
  messageCard: {
    margin: Spacing.four,
    padding: Spacing.five,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.two,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  iconPill: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  errorIcon: {
    fontSize: 26,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
  },
  cardSubtitle: {
    fontSize: 13,
    lineHeight: 18,
    textAlign: 'center',
    maxWidth: 290,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: Spacing.two,
  },
  primaryBtn: {
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 20,
    shadowColor: '#6226E3',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  primaryBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  secondaryBtn: {
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 20,
    borderWidth: 1,
  },
  secondaryBtnText: {
    color: '#374151',
    fontSize: 13,
    fontWeight: '600',
  },
  pressed: {
    opacity: 0.8,
  },
});
