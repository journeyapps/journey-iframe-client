import 'jest';
import JourneyIFrameClient from '../src/lib/client';
import { Bridge } from '../src/lib/bridge';

jest.mock('../src/lib/bridge');

describe('client.post', () => {
  let client;
  let bridgeInstance;
  const MOCK_RESULT = 'result';
  const COMMAND_NAME = 'my-awesome-command';
  beforeEach(() => {
    (Bridge as any).mockClear();
    client = new JourneyIFrameClient();
    bridgeInstance = (Bridge as any).mock.instances[0];
    // Mock the return value for bridge (using mockResolvedValue to wrap it in a promise)
    bridgeInstance.post.mockResolvedValue({ result: MOCK_RESULT });
  });

  describe('Blocking', () => {
    test('should post correctly with 0 parameters', async () => {
      let result = await client.post(COMMAND_NAME);

      expect(result).toBe(MOCK_RESULT);
      expect(bridgeInstance.post).toBeCalledWith(COMMAND_NAME, [], {});
    });

    test('should post correctly with 1 parameter', async () => {
      let result = await client.post(COMMAND_NAME, 'param1');

      expect(result).toBe(MOCK_RESULT);
      expect(bridgeInstance.post).toBeCalledWith(COMMAND_NAME, ['param1'], {});
    });

    test('should post correctly with 2 parameters', async () => {
      let result = await client.post(COMMAND_NAME, 'param1', 'param2');

      expect(result).toBe(MOCK_RESULT);
      expect(bridgeInstance.post).toBeCalledWith(
        COMMAND_NAME,
        ['param1', 'param2'],
        {}
      );
    });
  });
  describe('Non-blocking', () => {
    test('should post correctly with 0 parameters', async () => {
      let result = await client.postNonBlocking(COMMAND_NAME);

      expect(result).toBe(MOCK_RESULT);
      expect(bridgeInstance.post).toBeCalledWith(COMMAND_NAME, [], {
        nonBlocking: true
      });
    });

    test('should post correctly with 1 parameter', async () => {
      let result = await client.postNonBlocking(COMMAND_NAME, 'param1');

      expect(result).toBe(MOCK_RESULT);
      expect(bridgeInstance.post).toBeCalledWith(COMMAND_NAME, ['param1'], {
        nonBlocking: true
      });
    });

    test('should post correctly with 2 parameters', async () => {
      let result = await client.postNonBlocking(
        COMMAND_NAME,
        'param1',
        'param2'
      );

      expect(result).toBe(MOCK_RESULT);
      expect(bridgeInstance.post).toBeCalledWith(
        COMMAND_NAME,
        ['param1', 'param2'],
        { nonBlocking: true }
      );
    });
  });
});
