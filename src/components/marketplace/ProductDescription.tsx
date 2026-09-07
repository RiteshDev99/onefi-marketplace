import React from 'react';
import { View, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

interface ProductDescriptionProps {
  description?: string;
}

export function ProductDescription({ description }: ProductDescriptionProps) {
  const theme = useTheme();

  if (!description) return null;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.card,
          borderColor: theme.border,
        },
      ]}>
      <ThemedText style={styles.sectionTitle}>Product Description</ThemedText>

      <ThemedText style={styles.descriptionText} themeColor="textSecondary">
        {description}
      </ThemedText>
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
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  descriptionText: {
    fontSize: 13,
    lineHeight: 20,
    fontWeight: '400',
  },
});
