import {base64Encode} from './utils/underscore';
import {http} from './http/http';
import {RequestOptions} from './http/request';
import * as promiseRetry from 'promise-retry';

import {Owners} from './ingestion/owners';
import {Objects} from './ingestion/objects';
import {Events} from './ingestion/events';
import {Search} from './restitution/search';
import {Bigdata} from './bigdata/bigdata';
import {Model} from './model/model';

let version: string;
try {
  version = require('../package.json').version;
} catch (e)  {
  version = 'unknown';
}

export enum OAuth2Scopes {
  ALL,
  LIMITED,
  READ,
  WRITE
}

export interface ClientCompression {
  requests: boolean;
  responses: boolean;
}

export interface ExponentialBackoff {
  numberOfAttempts?: number;
  initialDelayInMillis?: number;
  onRetry?: (attempt: number) => any;
}

export interface ClientOptions {
  id: string;
  secret: string;
  env?: string;
  token?: string;
  httpOptions?: RequestOptions;
  compression?: boolean | ClientCompression;
  exponentialBackoff?: ExponentialBackoff;
}

function isClientCompression(object: boolean | ClientCompression): object is ClientCompression {
    return (<ClientCompression>object).requests !== undefined ||
           (<ClientCompression>object).responses !== undefined;
}

class AccessToken {
  private requestedAt: Date;

  constructor(public value: string, public type: string, public expiresIn: number, public jti: string) {
    this.requestedAt = new Date();
  }

  isValid() {
    const now = new Date();

    return now.getTime() < this.requestedAt.getTime() + this.expiresIn * 1000;
  }
}

export class Client {
  private defaultNumberOfAttempts: number  = 5;
  private defaultInitialDelay: number  = 500;

  public owners: Owners;
  public objects: Objects;
  public events: Events;
  public search: Search;
  public bigdata: Bigdata;
  public model: Model;

  private token: AccessToken;

  constructor(public options: ClientOptions) {
    if (options.env === undefined) {
      options.env = 'sandbox';
    }

    if (!options.httpOptions) {
      options.httpOptions = {
        protocol: 'https',
        hostname: this.hostname(),
        port: 443
      };
    }

    if (!options.compression) {
        options.compression = false;
    }

    this.owners = new Owners(this);
    this.objects = new Objects(this);
    this.events = new Events(this);
    this.search = new Search(this);
    this.bigdata = new Bigdata(this);
    this.model = new Model(this);
  }

  hostname(): string {
    let part = 'sandbox';

    if (this.options.env === 'production') {
      part = 'api';
    }

    return `rest.${part}.mnubo.com`;
  }

  getAccessToken(scope?: OAuth2Scopes): Promise<any> {
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
    options.headers.set('X-MNUBO-SDK', `JavaScript/${version}`);

    Object.assign(options, this.options.httpOptions);

    return http.post(options, payload).then((data: any) => {
      this.token = new AccessToken(data.access_token, data.token_type, data.expires_in, data.jti);
    });
  }

  /**
   * Is the access token still valid?

   * @return {boolean} false if there is no access token or if it has expired.
   */
  isAccessTokenValid(): boolean {
    return (this.token && this.token.isValid());
  }

  authenticate(): Promise<any> {
    if (this.isAccessTokenValid()) {
      return Promise.resolve(this.token);
    } else {
      return this.getAccessToken().then(() => {
        return this.token;
      });
    }
  }

  buildHttpOptions(path: string, contentType?: string): RequestOptions {
    const options: RequestOptions = {
      path: path,
      headers: new Map<string, string>()
    };
    const compressionAlgorithm = 'gzip';
    const compression = this.options.compression;

    contentType = contentType || 'application/json';

    const token = this.options.token ? this.options.token : this.token.value;

    options.headers.set('Authorization', `Bearer ${token}`);
    options.headers.set('Content-Type', `${contentType}`);

    if (isClientCompression(compression)) {
      if (compression.requests === true) {
        options.headers.set('Content-Encoding', compressionAlgorithm);
      }
      if (compression.responses === true) {
        options.headers.set('Accept-Encoding', compressionAlgorithm);
      }
    } else if (compression === true) {
      options.headers.set('Accept-Encoding', compressionAlgorithm);
      options.headers.set('Content-Encoding', compressionAlgorithm);
    }

    Object.assign(options, this.options.httpOptions);

    return options;
  }

  possiblyRetry(f: () => Promise<any>): Promise<any> {
    const exponentialBackoff = this.options.exponentialBackoff;
    if (!exponentialBackoff) {
      return f().catch((err) => Promise.reject(err.payload));
    } else {
      const retries =
        exponentialBackoff.numberOfAttempts ? exponentialBackoff.numberOfAttempts : this.defaultNumberOfAttempts;
      const minTimeout =
        exponentialBackoff.initialDelayInMillis ? exponentialBackoff.initialDelayInMillis : this.defaultInitialDelay;

      const opts: any = {
        retries,
        minTimeout,
        randomize: true
      };

      return promiseRetry((retry: any, attempt: number) => {
        return f().catch((err) => {
          if (err.statusCode === 503) {
            if (exponentialBackoff.onRetry && attempt <= exponentialBackoff.numberOfAttempts) {
              exponentialBackoff.onRetry(attempt);
            }
            return retry();
          } else {
            return Promise.reject(err.payload);
          }
        });
      }, opts);
    }
  }

  get(path: string, contentType?: string) {
    return this.possiblyRetry(() => http.get(this.buildHttpOptions(path, contentType)));
  }

  post(path: string, payload: any, contentType?: string) {
    return this.possiblyRetry(() => http.post(this.buildHttpOptions(path, contentType), payload));
  }

  put(path: string, payload: any, contentType?: string) {
    return this.possiblyRetry(() => http.put(this.buildHttpOptions(path, contentType), payload));
  }

  delete (path: string, contentType?: string) {
    return this.possiblyRetry(() => http.delete(this.buildHttpOptions(path, contentType)));
  }
}
