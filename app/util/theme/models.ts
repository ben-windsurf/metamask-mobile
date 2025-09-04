import type {
  Theme as DesignTokenTheme,
  BrandColor,
} from '@metamask/design-tokens';

/**
 * Enumeration of available app theme keys for theme selection.
 * Supports OS-based automatic theme switching and manual light/dark modes.
 */
export enum AppThemeKey {
  /** Follow the operating system's theme preference */
  os = 'os',
  /** Force light theme appearance */
  light = 'light',
  /** Force dark theme appearance */
  dark = 'dark',
}

/**
 * Extended theme interface that combines design tokens with app-specific theme properties.
 * Provides comprehensive theming support including colors, shadows, and brand colors.
 */
export interface Theme extends DesignTokenTheme {
  /** Current theme appearance mode (light or dark) */
  themeAppearance: AppThemeKey.light | AppThemeKey.dark;
  /** Brand-specific color palette for MetaMask branding */
  brandColors: BrandColor;
}

/**
 * Type alias for the colors object from the theme.
 * Provides access to all color tokens defined in the design system.
 */
export type Colors = Theme['colors'];

/**
 * Type alias for the shadows object from the theme.
 * Provides access to all shadow tokens defined in the design system.
 */
export type Shadows = Theme['shadows'];

/**
 * Type alias for brand colors used throughout the application.
 * Maintains consistency with MetaMask brand guidelines.
 */
export type BrandColors = BrandColor;
