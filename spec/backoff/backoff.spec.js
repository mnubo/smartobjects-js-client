/*
 * ---------------------------------------------------------------------------
 *
 * COPYRIGHT (c) 2016 Mnubo Inc. All Rights Reserved.
 *
 * The copyright to the computer program(s) herein is the property of Mnubo
 * Inc. The program(s) may be used and/or copied only with the written
 * permission from Mnubo Inc. or in accordance with the terms and conditions
 * stipulated in the agreement/contract under which the program(s) have been
 * supplied.
 *
 * ---------------------------------------------------------------------------
 */

const mnubo = require('../../dist/mnubo');
const http = require('http');
const port = 9615;

describe('backoff', function() {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

  let serverCounter = {};
  let serverLimit = {};
  const server = http.createServer((req, res) => {
    if (req.url.includes('oauth')) {
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.write(JSON.stringify({
        accessToken: 'token',
        expiresIn: 50000
      }));
      res.end();
    } else {
      const currentCount = serverCounter[req.url];
      if (currentCount === undefined) {
        serverCounter[req.url] = 1;
      } else {
        const newCount = currentCount + 1;
        serverCounter[req.url] = newCount;
      }

      if (serverCounter[req.url] > serverLimit[req.url]) {
        console.log('OK');
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(JSON.stringify({
          data: 'hehe'
        }));
        res.end();
      } else {
        console.log('Unvailable');
        res.writeHead(503, {'Content-Type': 'text/plain'});
        res.end();
      }
    }
  });
  server.listen(9615);

  afterAll(function() {
    server.close();
  });

  it('retry and stop and a successful response is returned', function(done) {
    const path = '/threefailures';
    serverLimit[path] = 3; // return 200 after 3 failed with 503
    let clientCounter = 1;
    const client = newClient(5, 500, (attempt) => {
      clientCounter++;
    });

    client.authenticate().then(() => {
      return client.get(path)
        .then((response) => {
          expect(clientCounter).toEqual(serverCounter[path]);
          expect(clientCounter).toEqual(4);
          done();
        });
    });
  });

  it('stop at the configured limit', function(done) {
    const path = '/limit';
    serverLimit[path] = 100; // return always return 503
    let clientCounter = 1;
    const client = newClient(5, 10, (attempt) => {
      clientCounter++;
    });

    client.authenticate().then(() => {
      return client.get(path)
        .catch((ex) => {
          expect(clientCounter).toEqual(serverCounter[path]);
          expect(clientCounter).toEqual(6);
          done();
        });
    });
  });

  it('not retry if success', function(done) {
    const path = '/success';
    serverLimit[path] = 0; // return 200 right away
    let clientCounter = 1;
    const client = newClient(5, 10000, (attempt) => {
      fail('should not be called');
    });

    client.authenticate().then(() => {
      return client.get(path)
        .then((response) => {
          expect(clientCounter).toEqual(serverCounter[path]);
          expect(clientCounter).toEqual(1);
          done();
        });
    });
  });

  function newClient(retries, delay, onRetryFn) {
    return new mnubo.Client({
      httpOptions: {
        protocol: 'http',
        hostname: 'localhost',
        port
      },
      id: process.env.MNUBO_CLIENT_ID,
      secret: process.env.MNUBO_CLIENT_SECRET,
      env: 'sandbox',
      exponentialBackoff: {
        numberOfAttempts: retries,
        initialDelayInMillis: delay,
        onRetry: onRetryFn
      }
    });
  }
});
