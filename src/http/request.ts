import {isPresent} from '../utils/underscore';

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
  constructor(public method: RequestMethods, public options: RequestOptions, public body?: any) {}

  hasPayload() {
    return isPresent(this.body);
  }

  payload() {
    if (!this.hasPayload()) {
      return '';
    }

    if (typeof this.body !== 'string') {
      return JSON.stringify(this.body);
    } else {
      return this.body;
    }
  }
}
