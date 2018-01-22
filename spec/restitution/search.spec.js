const mnubo = require('../../dist/mnubo');

describe('restitution: search', function() {
  let client;

  beforeAll(function() {
    client = new mnubo.Client({
      id: process.env.MNUBO_CLIENT_ID,
      secret: process.env.MNUBO_CLIENT_SECRET,
      env: 'sandbox'
    });
  });

  describe('.validateQuery()', function() {
    it('should validate a MQL query', function(done) {
      client.search.validateQuery({
        from: 'event',
        select: [
          {count: '*'}
        ]
      }).then((response) => {
        expect(response.isValid).toBe(true);
        done();
      }).catch((error) => {
        fail(error);
        done();
      });
    });
  });
});
