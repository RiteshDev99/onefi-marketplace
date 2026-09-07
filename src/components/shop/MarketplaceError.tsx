import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

interface MarketplaceErrorProps {
  message?: string;
  onRetry: () => void;
}

export function MarketplaceError({ message, onRetry }: MarketplaceErrorProps) {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.card,
          borderColor: theme.border,
        },
      ]}>
      <View style={[styles.iconContainer, { backgroundColor: '#FEE2E2' }]}>
        <ThemedText style={styles.iconEmoji}>⚠️</ThemedText>
      </View>

      <ThemedText style={styles.title}>Unable to Load Products</ThemedText>
      <ThemedText style={styles.subtitle} themeColor="textSecondary">
        {message || 'We could not connect to the product catalog server. Please check your internet connection and try again.'}
      </ThemedText>

      <Pressable
        onPress={onRetry}
        style={({ pressed }) => [
          styles.retryButton,
          { backgroundColor: theme.brandPurple },
          pressed && styles.buttonPressed,
        ]}>
        <ThemedText style={styles.retryButtonText}>Try Again</ThemedText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: Spacing.five,
    borderRadius: 18,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.two,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  iconEmoji: {
    fontSize: 24,
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 13,
    lineHeight: 18,
    textAlign: 'center',
    maxWidth: 290,
  },
  retryButton: {
    marginTop: Spacing.two,
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 22,
    shadowColor: '#6226E3',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  buttonPressed: {
    opacity: 0.85,
  },
});
