const mnubo = require('../../dist/mnubo');
const uuid = require('uuid');

describe('ingestion: encoding', function () {
    let client;
    let deviceId;
    const eventId = uuid.v4();

    beforeAll(function () {
        deviceId = '4DF840EE-7E4B-4333-AF92-0C81EA63BC1F';
        client = new mnubo.Client({
            id: process.env.MNUBO_CLIENT_ID,
            secret: process.env.MNUBO_CLIENT_SECRET,
            env: 'sandbox'
        });
    });

    describe('.send()', function () {
        it('should post a new event with utf-8 characters', function (done) {
            client.events.send([
                {
                    event_id: eventId,
                    x_object: {
                        x_device_id: deviceId
                    },
                    x_event_type: 'event_type_with_àéî你好',
                }
            ]).then((response) => {
                expect(response).toBeNull();
                done();
            }).catch((error) => {
                fail(error);
                done();
            });
        });
    });

    describe('.exists()', function () {
        it('should check if one event id exists if only one event id is passed', (done) => {
            client.events.exists(eventId)
                .then((response) => {
                    expect(response[eventId]).toBe(true);
                    done();
                })
                .catch((error) => {
                    fail(error);
                    done();
                });
        });
    });
});
