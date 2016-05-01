/* eslint max-len: 0 */
/* eslint no-invalid-this: 2 */

const mnubo = require('../dist/mnubo');

describe('mnubo', function() {
  it('should exist', function() {
    expect(mnubo).toBeDefined();
  });

  describe('Client', function() {
    it('should exist', function() {
      expect(mnubo.Client).toBeDefined();
    });

    it('should accept a client id, a client secret with "sandbox" environement by default', function() {
      const client = new mnubo.Client({
        id: 'id',
        secret: 'secret'
      });

      expect(client.options).toEqual({
        id: 'id',
        secret: 'secret',
        env: 'sandbox',
        httpOptions: {
          protocol: 'https',
          hostname: 'rest.sandbox.mnubo.com',
          port: 443
        }
      });
    });

    it('should accept a client id, a client secret and a env environement', function() {
      const client = new mnubo.Client({
        id: 'id',
        secret: 'secret',
        env: 'production'
      });

      expect(client.options).toEqual({
        id: 'id',
        secret: 'secret',
        env: 'production',
        httpOptions: {
          protocol: 'https',
          hostname: 'rest.api.mnubo.com',
          port: 443
        }
      });
    });

    it('should build owners, objects, events and search namespaces', function() {
      const client = new mnubo.Client({
        id: 'id',
        secret: 'secret'
      });

      expect(client.owners).toBeDefined();
      expect(client.objects).toBeDefined();
      expect(client.events).toBeDefined();
      expect(client.search).toBeDefined();
    });

    describe('.getAccessToken()', function() {
      beforeEach(function() {
        this.client = new mnubo.Client({
          id: 'id',
          secret: 'secret'
        });
      });

      it('should exist', function() {
        expect(this.client.getAccessToken).toEqual(jasmine.any(Function));
      });

      it('should return a Promise', function() {
        const promise = this.client.getAccessToken();

        expect(promise).toEqual(jasmine.any(Promise));
      });
    });
  });
});
