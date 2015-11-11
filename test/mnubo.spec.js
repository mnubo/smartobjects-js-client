/* eslint max-len: 0 */
/* eslint no-invalid-this: 2 */

const mnubo = window.mnubo;
const _ = window._;

describe('mnubo', function() {
  it('should exist', function() {
    expect(mnubo).toBeDefined();
  });

  describe('Client', function() {
    it('should exist', function() {
      expect(mnubo.Client).toBeDefined();
    });

    it('should accept a client id, a client secret and an environement', function() {
      var env = mnubo.Environments.SANDBOX;
      var client = new mnubo.Client('id', 'secret', env);

      var obj = _.pick(client, ['id', 'secret', 'baseUrl']);

      expect(obj).toEqual({
        id: 'id',
        secret: 'secret',
        baseUrl: 'https://rest.sandbox.mnubo.com'
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
        var promise = this.client.getAccessToken();

        expect(promise).toEqual(jasmine.any(Promise));
      });
    });
  });
});
