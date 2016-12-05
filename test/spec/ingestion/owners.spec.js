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
const uuid = require('uuid');

describe('ingestion: owners', function() {
  let client;
  const username1 = 'owner1';
  const username2 = uuid.v4();
  const username3 = uuid.v4();
  const username4 = uuid.v4();

  beforeEach(function() {
    client = new mnubo.Client({
      id: process.env.MNUBO_CLIENT_ID,
      secret: process.env.MNUBO_CLIENT_SECRET,
      httpOptions: {
        protocol: 'https',
        hostname: 'sandbox.api.mnubo.com',
        port: 443
      }
    });
  });

  describe('.create()', function() {
    it('should create a new owner', function(done) {
      client.owners.create({
        username: username1,
        x_password: username1
      }).then((response) => {
        expect(response).toBeTruthy();
        done();
      }).catch((error) => {
        fail(error);
        done();
      });
    });
  });

  describe('.createUpdate()', function() {
    it('should create a batch of owners', function(done) {
      client.owners.createUpdate([
        {
          username: username2,
          x_password: username2
        },
        {
          username: username3,
          x_password: username3
        },
        {
          username: username4,
          x_password: username4
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

  describe('.update()', function() {
    it('should update owner registration lat/lon', function(done) {
      client.owners.update(username1,{
        x_registration_latitude: 45,
        x_registration_longitude: 43
      }).then(() => {
        done();
      }).catch((error) => {
        fail(error);
        done();
      });
    });
  });

  describe('.exists()', function() {
    it('should check if one owner exists if only one username is passed', (done) => {
      client.owners.exists(username1)
      .then((response) => {
        expect(response[username1]).toBe(true);
        done();
      })
      .catch((error) => {
        fail(error);
        done();
      });
    });

    it('should check if multiple owner exist if an array of usernames is passed', (done) => {
      client.owners.exists([
        'fake1',
        'fake2',
        'owner1',
        'fake4'
      ])
      .then((response) => {
        expect(response).toEqual([
          {'fake1': false},
          {'fake2': false},
          {'owner1': true},
          {'fake4': false}
        ]);
        done();
      })
      .catch((error) => {
        fail(error);
        done();
      });
    });
  });

  describe('.delete()', function() {
    it('should delete an owner', (done) => {
      client.owners.delete(username1).then(() => {
        done();
      })
      .catch((error) => {
        fail(error);
        done();
      });
    });
  });
});
