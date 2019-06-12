const mnubo = require('../../dist/mnubo');
const backoff = require('../backoffserver');
const port = 9615;

describe('backoff', function() {
  const original = jasmine.DEFAULT_TIMEOUT_INTERVAL;
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  const server = new backoff.BackoffSimulatorServer(port);

  afterAll(function() {
    server.close();
    jasmine.DEFAULT_TIMEOUT_INTERVAL = original;
  });

  it('should retry and stop and a successful response is returned', function(done) {
    const path = '/threefailures';
    server.setLimit(path, 3); // return 200 after 3 failed with 503
    let clientCounter = 1;
    const client = newClient(5, 500, (attempt) => {
      clientCounter++;
    });

    client.authenticate().then(() => {
      return client
        .get(path)
        .then((response) => {
          expect(clientCounter).toEqual(server.getCount(path));
          expect(clientCounter).toEqual(4);
          done();
        })
        .catch(() => {
          fail('should not fail');
          done();
        });
    });
  });

  it('should stop at the configured limit', function(done) {
    const path = '/limit';
    server.setLimit(path, 100); // return always return 503
    let clientCounter = 1;
    const client = newClient(5, 10, (attempt) => {
      clientCounter++;
    });

    client.authenticate().then(() => {
      return client.get(path).catch((ex) => {
        expect(clientCounter).toEqual(server.getCount(path));
        expect(clientCounter).toEqual(6);
        done();
      });
    });
  });

  it('should not retry if success', function(done) {
    const path = '/success';
    server.setLimit(path, 0); // return 200 right away
    let clientCounter = 1;
    const client = newClient(5, 10000, (attempt) => {
      fail('should not be called');
    });

    client.authenticate().then(() => {
      return client
        .get(path)
        .then((response) => {
          expect(clientCounter).toEqual(server.getCount(path));
          expect(clientCounter).toEqual(1);
          done();
        })
        .catch(() => {
          fail('should not fail');
          done();
        });
    });
  });

  it('should work with default settings', function(done) {
    const path = '/default';
    server.setLimit(path, 3); // return 200 right away
    const client = newClient();

    client.authenticate().then(() => {
      return client
        .get(path)
        .then((response) => {
          expect(server.getCount(path)).toEqual(4);
          done();
        })
        .catch(() => {
          fail('should not fail');
          done();
        });
    });
  });

  function newClient(retries, delay, onRetryFn) {
    return new mnubo.Client({
      httpOptions: {
        protocol: 'http',
        hostname: 'localhost',
        port,
      },
      id: process.env.MNUBO_CLIENT_ID,
      secret: process.env.MNUBO_CLIENT_SECRET,
      env: 'sandbox',
      exponentialBackoff: {
        numberOfAttempts: retries,
        initialDelayInMillis: delay,
        onRetry: onRetryFn,
      },
    });
  }
});
