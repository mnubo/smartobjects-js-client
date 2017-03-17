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
  createUpdate(payload: Array<any>): Promise<any> {
    return this.client.put(`${this.path}`, payload);
  }

  @authenticate
  delete (username: string): Promise<any> {
    return this.client.delete(`${this.path}/${username}`);
  }

  @authenticate
  claim(username: string, deviceId: string): Promise<any> {
    return this.client.post(`${this.path}/${username}/objects/${deviceId}/claim`, {});
  }

  @authenticate
  batchClaim(claims: Array<any>): Promise<any> {
    return this.client.post(`${this.path}/claim`, claims);
  }

  @authenticate
  unclaim(username: string, deviceId: string): Promise<any> {
    return this.client.post(`${this.path}/${username}/objects/${deviceId}/unclaim`, {});
  }

  @authenticate
  batchUnclaim(unclaims: Array<any>): Promise<any> {
    return this.client.post(`${this.path}/unclaim`, unclaims);
  }

  @authenticate
  exists(usernames: Array<string>|string): Promise<any> {
    const path = `${this.path}/exists`;

    if (Array.isArray(usernames)) {
      return this.client.post(`${path}`, usernames);
    } else {
      return this.client.get(`${path}/${usernames}`);
    }
  }
}
