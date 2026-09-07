import React from 'react';
import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SymbolView, SymbolViewProps } from 'expo-symbols';

import { ThemedText } from '@/components/themed-text';
import { Spacing, MaxContentWidth } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type IconName = SymbolViewProps['name'];

interface MenuItem {
  id: string;
  title: string;
  subtitle: string;
  icon: IconName;
  badge?: string;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

export default function ProfileScreen() {
  const router = useRouter();
  const safeAreaInsets = useSafeAreaInsets();
  const theme = useTheme();

  const menuSections: MenuSection[] = [
    {
      title: 'Account',
      items: [
        {
          id: 'personal',
          title: 'Personal Details',
          subtitle: 'Name, email, mobile number',
          icon: 'person',
        },
        {
          id: 'kyc',
          title: 'KYC & Verification',
          subtitle: 'Identity and address proof',
          icon: 'checkmark.shield',
          badge: 'Verified',
        },
      ],
    },
    {
      title: 'Finances',
      items: [
        {
          id: 'portfolio',
          title: 'Portfolio & Limits',
          subtitle: 'Linked Mutual Funds, available credit',
          icon: 'chart.pie',
        },
        {
          id: 'emi',
          title: 'EMI Plans & Dues',
          subtitle: 'Active repayment schedules',
          icon: 'indianrupeesign.square',
        },
      ],
    },
    {
      title: 'Preferences & Support',
      items: [
        {
          id: 'settings',
          title: 'Settings & Security',
          subtitle: 'App lock, biometric, notifications',
          icon: 'gearshape',
        },
        {
          id: 'help',
          title: 'Help & Support',
          subtitle: 'FAQs, contact 1Fi support',
          icon: 'questionmark.circle',
        },
      ],
    },
  ];

  return (
    <View style={[styles.screen, { backgroundColor: theme.background, paddingTop: safeAreaInsets.top }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.card, borderBottomColor: theme.border }]}>
        <Pressable
          onPress={() => router.back()}
          accessibilityRole="button"
          accessibilityLabel="Go back"
          style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}>
          <SymbolView
            name="arrow.backward"
            size={22}
            tintColor={theme.text}
          />
        </Pressable>
        <ThemedText style={styles.headerTitle}>Profile</ThemedText>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.contentContainer,
          { paddingBottom: safeAreaInsets.bottom + Spacing.six },
        ]}
        showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {/* User Profile Card */}
          <View style={[styles.profileCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <View style={[styles.avatar, { backgroundColor: theme.brandPurple }]}>
              <SymbolView
                name="person.fill"
                size={28}
                tintColor="#FFFFFF"
              />
            </View>
            <View style={styles.profileInfo}>
              <ThemedText style={styles.userName}>1Fi Member</ThemedText>
              <ThemedText style={styles.userSubtitle}>Demo Account • View Only</ThemedText>
            </View>
          </View>

          {/* Menu Sections */}
          {menuSections.map((section) => (
            <View key={section.title} style={styles.sectionWrapper}>
              <ThemedText style={styles.sectionHeader}>{section.title}</ThemedText>
              <View style={[styles.sectionCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
                {section.items.map((item, index) => {
                  const isLast = index === section.items.length - 1;
                  return (
                    <View key={item.id}>
                      <Pressable
                        style={({ pressed }) => [
                          styles.menuItem,
                          pressed && styles.pressedItem,
                        ]}
                        accessibilityRole="button"
                        accessibilityLabel={item.title}>
                        <View style={[styles.menuIconBox, { backgroundColor: theme.brandPurpleLight }]}>
                          <SymbolView
                            name={item.icon}
                            size={18}
                            tintColor={theme.brandPurple}
                          />
                        </View>
                        <View style={styles.menuTextGroup}>
                          <View style={styles.menuTitleRow}>
                            <ThemedText style={styles.menuItemTitle}>{item.title}</ThemedText>
                            {item.badge ? (
                              <View style={styles.verifiedBadge}>
                                <ThemedText style={styles.verifiedBadgeText}>{item.badge}</ThemedText>
                              </View>
                            ) : null}
                          </View>
                          <ThemedText style={styles.menuItemSubtitle}>{item.subtitle}</ThemedText>
                        </View>
                        <SymbolView
                          name="chevron.right"
                          size={14}
                          tintColor="#9CA3AF"
                        />
                      </Pressable>
                      {!isLast && <View style={[styles.menuDivider, { backgroundColor: theme.border }]} />}
                    </View>
                  );
                })}
              </View>
            </View>
          ))}

          {/* App Info Footer */}
          <View style={styles.footer}>
            <ThemedText style={styles.footerText}>1Fi Marketplace v1.0.0</ThemedText>
            <ThemedText style={styles.footerSubtext}>SDE Intern Assignment Demo</ThemedText>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.three,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  headerSpacer: {
    width: 38,
  },
  pressed: {
    opacity: 0.65,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    alignItems: 'center',
    paddingHorizontal: Spacing.three,
    paddingTop: Spacing.three,
  },
  container: {
    width: '100%',
    maxWidth: MaxContentWidth,
    gap: Spacing.four,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.three,
    borderRadius: 14,
    borderWidth: 1,
    gap: 14,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInfo: {
    flex: 1,
    gap: 3,
  },
  userName: {
    fontSize: 17,
    fontWeight: '700',
  },
  userSubtitle: {
    fontSize: 13,
    color: '#6B7280',
  },
  sectionWrapper: {
    gap: 8,
  },
  sectionHeader: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    color: '#6B7280',
    letterSpacing: 0.5,
    paddingHorizontal: 4,
  },
  sectionCard: {
    borderRadius: 14,
    borderWidth: 1,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
    paddingHorizontal: Spacing.three,
    gap: 12,
  },
  pressedItem: {
    backgroundColor: 'rgba(0, 0, 0, 0.02)',
  },
  menuIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuTextGroup: {
    flex: 1,
    gap: 2,
  },
  menuTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  menuItemTitle: {
    fontSize: 15,
    fontWeight: '600',
  },
  menuItemSubtitle: {
    fontSize: 12,
    color: '#6B7280',
  },
  verifiedBadge: {
    backgroundColor: '#E8FAF2',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
  },
  verifiedBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#00A87A',
  },
  menuDivider: {
    height: StyleSheet.hairlineWidth,
    marginLeft: 60,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: Spacing.four,
    gap: 4,
  },
  footerText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#9CA3AF',
  },
  footerSubtext: {
    fontSize: 11,
    color: '#9CA3AF',
  },
});
