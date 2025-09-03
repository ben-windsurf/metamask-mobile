import React, { useCallback, useContext, useEffect, useState } from 'react';
import {
  useColorScheme,
  StatusBar,
  ColorSchemeName,
  Appearance,
  Platform,
} from 'react-native';
import { throttle } from 'lodash';
import { AppThemeKey, Theme } from './models';
import { useSelector } from 'react-redux';
import { lightTheme, darkTheme, brandColor } from '@metamask/design-tokens';
import Device from '../device';

/**
 * Mock theme object for unit testing
 * This is needed to make our unit tests pass since Enzyme doesn't support contextType
 * TODO: Convert classes into functional components and remove contextType
 * @returns {Object} Mock theme object with light theme properties
 */
export const mockTheme = {
  colors: lightTheme.colors,
  themeAppearance: 'light' as AppThemeKey.light,
  typography: lightTheme.typography,
  shadows: lightTheme.shadows,
  brandColors: brandColor,
};

/**
 * React context for theme management
 * Provides theme data to components throughout the application
 * TODO: Replace "any" with type
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ThemeContext = React.createContext<any>(undefined);

/**
 * Utility function for getting asset from theme (Class components)
 * Selects appropriate asset based on app theme preference and OS color scheme
 * @param {AppThemeKey} appTheme - Theme preference from app settings
 * @param {ColorSchemeName} osColorScheme - Theme from OS (light/dark/null)
 * @param {any} light - Light theme asset
 * @param {any} dark - Dark theme asset
 * @returns {any} Selected asset based on theme configuration
 */
export const getAssetFromTheme = (
  appTheme: AppThemeKey,
  osColorScheme: ColorSchemeName,
  // TODO: Replace "any" with type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  light: any,
  // TODO: Replace "any" with type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dark: any,
) => {
  let asset = light;
  switch (appTheme) {
    case AppThemeKey.light:
      asset = light;
      break;
    case AppThemeKey.dark:
      asset = dark;
      break;
    case AppThemeKey.os:
      asset = osColorScheme === 'dark' ? dark : light;
      break;
    default:
      asset = light;
  }
  return asset;
};

/**
 * Custom useColorScheme hook that throttles updating the system theme color.
 * Replaces RN's useColorScheme hook, which has a bug where it resolves briefly to the wrong color.
 * https://github.com/expo/expo/issues/10815#issuecomment-719113200
 * This only affects iOS so we apply 0 delay on Android.
 *
 * @param delay - Optional delay for throttling setting the system theme.
 * @returns - The system's theme, light or dark.
 */
/* eslint-disable */
const useColorSchemeCustom = (
  delay = Platform.select({ android: 0, ios: 350 }),
) => {
  const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme());
  const onColorSchemeChange = useCallback(
    throttle(
      ({ colorScheme }) => {
        setColorScheme(colorScheme);
      },
      delay,
      {
        leading: false,
      },
    ),
    [],
  );
  useEffect(() => {
    const appearanceStateListener =
      Appearance.addChangeListener(onColorSchemeChange);
    return () => {
      onColorSchemeChange.cancel();
      appearanceStateListener?.remove();
    };
  }, []);
  return colorScheme;
};
/* eslint-enable */

/**
 * Hook that provides the current app theme based on user preferences and OS settings
 * Handles theme switching, status bar styling, and returns complete theme object
 * @returns {Theme} Complete theme object with colors, typography, shadows, and brand colors
 */
export const useAppTheme = (): Theme => {
  const osThemeName = useColorSchemeCustom();
  const appTheme: AppThemeKey = useSelector(
    // TODO: Replace "any" with type
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (state: any) => state.user.appTheme,
  );
  const themeAppearance = getAssetFromTheme(
    appTheme,
    osThemeName,
    AppThemeKey.light,
    AppThemeKey.dark,
  );
  let colors: Theme['colors'];
  let typography: Theme['typography'];
  let shadows: Theme['shadows'];
  const brandColors = brandColor;

  const setDarkStatusBar = () => {
    StatusBar.setBarStyle('light-content', true);
    if (Device.isAndroid()) {
      StatusBar.setTranslucent(true);
      StatusBar.setBackgroundColor('transparent');
    }
  };

  const setLightStatusBar = () => {
    StatusBar.setBarStyle('dark-content', true);
    if (Device.isAndroid()) {
      StatusBar.setTranslucent(true);
      StatusBar.setBackgroundColor('transparent');
    }
  };

  switch (appTheme) {
    /* eslint-disable no-fallthrough */
    case AppThemeKey.os: {
      if (osThemeName === AppThemeKey.light) {
        colors = lightTheme.colors;
        typography = lightTheme.typography;
        shadows = lightTheme.shadows;
        setLightStatusBar();
        break;
      } else if (osThemeName === AppThemeKey.dark) {
        colors = darkTheme.colors;
        typography = darkTheme.typography;
        shadows = darkTheme.shadows;
        setDarkStatusBar();
        break;
      } else {
        // Cover cases where OS returns undefined
        colors = lightTheme.colors;
        typography = lightTheme.typography;
        shadows = lightTheme.shadows;
        setLightStatusBar();
      }
    }
    case AppThemeKey.light:
      colors = lightTheme.colors;
      typography = lightTheme.typography;
      shadows = lightTheme.shadows;
      setLightStatusBar();
      break;
    case AppThemeKey.dark:
      colors = darkTheme.colors;
      typography = darkTheme.typography;
      shadows = darkTheme.shadows;
      setDarkStatusBar();
      break;
    default:
      // Default uses light theme
      colors = lightTheme.colors;
      typography = lightTheme.typography;
      shadows = lightTheme.shadows;
      setLightStatusBar();
  }

  return { colors, themeAppearance, typography, shadows, brandColors };
};

/**
 * Hook that retrieves theme from React context
 * Used when theme is provided via ThemeContext provider
 * @returns {Theme} Theme object from context
 */
export const useAppThemeFromContext = (): Theme => {
  const theme = useContext<Theme>(ThemeContext);
  return theme;
};

/**
 * Primary hook for accessing theme throughout the application
 * Falls back to mockTheme if no theme is available from context
 * @returns {Theme} Current theme object or mock theme as fallback
 */
export const useTheme = (): Theme => {
  const theme = useAppThemeFromContext() || mockTheme;
  return theme;
};

/**
 * Hook that returns asset based on theme (Functional components)
 * Automatically selects appropriate asset based on current theme settings
 * @param {any} light - Light theme asset
 * @param {any} dark - Dark theme asset
 * @returns {any} Asset based on current theme configuration
 */
// TODO: Replace "any" with type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useAssetFromTheme = (light: any, dark: any) => {
  const osColorScheme = useColorScheme();
  // TODO: Replace "any" with type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const appTheme = useSelector((state: any) => state.user.appTheme);
  const asset = getAssetFromTheme(appTheme, osColorScheme, light, dark);

  return asset;
};
