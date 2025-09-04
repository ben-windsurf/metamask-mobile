/**
 * Creates mock navigation props for testing React Navigation components.
 * Provides all necessary navigation methods and route parameters with Jest mock functions.
 *
 * @param params - Route parameters to be passed to the navigation state and route
 * @returns Mock navigation props object with navigation and route properties
 *
 * @example
 * ```typescript
 * const mockProps = createNavigationProps({ userId: '123' });
 * const component = render(<MyComponent {...mockProps} />);
 * ```
 */
// TODO: Replace "any" with type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createNavigationProps = (params: any): any => ({
  navigation: {
    state: { params },
    dispatch: jest.fn(),
    goBack: jest.fn(),
    dismiss: jest.fn(),
    navigate: jest.fn(),
    openDrawer: jest.fn(),
    closeDrawer: jest.fn(),
    toggleDrawer: jest.fn(),
    getParam: jest.fn(),
    setParams: jest.fn(),
    addListener: jest.fn(),
    push: jest.fn(),
    replace: jest.fn(),
    pop: jest.fn(),
    popToTop: jest.fn(),
    isFocused: jest.fn(),
    unsubscribeFocus: jest.fn(),
  },
  route: { params },
});

export default createNavigationProps;
