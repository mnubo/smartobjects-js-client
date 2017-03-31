import {authenticate} from '../decorators';
import {Client} from '../mnubo';

export interface StartExportResponse {
  streamsFirstPages: Array<string>;
  columns: Array<object>;
}

export interface StreamPageResponse {
  nextPage?: string;
  rows: Array<Array<any>>
}

const basePath = '/api/v3/bigdata';

const mergeStreamResponse = (oldResponse: StreamPageResponse, newResponse: StreamPageResponse): StreamPageResponse => {
  return Object.assign({}, newResponse, { rows: oldResponse.rows.concat(newResponse.rows) })
};

export class Bigdata {
  constructor(private client: Client) {

  }

  @authenticate
  startExport(query: object): Promise<StartExportResponse> {
    return this.client.post(basePath + '/startexport', query)
  }

  @authenticate
  streamPage(pageId: string): Promise<StreamPageResponse> {
    return this.client.get(basePath + '/streampage/' + pageId)
  }
}
