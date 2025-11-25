import { jsonParseStream, jsonStringifyStream, setupMultiplex } from './streams';
import Through from 'through2';
import ObjectMultiplex from '@metamask/object-multiplex';
import pump from 'pump';
import { Duplex, PassThrough } from 'stream';

// Mock dependencies
jest.mock('through2', () => ({
  obj: jest.fn((callback) => {
    const mockStream = {
      push: jest.fn(),
      _transform: callback,
    };
    return mockStream;
  }),
}));

jest.mock('@metamask/object-multiplex', () =>
  jest.fn().mockImplementation(() => ({
    createStream: jest.fn(),
  })),
);

jest.mock('pump', () => jest.fn());

describe('streams utility', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('jsonParseStream', () => {
    it('should create a through2 object stream', () => {
      jsonParseStream();
      expect(Through.obj).toHaveBeenCalled();
    });

    it('should parse JSON strings and push parsed objects', () => {
      const stream = jsonParseStream();
      const mockPush = jest.fn();
      const mockCallback = jest.fn();

      // Simulate the transform function
      const transformFn = (Through.obj as jest.Mock).mock.calls[0][0];
      const context = { push: mockPush };

      const testObject = { key: 'value', number: 42 };
      const serialized = JSON.stringify(testObject);

      transformFn.call(context, serialized, 'utf8', mockCallback);

      expect(mockPush).toHaveBeenCalledWith(testObject);
      expect(mockCallback).toHaveBeenCalled();
    });

    it('should handle nested JSON objects', () => {
      jsonParseStream();
      const mockPush = jest.fn();
      const mockCallback = jest.fn();

      const transformFn = (Through.obj as jest.Mock).mock.calls[0][0];
      const context = { push: mockPush };

      const nestedObject = {
        level1: {
          level2: {
            value: 'deep',
          },
        },
      };
      const serialized = JSON.stringify(nestedObject);

      transformFn.call(context, serialized, 'utf8', mockCallback);

      expect(mockPush).toHaveBeenCalledWith(nestedObject);
    });

    it('should handle JSON arrays', () => {
      jsonParseStream();
      const mockPush = jest.fn();
      const mockCallback = jest.fn();

      const transformFn = (Through.obj as jest.Mock).mock.calls[0][0];
      const context = { push: mockPush };

      const testArray = [1, 2, 3, 'four', { five: 5 }];
      const serialized = JSON.stringify(testArray);

      transformFn.call(context, serialized, 'utf8', mockCallback);

      expect(mockPush).toHaveBeenCalledWith(testArray);
    });

    it('should throw on invalid JSON', () => {
      jsonParseStream();
      const mockPush = jest.fn();
      const mockCallback = jest.fn();

      const transformFn = (Through.obj as jest.Mock).mock.calls[0][0];
      const context = { push: mockPush };

      expect(() => {
        transformFn.call(context, 'invalid json {', 'utf8', mockCallback);
      }).toThrow();
    });
  });

  describe('jsonStringifyStream', () => {
    it('should create a through2 object stream', () => {
      jsonStringifyStream();
      expect(Through.obj).toHaveBeenCalled();
    });

    it('should stringify objects and push JSON strings', () => {
      jsonStringifyStream();
      const mockPush = jest.fn();
      const mockCallback = jest.fn();

      const transformFn = (Through.obj as jest.Mock).mock.calls[0][0];
      const context = { push: mockPush };

      const testObject = { key: 'value', number: 42 };

      transformFn.call(context, testObject, 'utf8', mockCallback);

      expect(mockPush).toHaveBeenCalledWith(JSON.stringify(testObject));
      expect(mockCallback).toHaveBeenCalled();
    });

    it('should handle nested objects', () => {
      jsonStringifyStream();
      const mockPush = jest.fn();
      const mockCallback = jest.fn();

      const transformFn = (Through.obj as jest.Mock).mock.calls[0][0];
      const context = { push: mockPush };

      const nestedObject = {
        level1: {
          level2: {
            value: 'deep',
          },
        },
      };

      transformFn.call(context, nestedObject, 'utf8', mockCallback);

      expect(mockPush).toHaveBeenCalledWith(JSON.stringify(nestedObject));
    });

    it('should handle arrays', () => {
      jsonStringifyStream();
      const mockPush = jest.fn();
      const mockCallback = jest.fn();

      const transformFn = (Through.obj as jest.Mock).mock.calls[0][0];
      const context = { push: mockPush };

      const testArray = [1, 2, 3, 'four', { five: 5 }];

      transformFn.call(context, testArray, 'utf8', mockCallback);

      expect(mockPush).toHaveBeenCalledWith(JSON.stringify(testArray));
    });

    it('should handle null values', () => {
      jsonStringifyStream();
      const mockPush = jest.fn();
      const mockCallback = jest.fn();

      const transformFn = (Through.obj as jest.Mock).mock.calls[0][0];
      const context = { push: mockPush };

      transformFn.call(context, null, 'utf8', mockCallback);

      expect(mockPush).toHaveBeenCalledWith('null');
    });

    it('should handle primitive values', () => {
      jsonStringifyStream();
      const mockPush = jest.fn();
      const mockCallback = jest.fn();

      const transformFn = (Through.obj as jest.Mock).mock.calls[0][0];
      const context = { push: mockPush };

      transformFn.call(context, 'string', 'utf8', mockCallback);
      expect(mockPush).toHaveBeenCalledWith('"string"');

      transformFn.call(context, 42, 'utf8', mockCallback);
      expect(mockPush).toHaveBeenCalledWith('42');

      transformFn.call(context, true, 'utf8', mockCallback);
      expect(mockPush).toHaveBeenCalledWith('true');
    });
  });

  describe('setupMultiplex', () => {
    it('should create an ObjectMultiplex instance', () => {
      const mockStream = new PassThrough() as unknown as Duplex;
      setupMultiplex(mockStream);

      expect(ObjectMultiplex).toHaveBeenCalled();
    });

    it('should call pump with connection stream and mux', () => {
      const mockStream = new PassThrough() as unknown as Duplex;
      setupMultiplex(mockStream);

      expect(pump).toHaveBeenCalled();
      const pumpCall = (pump as jest.Mock).mock.calls[0];
      expect(pumpCall[0]).toBe(mockStream);
      expect(pumpCall[2]).toBe(mockStream);
    });

    it('should return the multiplexed stream', () => {
      const mockStream = new PassThrough() as unknown as Duplex;
      const result = setupMultiplex(mockStream);

      expect(result).toBeDefined();
    });

    it('should log warning on pump error', () => {
      const mockStream = new PassThrough() as unknown as Duplex;
      const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();

      setupMultiplex(mockStream);

      // Get the error callback passed to pump
      const pumpCall = (pump as jest.Mock).mock.calls[0];
      const errorCallback = pumpCall[3];

      // Simulate an error
      const testError = new Error('Test pump error');
      errorCallback(testError);

      expect(consoleWarnSpy).toHaveBeenCalledWith(testError);

      consoleWarnSpy.mockRestore();
    });

    it('should not log warning when no error occurs', () => {
      const mockStream = new PassThrough() as unknown as Duplex;
      const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();

      setupMultiplex(mockStream);

      // Get the error callback passed to pump
      const pumpCall = (pump as jest.Mock).mock.calls[0];
      const errorCallback = pumpCall[3];

      // Call with no error
      errorCallback(null);

      expect(consoleWarnSpy).not.toHaveBeenCalled();

      consoleWarnSpy.mockRestore();
    });
  });
});
