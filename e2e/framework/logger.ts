/**
 * Log levels for controlling logging output verbosity.
 * Lower numeric values indicate higher priority/severity.
 */
export enum LogLevel {
  /** Critical errors that require immediate attention */
  ERROR = 0,
  /** Warning messages for potentially problematic situations */
  WARN = 1,
  /** General informational messages */
  INFO = 2,
  /** Detailed debugging information */
  DEBUG = 3,
  /** Most verbose tracing information */
  TRACE = 4,
}

/**
 * Configuration options for creating a Logger instance.
 */
export interface LoggerOptions {
  /** Custom prefix to display in log messages */
  prefix?: string;
  /** Whether to enable colored output (default: true) */
  colors?: boolean;
  /** Name identifier for the logger instance */
  name?: string;
}

/**
 * A configurable logger class for E2E test framework with support for
 * different log levels, colored output, and custom formatting.
 *
 * @example
 * ```typescript
 * const logger = new Logger({ name: 'TestSuite', prefix: 'E2E' });
 * logger.info('Test started');
 * logger.error('Test failed', error);
 * ```
 */
export class Logger {
  private level: LogLevel;
  private prefix: string;
  private colors: boolean;
  private name: string;

  // ANSI color codes
  private readonly colorCodes = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    dim: '\x1b[2m',

    // Foreground colors
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',
    gray: '\x1b[90m',

    // Background colors
    bgRed: '\x1b[41m',
    bgGreen: '\x1b[42m',
    bgYellow: '\x1b[43m',
    bgBlue: '\x1b[44m',
    bgMagenta: '\x1b[45m',
    bgCyan: '\x1b[46m',
  };

  /**
   * Creates a new Logger instance with the specified options.
   *
   * @param options - Configuration options for the logger
   */
  constructor(options: LoggerOptions = {}) {
    this.name = options.name || '';
    this.prefix = options.prefix || 'E2E Framework';
    this.colors = options.colors !== false;

    // We're purposefully setting this to debug while improving the e2e framework
    const envLevel: string = 'debug';
    switch (envLevel) {
      case 'error':
        this.level = LogLevel.ERROR;
        break;
      case 'warn':
      case 'warning':
        this.level = LogLevel.WARN;
        break;
      case 'info':
        this.level = LogLevel.INFO;
        break;
      case 'debug':
        this.level = LogLevel.DEBUG;
        break;
      case 'trace':
        this.level = LogLevel.TRACE;
        break;
      default:
        this.level = LogLevel.WARN; // Default to WARN level
    }
  }

  /**
   * Applies ANSI color codes to text if colors are enabled.
   *
   * @param text - The text to colorize
   * @param color - The color to apply
   * @returns The colorized text or original text if colors are disabled
   */
  private colorize(text: string, color: keyof typeof this.colorCodes): string {
    if (!this.colors) return text;
    return `${this.colorCodes[color]}${text}${this.colorCodes.reset}`;
  }

  /**
   * Formats a log message with level, prefix, and name information.
   *
   * @param level - The log level string
   * @param message - The message to format
   * @param color - The color to apply to the level indicator
   * @returns The formatted message string
   */
  private formatMessage(
    level: string,
    message: string,
    color: keyof typeof this.colorCodes,
  ): string {
    const levelStr = this.colorize(`[${level.toUpperCase()}]`, color);
    const prefixStr = this.colorize(`[${this.prefix}]`, 'cyan');
    const nameStr = this.colorize(`[${this.name}]`, 'gray');

    return `${prefixStr} ${levelStr}${
      this.name !== '' ? ` ${nameStr}` : ''
    } ${message}`;
  }

  /**
   * Internal logging method that handles level filtering and message formatting.
   *
   * @param level - The numeric log level
   * @param levelName - The string representation of the log level
   * @param color - The color to apply to the level indicator
   * @param message - The message to log
   * @param args - Additional arguments to pass to console.log
   */
  private log(
    level: LogLevel,
    levelName: string,
    color: keyof typeof this.colorCodes,
    message: string,
    ...args: unknown[]
  ): void {
    if (level > this.level) return;

    const formattedMessage = this.formatMessage(levelName, message, color);
    console.log(formattedMessage, ...args);
  }

  /**
   * Logs an error message.
   *
   * @param message - The error message to log
   * @param args - Additional arguments to include in the log
   */
  error(message: string, ...args: unknown[]): void {
    this.log(LogLevel.ERROR, 'error', 'red', message, ...args);
  }

  /**
   * Logs a warning message.
   *
   * @param message - The warning message to log
   * @param args - Additional arguments to include in the log
   */
  warn(message: string, ...args: unknown[]): void {
    this.log(LogLevel.WARN, 'warn', 'yellow', message, ...args);
  }

  info(message: string, ...args: unknown[]): void {
    this.log(LogLevel.INFO, 'info', 'blue', message, ...args);
  }

  debug(message: string, ...args: unknown[]): void {
    this.log(LogLevel.DEBUG, 'debug', 'green', message, ...args);
  }

  trace(message: string, ...args: unknown[]): void {
    this.log(LogLevel.TRACE, 'trace', 'magenta', message, ...args);
  }

  // Convenience method for success messages
  success(message: string, ...args: unknown[]): void {
    if (LogLevel.INFO > this.level) return;
    const formattedMessage = this.formatMessage('success', message, 'green');
    console.log(formattedMessage, ...args);
  }

  // Method to check if a level is enabled
  isLevelEnabled(level: LogLevel): boolean {
    return level <= this.level;
  }

  // Get current log level
  getLevel(): LogLevel {
    return this.level;
  }

  // Set log level programmatically
  setLevel(level: LogLevel): void {
    this.level = level;
  }
}

export const logger = new Logger();

export function createLogger(options: LoggerOptions): Logger {
  return new Logger(options);
}
