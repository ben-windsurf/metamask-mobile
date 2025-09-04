import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../../reducers';
import { isTest } from '../../../../util/test/utils';
import { createSelector } from 'reselect';
import { Platform } from 'react-native';
import { v4 as uuidv4 } from 'uuid';

/**
 * Represents a performance metric captured during app execution.
 * Used for tracking timing and metadata of various operations.
 */
export interface PerformanceMetric {
  /** Name of the event being measured */
  eventName: string;
  /** Unix timestamp when the event started */
  timestamp: number;
  /** Duration of the event in milliseconds */
  duration?: number;
  /** Additional metadata associated with the event */
  metadata: Record<string, unknown>;
  /** Unique identifier for this metric */
  id?: string;
  /** ID of the parent metric if this is a nested measurement */
  parentId?: string;
}

/**
 * Redux state for performance monitoring and metrics collection.
 * Tracks performance data across the application lifecycle.
 */
export interface PerformanceState {
  /** Unique identifier for the current performance session */
  sessionId: string;
  /** Unix timestamp when the performance session started */
  startTime: number;
  /** Array of collected performance metrics */
  metrics: PerformanceMetric[];
  /** Environment information for the current session */
  environment: {
    /** Git branch name */
    branch: string;
    /** Git commit hash */
    commitHash: string;
    /** Platform (iOS/Android) */
    platform: string;
    /** Application version */
    appVersion: string;
  };
  /** Currently active traces indexed by session ID */
  activeTraceBySessionId: Record<
    string,
    { startTime: number; metadata?: Record<string, unknown> }
  >;
  /** Whether the performance monitoring has been initialized */
  isInitialized: boolean;
}

/**
 * Initial state for the performance slice.
 * Provides default values for all performance tracking properties.
 */
export const initialState: PerformanceState = {
  sessionId: '',
  startTime: 0,
  metrics: [],
  environment: {
    branch: '',
    commitHash: '',
    platform: '',
    appVersion: '',
  },
  activeTraceBySessionId: {},
  isInitialized: false,
};

const name = 'performance';

const slice = createSlice({
  name,
  initialState,
  reducers: {
    startPerformanceTrace: (
      state,
      action: PayloadAction<{
        eventName: string;
        metadata?: Record<string, unknown>;
        environment?: PerformanceState['environment'];
      }>,
    ) => {
      if (!isTest) {
        return;
      }
      // Initialize session if not already initialized
      if (!state.isInitialized) {
        const { environment } = action.payload;
        state.sessionId = uuidv4();
        state.startTime = Date.now();
        state.environment = {
          branch: environment?.branch || '',
          commitHash: environment?.commitHash || '',
          platform: environment?.platform || Platform.OS,
          appVersion: environment?.appVersion || '',
        };
        state.isInitialized = true;
      }

      const { eventName, metadata } = action.payload;
      state.activeTraceBySessionId[eventName] = {
        startTime: Date.now(),
        metadata,
      };
    },
    endPerformanceTrace: (
      state,
      action: PayloadAction<{
        eventName: string;
        additionalMetadata?: Record<string, unknown>;
      }>,
    ) => {
      if (!isTest) {
        return;
      }
      const { eventName, additionalMetadata = {} } = action.payload;
      const activeTrace = state.activeTraceBySessionId[eventName];

      if (activeTrace) {
        const duration = Date.now() - activeTrace.startTime;
        // eslint-disable-next-line no-console
        console.debug(`-- ! perf: ${eventName} took ${duration.toFixed(2)}ms`);
        state.metrics.push({
          eventName,
          timestamp: activeTrace.startTime,
          duration,
          metadata: {
            ...activeTrace.metadata,
            ...additionalMetadata,
          },
        });
        delete state.activeTraceBySessionId[eventName];
      }
    },
    clearPerformanceMetrics: (state) => {
      if (!isTest) {
        return;
      }
      state.metrics = [];
      state.activeTraceBySessionId = {};
    },
  },
});

const { actions, reducer } = slice;

// Base selector
const selectPerformanceState = (state: RootState) => state.performance;

// Selectors using createSelector
/**
 * Selector to get the complete performance state.
 * @param state - The root Redux state
 * @returns The entire performance state object
 */
export const selectPerformanceData = createSelector(
  [selectPerformanceState],
  (performanceState) => performanceState,
);

/**
 * Selector to get all collected performance metrics.
 * @param state - The root Redux state
 * @returns Array of performance metrics or undefined if not initialized
 */
export const selectPerformanceMetrics = createSelector(
  [selectPerformanceState],
  (performanceState) => performanceState?.metrics,
);

export const selectPerformanceSession = createSelector(
  [selectPerformanceState],
  (performanceState) => ({
    sessionId: performanceState?.sessionId,
    startTime: performanceState?.startTime,
    environment: performanceState?.environment,
  }),
);

// Actions
export const {
  startPerformanceTrace,
  endPerformanceTrace,
  clearPerformanceMetrics,
} = actions;

export default reducer;
