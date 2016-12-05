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

describe('ingestion: owners', function() {
  let client;
  let username;

  beforeEach(function() {
    username = 'test@mnubo.com';
    client = new mnubo.Client({
      id: process.env.MNUBO_CLIENT_ID,
      secret: process.env.MNUBO_CLIENT_SECRET,
      httpOptions: {
        protocol: 'https',
        hostname: 'rest-sandbox-dev.api.mnubo.com',
        port: 443
      }
    });
  });

  describe('.create()', function() {
    it('should create a new owner', function(done) {
      client.owners.create({
        username: username,
        x_password: 'test'
      }).then((response) => {
        expect(response).toBeTruthy();
        done();
      }).catch((error) => {
        fail(error);
        done();
      });
    });
  });

  describe('.exists()', function() {
    it('should check if one username exists if only one username is passed', (done) => {
      client.owners.exists(username)
      .then((response) => {
        expect(response[username]).toBe(true);
        done();
      })
      .catch((error) => {
        fail(error);
        done();
      });
    });

    it('should check if multiple usernames exist if an array of usernames is passed', (done) => {
      client.objects.exists([
        'fake-1@mnubo.com',
        'fake-2@mnubo.com',
      ])
      .then((response) => {
        expect(response).toEqual([
          {'fake-1@mnubo.com': false},
          {'fake-2@mnubo.com': false},
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
    it('should delete an owner', function(done) {
      client.owners.delete(username).then(() => {
        done();
      }).catch((error) => {
        fail(error);
        done();
      });
    });
  });
});
