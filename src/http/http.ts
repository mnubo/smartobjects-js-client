import {Request, RequestMethods, RequestOptions} from './request';
import {nodeHttpRequest} from './backends/node_backend';

export class http {
  static request(request: Request) {
    return nodeHttpRequest(request);
  }

  static post(options: RequestOptions, body: string): Promise<any> {
    let request = new Request(RequestMethods.POST, options, body);

    return this.request(request);
  }
}
