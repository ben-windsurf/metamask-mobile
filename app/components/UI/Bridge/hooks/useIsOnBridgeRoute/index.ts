import { useNavigationState } from '@react-navigation/native';
import Routes from '../../../../../constants/navigation/Routes';

// Interface for nested route objects where values can be strings or nested objects
export interface RouteObject {
  [key: string]: string | RouteObject;
}

/**
 * Recursively extracts all string values from a nested route object
 * @param {RouteObject} obj - The nested route object to extract values from
 * @returns {string[]} Array of all string values found in the object hierarchy
 */
export const getAllRouteValues = (obj: RouteObject): string[] => {
  const values: string[] = [];

  for (const value of Object.values(obj)) {
    if (typeof value === 'string') {
      values.push(value);
    } else if (typeof value === 'object' && value !== null) {
      values.push(...getAllRouteValues(value));
    }
  }

  return values;
};

const bridgeRoutes = getAllRouteValues(Routes.BRIDGE);

/**
 * Custom hook to determine if the current navigation route is within the Bridge feature
 * @returns {boolean} True if the current route is a bridge-related route, false otherwise
 */
export const useIsOnBridgeRoute = () => {
  const routes = useNavigationState((state) => state?.routes[0]?.state?.routes);

  // The final route is the one that is currently active on screen
  const currentView = routes?.[routes.length - 1]?.name;

  return bridgeRoutes.includes(currentView ?? '');
};
