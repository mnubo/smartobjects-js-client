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
const uuid = require('uuid');

describe('ingestion: events', function() {
  let client;
  let deviceId;
  let uuids = [ uuid.v4(), uuid.v4() ];

  beforeAll(function() {
    deviceId = 'BA2DBC92-E24C-48D4-8F73-7748683E18CC';
    client = new mnubo.Client({
      id: process.env.MNUBO_CLIENT_ID,
      secret: process.env.MNUBO_CLIENT_SECRET,
      env: 'sandbox'
    });
  });

  describe('.send()', function() {
    it('should post a new event', function(done) {
      client.events.send([
        {
          event_id: uuids[0],
          x_object: {
            x_device_id: deviceId
          },
          x_event_type: 'mnubo-js-sdk-e2e-event-type-1',
        },
        {
          event_id: uuids[1],
          x_object: {
            x_device_id: deviceId
          },
          x_event_type: 'mnubo-js-sdk-e2e-event-type-2',
        },
      ]).then((response) => {
        expect(response).toBeNull();
        done();
      }).catch((error) => {
        fail(error);
        done();
      });
    });

    it('should show reports if option: reportResults is set to true', function(done) {
      client.events.send([
        {
          event_id: uuid.v4(),
          x_object: {
            x_device_id: deviceId
          },
          x_event_type: 'mnubo-js-sdk-e2e-event-type-1',
        }
      ], {
        reportResults: true
      }).then((response) => {
        expect(response[0].result).toBe('success');
        done();
      }).catch((error) => {
        fail(error);
        done();
      });
    });

    it('should fail if option: objectsMustExist is set to true and object does not exist', function(done) {
      const deviceId = uuid.v4();

      client.events.send([
        {
          event_id: uuid.v4(),
          x_object: {
            x_device_id: deviceId
          },
          x_event_type: 'mnubo-js-sdk-e2e-event-type-1',
        }
      ], {
        objectsMustExist: true
      }).then((response) => {
        fail('promise resolved even though object does not exist');
        done();
      }).catch((error) => {
        expect(error).toEqual(`Object '${deviceId}' not found`);
        done();
      });
    });
  });

  describe('.exists()', function() {
    it('should check if one event id exists if only one event id is passed', (done) => {
      client.events.exists(uuids[0])
      .then((response) => {
        expect(response[uuids[0]]).toBe(true);
        done();
      })
      .catch((error) => {
        fail(error);
        done();
      });
    });

    it('should check if multiple event ids exist if an array of event ids is passed', (done) => {
      client.events.exists([
        'a4d56436-7e77-4d9b-b28a-c1336435ad00',
        '2a6f88ec-93d2-46dd-a455-3d7003588f6a',
      ])
      .then((response) => {
        expect(response).toEqual([
          {'a4d56436-7e77-4d9b-b28a-c1336435ad00': false},
          {'2a6f88ec-93d2-46dd-a455-3d7003588f6a': false},
        ]);
        done();
      })
      .catch((error) => {
        fail(error);
        done();
      });
    });
  });
});
