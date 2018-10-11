import 'jest';
import { Bridge } from '../src/lib/bridge';
import { WindowPostMessageProxy } from '../src/lib/windowPostMessageProxy';

jest.mock('../src/lib/windowPostMessageProxy');

test('We can send a command and params to the window parent', async () => {
  let bridge = new Bridge(() => {});
  let sanitize = params => (params ? params : []);

  const CASES = [null, [], [1], ['a', { a: 1 }]];
  const COMMAND = 'my-awesome-command';

  CASES.forEach(async params => await bridge.post(COMMAND, params));

  // Make sure that WindowPostMessageProxy has been constructed
  expect(WindowPostMessageProxy).toHaveBeenCalledTimes(1);

  // Make sure .postMessage has been called CASES times
  const wpmpInstance = (WindowPostMessageProxy as any).mock.instances[0];
  expect(wpmpInstance.postMessage).toHaveBeenCalledTimes(CASES.length);
  
  CASES.forEach(params => {
    expect(wpmpInstance.postMessage).toHaveBeenCalledWith(window.parent, {
      command: COMMAND,
      params: sanitize(params)
    });
  });
});