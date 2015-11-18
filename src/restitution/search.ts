import {Client} from '../mnubo';

export class Search {
  private path: string;

  constructor(private client: Client) {
    this.path = '/api/v3/search';
  }

  getDatasets() {
    return this.client.authenticate().then(() => {
      return this.client.get(`${this.path}/datasets`);
    });
  }

  createBasicQuery(query: any) {
    return this.client.authenticate().then(() => {
      return this.client.post(`${this.path}/basic`, query);
    });
  }
}
