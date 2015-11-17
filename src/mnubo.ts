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

class AccessToken {
  private requestedAt: Date;

  constructor(public value: string, public type: string, public expiresIn: number, public jti: string) {
    this.requestedAt = new Date();
  }

  isValid() {
    var now = new Date();

    return now.getTime() < this.requestedAt.getTime() + this.expiresIn * 1000;
  }
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

  getAccessToken(scope: OAuth2Scopes): Promise<any> {
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
      this.token = new AccessToken(data.access_token, data.token_type, data.expires_in, data.jti);
    });

    return promise;
  }

  /**
   * Is the access token still valid?

   * @return {boolean} false if there is no access token or if it has expired.
   */
  isAccessTokenValid(): boolean {
    return (this.token && this.token.isValid());
  }
}
