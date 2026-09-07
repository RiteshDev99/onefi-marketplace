import React, { useMemo } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { EMIPlan } from '@/types/product';
import { formatCurrency, sortEmiPlansByTenure } from '@/utils/productUtils';

interface EmiPlanSelectorProps {
  emiPlans?: EMIPlan[];
  selectedPlan?: EMIPlan;
  onSelectPlan: (plan: EMIPlan) => void;
}

export function EmiPlanSelector({
  emiPlans = [],
  selectedPlan,
  onSelectPlan,
}: EmiPlanSelectorProps) {
  const theme = useTheme();

  // Sort plans deterministically in ascending order of tenure
  const sortedPlans = useMemo(() => sortEmiPlansByTenure(emiPlans), [emiPlans]);

  if (!emiPlans || emiPlans.length === 0) {
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: theme.card,
            borderColor: theme.border,
          },
        ]}>
        <ThemedText style={styles.sectionTitle}>CHOOSE EMI TENURE</ThemedText>
        <ThemedText style={styles.emptyText} themeColor="textSecondary">
          EMI plans are currently unavailable for this configuration.
        </ThemedText>
      </View>
    );
  }

  const selectedSummary = selectedPlan
    ? `${selectedPlan.tenure} Months • ${formatCurrency(selectedPlan.monthlyPayment)}/mo`
    : 'Select a plan';

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
        <View style={styles.titleColumn}>
          <ThemedText style={styles.sectionTitle}>CHOOSE EMI TENURE</ThemedText>
          <ThemedText style={styles.sectionSubtitle} themeColor="textSecondary">
            Select a monthly installment plan that fits your budget
          </ThemedText>
        </View>

        {selectedPlan && (
          <View style={[styles.summaryPill, { backgroundColor: theme.brandPurpleLight }]}>
            <ThemedText style={[styles.summaryText, { color: theme.brandPurple }]}>
              {selectedSummary}
            </ThemedText>
          </View>
        )}
      </View>

      {/* EMI Plans List */}
      <View style={styles.plansList} accessibilityRole="radiogroup">
        {sortedPlans.map((plan) => {
          const isSelected =
            selectedPlan?._id === plan._id ||
            (selectedPlan?.tenure === plan.tenure &&
              selectedPlan?.monthlyPayment === plan.monthlyPayment);

          const isNoCost = plan.interestRate === 0;

          return (
            <Pressable
              key={plan._id || `${plan.tenure}-${plan.monthlyPayment}`}
              onPress={() => onSelectPlan(plan)}
              accessibilityRole="radio"
              accessibilityState={{ selected: isSelected }}
              accessibilityLabel={`${plan.tenure} Months EMI, ${formatCurrency(
                plan.monthlyPayment
              )} per month, ${isNoCost ? 'No-Cost EMI 0% Interest' : `${plan.interestRate}% Interest`}${
                plan.cashback ? `, Cashback ${formatCurrency(plan.cashback)}` : ''
              }`}
              style={({ pressed }) => [
                styles.planCard,
                {
                  borderColor: isSelected ? theme.brandPurple : theme.border,
                  backgroundColor: isSelected ? theme.brandPurpleLight : theme.card,
                },
                pressed && styles.pressed,
              ]}>
              {/* Top Row: Radio + Monthly Payment + Tenure */}
              <View style={styles.topRow}>
                {/* Radio Indicator */}
                <View
                  style={[
                    styles.radioOuter,
                    {
                      borderColor: isSelected ? theme.brandPurple : '#CBD5E1',
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

                {/* Monthly Payment Hero */}
                <View style={styles.paymentInfo}>
                  <ThemedText
                    style={[
                      styles.monthlyPaymentText,
                      isSelected && { color: theme.brandPurple },
                    ]}>
                    {formatCurrency(plan.monthlyPayment)}{' '}
                    <ThemedText style={styles.perMonthText} themeColor="textSecondary">
                      / month
                    </ThemedText>
                  </ThemedText>
                </View>

                {/* Tenure Pill */}
                <View
                  style={[
                    styles.tenurePill,
                    {
                      backgroundColor: isSelected ? '#FFFFFF' : theme.backgroundElement,
                      borderColor: isSelected ? theme.brandPurple : theme.border,
                    },
                  ]}>
                  <ThemedText
                    style={[
                      styles.tenureText,
                      isSelected && { color: theme.brandPurple, fontWeight: '800' },
                    ]}>
                    {plan.tenure} Months
                  </ThemedText>
                </View>
              </View>

              {/* Badges Row: Interest Rate + Cashback */}
              <View style={styles.badgesRow}>
                {/* Interest Rate Badge */}
                <View
                  style={[
                    styles.badge,
                    isNoCost
                      ? { backgroundColor: '#DCFCE7' }
                      : { backgroundColor: '#F1F5F9' },
                  ]}>
                  <ThemedText
                    style={[
                      styles.badgeText,
                      isNoCost ? { color: '#15803D' } : { color: '#475569' },
                    ]}>
                    {isNoCost ? '✓ No-Cost EMI (0% Interest)' : `${plan.interestRate}% Interest`}
                  </ThemedText>
                </View>

                {/* Cashback Badge */}
                {typeof plan.cashback === 'number' && plan.cashback > 0 ? (
                  <View style={[styles.badge, { backgroundColor: '#FEF3C7' }]}>
                    <ThemedText style={[styles.badgeText, { color: '#B45309' }]}>
                      🎁 {formatCurrency(plan.cashback)} Cashback
                    </ThemedText>
                  </View>
                ) : null}
              </View>

              {/* Bottom Cost Summary Row (Processing Fee & Total Cost) */}
              {(typeof plan.processingFee === 'number' || typeof plan.totalCost === 'number') && (
                <View style={[styles.costSummaryRow, { borderTopColor: theme.border }]}>
                  {typeof plan.processingFee === 'number' ? (
                    <ThemedText style={styles.costDetailText} themeColor="textSecondary">
                      Processing Fee:{' '}
                      <ThemedText style={styles.costDetailBold}>
                        {plan.processingFee > 0 ? formatCurrency(plan.processingFee) : 'Free'}
                      </ThemedText>
                    </ThemedText>
                  ) : null}

                  {typeof plan.totalCost === 'number' ? (
                    <ThemedText style={styles.costDetailText} themeColor="textSecondary">
                      Total Cost:{' '}
                      <ThemedText style={styles.costDetailBold}>
                        {formatCurrency(plan.totalCost)}
                      </ThemedText>
                    </ThemedText>
                  ) : null}
                </View>
              )}
            </Pressable>
          );
        })}
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
    alignItems: 'flex-start',
    gap: 8,
    flexWrap: 'wrap',
  },
  titleColumn: {
    flex: 1,
    gap: 2,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.6,
    color: '#6B7280',
    textTransform: 'uppercase',
  },
  sectionSubtitle: {
    fontSize: 12,
    marginTop: 1,
  },
  summaryPill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  summaryText: {
    fontSize: 11,
    fontWeight: '700',
  },
  emptyText: {
    fontSize: 13,
    paddingVertical: Spacing.two,
  },
  plansList: {
    gap: 10,
  },
  planCard: {
    borderRadius: 16,
    borderWidth: 1.5,
    padding: Spacing.three,
    gap: 8,
  },
  pressed: {
    opacity: 0.85,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
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
  paymentInfo: {
    flex: 1,
  },
  monthlyPaymentText: {
    fontSize: 17,
    fontWeight: '800',
    color: '#111827',
  },
  perMonthText: {
    fontSize: 12,
    fontWeight: '500',
  },
  tenurePill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
  },
  tenureText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#111827',
  },
  badgesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
    marginLeft: 30, // Aligns neatly under the payment info past the radio circle
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  costSummaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    marginTop: 4,
    borderTopWidth: StyleSheet.hairlineWidth,
    marginLeft: 30,
  },
  costDetailText: {
    fontSize: 11,
  },
  costDetailBold: {
    fontWeight: '700',
    color: '#111827',
  },
});
