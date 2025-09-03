import {
  DecodingData,
  DecodingDataStateChange,
} from '@metamask/signature-controller';

enum DecodingResponseType {
  Change = 'CHANGE',
  NoChange = 'NO_CHANGE',
  Loading = 'decoding_in_progress',
}

/**
 * Generates event properties for signature decoding metrics tracking
 * Extracts relevant data from signature decoding results for analytics purposes
 * @param {DecodingData | undefined} decodingData - The decoded signature data containing state changes and errors
 * @param {boolean} decodingLoading - Whether the decoding process is currently in progress
 * @param {boolean} isDecodingAPIEnabled - Whether the decoding API feature is enabled (default: false)
 * @returns {Object} Event properties object containing decoding metrics data
 */
export const getSignatureDecodingEventProps = (
  decodingData: DecodingData | undefined,
  decodingLoading: boolean,
  isDecodingAPIEnabled: boolean = false,
) => {
  if (!isDecodingAPIEnabled || !decodingData) {
    return {};
  }

  const { stateChanges, error } = decodingData;

  const changeTypes = (stateChanges ?? []).map(
    (change: DecodingDataStateChange) => change.changeType,
  );

  const responseType =
    error?.type ??
    (changeTypes.length
      ? DecodingResponseType.Change
      : DecodingResponseType.NoChange);

  return {
    decoding_change_types: changeTypes,
    decoding_description: decodingData?.error?.message ?? null,
    decoding_response: decodingLoading
      ? DecodingResponseType.Loading
      : responseType,
  };
};
