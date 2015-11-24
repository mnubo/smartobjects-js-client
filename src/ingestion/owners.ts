import {Client} from '../mnubo';
import {authenticate} from '../decorators';

export class Owners {
  private path: string;

  constructor(private client: Client) {
    this.path = '/api/v3/owners';
  }

  @authenticate
  create(payload: any): Promise<any> {
    return this.client.post(this.path, payload);
  }

  @authenticate
  update(username: string, payload: any): Promise<any> {
    return this.client.put(`${this.path}/${username}`, payload);
  }

  @authenticate
  delete (username: string): Promise<any> {
    return this.client.delete(`${this.path}/${username}`);
  }

  @authenticate
  claim(username: string, deviceId: string): Promise<any> {
    return this.client.delete(`${this.path}/${username}/objects/{deviceId}/claim`);
  }
}
