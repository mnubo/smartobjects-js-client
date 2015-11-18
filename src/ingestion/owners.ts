import {Client} from '../mnubo';

export class Owners {
  private path: string;

  constructor(private client: Client) {
    this.path = '/api/v3/owners';
  }

  create(payload: any): Promise<any> {
    return this.client.authenticate().then(() => {
      return this.client.post(this.path, payload);
    });
  }

  update(username: string, payload: any): Promise<any> {
    return this.client.authenticate().then(() => {
      return this.client.put(`${this.path}/${username}`, payload);
    });
  }

  delete (username: string): Promise<any> {
    return this.client.authenticate().then(() => {
      return this.client.delete(`${this.path}/${username}`);
    });
  }

  claim(username: string, deviceId: string): Promise<any> {
    return this.client.authenticate().then(() => {
      return this.client.delete(`${this.path}/${username}/objects/{deviceId}/claim`);
    });
  }
}
