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

describe('ingestion: objects', function() {
  let client;
  let deviceId;
  const randomDevices = [uuid.v4(), uuid.v4()];

  beforeEach(function() {
    deviceId = 'BA2DBC92-E24C-48D4-8F73-7748683E18CC';
    client = new mnubo.Client({
      id: process.env.MNUBO_CLIENT_ID,
      secret: process.env.MNUBO_CLIENT_SECRET,
      env: 'sandbox'
    });
  });

  describe('.create()', function() {
    it('should create a single object', function(done) {
      client.objects.create({
        x_device_id: deviceId,
        x_object_type: 'watch',
      }).then((response) => {
        expect(response).toBeTruthy();
        done();
      }).catch((error) => {
        fail(error);
        done();
      });
    });

    it('should create a batch of objects', function(done) {
      client.objects.createUpdate([
        {
          x_device_id: randomDevices[0],
          x_object_type: 'watch',
        },
        {
          x_device_id: randomDevices[1],
          x_object_type: 'watch',
        }
      ]).then((response) => {
        expect(response).toBeTruthy();
        done();
      }).catch((error) => {
        fail(error);
        done();
      });
    });
  });

  describe('.exists()', function() {
    it('should check if one device id exists if only one device id is passed', (done) => {
      client.objects.exists(deviceId)
      .then((response) => {
        expect(response[deviceId]).toBe(true);
        done();
      })
      .catch((error) => {
        fail(error);
        done();
      });
    });

    it('should check if multiple device ids exist if an array of device ids is passed', (done) => {
      client.objects.exists([
        'A4D56436-7E77-4D9B-B28A-C1336435AD00',
        '2A6F88EC-93D2-46DD-A455-3D7003588F6A',
        'BA2DBC92-E24C-48D4-8F73-7748683E18CC'
      ])
      .then((response) => {
        expect(response).toEqual([
          {'A4D56436-7E77-4D9B-B28A-C1336435AD00': false},
          {'2A6F88EC-93D2-46DD-A455-3D7003588F6A': false},
          {'BA2DBC92-E24C-48D4-8F73-7748683E18CC': true}
        ]);
        done();
      })
      .catch((error) => {
        fail(error);
        done();
      });
    });
  });

  describe('.update()', function() {
    it('should update a given device', (done) => {
      client.objects.update(deviceId, {
        x_object_type: 'swatch'
      })
      .then(() => {
        done();
      })
      .catch((error) => {
        fail(error);
        done();
      });
    });
  });

  describe('.delete()', function() {
    it('should delete an object', function(done) {
      client.objects.delete(deviceId).then(() => {
        done();
      }).catch((error) => {
        fail(error);
        done();
      });
    });
  });
});
