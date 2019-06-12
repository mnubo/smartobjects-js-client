const mnubo = require('../../dist/mnubo');

describe('compression', function() {
  let mql;
  let options;

  beforeAll(function() {
    options = {
      id: process.env.MNUBO_CLIENT_ID,
      secret: process.env.MNUBO_CLIENT_SECRET,
      env: 'sandbox',
    };

    mql = {
      from: 'event',
      select: [{ value: 'x_event_type' }],
      limit: 500,
    };
  });

  it('should compress request and response when compression is true', function(done) {
    const client = new mnubo.Client(
      Object.assign(
        {
          compression: true,
        },
        options
      )
    );

    client.search
      .createBasicQuery(mql)
      .then((response) => {
        expect(response.rows.length).toBeGreaterThanOrEqual(50);
        done();
      })
      .catch((error) => {
        fail(error);
        done();
      });
  });

  it('should compress request when compression.requests is true', function(done) {
    const client = new mnubo.Client(
      Object.assign(
        {
          compression: {
            requests: true,
          },
        },
        options
      )
    );

    client.search
      .createBasicQuery(mql)
      .then((response) => {
        expect(response.rows.length).toBeGreaterThanOrEqual(50);
        done();
      })
      .catch((error) => {
        fail(error);
        done();
      });
  });

  it('should compress response when compression.responses is true', function(done) {
    const client = new mnubo.Client(
      Object.assign(
        {
          compression: {
            responses: true,
          },
        },
        options
      )
    );

    client.search
      .createBasicQuery(mql)
      .then((response) => {
        expect(response.rows.length).toBeGreaterThanOrEqual(50);
        done();
      })
      .catch((error) => {
        fail(error);
        done();
      });
  });
});
