
var specs = {
    drivers: {
        read: {
            // GET /drivers/trips
            'trips': {
                handler: {},
                read: {
                    // GET /driver/trips/current
                    'current': {}
                }
            }
        },
        create: {
            // POST /drivers
            'index': { handler: {} }
        },
        item: {
            params: ['lat', 'long'],
            read: {
                // GET /drivers/:lat/:long
                'index': {},
                // GET /drivers/:lat/:long/trips
                'trips': {
                    handler: {},
                    read: {
                        // GET /drivers/:lat/:long/trips/current
                        'current': { handler: {} }
                    }
                }
            },
            create: {
                // POST /drivers/:lat/:long
                'index': {}
            },
            update: {
                // PUT /drivers/:lat/:long
                // PATCH /drivers/:lat/:long
                'index': { handler: {} },
                // PUT /drivers/:lat/:long/messages
                'messages': {}
            }
        }
    }
};

// /drivers/123
// /drivers/uuid/123
