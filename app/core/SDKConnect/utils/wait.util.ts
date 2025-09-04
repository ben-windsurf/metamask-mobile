import { KeyringController } from '@metamask/keyring-controller';
import { DappClient } from '../AndroidSDK/dapp-sdk-types';
import RPCQueueManager from '../RPCQueueManager';
import { SDKConnect } from '../SDKConnect';
import DevLogger from './DevLogger';
import { Connection } from '../Connection';
import { isE2E } from '../../../util/test/utils';
import { store } from '../../../../app/store/index';

/** Maximum number of iterations for queue loops before timing out */
export const MAX_QUEUE_LOOP = Infinity;

/**
 * Creates a promise that resolves after a specified delay
 * @param ms - The number of milliseconds to wait
 * @returns A promise that resolves after the specified delay
 */
export const wait = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

/**
 * Waits for a client with the specified ID to become ready in the connected clients map
 * @param id - The client ID to wait for
 * @param connectedClients - Map of connected clients by their IDs
 * @param waitTime - Time to wait between checks in milliseconds (default: 200)
 */
export const waitForReadyClient = async (
  id: string,
  connectedClients: {
    [clientId: string]: DappClient;
  },
  waitTime = 200,
) => {
  let i = 0;
  while (!connectedClients[id]) {
    i += 1;
    if (i++ > MAX_QUEUE_LOOP) {
      console.warn(`RPC queue not empty after ${MAX_QUEUE_LOOP} seconds`);
      break;
    }
    await wait(waitTime);
  }
};

/**
 * Asynchronously waits for a given condition to return true by periodically executing
 * a provided function. This can be useful for delaying subsequent code execution until
 * a certain condition is met, such as waiting for a resource to become available.
 *
 * @param {Object} params - Configuration object for the wait condition.
 * @param {Function} params.fn - A function that returns a boolean, indicating whether the desired condition is met.
 * This function is polled repeatedly until it returns true.
 * @param {number} [params.waitTime=1000] - The time to wait between each poll of `fn`, in milliseconds.
 * Defaults to 1000ms (1 second) if not specified.
 * @param {string} [params.context] - Optional context information to be used in logging messages.
 * If provided, it will be included in log outputs for diagnostic purposes, particularly when the
 * function has been polled more than 5 times and on every tenth poll thereafter without the condition being met.
 */
export const waitForCondition = async ({
  fn,
  context,
  waitTime = 1000,
}: {
  fn: () => boolean;
  waitTime?: number;
  context?: string;
}) => {
  let i = 0;
  while (!fn()) {
    i += 1;
    if (i > 5 && i % 10 === 0) {
      DevLogger.log(`Waiting for fn context=${context} to return true`);
    }
    await wait(waitTime);
  }
};

/**
 * Similar to `waitForCondition`, but for asynchronous conditions that return a promise.
 * Repeatedly polls an async function until it returns true.
 * @param params - Configuration object for the async wait condition
 * @param params.fn - An async function that returns a boolean promise
 * @param params.context - Optional context information for logging
 * @param params.waitTime - Time to wait between polls in milliseconds (default: 1000)
 */
export const waitForAsyncCondition = async ({
  fn,
  context,
  waitTime = 1000,
}: {
  fn: () => Promise<boolean>;
  waitTime?: number;
  context?: string;
}) => {
  let i = 0;
  while (!(await fn())) {
    i += 1;
    if (i > 5 && i % 10 === 0) {
      DevLogger.log(`Waiting for fn context=${context} to return true`);
    }
    await wait(waitTime);
  }
};

/**
 * Waits for a connection to reach ready state
 * @param params - Configuration object
 * @param params.connection - The connection to wait for
 * @param params.waitTime - Time to wait between checks in milliseconds (default: 1000)
 * @throws Error if connection timeout occurs
 */
export const waitForConnectionReadiness = async ({
  connection,
  waitTime = 1000,
}: {
  connection: Connection;
  waitTime?: number;
}) => {
  let i = 0;
  while (!connection.isReady) {
    i += 1;
    if (i > MAX_QUEUE_LOOP) {
      throw new Error('Connection timeout - ready state not received');
    }
    await wait(waitTime);
  }
};

/**
 * Waits for the keychain to be unlocked by polling the keyring controller
 * @param params - Configuration object
 * @param params.keyringController - The keyring controller to check unlock status
 * @param params.context - Optional context information for logging
 * @param params.waitTime - Time to wait between checks in milliseconds (default: 1000)
 * @returns Promise that resolves to true when keychain is unlocked
 */
export const waitForKeychainUnlocked = async ({
  context,
  keyringController,
  waitTime = 1000,
}: {
  keyringController: KeyringController;
  context?: string;
  waitTime?: number;
}) => {
  // Disable during e2e tests otherwise Detox fails
  if (isE2E) {
    return true;
  }

  let i = 1;
  if (!keyringController) {
    console.warn('Keyring controller not found');
  }

  let unlocked = keyringController.isUnlocked();
  DevLogger.log(
    `wait:: waitForKeyChainUnlocked[${context}] unlocked: ${unlocked}`,
  );
  while (!unlocked) {
    await wait(waitTime);
    if (i % 5 === 0) {
      DevLogger.log(
        `SDKConnect [${context}] Waiting for keychain unlock... attempt ${i}`,
      );
    }
    unlocked = keyringController.isUnlocked();
    i += 1;
  }

  return unlocked;
};

/**
 * Waits for the user to be logged in by checking the Redux store state
 * @param params - Configuration object
 * @param params.context - Optional context information for logging
 * @param params.waitTime - Time to wait between checks in milliseconds (default: 1000)
 * @returns Promise that resolves to true when user is logged in
 */
export const waitForUserLoggedIn = async ({
  context,
  waitTime = 1000,
}: {
  waitTime?: number;
  context?: string;
}) => {
  let i = 1;

  // Disable during e2e tests otherwise Detox fails
  if (isE2E) {
    return true;
  }

  const state = store.getState();
  let isLoggedIn = state.user.userLoggedIn ?? false;

  DevLogger.log(
    `wait:: waitForUserLoggedIn[${context}] isLoggedIn: ${isLoggedIn}`,
  );
  while (!isLoggedIn) {
    await wait(waitTime);
    if (i % 60 === 0) {
      DevLogger.log(
        `[wait.util] [${context}] Waiting for userLoggedIn... attempt ${i}`,
      );
    }
    isLoggedIn = state.user.userLoggedIn ?? false;
    i += 1;
  }

  return isLoggedIn;
};

export const waitForAndroidServiceBinding = async (waitTime = 500) => {
  let i = 1;
  while (SDKConnect.getInstance().isAndroidSDKBound() === false) {
    await wait(waitTime);
    i += 1;
    if (i > 5 && i % 10 === 0) {
      console.warn(`Waiting for Android service binding...`);
    }
  }
};

export const waitForEmptyRPCQueue = async (
  manager: RPCQueueManager,
  waitTime = 1000,
) => {
  let i = 0;
  let queue = Object.keys(manager.get());
  while (queue.length > 0) {
    queue = Object.keys(manager.get());
    if (i++ > MAX_QUEUE_LOOP) {
      console.warn(`RPC queue not empty after ${MAX_QUEUE_LOOP} seconds`);
      break;
    }
    await wait(waitTime);
  }
};
