import CryptoJS from 'crypto-js';

/**
 * Generates a random number within a specified range using cryptographically secure random bytes.
 * @returns A random number between 0 and 999
 */
function generateRandomNumber() {
  const range = 1000;
  const randomBytes = CryptoJS.lib.WordArray.random(range);
  const randomNumber = randomBytes.words[0] % range;
  return randomNumber;
}

/**
 * Serializes an error object into a plain object for transmission or storage.
 * @param error - The error object to serialize
 * @returns A serialized representation of the error with all enumerable properties
 */
// TODO: Replace "any" with type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function serializeError(error: any) {
  const serialized: Record<string, unknown> = {};
  Object.getOwnPropertyNames(error).forEach((key) => {
    serialized[key] = error[key];
  });
  return serialized;
}

/**
 * Deserializes a plain object back into an Error object.
 * @param data - The serialized error data containing message and other properties
 * @returns A reconstructed Error object with all original properties
 */
// TODO: Replace "any" with type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function deserializeError(data: any) {
  // TODO: Replace "any" with type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const error: any = new Error(data.message);
  Object.getOwnPropertyNames(data).forEach((key) => {
    error[key] = data[key];
  });
  return error;
}

/**
 * Enhances an invoke object with async function definition and binding capabilities.
 * Provides utilities for creating asynchronous function calls across different contexts
 * with proper error handling and serialization.
 * @param invoke - The invoke object to enhance with async capabilities
 * @returns The enhanced invoke object with defineAsync and bindAsync methods
 */
// TODO: Replace "any" with type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default (invoke: any) => {
  // TODO: Replace "any" with type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  invoke.defineAsync = (name: string, func: (...args: any) => Promise<any>) => {
    const resolveCallback = invoke.bind(`${name}_resolve`);
    const rejectCallback = invoke.bind(`${name}_reject`);

    // TODO: Replace "any" with type
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    invoke.define(`${name}_trigger`, ({ id, args }: any) => {
      func(...args)
        // TODO: Replace "any" with type
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .then((...args2: any[]) => resolveCallback({ id, args: args2 }))
        .catch((e: Error) => rejectCallback({ id, error: serializeError(e) }));
    });
  };

  invoke.bindAsync = (name: string) => {
    // TODO: Replace "any" with type
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const callbacks: Record<any, any> = {};
    const trigger = invoke.bind(`${name}_trigger`);

    // TODO: Replace "any" with type
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    invoke.define(`${name}_resolve`, ({ id, args }: any) => {
      const { resolve } = callbacks[id];
      delete callbacks[id];
      resolve(...args);
    });

    // TODO: Replace "any" with type
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    invoke.define(`${name}_reject`, ({ id, error }: any) => {
      const { reject } = callbacks[id];
      delete callbacks[id];
      reject(deserializeError(error));
    });

    // TODO: Replace "any" with type
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (...args: any) => {
      const id = generateRandomNumber();
      return new Promise((resolve, reject) => {
        callbacks[id] = { resolve, reject };
        trigger({ id, args }).catch(reject);
      });
    };
  };
};
