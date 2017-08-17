const mnubo = require('../../dist/mnubo');

describe('model', function() {
    const client = new mnubo.Client({
        id: process.env.MNUBO_CLIENT_ID,
        secret: process.env.MNUBO_CLIENT_SECRET,
        env: 'sandbox'
    });

    describe('.export()', function() {
        it('should return the model in the current environment', function(done) {
            client.model.export().then((response) => {
                expect(response.eventTypes).toBeDefined();
                expect(response.eventTypes.length).toBeGreaterThan(0);
                expect(response.eventTypes[0].key).toBe('event_type1');
                expect(response.eventTypes[0].origin).toBe('scheduled');
                expect(response.eventTypes[0].timeseries).toBeDefined();
                expect(response.eventTypes[0].timeseries.length).toBeGreaterThan(0);

                expect(response.objectTypes).toBeDefined();
                expect(response.objectTypes.length).toBeGreaterThan(0);
                expect(response.objectTypes[0].key).toBe('object_type1');
                expect(response.objectTypes[0].objectAttributes).toBeDefined();
                expect(response.objectTypes[0].objectAttributes.length).toBeGreaterThan(0);

                expect(response.ownerAttributes).toBeDefined();
                expect(response.ownerAttributes.length).toBeGreaterThan(0);
                expect(response.ownerAttributes[0].key).toBe('owner_text_attribute')
                expect(response.ownerAttributes[0].displayName).toBe('dp owner_text_attribute')
                expect(response.ownerAttributes[0].description).toBe('desc owner_text_attribute')
                expect(response.ownerAttributes[0].type.highLevelType).toBe('TEXT')
                expect(response.ownerAttributes[0].type.containerType).toBe('none')

                expect(response.sessionizers).toBeDefined();
                expect(response.sessionizers.length).toBeGreaterThan(0);
                expect(response.sessionizers[0].key).toBe('sessionizer')
                expect(response.sessionizers[0].displayName).toBe('dp sessionizer')
                expect(response.sessionizers[0].description).toBe('')
                expect(response.sessionizers[0].startEventTypeKey).toBe('event_type1')
                expect(response.sessionizers[0].endEventTypeKey).toBe('event_type2')

                expect(response.orphans).toBeDefined();
                expect(response.orphans.timeseries).toBeDefined();
                expect(response.orphans.timeseries[0].key).toBe('orphan_ts')
                expect(response.orphans.timeseries[0].displayName).toBe('dp orphan_ts')
                expect(response.orphans.timeseries[0].description).toBe('desc orphan_ts')
                expect(response.orphans.timeseries[0].type.highLevelType).toBe('ACCELERATION')

                expect(response.orphans.objectAttributes).toBeDefined();
                expect(response.orphans.objectAttributes[0].key).toBe('orphan_object')
                expect(response.orphans.objectAttributes[0].displayName).toBe('dp orphan_object')
                expect(response.orphans.objectAttributes[0].description).toBe('desc orphan_object')
                expect(response.orphans.objectAttributes[0].type.highLevelType).toBe('EMAIL')
                expect(response.orphans.objectAttributes[0].type.containerType).toBe('none')

                expect(response.orphans.objectAttributes.length).toBeGreaterThan(0);
                done();
            }).catch((error) => {
                fail(error);
                done();
            });
        });

        it('should work with fixed token', function(done) {
            const clientWithToken = new mnubo.Client({
                token: client.token.value,
                env: 'sandbox'
            });

            clientWithToken.model.export().then(() => {
                done()
            }).catch((error) => {
                fail(error);
                done();
            });
        });
    });
});
