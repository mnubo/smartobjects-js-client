import {Client} from '../mnubo';

export class Objects {
  private path: string;

  constructor(private client: Client) {
    this.path = '/api/v3/objects';
  }

  create(payload: any): Promise<any> {
    return this.client.authenticate().then(() => {
      return this.client.post(this.path, payload);
    });
  }

  update(deviceId: string, payload: any): Promise<any> {
    return this.client.authenticate().then(() => {
      return this.client.put(`${this.path}/${deviceId}`, payload);
    });
  }

  delete (deviceId: string): Promise<any> {
    return this.client.authenticate().then(() => {
      return this.client.delete(`${this.path}/${deviceId}`);
    });
  }
}
