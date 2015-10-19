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
    static post(url: string, body: string): Promise<any> {
        let request = new Request(RequestMethods.POST, null, body, url);

        return sendRequest(request);
    }
}
