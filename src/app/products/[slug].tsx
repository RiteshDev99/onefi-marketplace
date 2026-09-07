import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, ScrollView, View, Pressable, StatusBar } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SymbolView } from 'expo-symbols';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { ProductDetailHeader } from '@/components/marketplace/ProductDetailHeader';
import { ProductDetailImage } from '@/components/marketplace/ProductDetailImage';
import { ProductPricing } from '@/components/marketplace/ProductPricing';
import { VariantSelector } from '@/components/marketplace/VariantSelector';
import { EmiPlanSelector } from '@/components/marketplace/EmiPlanSelector';
import { SelectedEmiSummary } from '@/components/marketplace/SelectedEmiSummary';
import { ProductDetailsSection } from '@/components/marketplace/ProductDetailsSection';
import { ProductDescription } from '@/components/marketplace/ProductDescription';
import { PlanConfirmationModal } from '@/components/marketplace/PlanConfirmationModal';
import { ProductDetailSkeleton } from '@/components/marketplace/ProductDetailSkeleton';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { productService } from '@/services/productService';
import { EMIPlan, Product, ProductVariant } from '@/types/product';
import {
  formatCurrency,
  getDefaultEmiPlan,
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
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(undefined);
  const [selectedEmiPlan, setSelectedEmiPlan] = useState<EMIPlan | undefined>(undefined);
  const [isWishlisted, setIsWishlisted] = useState<boolean>(false);
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadProduct = useCallback(async () => {
    if (!slug) return;
    setLoading(true);
    setError(null);
    try {
      const data = await productService.getProductBySlug(String(slug));
      setProduct(data);
      if (data) {
        const initialVariant = getRepresentativeVariant(data);
        setSelectedVariant(initialVariant);
        setSelectedEmiPlan(getDefaultEmiPlan(initialVariant?.emiPlans));
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to load product details';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    loadProduct();
  }, [loadProduct]);

  // Handle variant switch with synchronized EMI plan reset
  const handleSelectVariant = useCallback((newVariant: ProductVariant) => {
    setSelectedVariant(newVariant);
    // CRITICAL: Always reset the EMI selection to the new variant's default plan
    const newDefaultPlan = getDefaultEmiPlan(newVariant.emiPlans);
    setSelectedEmiPlan(newDefaultPlan);
  }, []);

  // Derived calculations from currently active variant
  const activeVariant = selectedVariant || (product ? getRepresentativeVariant(product) : undefined);
  const startingEMI = getStartingEMI(activeVariant);
  const discount = getDiscountPercentage(activeVariant?.mrp, activeVariant?.price);
  const isAvailable = activeVariant?.inStock !== false && !!selectedEmiPlan;

  return (
    <ThemedView style={[styles.outerContainer, { backgroundColor: theme.background }]}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.card} />

      {/* Safe Area Top Spacer */}
      <View style={{ height: insets.top, backgroundColor: theme.card }} />

      {/* Top Navigation Header */}
      <ProductDetailHeader
        brand={product?.brand}
        title={product?.name}
        productName={product?.name}
      />

      {/* Scrollable Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.contentContainer,
          { paddingBottom: insets.bottom + 100 },
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
              {/* Product Pricing & Title Block */}
              <ProductPricing
                brand={product.brand}
                name={product.name}
                category={product.category}
                price={activeVariant?.price}
                mrp={activeVariant?.mrp}
                discountPercentage={discount}
                startingEMI={startingEMI}
                variantCount={product.variants?.length}
              />

              {/* Product Media Viewport */}
              <ProductDetailImage
                imageUrl={activeVariant?.image}
                discountPercentage={discount}
                inStock={activeVariant?.inStock}
              />

              {/* Variant Selector */}
              {product.variants && product.variants.length > 0 && (
                <VariantSelector
                  variants={product.variants}
                  selectedVariant={activeVariant}
                  onSelectVariant={handleSelectVariant}
                />
              )}

              {/* Dynamic EMI Plan Selector matching Reference Structure */}
              <EmiPlanSelector
                emiPlans={activeVariant?.emiPlans}
                selectedPlan={selectedEmiPlan}
                onSelectPlan={setSelectedEmiPlan}
              />

              {/* Final Selected EMI Summary & Breakdown */}
              <SelectedEmiSummary
                productName={product.name}
                variant={activeVariant}
                selectedPlan={selectedEmiPlan}
              />

              {/* Structured Product Specifications */}
              <ProductDetailsSection product={product} variant={activeVariant} />

              {/* Product Description */}
              <ProductDescription description={product.description} />
            </View>
          )}
        </View>
      </ScrollView>

      {/* Sticky Bottom CTA Bar */}
      {product && !loading && !error && (
        <View
          style={[
            styles.bottomStickyBar,
            {
              backgroundColor: theme.card,
              borderTopColor: theme.border,
              paddingBottom: Math.max(insets.bottom, Spacing.two),
            },
          ]}>
          <View style={styles.stickyContent}>
            {/* Wishlist / Heart Icon Button */}
            <Pressable
              onPress={() => setIsWishlisted(!isWishlisted)}
              accessibilityRole="button"
              accessibilityLabel="Wishlist item"
              style={({ pressed }) => [
                styles.wishlistButton,
                { borderColor: theme.border, backgroundColor: theme.card },
                pressed && styles.pressed,
              ]}>
              <ThemedText style={styles.wishlistIcon}>
                {isWishlisted ? '❤️' : '🤍'}
              </ThemedText>
            </Pressable>

            {/* Primary Proceed / Buy CTA Button */}
            <Pressable
              disabled={!isAvailable}
              onPress={() => setIsConfirmModalVisible(true)}
              accessibilityRole="button"
              accessibilityLabel={
                selectedEmiPlan
                  ? `Buy on ${selectedEmiPlan.tenure} months EMI at ${formatCurrency(selectedEmiPlan.monthlyPayment)} per month`
                  : 'Proceed with this plan'
              }
              accessibilityState={{ disabled: !isAvailable }}
              style={({ pressed }) => [
                styles.proceedButton,
                { backgroundColor: isAvailable ? theme.brandPurple : '#9CA3AF' },
                pressed && isAvailable && styles.pressed,
              ]}>
              <ThemedText style={styles.proceedButtonText}>
                {selectedEmiPlan
                  ? `Buy on ${selectedEmiPlan.tenure} mons EMI`
                  : 'Select Plan to Proceed'}
              </ThemedText>
              {selectedEmiPlan && typeof selectedEmiPlan.cashback === 'number' && selectedEmiPlan.cashback > 0 ? (
                <ThemedText style={styles.cashbackButtonSubtext}>
                  Earn {formatCurrency(selectedEmiPlan.cashback)} cashback on this order
                </ThemedText>
              ) : null}
            </Pressable>
          </View>
        </View>
      )}

      {/* Plan Confirmation Modal */}
      {product && (
        <PlanConfirmationModal
          visible={isConfirmModalVisible}
          onClose={() => setIsConfirmModalVisible(false)}
          productName={product.name}
          variant={activeVariant}
          selectedPlan={selectedEmiPlan}
          onContinueShopping={() => {
            setIsConfirmModalVisible(false);
            router.back();
          }}
        />
      )}
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
  bottomStickyBar: {
    borderTopWidth: 1,
    paddingTop: Spacing.two + 2,
    paddingHorizontal: Spacing.three,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 8,
  },
  stickyContent: {
    width: '100%',
    maxWidth: MaxContentWidth,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  wishlistButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wishlistIcon: {
    fontSize: 20,
  },
  proceedButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: Spacing.three,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#6226E3',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
    gap: 1,
  },
  proceedButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
    textAlign: 'center',
  },
  cashbackButtonSubtext: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'center',
  },
});


