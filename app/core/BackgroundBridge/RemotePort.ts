// eslint-disable-next-line import/no-nodejs-modules, import/no-commonjs, @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports
const EventEmitter = require('events').EventEmitter;

/**
 * RemotePort class that extends EventEmitter to provide message passing capabilities
 * for communication between different contexts in the MetaMask mobile application.
 * Used primarily for bridging communication between the main app and WebView contexts.
 */
class RemotePort extends EventEmitter {
  /**
   * Creates a new RemotePort instance.
   *
   * @param sendMessage - Function to send messages through the port
   */
  constructor(sendMessage: () => void) {
    super();
    this.sendMessage = sendMessage;
  }

  /**
   * Posts a message through the remote port.
   *
   * @param msg - The message to send through the port
   */
  // TODO: Replace "any" with type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  postMessage = (msg: any) => {
    this.sendMessage(msg);
  };
}

export default RemotePort;
