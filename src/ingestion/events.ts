import {Client} from '../mnubo';
import {authenticate} from '../decorators';

export class Events {
  private path: string;

  constructor(private client: Client) {
    this.path = '/api/v3/events';
  }

  @authenticate
  send(payload: any): Promise<any> {
    return this.client.post(this.path, payload);
  }

  @authenticate
  sendFromDevice(deviceId: string, payload: any) {
    return this.client.post(`/api/v3/objects/${deviceId}/events`, payload);
  }
}
