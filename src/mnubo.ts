import {_} from './utils/underscore';
import {http} from './http/http';
import {RequestOptions} from './http/request';

export enum OAuth2Scopes {
  ALL,
  LIMITED,
  READ,
  WRITE
}

export enum Environments {
  SANDBOX,
  PRODUCTION
}

interface AccessTokenPayload {
  grantType: string;
  scope: OAuth2Scopes;
}

export class Client {
  constructor(private id: string, private secret: string, private env?: Environments,
    private baseUrl?: string) {
      if (env === undefined) {
        this.env = Environments.SANDBOX;
      }

      if (!baseUrl) {
        this.baseUrl = `https://rest.${Environments[this.env].toLowerCase()}.mnubo.com`;
      }
    }

    getAccessToken(scope: OAuth2Scopes) {
      var url = `${this.baseUrl}/oauth2/token`;

      var payload: AccessTokenPayload = {
        grantType: 'client_credentials',
        scope: scope
      };

      var options: RequestOptions = {
        protocol: 'http',
        hostname: 'localhost',
        port: 8080,
        method: 'GET',
        path: 'oauth/token',
        headers: new Map<string, string>()
      };

      options.headers.set('Authorization', `Bearer ${_.base64Encode(this.id + ':' + this.secret)}`);

      return http.post(options, JSON.stringify(payload));
    }
  }
