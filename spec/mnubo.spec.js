/* eslint max-len: 0 */
/* eslint no-invalid-this: 2 */

const _ = require('lodash');
const mnubo = require('../out/mnubo');

describe('mnubo', function() {
  it('should exist', function() {
    expect(mnubo).toBeDefined();
  });

  describe('Client', function() {
    it('should exist', function() {
      expect(mnubo.Client).toBeDefined();
    });

    it('should accept a client id, a client secret and an environement', function() {
      const env = mnubo.Environments.SANDBOX;
      const client = new mnubo.Client('id', 'secret', env);

      const obj = _.pick(client, ['id', 'secret', 'options']);

      expect(obj).toEqual({
        id: 'id',
        secret: 'secret',
        options: {
          protocol: 'https',
          hostname: 'rest.sandbox.mnubo.com',
          port: 80
        }
      });
    });

    describe('.getAccessToken()', function() {
      beforeEach(function() {
        this.client = new mnubo.Client('id', 'secret');
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
