# Redux TypeScript Migration Playbook

This playbook provides a step-by-step guide for converting Redux reducers from `any` types to proper TypeScript types, based on the successful migration of 18 reducers in MetaMask Mobile (MST-23).

## Overview

Converting Redux reducers from JavaScript/`any` types to proper TypeScript provides:

- **Type Safety**: Catch errors at compile time instead of runtime
- **Better Developer Experience**: IntelliSense, autocomplete, and refactoring support
- **Documentation**: Types serve as living documentation of state shape
- **Maintainability**: Easier to understand and modify complex state structures

## Prerequisites

- Basic TypeScript knowledge
- Understanding of Redux patterns
- Familiarity with the existing codebase structure

## Step-by-Step Migration Process

### Phase 1: Analysis and Planning

#### 1.1 Identify Target Reducers

- Review `app/reducers/index.ts` and identify all `any` types in the `RootState` interface
- Prioritize reducers based on:
  - Complexity of state structure
  - Frequency of use in the application
  - Dependencies on other reducers

#### 1.2 Analyze Existing State Structures

For each reducer, examine:

- Current state shape and properties
- Action types and payloads
- Default/initial state values
- Any complex nested objects or arrays

### Phase 2: Create Type Definitions

#### 2.1 Naming Conventions

Follow these consistent naming patterns:

- **State interfaces**: `[ReducerName]State` (e.g., `SettingsState`, `CollectiblesState`)
- **Action enums**: `[ReducerName]ActionType` (e.g., `SwapsActionType`)
- **Action interfaces**: `[ReducerName]Action` (e.g., `SwapsAction`)

#### 2.2 Create Types Files

For complex reducers, create dedicated `types.ts` files:

```typescript
// app/reducers/[reducerName]/types.ts
export interface [ReducerName]State {
  // Define all state properties with proper types
  property1: string;
  property2: boolean;
  complexObject: {
    [key: string]: SomeType;
  };
}

export enum [ReducerName]ActionType {
  ACTION_ONE = 'ACTION_ONE',
  ACTION_TWO = 'ACTION_TWO',
}

export interface [ReducerName]Action {
  type: [ReducerName]ActionType;
  payload?: SomePayloadType;
}
```

#### 2.3 Handle Complex State Structures

**For objects with dynamic keys:**

```typescript
interface CollectiblesState {
  favorites: {
    [address: string]: {
      [chainId: string]: Array<{
        tokenId: string;
        address: string;
      }>;
    };
  };
}
```

**For extensible objects:**

```typescript
interface SettingsState extends Record<string, unknown> {
  searchEngine: string;
  primaryCurrency: string;
  lockTime: number;
  // ... other known properties
}
```

### Phase 3: Convert Reducer Files

#### 3.1 JavaScript to TypeScript Conversion

1. Rename `.js` files to `.ts`
2. Add proper imports for types
3. Type the reducer function parameters and return type

```typescript
// Before (JavaScript)
const reducer = (state = initialState, action) => {
  // implementation
};

// After (TypeScript)
const reducer = (
  state: ReducerState = initialState,
  action: ReducerAction,
): ReducerState => {
  // implementation
};
```

#### 3.2 Handle Redux Parameter Order

Ensure reducer functions follow the correct parameter order for ESLint compliance:

```typescript
// Correct order: action first, then state with default
const reducer = (
  action: ReducerAction,
  state: ReducerState = initialState,
): ReducerState => {
  // implementation
};
```

#### 3.3 Replace Type Assertions

Replace unsafe type assertions with proper type guards or null coalescing:

```typescript
// Before
selectedAsset: action.selectedAsset!,

// After
selectedAsset: action.selectedAsset || {},
```

### Phase 4: Update Root State Interface

#### 4.1 Replace `any` Types

Update `app/reducers/index.ts`:

```typescript
export interface RootState {
  // Before
  settings: any;
  collectibles: any;

  // After
  settings: SettingsState;
  collectibles: CollectiblesState;
}
```

#### 4.2 Add Proper Imports

Ensure all new state interfaces are imported:

```typescript
import { SettingsState } from './settings/types';
import { CollectiblesState } from './collectibles/types';
// ... other imports
```

### Phase 5: Fix Related Files

#### 5.1 Update Selectors

Modify selector functions to work with new strict typing:

```typescript
// Before
export const selectSomething = (state: RootState) => state.someReducer.property;

// After - may need type assertions for complex selectors
export const selectSomething = (state: RootState) =>
  (state.someReducer as SomeReducerState).property;
```

#### 5.2 Update Test Files

Modify test files to use proper types:

```typescript
// Update mock states to match new interfaces
const mockState: Partial<RootState> = {
  someReducer: {
    property1: 'value',
    property2: true,
  } as SomeReducerState,
};
```

### Phase 6: Validation and Testing

#### 6.1 TypeScript Compilation

Run TypeScript checks frequently during migration:

```bash
yarn lint:tsc
```

#### 6.2 ESLint Compliance

Ensure all ESLint rules pass:

```bash
yarn lint:js
```

#### 6.3 Unit Tests

Run existing unit tests to ensure no functionality is broken:

```bash
yarn test:unit
```

## Common Patterns and Solutions

### Pattern 1: Dynamic Object Keys

```typescript
interface StateWithDynamicKeys {
  [key: string]: SomeType;
  // Known properties can still be explicitly typed
  knownProperty: string;
}
```

### Pattern 2: Optional Properties

```typescript
interface StateWithOptionals {
  required: string;
  optional?: boolean;
  nullable: string | null;
}
```

### Pattern 3: Union Types for Actions

```typescript
type ReducerAction =
  | { type: 'ACTION_ONE'; payload: string }
  | { type: 'ACTION_TWO'; payload: number }
  | { type: 'ACTION_THREE' }; // No payload
```

### Pattern 4: Extending Existing Types

```typescript
interface ExtendedState extends BaseState {
  additionalProperty: string;
}
```

## Troubleshooting Common Issues

### Issue 1: "Property does not exist" Errors

**Solution**: Add the missing property to the interface or make it optional

### Issue 2: Type Assertion Errors

**Solution**: Use type guards or null coalescing instead of `!` assertions

### Issue 3: Test File Compilation Errors

**Solution**: Update mock objects to match new strict interfaces

### Issue 4: Selector Type Mismatches

**Solution**: Add proper type annotations or use type assertions where necessary

### Issue 5: ESLint Parameter Order Errors

**Solution**: Ensure action parameter comes before state parameter with default value

## Best Practices

### Do's ✅

- Follow consistent naming conventions
- Create separate `types.ts` files for complex reducers
- Use proper TypeScript types instead of `any`
- Test frequently during migration
- Document complex type decisions
- Use type guards for runtime type checking

### Don'ts ❌

- Don't use `any` type as a shortcut
- Don't use non-null assertions (`!`) without good reason
- Don't ignore TypeScript compilation errors
- Don't modify test logic unless necessary
- Don't change reducer functionality during type migration

## Validation Checklist

Before considering the migration complete:

- [ ] All `any` types removed from `RootState` interface
- [ ] TypeScript compilation passes (`yarn lint:tsc`)
- [ ] ESLint checks pass (`yarn lint:js`)
- [ ] All unit tests pass (`yarn test:unit`)
- [ ] No new runtime errors introduced
- [ ] Selectors work with new strict typing
- [ ] Test files compile without errors
- [ ] PR created with proper documentation

## Example Migration: Settings Reducer

### Before (JavaScript)

```javascript
// app/reducers/settings/index.js
const initialState = {
  searchEngine: 'DuckDuckGo',
  primaryCurrency: 'usd',
  lockTime: 30000,
};

const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_SEARCH_ENGINE':
      return { ...state, searchEngine: action.searchEngine };
    default:
      return state;
  }
};
```

### After (TypeScript)

```typescript
// app/reducers/settings/types.ts
export interface SettingsState extends Record<string, unknown> {
  searchEngine: string;
  primaryCurrency: string;
  lockTime: number;
}

export enum SettingsActionType {
  SET_SEARCH_ENGINE = 'SET_SEARCH_ENGINE',
}

export interface SettingsAction {
  type: SettingsActionType;
  searchEngine?: string;
}

// app/reducers/settings/index.ts
import { SettingsState, SettingsAction, SettingsActionType } from './types';

const initialState: SettingsState = {
  searchEngine: 'DuckDuckGo',
  primaryCurrency: 'usd',
  lockTime: 30000,
};

const settingsReducer = (
  action: SettingsAction,
  state: SettingsState = initialState,
): SettingsState => {
  switch (action.type) {
    case SettingsActionType.SET_SEARCH_ENGINE:
      return {
        ...state,
        searchEngine: action.searchEngine || state.searchEngine,
      };
    default:
      return state;
  }
};
```

## Conclusion

This playbook provides a systematic approach to migrating Redux reducers to TypeScript. Following these patterns and practices will ensure a consistent, type-safe Redux implementation that improves code quality and developer experience.

For questions or issues not covered in this playbook, refer to the original migration PR or consult with the team lead.
