import {Client} from '../mnubo';
import {authenticate} from '../decorators';
import {encodeObjectForUrlParams} from '../utils/underscore'

export interface EventsSendOptions {
    reportResults?: boolean;
    objectsMustExist?: boolean;
}

export class Events {
  private path: string;

  constructor(private client: Client) {
    this.path = '/api/v3/events';
  }

  @authenticate
  send(payload: any, options?: EventsSendOptions): Promise<any> {
    let path = this.path;

    if (options) {
      path += `?${encodeObjectForUrlParams(options)}`;
    }

    return this.client.post(`${path}`, payload);
  }

  @authenticate
  sendFromDevice(deviceId: string, payload: any) {
    return this.client.post(`/api/v3/objects/${deviceId}/events`, payload);
  }

  @authenticate
  exists(eventIds: Array<string>|string): Promise<any> {
    const path = `${this.path}/exists`;

    if (Array.isArray(eventIds)) {
      return this.client.post(`${path}`, eventIds);
    } else {
      return this.client.get(`${path}/${eventIds}`);
    }
  }
}
