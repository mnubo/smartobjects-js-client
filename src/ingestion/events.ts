import {Client} from '../mnubo';

export class Events {
  private path: string;

  constructor(private client: Client) {
    this.path = '/api/v3/events';
  }

  send(payload: any): Promise<any> {
    return this.client.authenticate().then(() => {
      return this.client.post(this.path, payload);
    });
  }

  sendFromDevice(deviceId: string, payload: any) {
    return this.client.authenticate().then(() => {
      return this.client.post(`/api/v3/objects/${deviceId}/events`, payload);
    });
  }
}
