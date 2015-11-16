import * as _ from 'lodash';

import {base64Encode} from './utils/underscore';
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

interface ClientOptions {
  id: string;
  secret: string;
  env?: Environments;
  httpOptions?: RequestOptions;
}

interface AccessToken {
  value: string;
  type: string;
  expiresIn: number;
  jti: string;
}

export class Client {
  private token: AccessToken;

  constructor(public options: ClientOptions) {
    if (options.env === undefined) {
      options.env = Environments.SANDBOX;
    }

    if (!options.httpOptions) {
      options.httpOptions = {
        protocol: 'https',
        hostname: `rest.${Environments[options.env].toLowerCase()}.mnubo.com`,
        port: 443
      };
    }
  }

  getAccessToken(scope: OAuth2Scopes) {
    scope = scope || OAuth2Scopes.ALL;

    const id = this.options.id;
    const secret = this.options.secret;
    const payload = `grant_type=client_credentials&scope=${OAuth2Scopes[scope].toUpperCase()}`;

    const options: RequestOptions = {
      path: '/oauth/token',
      headers: new Map<string, string>()
    };

    options.headers.set('Authorization', `Basic ${base64Encode(id + ':' + secret)}`);
    options.headers.set('Content-Type', 'application/x-www-form-urlencoded');
    options.headers.set('Accept-Encoding', 'application/json');

    _.merge(options, this.options.httpOptions);

    const promise = http.post(options, payload);

    promise.then((data: any) => {
      this.token = {
        value: data.access_token,
        type: data.token_type,
        expiresIn: data.expires_in,
        jti: data.jti
      };
    });

    return promise;
  }
}
