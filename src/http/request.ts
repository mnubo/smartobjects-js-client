import {isPresent} from '../utils/underscore';
import {Map} from '../utils/globals';

export enum RequestMethods {
  GET,
  POST,
  PUT,
  DELETE,
  OPTIONS,
  HEAD,
  PATCH
}

export interface RequestOptions {
  protocol?: string;
  hostname?: string;
  port?: number;
  method?: string;
  path?: string;
  headers?: Map<string, string>;
}

export class Request {
  constructor(public method: RequestMethods, public options: RequestOptions, public body?: string) {}

  hasPayload() {
    return isPresent(this.body);
  }

  payload() {
    return this.hasPayload() ? this.body.toString() : '';
  }
}
