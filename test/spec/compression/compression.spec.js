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

const mnubo = require('mnubo-sdk');
const nodeHttpRequest = require('mnubo-sdk/dist/http/backends/node_backend');

describe('compression', function() {
  let mql;
  let options;

  beforeEach(function() {
    options = {
      id: 'JYWYwGU0mZGoVSdPi06g39Gl0gDX4OSCcHhuHKXAOqvowDrMUj',
      secret: 'cO0Kl8F6DfzNVLlAaz2UXkQx2wpG8I6TftXwGnRpS0jwd37IyS',
      httpOptions: {
        protocol: 'https',
        hostname: 'rest-sandbox-dev.api.mnubo.com',
        port: 443
      },
    };

    mql = {
      from: 'event',
      select: [
        {value: 'x_event_type'},
      ],
      limit: 10000
    };
  });

  it('should compress request and response when compression is true', function(done) {
    const client = new mnubo.Client(Object.assign({
      compression: true
    }, options));

    client.search.createBasicQuery(mql).then((response) => {
      expect(response.rows.length).toBe(10000);
      done();
    }).catch((error) => {
      fail(error);
      done();
    });
  });

  it('should compress request when compression.requests is true', function(done) {
    const client = new mnubo.Client(Object.assign({
      compression: {
        requests: true
      }
    }, options));

    client.search.createBasicQuery(mql).then((response) => {
      expect(response.rows.length).toBe(10000);
      done();
    }).catch((error) => {
      fail(error);
      done();
    });
  });

  it('should compress response when compression.responses is true', function(done) {
    const client = new mnubo.Client(Object.assign({
      compression: {
        responses: true
      }
    }, options));

    client.search.createBasicQuery(mql).then((response) => {
      expect(response.rows.length).toBe(10000);
      done();
    }).catch((error) => {
      fail(error);
      done();
    });
  });
});
