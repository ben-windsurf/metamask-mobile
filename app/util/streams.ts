/* eslint-disable import/no-commonjs */
// eslint-disable-next-line @typescript-eslint/no-require-imports
const Through = require('through2');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const ObjectMultiplex = require('@metamask/object-multiplex');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const pump = require('pump');
import type { Duplex, Transform } from 'stream';

/**
 * Returns a stream transform that parses JSON strings passing through.
 * Each chunk is expected to be a serialized JSON string that will be parsed
 * and pushed to the output stream as a JavaScript object.
 *
 * @returns A stream transform that parses JSON strings
 */
function jsonParseStream(): Transform {
  return Through.obj(function (
    this: Transform,
    serialized: string,
    _: BufferEncoding,
    cb: () => void,
  ) {
    this.push(JSON.parse(serialized));
    cb();
  });
}

/**
 * Returns a stream transform that calls JSON.stringify on objects passing through.
 * Each chunk is expected to be a JavaScript object that will be serialized
 * and pushed to the output stream as a JSON string.
 *
 * @returns A stream transform that stringifies objects to JSON
 */
function jsonStringifyStream(): Transform {
  return Through.obj(function (
    this: Transform,
    obj: unknown,
    _: BufferEncoding,
    cb: () => void,
  ) {
    this.push(JSON.stringify(obj));
    cb();
  });
}

/**
 * Sets up stream multiplexing for the given stream.
 * Creates an ObjectMultiplex instance and pumps data between
 * the connection stream and the multiplexer.
 *
 * @param connectionStream - The stream to multiplex
 * @returns The multiplexed stream instance
 */
function setupMultiplex(connectionStream: Duplex): typeof ObjectMultiplex {
  const mux = new ObjectMultiplex();
  pump(connectionStream, mux as unknown as Duplex, connectionStream, (err?: Error | null) => {
    if (err) {
      console.warn(err);
    }
  });
  return mux;
}

export { jsonParseStream, jsonStringifyStream, setupMultiplex };
