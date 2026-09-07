import React from 'react';
import { View, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { EMIPlan, ProductVariant } from '@/types/product';
import { formatCurrency } from '@/utils/productUtils';

interface SelectedEmiSummaryProps {
  productName: string;
  variant?: ProductVariant;
  selectedPlan?: EMIPlan;
}

export function SelectedEmiSummary({
  productName,
  variant,
  selectedPlan,
}: SelectedEmiSummaryProps) {
  const theme = useTheme();

  if (!selectedPlan || !variant) {
    return null;
  }

  const isNoCost = selectedPlan.interestRate === 0;
  const variantLabel =
    [variant.storage, variant.color].filter(Boolean).join(' • ') || variant.name;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.card,
          borderColor: theme.border,
        },
      ]}>
      {/* Header */}
      <View style={styles.headerRow}>
        <ThemedText style={styles.sectionTitle}>SELECTED FINANCING BREAKDOWN</ThemedText>
        <View style={[styles.activeBadge, { backgroundColor: theme.brandPurpleLight }]}>
          <ThemedText style={[styles.activeBadgeText, { color: theme.brandPurple }]}>
            ✓ Plan Active
          </ThemedText>
        </View>
      </View>

      {/* Selected Item & Monthly Payment Hero Box */}
      <View style={[styles.heroBox, { backgroundColor: theme.backgroundElement }]}>
        <View style={styles.heroLeft}>
          <ThemedText style={styles.productName} numberOfLines={1}>
            {productName}
          </ThemedText>
          <ThemedText style={styles.variantLabel} themeColor="textSecondary">
            {variantLabel}
          </ThemedText>
        </View>

        <View style={styles.heroRight}>
          <ThemedText style={[styles.monthlyHero, { color: theme.brandPurple }]}>
            {formatCurrency(selectedPlan.monthlyPayment)}
            <ThemedText style={styles.perMo}>/mo</ThemedText>
          </ThemedText>
          <ThemedText style={styles.tenureHero} themeColor="textSecondary">
            for {selectedPlan.tenure} Months
          </ThemedText>
        </View>
      </View>

      {/* Itemized Financial Rows */}
      <View style={styles.breakdownList}>
        {/* Row: Device Price */}
        <View style={styles.breakdownRow}>
          <ThemedText style={styles.rowLabel} themeColor="textSecondary">
            Device Price
          </ThemedText>
          <ThemedText style={styles.rowValue}>
            {formatCurrency(variant.price)}
          </ThemedText>
        </View>

        {/* Row: Tenure */}
        <View style={styles.breakdownRow}>
          <ThemedText style={styles.rowLabel} themeColor="textSecondary">
            Loan Tenure
          </ThemedText>
          <ThemedText style={styles.rowValue}>
            {selectedPlan.tenure} Months
          </ThemedText>
        </View>

        {/* Row: Interest Rate */}
        <View style={styles.breakdownRow}>
          <ThemedText style={styles.rowLabel} themeColor="textSecondary">
            Interest Rate
          </ThemedText>
          <ThemedText
            style={[
              styles.rowValue,
              isNoCost ? { color: '#15803D', fontWeight: '700' } : null,
            ]}>
            {isNoCost ? '0% (No-Cost EMI)' : `${selectedPlan.interestRate}% Annual`}
          </ThemedText>
        </View>

        {/* Row: Cashback (if > 0) */}
        {typeof selectedPlan.cashback === 'number' && selectedPlan.cashback > 0 ? (
          <View style={styles.breakdownRow}>
            <ThemedText style={styles.rowLabel} themeColor="textSecondary">
              Cashback Benefit
            </ThemedText>
            <ThemedText style={[styles.rowValue, { color: '#15803D', fontWeight: '700' }]}>
              - {formatCurrency(selectedPlan.cashback)}
            </ThemedText>
          </View>
        ) : null}

        {/* Row: Processing Fee */}
        {typeof selectedPlan.processingFee === 'number' ? (
          <View style={styles.breakdownRow}>
            <ThemedText style={styles.rowLabel} themeColor="textSecondary">
              Processing Fee
            </ThemedText>
            <ThemedText style={styles.rowValue}>
              {selectedPlan.processingFee > 0
                ? formatCurrency(selectedPlan.processingFee)
                : 'Free (₹0)'}
            </ThemedText>
          </View>
        ) : null}

        {/* Divider */}
        <View style={[styles.divider, { backgroundColor: theme.border }]} />

        {/* Total Cost Row */}
        {typeof selectedPlan.totalCost === 'number' ? (
          <View style={styles.totalRow}>
            <ThemedText style={styles.totalLabel}>Total Loan Cost</ThemedText>
            <ThemedText style={styles.totalValue}>
              {formatCurrency(selectedPlan.totalCost)}
            </ThemedText>
          </View>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    borderWidth: 1,
    padding: Spacing.four,
    marginHorizontal: Spacing.three,
    marginTop: Spacing.three,
    gap: Spacing.three,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.6,
    color: '#6B7280',
    textTransform: 'uppercase',
  },
  activeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  activeBadgeText: {
    fontSize: 10,
    fontWeight: '700',
  },
  heroBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.three,
    borderRadius: 14,
    gap: 10,
  },
  heroLeft: {
    flex: 1,
    gap: 2,
  },
  productName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
  },
  variantLabel: {
    fontSize: 12,
  },
  heroRight: {
    alignItems: 'flex-end',
    gap: 1,
  },
  monthlyHero: {
    fontSize: 18,
    fontWeight: '800',
  },
  perMo: {
    fontSize: 12,
    fontWeight: '500',
  },
  tenureHero: {
    fontSize: 11,
    fontWeight: '500',
  },
  breakdownList: {
    gap: 8,
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowLabel: {
    fontSize: 13,
  },
  rowValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#111827',
  },
  divider: {
    height: 1,
    marginVertical: 4,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '800',
    color: '#111827',
  },
});
