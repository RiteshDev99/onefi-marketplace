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
        <ThemedText style={styles.sectionHeading}>Choose EMI tenure</ThemedText>
        <ThemedText style={styles.emptyText} themeColor="textSecondary">
          EMI plans are currently unavailable for this configuration.
        </ThemedText>
      </View>
    );
  }

  const hasNoCost = sortedPlans.some((p) => p.interestRate === 0);
  const minProcessingFee = Math.min(...sortedPlans.map((p) => p.processingFee ?? 0));

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.card,
          borderColor: theme.border,
        },
      ]}>
      {/* Top Banner Row matching Reference */}
      <View style={styles.topBannerRow}>
        <View style={styles.payNowTag}>
          <ThemedText style={styles.payNowIcon}>💳</ThemedText>
          <ThemedText style={styles.payNowText}>
            {hasNoCost ? '0% Interest Plans Available' : 'Flexible Monthly Financing'}
          </ThemedText>
        </View>

        <View style={[styles.processingPill, { backgroundColor: '#DCFCE7' }]}>
          <ThemedText style={styles.processingText}>
            {minProcessingFee === 0 ? '0 Processing fees' : `From ${formatCurrency(minProcessingFee)} fee`}
          </ThemedText>
        </View>
      </View>

      {/* Subheader: Choose EMI tenure */}
      <View style={styles.subHeaderRow}>
        <ThemedText style={styles.sectionHeading}>Choose EMI tenure</ThemedText>
        <ThemedText style={styles.subHeaderNote} themeColor="textSecondary">
          Instant Approval
        </ThemedText>
      </View>

      {/* EMI Option Rows */}
      <View style={styles.plansList} accessibilityRole="radiogroup">
        {sortedPlans.map((plan, index) => {
          const isSelected =
            selectedPlan?._id === plan._id ||
            (selectedPlan?.tenure === plan.tenure &&
              selectedPlan?.monthlyPayment === plan.monthlyPayment);

          const isNoCost = plan.interestRate === 0;

          return (
            <View key={plan._id || `${plan.tenure}-${plan.monthlyPayment}`}>
              {index > 0 && <View style={[styles.divider, { backgroundColor: theme.border }]} />}

              <Pressable
                onPress={() => onSelectPlan(plan)}
                accessibilityRole="radio"
                accessibilityState={{ selected: isSelected }}
                accessibilityLabel={`${plan.tenure} Months EMI, ${formatCurrency(
                  plan.monthlyPayment
                )} per month, ${isNoCost ? '0% EMI' : `${plan.interestRate}% Interest`}`}
                style={({ pressed }) => [
                  styles.planRow,
                  isSelected && { backgroundColor: theme.brandPurpleLight },
                  pressed && styles.pressed,
                ]}>
                {/* Left Radio + Monthly Plan Amount */}
                <View style={styles.leftPlanCol}>
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

                  <ThemedText style={styles.tenureEquation}>
                    <ThemedText style={[styles.paymentBold, isSelected && { color: theme.brandPurple }]}>
                      {formatCurrency(plan.monthlyPayment)}
                    </ThemedText>
                    {' × '}{plan.tenure} mons
                  </ThemedText>
                </View>

                {/* Right Badge / Interest Rate */}
                <View style={styles.rightPlanCol}>
                  {isNoCost ? (
                    <View style={[styles.noCostBadge, { backgroundColor: theme.brandPurple }]}>
                      <ThemedText style={styles.noCostBadgeText}>*0% EMI</ThemedText>
                    </View>
                  ) : (
                    <ThemedText style={styles.interestText} themeColor="textSecondary">
                      {plan.interestRate}% p.a.
                    </ThemedText>
                  )}

                  {typeof plan.cashback === 'number' && plan.cashback > 0 ? (
                    <ThemedText style={styles.cashbackSubtext}>
                      +{formatCurrency(plan.cashback)} cashback
                    </ThemedText>
                  ) : null}
                </View>
              </Pressable>
            </View>
          );
        })}
      </View>

      {/* Footer note */}
      <ThemedText style={styles.footerNote} themeColor="textSecondary">
        *Transparent monthly repayment schedules based on verified EMI plan
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    borderWidth: 1,
    padding: Spacing.three,
    marginHorizontal: Spacing.three,
    marginTop: Spacing.two,
    gap: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  topBannerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  payNowTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  payNowIcon: {
    fontSize: 14,
  },
  payNowText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#111827',
  },
  processingPill: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  processingText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#15803D',
  },
  subHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 2,
  },
  sectionHeading: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
  },
  subHeaderNote: {
    fontSize: 12,
    fontWeight: '500',
  },
  emptyText: {
    fontSize: 13,
    paddingVertical: Spacing.two,
  },
  plansList: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    overflow: 'hidden',
  },
  divider: {
    height: 1,
  },
  planRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 12,
    gap: 8,
  },
  pressed: {
    opacity: 0.85,
  },
  leftPlanCol: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
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
  tenureEquation: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  paymentBold: {
    fontSize: 15,
    fontWeight: '800',
    color: '#111827',
  },
  rightPlanCol: {
    alignItems: 'flex-end',
    gap: 2,
  },
  noCostBadge: {
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 4,
  },
  noCostBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  interestText: {
    fontSize: 12,
    fontWeight: '600',
  },
  cashbackSubtext: {
    fontSize: 10,
    fontWeight: '700',
    color: '#15803D',
  },
  footerNote: {
    fontSize: 11,
    marginTop: 2,
  },
});

