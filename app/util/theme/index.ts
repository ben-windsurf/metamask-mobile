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
 * Mock theme object used for unit testing when Enzyme doesn't support contextType.
 * Provides a default light theme configuration for test environments.
 *
 * @todo Convert classes into functional components and remove contextType
 */
export const mockTheme = {
  colors: lightTheme.colors,
  themeAppearance: 'light' as AppThemeKey.light,
  typography: lightTheme.typography,
  shadows: lightTheme.shadows,
  brandColors: brandColor,
};

/**
 * React context for providing theme data throughout the component tree.
 * Used to share theme configuration between components.
 *
 * @todo Replace "any" with proper Theme type
 */
// TODO: Replace "any" with type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ThemeContext = React.createContext<any>(undefined);

/**
 * Utility function for selecting the appropriate asset based on theme configuration.
 * Used primarily by class components to get theme-appropriate assets.
 *
 * @param appTheme - The application's theme setting (light, dark, or os)
 * @param osColorScheme - The operating system's color scheme preference
 * @param light - Asset to use for light theme
 * @param dark - Asset to use for dark theme
 * @returns The appropriate asset based on theme configuration
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
 * Hook that provides the current application theme configuration.
 * Combines app theme settings with OS color scheme to determine the active theme.
 * Also manages status bar styling based on the selected theme.
 *
 * @returns Complete theme object with colors, typography, shadows, and brand colors
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
 * Hook that retrieves theme configuration from React context.
 * Used when theme is provided via ThemeContext.Provider.
 *
 * @returns Theme object from context
 */
export const useAppThemeFromContext = (): Theme => {
  const theme = useContext<Theme>(ThemeContext);
  return theme;
};

/**
 * Primary hook for accessing theme configuration in functional components.
 * Falls back to mockTheme if no theme is available from context.
 *
 * @returns Theme object from context or mock theme as fallback
 */
export const useTheme = (): Theme => {
  const theme = useAppThemeFromContext() || mockTheme;
  return theme;
};

/**
 * Hook that returns the appropriate asset based on current theme configuration.
 * Used by functional components to get theme-appropriate assets.
 *
 * @param light - Asset to use for light theme
 * @param dark - Asset to use for dark theme
 * @returns The appropriate asset based on current theme settings
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
