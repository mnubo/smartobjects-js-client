import * as http from 'http';

import {Request} from '../request';

export function nodeHttpRequest(request: Request) {
  const options: http.RequestOptions = {
    protocol: request.options.protocol,
    hostname: request.options.hostname,
    port: request.options.port,
    method: request.method.toString(),
    path: request.options.path,
    headers: {}
  };

  request.options.headers.forEach((value, header) => {
    options.headers[header] = value;
  });

  const promise = new Promise((resolve, reject) => {
    const request = http.request(options, (response) => {
      console.log('STATUS: ' + response.statusCode);
      console.log('HEADERS: ' + JSON.stringify(response.headers));
      response.setEncoding('utf8');
      let data = '';
      response.on('data', function (chunk: string) {
        console.log('BODY: ' + chunk);
        data += chunk;
      });
      response.on('end', function() {
        console.log('No more data in response.');
        if (response.statusCode >= 200 && response.statusCode < 300) {
          resolve(data);
        } else {
          reject(response.statusCode);
        }
      });
    });

    request.on('error', (error: any) => {
      reject(error);
    });
  });

  return promise;
}
