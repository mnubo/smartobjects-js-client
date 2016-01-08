import {Request, RequestMethods, RequestOptions} from './request';
import {nodeHttpRequest} from './backends/node_backend';

export class http {
  static request(request: Request): Promise<any> {
      return nodeHttpRequest(request);
  }

  static get(options: RequestOptions): Promise<any> {
    let request = new Request(RequestMethods.GET, options);

    return this.request(request);
  }

  static post(options: RequestOptions, body: string): Promise<any> {
    let request = new Request(RequestMethods.POST, options, body);

    return this.request(request);
  }

  static put(options: RequestOptions, body: string): Promise<any> {
    let request = new Request(RequestMethods.PUT, options, body);

    return this.request(request);
  }

  static delete (options: RequestOptions): Promise<any> {
    let request = new Request(RequestMethods.DELETE, options);

    return this.request(request);
  }
}
