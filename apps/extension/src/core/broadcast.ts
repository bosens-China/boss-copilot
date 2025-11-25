/*
 * 发布/订阅，把url的请求进行广播，然后让后续的步骤进行处理。
 */

type urlType = string | RegExp;

type Callback = (url: string, data: any) => void;
class Broadcast {
  private subscriptions: Map<urlType, Set<Callback>> = new Map();

  // 发布
  publish(responseURL: string, data: any) {
    for (const [url, callbackArr] of this.subscriptions) {
      if (typeof url === 'string' && responseURL.includes(url)) {
        callbackArr.forEach((callback) => callback(responseURL, data));
      } else if (url instanceof RegExp && url.test(responseURL)) {
        callbackArr.forEach((callback) => callback(responseURL, data));
      }
    }
  }

  subscribe(url: urlType, callback: Callback) {
    if (this.subscriptions.has(url)) {
      this.subscriptions.get(url)?.add(callback);
    } else {
      this.subscriptions.set(url, new Set([callback]));
    }
  }
}

export const broadcast = new Broadcast();
