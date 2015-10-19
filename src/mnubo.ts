import {http} from './http/http';

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
    grantType: string,
    scope: OAuth2Scopes
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

        return http.post(url, JSON.stringify(payload));
    }
}
