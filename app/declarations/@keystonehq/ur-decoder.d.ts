import { UR } from '@ngraveio/bc-ur';

/**
 * Decoder for Uniform Resources (UR) registry format used in QR code communication.
 * Handles progressive decoding of multi-part UR data streams from QR codes.
 */
class URRegistryDecoder {
  private progress: number;
  private error: boolean;
  private errorMessage: string;
  private success: boolean;
  private ur: UR | null;

  /**
   * Creates a new URRegistryDecoder instance.
   * Initializes the decoder with default state values.
   */
  constructor() {
    this.progress = 0;
    this.error = false;
    this.errorMessage = '';
    this.success = false;
    this.ur = null;
  }

  /**
   * Gets the current decoding progress as a percentage.
   * @returns The progress value between 0 and 100
   */
  getProgress = (): number => this.progress;

  /**
   * Receives and processes a part of the UR data stream.
   * @param content - The content part to be processed
   */
  receivePart = (content: unknown): void => {
    // eslint-disable-next-line no-empty
    if (content) {
    }
    // Implementation for receiving a part of the UR
  };

  /**
   * Checks if an error occurred during decoding.
   * @returns True if an error occurred, false otherwise
   */
  isError = (): boolean => this.error;

  /**
   * Gets the error message if an error occurred.
   * @returns The error message string
   */
  resultError = (): string => this.errorMessage;

  /**
   * Checks if the decoding was successful.
   * @returns True if decoding completed successfully, false otherwise
   */
  isSuccess = (): boolean => this.success;

  /**
   * Gets the decoded UR result.
   * @returns The decoded UR object
   * @throws Error if UR is not available or decoding failed
   */
  resultUR = (): UR => {
    if (this.ur === null) {
      throw new Error('UR is not available');
    }
    return this.ur;
  };
}

export { URRegistryDecoder };
