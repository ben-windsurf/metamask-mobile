/* eslint-disable @typescript-eslint/ban-types */
import { useMemo } from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';

type NavigationParams = object | undefined;

export type NavigationDetails<T extends NavigationParams = NavigationParams> =
  readonly [string, T];

/**
 * Creates a navigation details factory function for consistent navigation parameter handling
 * @param {string} name - The name of the navigation route
 * @param {string} screen - Optional screen name for nested navigation
 * @returns {Function} A function that takes params and returns navigation details tuple
 */
export const createNavigationDetails =
  <T extends NavigationParams>(name: string, screen?: string) =>
  (params?: T) =>
    [name, screen ? { screen, params } : params] as const;

type RouteParams<T extends object> = RouteProp<{ route: T }, 'route'>;
/**
 * Custom hook to extract and merge navigation parameters with default values
 * @param {Partial<T>} defaults - Default parameter values to merge with route params
 * @returns {T | Partial<T>} Merged parameters object with defaults and route params
 */
export const useParams = <
  T extends object | undefined,
  Strict extends boolean = false,
>(
  defaults?: Partial<T>,
) => {
  const route = useRoute<RouteParams<{ params: T }>>();
  const navParams = route.params;
  const params = useMemo(
    () => ({ ...defaults, ...navParams }),
    [defaults, navParams],
  );
  return params as Strict extends false ? T : Partial<T>;
};
