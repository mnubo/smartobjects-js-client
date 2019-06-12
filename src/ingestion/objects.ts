import { Client } from '../mnubo';
import { authenticate } from '../decorators';

export class Objects {
  private path: string;

  constructor(private client: Client) {
    this.path = '/api/v3/objects';
  }

  @authenticate
  create(payload: any): Promise<any> {
    return this.client.post(this.path, payload);
  }

  @authenticate
  update(deviceId: string, payload: any): Promise<any> {
    return this.client.put(`${this.path}/${deviceId}`, payload);
  }

  @authenticate
  createUpdate(payload: Array<any>): Promise<any> {
    return this.client.put(`${this.path}`, payload);
  }

  @authenticate
  delete(deviceId: string): Promise<any> {
    return this.client.delete(`${this.path}/${deviceId}`);
  }

  @authenticate
  exists(deviceIds: Array<string> | string): Promise<any> {
    const path = `${this.path}/exists`;

    if (Array.isArray(deviceIds)) {
      return this.client.post(`${path}`, deviceIds);
    } else {
      return this.client.get(`${path}/${deviceIds}`);
    }
  }
}
