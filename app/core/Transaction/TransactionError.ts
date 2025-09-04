/**
 * Base error class for transaction-related errors in MetaMask Mobile.
 * Extends the native Error class with proper prototype chain setup.
 */
class TransactionError extends Error {
  /**
   * Creates a new TransactionError instance.
   * @param message - The error message describing what went wrong
   */
  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, TransactionError.prototype);

    this.name = this.constructor.name;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

/**
 * Error thrown when a transaction approval operation fails.
 * Used to indicate issues during the transaction approval process.
 */
class ApproveTransactionError extends TransactionError {}

/**
 * Error thrown when a transaction cancellation operation fails.
 * Used to indicate issues during the transaction cancellation process.
 */
class CancelTransactionError extends TransactionError {}

/**
 * Error thrown when a transaction speed-up operation fails.
 * Used to indicate issues during the transaction speed-up process.
 */
class SpeedupTransactionError extends TransactionError {}

export {
  TransactionError,
  CancelTransactionError,
  ApproveTransactionError,
  SpeedupTransactionError,
};
