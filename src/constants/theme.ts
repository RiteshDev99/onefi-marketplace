/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#111827',
    background: '#F8F9FD',
    backgroundElement: '#F0EEFC',
    backgroundSelected: '#E5E0FA',
    textSecondary: '#6B7280',
    brandPrimary: '#6226E3',
    brandPurple: '#6226E3',
    brandPurpleLight: '#F0EEFC',
    brandPurpleDark: '#341591',
    brandDark: '#0A0F1D',
    brandSecondary: '#3B82F6',
    brandGreen: '#00D09C',
    card: '#FFFFFF',
    border: '#E8ECF2',
    badgeGreen: '#E8FAF2',
    badgeGreenText: '#00A87A',
    badgeMuted: '#F1F5F9',
    badgeMutedText: '#64748B',
  },
  dark: {
    text: '#F8FAFC',
    background: '#0B0F19',
    backgroundElement: '#1A1B2E',
    backgroundSelected: '#262840',
    textSecondary: '#94A3B8',
    brandPrimary: '#8B5CF6',
    brandPurple: '#8B5CF6',
    brandPurpleLight: '#1E1B38',
    brandPurpleDark: '#341591',
    brandDark: '#0A0F1D',
    brandSecondary: '#60A5FA',
    brandGreen: '#00D09C',
    card: '#131A2A',
    border: '#1E293B',
    badgeGreen: '#064E3B',
    badgeGreenText: '#34D399',
    badgeMuted: '#1E293B',
    badgeMutedText: '#94A3B8',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
