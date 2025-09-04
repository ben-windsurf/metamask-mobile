/* eslint-disable no-console, import/no-nodejs-modules */
import fs from 'fs';
import path from 'path';

/**
 * Custom error that carries performance data for failed performance tests.
 * Extends the standard Error class to include performance metrics.
 */
export class PerformanceTestError extends Error {
  public readonly performanceData: Partial<TestResult>;

  /**
   * Creates a new PerformanceTestError with performance data.
   * @param message - The error message describing the failure
   * @param performanceData - Partial test result data containing performance metrics
   */
  constructor(message: string, performanceData: Partial<TestResult>) {
    super(message);
    this.name = 'PerformanceTestError';
    this.performanceData = performanceData;
  }
}

/**
 * Interface representing the results of a single performance test.
 * Contains all metrics and metadata for test execution and performance analysis.
 */
export interface TestResult {
  /** Name of the test that was executed */
  testName: string;
  /** User profile used during the test (e.g., 'new user', 'existing user') */
  userProfile: string;
  /** Platform where the test was executed (iOS/Android) */
  platform: string;
  /** Total execution time in seconds */
  totalTime: number;
  /** Test execution status */
  status: 'PASSED' | 'FAILED';
  /** Error message if the test failed */
  error?: string;
  /** ISO timestamp when the test was executed */
  timestamp: string;
  /** Performance thresholds used for pass/fail criteria */
  thresholds: {
    /** Maximum acceptable total time in seconds */
    totalTime: number;
  };
  /** Optional metadata about the test execution */
  metadata?: {
    /** Type of performance test (e.g., 'navigation', 'render') */
    testType?: string;
    /** Which metrics were actually measured during the test */
    measuredMetrics?: {
      /** Whether total time was measured */
      totalTime: boolean;
    };
  };
}

/**
 * Interface representing the aggregated results of a complete test suite.
 * Contains summary statistics and individual test results.
 */
export interface TestSuiteResults {
  /** Name of the test suite */
  suiteName: string;
  /** ISO timestamp when the test suite started */
  startTime: string;
  /** ISO timestamp when the test suite ended */
  endTime: string;
  /** Platform where the test suite was executed */
  platform: string;
  /** Total number of tests executed */
  totalTests: number;
  /** Number of tests that passed */
  passedTests: number;
  /** Number of tests that failed */
  failedTests: number;
  /** Array of individual test results */
  results: TestResult[];
}

/**
 * Performance test reporter that collects, aggregates, and saves performance test results.
 * Provides methods to track test execution, measure performance metrics, and generate reports.
 */
export class PerformanceTestReporter {
  private testSuiteResults: TestSuiteResults;

  /**
   * Creates a new PerformanceTestReporter for a test suite.
   * @param suiteName - Name of the test suite being executed
   */
  constructor(suiteName: string) {
    this.testSuiteResults = {
      suiteName,
      startTime: new Date().toISOString(),
      endTime: '',
      platform: device.getPlatform().toUpperCase(),
      totalTests: 0,
      passedTests: 0,
      failedTests: 0,
      results: [],
    };
  }

  /**
   * Initialize the test suite
   */
  initializeSuite(): void {
    console.warn(
      `\n🚀 STARTING ${this.testSuiteResults.suiteName.toUpperCase()}`,
    );
    console.warn(`📱 Platform: ${this.testSuiteResults.platform}`);
    console.warn(`⏰ Start Time: ${this.testSuiteResults.startTime}`);
    console.warn('='.repeat(60));
  }

  /**
   * Finalize the test suite and save results
   */
  finalizeSuite(): void {
    this.testSuiteResults.endTime = new Date().toISOString();
    this.saveTestResults();
    console.warn(
      `\n🏁 FINISHED ${this.testSuiteResults.suiteName.toUpperCase()}`,
    );
    console.warn(`⏰ End Time: ${this.testSuiteResults.endTime}`);
    console.warn('='.repeat(60));
  }

  /**
   * Convert milliseconds to seconds with 2 decimal places
   */
  private msToSeconds(ms: number): number {
    return Math.round((ms / 1000) * 100) / 100;
  }

  /**
   * Add a passed test result
   */
  addPassedTest(
    testName: string,
    userProfile: string,
    result: Partial<TestResult>,
    _duration: number,
  ): void {
    // Handle tests that don't measure navigation/render times

    const testResult: TestResult = {
      testName,
      userProfile,
      platform: this.testSuiteResults.platform,
      totalTime: this.msToSeconds(result.totalTime || 0),
      status: 'PASSED',
      timestamp: new Date().toISOString(),
      thresholds: {
        totalTime: this.msToSeconds(result.thresholds?.totalTime || 0),
      },
    };

    this.testSuiteResults.results.push(testResult);
    this.testSuiteResults.passedTests++;
    this.testSuiteResults.totalTests++;
  }

  /**
   * Add a failed test result
   */
  addFailedTest(
    testName: string,
    userProfile: string,
    error: unknown,
    duration: number,
  ): void {
    let performanceData: Partial<TestResult> = {};

    // If it's our custom PerformanceTestError, use the embedded performance data
    if (error instanceof PerformanceTestError) {
      performanceData = error.performanceData;
    } else if (
      error instanceof Error &&
      error.message.includes('Performance test failed')
    ) {
      // Fallback: Extract performance time from error message (temporary console.warn)
      const timeMatch = error.message.match(/Total time \((\d+)ms\)/);
      const thresholdMatch = error.message.match(
        /maximum acceptable time \((\d+)ms\)/,
      );

      if (timeMatch) {
        performanceData.totalTime = parseInt(timeMatch[1], 10);
      }
      if (thresholdMatch) {
        performanceData.thresholds = {
          totalTime: parseInt(thresholdMatch[1], 10),
        };
      }
    }

    const testResult: TestResult = {
      testName,
      userProfile,
      platform: this.testSuiteResults.platform,
      totalTime: this.msToSeconds(performanceData.totalTime || duration),
      status: 'FAILED',
      error: error instanceof Error ? error.message : String(error),
      timestamp: new Date().toISOString(),
      thresholds: {
        totalTime: this.msToSeconds(performanceData.thresholds?.totalTime || 0),
      },
    };

    this.testSuiteResults.results.push(testResult);
    this.testSuiteResults.failedTests++;
    this.testSuiteResults.totalTests++;
  }

  /**
   * Save test results to JSON file
   */
  private saveTestResults(): void {
    const performanceDir = path.join(__dirname, '..', 'specs', 'performance');
    const reportsDir = path.join(performanceDir, 'reports');
    const outputFile = path.join(
      reportsDir,
      `${this.testSuiteResults.suiteName
        .toLowerCase()
        .replace(/\s+/g, '-')}-performance-results.json`,
    );

    try {
      // Ensure reports directory exists
      if (!fs.existsSync(reportsDir)) {
        fs.mkdirSync(reportsDir, { recursive: true });
      }

      fs.writeFileSync(
        outputFile,
        JSON.stringify(this.testSuiteResults, null, 2),
      );
      console.warn(`📊 Test results saved to: ${outputFile}`);
    } catch (error) {
      console.error(`Failed to save test results: ${error}`);
    }
  }

  /**
   * Get current test suite results
   */
  getTestSuiteResults(): TestSuiteResults {
    return this.testSuiteResults;
  }
}

/**
 * Helper function to create test iterations for different user profiles
 */
export const createUserProfileTests = (
  testName: string,
  testFunction: (userState: unknown) => Promise<Partial<TestResult>>,
  userStates: { name: string; state: unknown }[],
  reporter: PerformanceTestReporter,
) => {
  userStates.forEach(({ name, state }, index) => {
    it(`${testName} - ${name}`, async () => {
      // Use console.warn to ensure visibility in test output
      console.warn(
        `\n🚀 STARTING TEST BLOCK ${index + 1}/${
          userStates.length
        }: ${testName} - ${name}`,
      );
      console.warn(`📊 Test Details: ${testName} - ${name}`);
      console.warn(`⏰ Start Time: ${new Date().toISOString()}`);

      const startTime = Date.now();

      try {
        const result = await testFunction(state);
        const endTime = Date.now();
        const duration = endTime - startTime;

        // Add passed test result
        reporter.addPassedTest(testName, name, result, duration);

        console.warn(
          `TEST BLOCK ${index + 1}/${
            userStates.length
          } PASSED: ${testName} - ${name}`,
        );
        console.warn(`⏱️  Performance Time: ${result.totalTime}ms`);
        console.warn(`🏗️  Test Execution Duration: ${duration}ms`);
        console.warn(`⏰ End Time: ${new Date().toISOString()}`);
      } catch (error) {
        const endTime = Date.now();
        const duration = endTime - startTime;

        // For performance failures, try to extract actual measured time from error
        // This provides more accurate reporting than total test execution time
        reporter.addFailedTest(testName, name, error, duration);

        console.error(
          `TEST BLOCK ${index + 1}/${
            userStates.length
          } FAILED: ${testName} - ${name}`,
        );
        console.error(`🏗️  Test Execution Duration: ${duration}ms`);

        // Log the actual performance time if available
        if (error instanceof PerformanceTestError) {
          console.error(
            `⚡ Actual Performance Time: ${error.performanceData.totalTime}ms`,
          );
          console.error(
            `🎯 Performance Threshold: ${error.performanceData.thresholds?.totalTime}ms`,
          );
        } else if (
          error instanceof Error &&
          error.message.includes('Performance test failed')
        ) {
          const timeMatch = error.message.match(/Total time \((\d+)ms\)/);
          if (timeMatch) {
            console.error(`⚡ Actual Performance Time: ${timeMatch[1]}ms`);
          }
        }

        console.error(
          `💥 Error: ${error instanceof Error ? error.message : String(error)}`,
        );

        throw error;
      }
    });
  });
};
