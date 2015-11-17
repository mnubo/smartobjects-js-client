import {Client} from '../mnubo';

class Owner {
  private url: string;

  constructor(private client: Client) {
    this.url = '/api/v3/owners';
  }

  create(options: any): Promise<any> {
    return Promise.resolve({});
  }
}
