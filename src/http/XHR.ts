import {_} from '../utils/underscore';
import {Request, RequestMethods} from './Request';

export class XHR {
    response: any

    private _xhr: XMLHttpRequest;

    constructor(public request: Request) {
        this._xhr = new XMLHttpRequest();

        this._xhr.open(RequestMethods[request.method], request.url);
        this._xhr.addEventListener('load', (event) => {
            this.request = this._xhr.response;
        });

        if (_.isPresent(request.headers)) {
            request.headers.forEach((val, header) => {
                this._xhr.setRequestHeader(header, val);
            });
        }

        this._xhr.send(this.request.payload());
    }
}
