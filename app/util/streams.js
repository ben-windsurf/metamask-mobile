import Through from 'through2';
import ObjectMultiplex from '@metamask/object-multiplex';
import pump from 'pump';

/**
 * Returns a stream transform that parses JSON strings passing through
 * @return {stream.Transform}
 */
const jsonParseStream = () =>
  Through.obj(function (serialized, _, cb) {
    this.push(JSON.parse(serialized));
    cb();
  });

/**
 * Returns a stream transform that calls {@code JSON.stringify}
 * on objects passing through
 * @return {stream.Transform} the stream transform
 */
const jsonStringifyStream = () =>
  Through.obj(function (obj, _, cb) {
    this.push(JSON.stringify(obj));
    cb();
  });

/**
 * Sets up stream multiplexing for the given stream
 * @param {any} connectionStream - the stream to mux
 * @return {stream.Stream} the multiplexed stream
 */
const setupMultiplex = (connectionStream) => {
  const mux = new ObjectMultiplex();
  pump(connectionStream, mux, connectionStream, (err) => {
    if (err) {
      console.warn(err);
    }
  });
  return mux;
};

export { jsonParseStream, jsonStringifyStream, setupMultiplex };
