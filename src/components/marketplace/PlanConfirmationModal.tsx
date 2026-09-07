import React from 'react';
import {
  Modal,
  View,
  StyleSheet,
  Pressable,
  TouchableWithoutFeedback,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { EMIPlan, ProductVariant } from '@/types/product';
import { formatCurrency } from '@/utils/productUtils';

interface PlanConfirmationModalProps {
  visible: boolean;
  onClose: () => void;
  productName: string;
  variant?: ProductVariant;
  selectedPlan?: EMIPlan;
  onContinueShopping?: () => void;
}

export function PlanConfirmationModal({
  visible,
  onClose,
  productName,
  variant,
  selectedPlan,
  onContinueShopping,
}: PlanConfirmationModalProps) {
  const insets = useSafeAreaInsets();
  const theme = useTheme();

  if (!selectedPlan || !variant) {
    return null;
  }

  const variantLabel =
    [variant.storage, variant.color].filter(Boolean).join(' • ') || variant.name;
  const isNoCost = selectedPlan.interestRate === 0;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.backdrop}>
          <TouchableWithoutFeedback>
            <View
              style={[
                styles.modalCard,
                {
                  backgroundColor: theme.card,
                  borderColor: theme.border,
                  paddingBottom: Math.max(insets.bottom, 20),
                },
              ]}>
              {/* Top Handle */}
              <View style={styles.handle} />

              {/* Success Badge Icon */}
              <View
                style={[
                  styles.iconCircle,
                  { backgroundColor: theme.brandPurpleLight },
                ]}>
                <ThemedText style={[styles.iconText, { color: theme.brandPurple }]}>
                  ✓
                </ThemedText>
              </View>

              {/* Title & Subtitle */}
              <ThemedText style={styles.title}>EMI Plan Selected</ThemedText>
              <ThemedText
                style={styles.subtitle}
                themeColor="textSecondary">
                Your financing plan configuration has been selected for review.
              </ThemedText>

              {/* Selection Summary Box */}
              <View
                style={[
                  styles.summaryBox,
                  { backgroundColor: theme.backgroundElement, borderColor: theme.border },
                ]}>
                <View style={styles.productRow}>
                  <ThemedText style={styles.productNameText} numberOfLines={1}>
                    {productName}
                  </ThemedText>
                  <ThemedText style={styles.variantText} themeColor="textSecondary">
                    {variantLabel}
                  </ThemedText>
                </View>

                <View style={[styles.divider, { backgroundColor: theme.border }]} />

                <View style={styles.detailsGrid}>
                  <View style={styles.detailItem}>
                    <ThemedText style={styles.detailLabel} themeColor="textSecondary">
                      Monthly EMI
                    </ThemedText>
                    <ThemedText
                      style={[styles.detailValueHighlight, { color: theme.brandPurple }]}>
                      {formatCurrency(selectedPlan.monthlyPayment)}
                      <ThemedText style={styles.perMo}>/mo</ThemedText>
                    </ThemedText>
                  </View>

                  <View style={styles.detailItem}>
                    <ThemedText style={styles.detailLabel} themeColor="textSecondary">
                      Loan Tenure
                    </ThemedText>
                    <ThemedText style={styles.detailValue}>
                      {selectedPlan.tenure} Months
                    </ThemedText>
                  </View>

                  <View style={styles.detailItem}>
                    <ThemedText style={styles.detailLabel} themeColor="textSecondary">
                      Interest Rate
                    </ThemedText>
                    <ThemedText
                      style={[
                        styles.detailValue,
                        isNoCost ? { color: '#15803D', fontWeight: '700' } : null,
                      ]}>
                      {isNoCost ? '0% (No-Cost)' : `${selectedPlan.interestRate}% p.a.`}
                    </ThemedText>
                  </View>

                  {typeof selectedPlan.totalCost === 'number' ? (
                    <View style={styles.detailItem}>
                      <ThemedText style={styles.detailLabel} themeColor="textSecondary">
                        Total Amount
                      </ThemedText>
                      <ThemedText style={styles.detailValue}>
                        {formatCurrency(selectedPlan.totalCost)}
                      </ThemedText>
                    </View>
                  ) : null}
                </View>
              </View>

              {/* Notice Pill */}
              <View
                style={[
                  styles.noticeBox,
                  { backgroundColor: theme.backgroundElement },
                ]}>
                <ThemedText style={styles.noticeIcon}>ℹ️</ThemedText>
                <ThemedText style={styles.noticeText} themeColor="textSecondary">
                  This is an assignment demonstration. No actual payment, credit check, or checkout API is executed.
                </ThemedText>
              </View>

              {/* Action Buttons */}
              <View style={styles.buttonGroup}>
                <Pressable
                  onPress={onClose}
                  accessibilityRole="button"
                  accessibilityLabel="Confirm and close modal"
                  style={({ pressed }) => [
                    styles.primaryButton,
                    { backgroundColor: theme.brandPurple },
                    pressed && styles.pressed,
                  ]}>
                  <ThemedText style={styles.primaryButtonText}>
                    Got it, continue
                  </ThemedText>
                </Pressable>

                {onContinueShopping ? (
                  <Pressable
                    onPress={onContinueShopping}
                    accessibilityRole="button"
                    accessibilityLabel="Back to marketplace catalog"
                    style={({ pressed }) => [
                      styles.secondaryButton,
                      {
                        borderColor: theme.border,
                        backgroundColor: theme.backgroundElement,
                      },
                      pressed && styles.pressed,
                    ]}>
                    <ThemedText style={styles.secondaryButtonText}>
                      Explore More Devices
                    </ThemedText>
                  </Pressable>
                ) : null}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalCard: {
    width: '100%',
    maxWidth: 520,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    borderWidth: 1,
    paddingTop: 12,
    paddingHorizontal: Spacing.four,
    alignItems: 'center',
    gap: Spacing.three,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#9CA3AF',
    marginBottom: 4,
  },
  iconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 24,
    fontWeight: '800',
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111827',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 13,
    lineHeight: 18,
    textAlign: 'center',
    paddingHorizontal: Spacing.two,
  },
  summaryBox: {
    width: '100%',
    borderRadius: 16,
    borderWidth: 1,
    padding: Spacing.three,
    gap: Spacing.two,
  },
  productRow: {
    gap: 2,
  },
  productNameText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
  },
  variantText: {
    fontSize: 12,
  },
  divider: {
    height: 1,
    marginVertical: 2,
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 8,
  },
  detailItem: {
    width: '47%',
    gap: 2,
  },
  detailLabel: {
    fontSize: 11,
  },
  detailValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#111827',
  },
  detailValueHighlight: {
    fontSize: 15,
    fontWeight: '800',
  },
  perMo: {
    fontSize: 11,
    fontWeight: '500',
  },
  noticeBox: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 12,
    gap: 8,
  },
  noticeIcon: {
    fontSize: 14,
  },
  noticeText: {
    flex: 1,
    fontSize: 11,
    lineHeight: 15,
  },
  buttonGroup: {
    width: '100%',
    gap: 8,
    marginTop: 4,
  },
  primaryButton: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#6226E3',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  secondaryButton: {
    width: '100%',
    paddingVertical: 12,
    borderRadius: 24,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    color: '#374151',
    fontSize: 13,
    fontWeight: '600',
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.99 }],
  },
});
