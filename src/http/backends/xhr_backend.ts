import {isPresent} from '../../utils/underscore';
import {Request, RequestMethods} from '../request';

export function xhrHttpRequest(request: Request): Promise<any> {
  const payload = request.payload();
  const options = request.options;

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const url = `${options.protocol}://${options.hostname}:${options.port}/${options.path}`;

    xhr.open(RequestMethods[request.method], url);
    xhr.addEventListener('load', () => {
      const response = xhr.response;

      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(xhr.response);
      } else {
        reject(Error(xhr.statusText));
      }
    });

    xhr.addEventListener('error', (error: any) => {
      reject(error);
    });

    if (isPresent(options.headers)) {
      options.headers.forEach((val, header) => {
        xhr.setRequestHeader(header, val);
      });
    }

    xhr.send(payload);
  });
}
