import {underscore as _} from '../utils/underscore';

export enum RequestMethods {
    GET,
    POST,
    PUT,
    DELETE,
    OPTIONS,
    HEAD,
    PATCH
}

export class Request {
    constructor(public method: RequestMethods, public headers: Array<string>, public body: string,
                public url: string) {}

    payload() {
        return _.isPresent(this.body) ? this.body.toString() : '';
    }
}
