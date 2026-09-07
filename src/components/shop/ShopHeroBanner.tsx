import React from 'react';
import { View, StyleSheet } from 'react-native';

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
            <ThemedText style={styles.subtitle} numberOfLines={2}>
              Explore flexible financing plans backed by your mutual fund investments.
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
    paddingTop: 12,
    paddingBottom: 22,
    position: 'relative',
    overflow: 'hidden',
  },
  glowCircle1: {
    position: 'absolute',
    top: -30,
    right: -30,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(110, 34, 233, 0.45)',
  },
  glowCircle2: {
    position: 'absolute',
    bottom: -40,
    left: -20,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(78, 27, 196, 0.35)',
  },
  contentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftColumn: {
    flex: 1.35,
    gap: 4,
    zIndex: 2,
  },
  badgePill: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.28)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    marginBottom: 2,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 9.5,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  headline: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
    lineHeight: 22,
    letterSpacing: -0.3,
  },
  subtitle: {
    color: 'rgba(255, 255, 255, 0.82)',
    fontSize: 10.5,
    lineHeight: 14,
    fontWeight: '400',
    marginTop: 2,
  },
  rightGraphic: {
    flex: 0.85,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    height: 90,
    zIndex: 2,
  },
  bagGraphicContainer: {
    width: 84,
    height: 84,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shoppingBag: {
    width: 50,
    height: 50,
    borderRadius: 14,
    backgroundColor: '#F59E0B',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  bagEmoji: {
    fontSize: 24,
  },
  floatingPhone: {
    position: 'absolute',
    top: 2,
    left: 2,
    width: 26,
    height: 26,
    borderRadius: 8,
    backgroundColor: '#1E1B4B',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  floatingLaptop: {
    position: 'absolute',
    top: 0,
    right: 2,
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: '#312E81',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  floatingCar: {
    position: 'absolute',
    bottom: 16,
    left: -6,
    width: 26,
    height: 26,
    borderRadius: 8,
    backgroundColor: '#DC2626',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  floatingBike: {
    position: 'absolute',
    bottom: 18,
    right: -4,
    width: 24,
    height: 24,
    borderRadius: 8,
    backgroundColor: '#059669',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  confetti1: {
    position: 'absolute',
    top: -4,
    left: 30,
  },
  smallEmoji: {
    fontSize: 13,
  },
  sparkleEmoji: {
    fontSize: 12,
  },
});
