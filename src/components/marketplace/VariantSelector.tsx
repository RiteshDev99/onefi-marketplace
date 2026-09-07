import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { ProductVariant } from '@/types/product';
import { formatCurrency, getDiscountPercentage } from '@/utils/productUtils';

interface VariantSelectorProps {
  variants: ProductVariant[];
  selectedVariant?: ProductVariant;
  onSelectVariant: (variant: ProductVariant) => void;
}

export function VariantSelector({
  variants,
  selectedVariant,
  onSelectVariant,
}: VariantSelectorProps) {
  const theme = useTheme();

  if (!variants || variants.length === 0) {
    return null;
  }

  // Dynamic configuration summary
  const selectedSummary = selectedVariant
    ? [selectedVariant.storage, selectedVariant.color].filter(Boolean).join(' • ') ||
      selectedVariant.name
    : 'None';

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.card,
          borderColor: theme.border,
        },
      ]}>
      {/* Header Row */}
      <View style={styles.headerRow}>
        <ThemedText style={styles.sectionTitle}>SELECT CONFIGURATION</ThemedText>

        <View style={[styles.summaryPill, { backgroundColor: theme.brandPurpleLight }]}>
          <ThemedText style={[styles.summaryText, { color: theme.brandPurple }]}>
            {selectedSummary}
          </ThemedText>
        </View>
      </View>

      {/* Variant Cards List */}
      <View style={styles.variantsList} accessibilityRole="radiogroup">
        {variants.map((variant) => {
          const isSelected =
            selectedVariant?._id === variant._id || selectedVariant?.name === variant.name;
          const isAvailable = variant.inStock !== false;
          const discount = getDiscountPercentage(variant.mrp, variant.price);

          const variantLabel =
            [variant.storage, variant.color].filter(Boolean).join(' • ') || variant.name;

          return (
            <Pressable
              key={variant._id || variant.name}
              onPress={() => {
                if (isAvailable) {
                  onSelectVariant(variant);
                }
              }}
              disabled={!isAvailable}
              accessibilityRole="radio"
              accessibilityState={{
                selected: isSelected,
                disabled: !isAvailable,
              }}
              accessibilityLabel={`${variantLabel}, Price: ${formatCurrency(variant.price)}, ${
                isAvailable ? 'In Stock' : 'Out of Stock'
              }`}
              style={({ pressed }) => [
                styles.variantCard,
                {
                  borderColor: isSelected
                    ? theme.brandPurple
                    : theme.border,
                  backgroundColor: isSelected
                    ? theme.brandPurpleLight
                    : isAvailable
                    ? theme.card
                    : theme.backgroundElement,
                },
                !isAvailable && styles.disabledCard,
                pressed && isAvailable && styles.pressed,
              ]}>
              {/* Left Radio Indicator & Variant Details */}
              <View style={styles.leftSection}>
                {/* Radio Circle */}
                <View
                  style={[
                    styles.radioOuter,
                    {
                      borderColor: isSelected
                        ? theme.brandPurple
                        : '#CBD5E1',
                    },
                  ]}>
                  {isSelected && (
                    <View
                      style={[
                        styles.radioInner,
                        { backgroundColor: theme.brandPurple },
                      ]}
                    />
                  )}
                </View>

                {/* Variant Title & Stock */}
                <View style={styles.variantTitleCol}>
                  <ThemedText
                    style={[
                      styles.variantTitle,
                      isSelected && { color: theme.brandPurple, fontWeight: '700' },
                      !isAvailable && styles.disabledText,
                    ]}>
                    {variantLabel}
                  </ThemedText>

                  <View style={styles.stockRow}>
                    <ThemedText
                      style={[
                        styles.stockIndicator,
                        { color: isAvailable ? theme.badgeGreenText : '#DC2626' },
                      ]}>
                      {isAvailable ? '● In Stock' : '✕ Out of Stock'}
                    </ThemedText>
                  </View>
                </View>
              </View>

              {/* Right Pricing */}
              <View style={styles.pricingCol}>
                <ThemedText
                  style={[
                    styles.variantPrice,
                    isSelected && { color: theme.brandPurple },
                    !isAvailable && styles.disabledText,
                  ]}>
                  {formatCurrency(variant.price)}
                </ThemedText>

                {variant.mrp && variant.mrp > variant.price ? (
                  <View style={styles.mrpRow}>
                    <ThemedText style={styles.variantMrp}>
                      {formatCurrency(variant.mrp)}
                    </ThemedText>
                    {discount ? (
                      <View
                        style={[
                          styles.discountBadge,
                          {
                            backgroundColor: isSelected ? '#DCFCE7' : '#F1F5F9',
                          },
                        ]}>
                        <ThemedText
                          style={[
                            styles.discountText,
                            { color: isSelected ? '#15803D' : '#64748B' },
                          ]}>
                          {discount}% OFF
                        </ThemedText>
                      </View>
                    ) : null}
                  </View>
                ) : null}
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    borderWidth: 1,
    padding: Spacing.four,
    marginHorizontal: Spacing.three,
    marginTop: Spacing.two,
    gap: Spacing.three,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.6,
    color: '#6B7280',
    textTransform: 'uppercase',
  },
  summaryPill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  summaryText: {
    fontSize: 12,
    fontWeight: '700',
  },
  variantsList: {
    gap: 10,
  },
  variantCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 14,
    borderWidth: 1.5,
  },
  disabledCard: {
    opacity: 0.55,
  },
  pressed: {
    opacity: 0.8,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  variantTitleCol: {
    gap: 2,
    flex: 1,
  },
  variantTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  stockRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stockIndicator: {
    fontSize: 11,
    fontWeight: '600',
  },
  disabledText: {
    color: '#9CA3AF',
  },
  pricingCol: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: 2,
  },
  variantPrice: {
    fontSize: 14,
    fontWeight: '800',
    color: '#111827',
  },
  mrpRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  variantMrp: {
    fontSize: 10,
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
    fontWeight: '500',
  },
  discountBadge: {
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'center',
  },
  discountText: {
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
});
