/*
 * 拦截xhr的请求，交给后续的步骤进行处理。
 */

import { broadcast } from './broadcast';

const NativeXHR = unsafeWindow.XMLHttpRequest;

const XHRProxy = new Proxy(NativeXHR, {
  construct(t, args: []) {
    const xhr = new t(...args);

    xhr.addEventListener('load', function (this: XMLHttpRequest) {
      const url = this.responseURL;
      const type = this.responseType;
      let data: unknown = null;
      switch (type) {
        case '':
        case 'text':
          try {
            data = JSON.parse(this.responseText);
          } catch {
            data = this.responseText;
          }
          break;
        case 'json':
          data = this.response;
          break;
      }
      if (data === null) {
        return;
      }
      broadcast.publish(url, data);
    });

    return xhr;
  },
});

unsafeWindow.XMLHttpRequest = XHRProxy;
