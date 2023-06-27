import { Bridge, PostMessage, PostMessageResponse } from './bridge';

export default class JourneyIFrameClient {
  private bridge: Bridge;
  private callbacks: {};
  constructor() {
    this.bridge = new Bridge(
      (message: PostMessage): PostMessageResponse => {
        let command = message.command;
        return {
          result: this.callbacks[command].apply(this, message.params)
        };
      }
    );
    this.callbacks = {};
  }
  async post(expression: string, ...params: any[]) {
    return this._performPost(expression, params);
  }
  async postNonBlocking(expression: string, ...params: any[]) {
    return this._performPost(expression, params, {
      nonBlocking: true
    });
  }
  async _performPost(expression: string, params: any[] = [], options = {}) {
    try {
      return (await this.bridge.post(expression, params, options)).result;
    } catch (e) {
      if (e.error) {
        // Journey error. Strip windowPostMessageProxy info and return
        return Promise.reject(e.message);
      }
      return Promise.reject(e);
    }
  }

  on(command: string, cb: (message) => any) {
    this.callbacks[command] = cb;
    return () => {
      delete this.callbacks[command];
    }
  }
}
