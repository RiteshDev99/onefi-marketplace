import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';

export function ShopHeroBanner() {
  return (
    <View style={styles.bannerContainer}>
      {/* Background with vibrant purple gradient feel */}
      <View style={styles.gradientBackground}>
        {/* Decorative background glow circles */}
        <View style={styles.glowCircle1} />
        <View style={styles.glowCircle2} />

        <View style={styles.contentRow}>
          {/* Left Text Column */}
          <View style={styles.leftColumn}>
            {/* Pill Badge */}
            <View style={styles.badgePill}>
              <ThemedText style={styles.badgeText}>✦ NO-COST EMIs</ThemedText>
            </View>

            {/* Headline */}
            <ThemedText style={styles.headline}>
              Shop today,{'\n'}Pay later using{'\n'}Mutual funds.
            </ThemedText>

            {/* Subtitle */}
            <ThemedText style={styles.subtitle}>
              No credit score required. No interest.{'\n'}Backed by your investments.
            </ThemedText>
          </View>

          {/* Right Visual Graphic Composition */}
          <View style={styles.rightGraphic}>
            <View style={styles.bagGraphicContainer}>
              <View style={styles.shoppingBag}>
                <ThemedText style={styles.bagEmoji}>🛍️</ThemedText>
              </View>
              {/* Floating lifestyle/tech items */}
              <View style={styles.floatingPhone}>
                <ThemedText style={styles.smallEmoji}>📱</ThemedText>
              </View>
              <View style={styles.floatingLaptop}>
                <ThemedText style={styles.smallEmoji}>💻</ThemedText>
              </View>
              <View style={styles.floatingCar}>
                <ThemedText style={styles.smallEmoji}>🚗</ThemedText>
              </View>
              <View style={styles.floatingBike}>
                <ThemedText style={styles.smallEmoji}>🏍️</ThemedText>
              </View>
              <View style={styles.confetti1}>
                <ThemedText style={styles.sparkleEmoji}>✨</ThemedText>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bannerContainer: {
    width: '100%',
    overflow: 'hidden',
    backgroundColor: '#35169B',
  },
  gradientBackground: {
    backgroundColor: '#3D1BAF',
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.four,
    paddingBottom: Spacing.five,
    position: 'relative',
    overflow: 'hidden',
  },
  glowCircle1: {
    position: 'absolute',
    top: -40,
    right: -40,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(110, 34, 233, 0.45)',
  },
  glowCircle2: {
    position: 'absolute',
    bottom: -50,
    left: -30,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(78, 27, 196, 0.35)',
  },
  contentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftColumn: {
    flex: 1.3,
    gap: 8,
    zIndex: 2,
  },
  badgePill: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.28)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 14,
    marginBottom: 4,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.6,
  },
  headline: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
    lineHeight: 27,
    letterSpacing: -0.3,
  },
  subtitle: {
    color: 'rgba(255, 255, 255, 0.82)',
    fontSize: 11,
    lineHeight: 15,
    fontWeight: '400',
    marginTop: 2,
  },
  rightGraphic: {
    flex: 0.9,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    height: 120,
    zIndex: 2,
  },
  bagGraphicContainer: {
    width: 110,
    height: 110,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shoppingBag: {
    width: 68,
    height: 68,
    borderRadius: 18,
    backgroundColor: '#F59E0B',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
  },
  bagEmoji: {
    fontSize: 34,
  },
  floatingPhone: {
    position: 'absolute',
    top: 4,
    left: 4,
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: '#1E1B4B',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  floatingLaptop: {
    position: 'absolute',
    top: 0,
    right: 4,
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#312E81',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  floatingCar: {
    position: 'absolute',
    bottom: 24,
    left: -8,
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: '#DC2626',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  floatingBike: {
    position: 'absolute',
    bottom: 28,
    right: -6,
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: '#059669',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  confetti1: {
    position: 'absolute',
    top: -6,
    left: 40,
  },
  smallEmoji: {
    fontSize: 18,
  },
  sparkleEmoji: {
    fontSize: 16,
  },
});
