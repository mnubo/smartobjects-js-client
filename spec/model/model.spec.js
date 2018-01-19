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
                const et = response.eventTypes.filter(v => v.key === 'event_type1')[0]
                expect(et.key).toBe('event_type1');
                expect(et.origin).toBe('scheduled');
                expect(et.timeseries).toBeDefined();
                expect(et.timeseries.length).toBeGreaterThan(0);

                expect(response.objectTypes).toBeDefined();
                expect(response.objectTypes.length).toBeGreaterThan(0);
                const ot = response.objectTypes.filter(v => v.key === 'object_type1')[0]
                expect(ot.key).toBe('object_type1');
                expect(ot.objectAttributes).toBeDefined();
                expect(ot.objectAttributes.length).toBeGreaterThan(0);

                expect(response.ownerAttributes).toBeDefined();
                expect(response.ownerAttributes.length).toBeGreaterThan(0);
                const owner = response.ownerAttributes.filter(v => v.key === 'owner_text_attribute')[0]
                expect(owner.key).toBe('owner_text_attribute')
                expect(owner.displayName).toBe('dp owner_text_attribute')
                expect(owner.description).toBe('desc owner_text_attribute')
                expect(owner.type.highLevelType).toBe('TEXT')
                expect(owner.type.containerType).toBe('none')

                expect(response.sessionizers).toBeDefined();
                expect(response.sessionizers.length).toBeGreaterThan(0);
                const sess = response.sessionizers.filter(v => v.key === 'sessionizer')[0]
                expect(sess.key).toBe('sessionizer')
                expect(sess.displayName).toBe('dp sessionizer')
                expect(sess.description).toBe('')
                expect(sess.startEventTypeKey).toBe('event_type1')
                expect(sess.endEventTypeKey).toBe('event_type2')

                expect(response.orphans).toBeDefined();
                expect(response.orphans.timeseries).toBeDefined();
                expect(response.orphans.timeseries.length).toBeGreaterThan(0);
                const orts = response.orphans.timeseries.filter(v => v.key === 'orphan_ts')[0]
                expect(orts.key).toBe('orphan_ts')
                expect(orts.displayName).toBe('dp orphan_ts')
                expect(orts.description).toBe('desc orphan_ts')
                expect(orts.type.highLevelType).toBe('ACCELERATION')

                expect(response.orphans.objectAttributes).toBeDefined();
                expect(response.orphans.objectAttributes.length).toBeGreaterThan(0);
                const objts = response.orphans.objectAttributes.filter(v => v.key === 'orphan_object')[0]
                expect(objts.key).toBe('orphan_object')
                expect(objts.displayName).toBe('dp orphan_object')
                expect(objts.description).toBe('desc orphan_object')
                expect(objts.type.highLevelType).toBe('EMAIL')
                expect(objts.type.containerType).toBe('none')

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
