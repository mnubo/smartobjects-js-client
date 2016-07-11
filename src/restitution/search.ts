import {Client} from '../mnubo';
import {authenticate} from '../decorators';

export class Search {
  private path: string;

  constructor(private client: Client) {
    this.path = '/api/v3/search';
  }

  @authenticate
  getDatasets() {
    return this.client.get(`${this.path}/datasets`);
  }

  @authenticate
  createBasicQuery(query: any) {
    return this.client.post(`${this.path}/basic`, query);
  }

  @authenticate
  validateQuery(query: any) {
    return this.client.post(`${this.path}/validateQuery`, query);
  }
}
