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
