import {_} from '../utils/underscore';
import {Request, RequestMethods} from './Request';

function sendRequest(request: Request) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();

    xhr.open(RequestMethods[request.method], request.url);
    xhr.addEventListener('load', () => {
      request = xhr.response;
      if (xhr.status === 200) {
        resolve(xhr.response);
      } else {
        reject(Error(xhr.statusText));
      }
    });
    xhr.addEventListener('error', () => {
      reject(Error('Network error'));
    });

    if (_.isPresent(request.headers)) {
      request.headers.forEach((val, header) => {
        xhr.setRequestHeader(header, val);
      });
    }

    xhr.send(request.payload());
  });

}

export class http {
  static post(headers: Map<string, string>, body: string, url: string): Promise<any> {
    let request = new Request(RequestMethods.POST, headers, body, url);

    return sendRequest(request);
  }
}
