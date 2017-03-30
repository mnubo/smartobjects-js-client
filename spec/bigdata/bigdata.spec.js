const mnubo = require('../../dist/mnubo');
const r = require('../../dist/http/backends/node_backend');
const p = require('../../dist/http/request');

describe('bigdata', function() {
    const client = new mnubo.Client({
        id: process.env.MNUBO_CLIENT_ID,
        secret: process.env.MNUBO_CLIENT_SECRET,
        env: 'sandbox'
    });

    describe('.startexport()', function() {
        it('should return ids of the stream for a query', function(done) {
            client.bigdata.startExport({
                from: 'event',
                select: [
                    { value: 'x_event_type' },
                ]
            }).then((response) => {
                expect(response.streamsFirstPages).toBeDefined();
                expect(response.streamsFirstPages.length).toBeGreaterThan(0);
                done();
            }).catch((error) => {
                fail(error);
                done();
            });
        });
    });

    describe('.streampage()', function() {
        it('should return ids of the stream for a query', function(done) {
            client.bigdata.startExport({
                from: 'event',
                select: [
                    { value: 'x_event_type' },
                ]
            }).then((response) => {
                expect(response.streamsFirstPages).toBeDefined();
                expect(response.streamsFirstPages.length).toBeGreaterThan(0);
                return client.bigdata.streampage(response.streamsFirstPages[0])
            }).then((response) => {
                expect(response.rows).toBeDefined();
                done();
            }).catch((error) => {
                fail(error);
                done();
            });
        });
    });
});
