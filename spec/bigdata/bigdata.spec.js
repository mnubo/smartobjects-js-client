const mnubo = require('../../dist/mnubo');

describe('bigdata', function() {
    const client = new mnubo.Client({
        id: process.env.MNUBO_CLIENT_ID,
        secret: process.env.MNUBO_CLIENT_SECRET,
        env: 'sandbox'
    });

    describe('.startExport()', function() {
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

    describe('.streamPage()', function() {
        it('should return ids of the stream for a query', function(done) {
            client.bigdata.startExport({
                from: 'event',
                select: [
                    { value: 'x_event_type' },
                ]
            }).then((response) => {
                expect(response.streamsFirstPages).toBeDefined();
                expect(response.streamsFirstPages.length).toBeGreaterThan(0);
                return client.bigdata.streamPage(response.streamsFirstPages[0])
            }).then((response) => {
                expect(response.rows).toBeDefined();
                done();
            }).catch((error) => {
                fail(error);
                done();
            });
        });
    });

    describe('.exportAllData()', function() {
        it('should return the data for the query', function(done) {
            client.bigdata.exportAllData({
                from: 'event',
                select: [
                    { value: 'x_event_type' },
                ]
            }).then((response) => {
                expect(response.columns).toBeDefined();
                expect(response.rows).toBeDefined();
                done();
            }).catch((error) => {
                fail(error);
                done();
            })
        });
    });
});
