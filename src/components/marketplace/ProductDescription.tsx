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
      <ThemedText style={styles.sectionTitle}>Overview & Specifications</ThemedText>

      <ThemedText style={styles.descriptionText} themeColor="textSecondary">
        {description}
      </ThemedText>
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
    gap: Spacing.two,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '400',
  },
});
