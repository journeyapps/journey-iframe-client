import { WindowPostMessageProxy } from './windowPostMessageProxy';

export interface PostMessage {
  command: string;
  params: any[];
}

export interface PostMessageResponse {
  result: any;
  windowPostMessageProxy?: any; // Added by windowPostMessageProxy
}

export class Bridge {
  private proxy: WindowPostMessageProxy;
  private target: Window;
  constructor(onMessageReceive: any) {
    this.proxy = new WindowPostMessageProxy();
    this.target = window.parent;
    this.proxy.addHandler({
      test: event => {
        return event.source === window.parent;
      },
      handle: event => {
        return onMessageReceive(event.data);
      }
    });
  }
  private async _post(message: PostMessage) {
    return this.proxy.postMessage<PostMessageResponse>(this.target, message);
  }
  async post(command: string, params: any[] = [], options = {}) {
    return this._post({
      command: command,
      params,
      options
    });
  }
}
