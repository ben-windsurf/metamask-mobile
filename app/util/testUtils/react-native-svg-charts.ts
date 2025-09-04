import { fireEvent, RenderResult } from '@testing-library/react-native';

// https://github.com/JesperLekland/react-native-svg-charts/issues/418

/**
 * Type alias for the root element of a rendered React Native component tree.
 * Used for traversing and searching through component hierarchies in tests.
 */
type Root = RenderResult['root'];

/**
 * Internal recursive helper function to find components by prop name.
 * Traverses the component tree and collects all components that have the specified prop.
 *
 * @param root - The root component to start searching from
 * @param prop - The prop name to search for (defaults to empty string)
 * @param found - Accumulator array for found components (defaults to empty array)
 * @returns Array of components that have the specified prop
 */
const _findByProp = function (root: Root, prop = '', found: Root[] = []) {
  if (!root) return found;

  if (root.props) {
    if (Object.keys(root.props).includes(prop)) found.push(root);
  }

  if (root.children?.length) {
    root.children.forEach((c) => {
      if (typeof c !== 'string') {
        _findByProp(c, prop, found);
      }
    });
  }

  return found;
};

/**
 * Find components in the given component hierarchy based on the name of one of their props.
 * Searches through the entire component tree and returns all components that have the specified prop.
 *
 * @param root - The root of the component tree to search through
 * @param prop - The name of the prop you are using to select components (defaults to empty string)
 * @returns Array of components that have the specified prop
 *
 * @example
 * ```typescript
 * // Find all components with a 'testID' prop
 * const componentsWithTestId = findByProp(root, 'testID');
 *
 * // Find all components with an 'onPress' prop
 * const pressableComponents = findByProp(root, 'onPress');
 * ```
 */
const findByProp = function (root: Root, prop = '') {
  return _findByProp(root, prop);
};

/**
 * Fires layout events on all components with `onLayout` props in the component tree.
 * This is useful for testing components that depend on layout measurements, particularly
 * for react-native-svg-charts components that need layout information to render properly.
 *
 * @param root - The root node to search for components with `onLayout` props
 * @param options - The layout dimensions to simulate (defaults to width: 300, height: 100)
 * @returns void
 *
 * @example
 * ```typescript
 * // Fire layout events with default dimensions
 * fireLayoutEvent(component.root);
 *
 * // Fire layout events with custom dimensions
 * fireLayoutEvent(component.root, { width: 400, height: 200 });
 * ```
 */
export const fireLayoutEvent = function (
  root: Root,
  options = {
    width: 300,
    height: 100,
  },
) {
  findByProp(root, 'onLayout').forEach((n) =>
    fireEvent(n, 'layout', { nativeEvent: { layout: options } }),
  );
};
