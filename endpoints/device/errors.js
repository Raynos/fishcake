var TypedError = require('error/typed');

module.exports = {
    EmptyBody: TypedError({
        type: 'playdoh-test.device.empty.body',
        message: 'Unexpected empty body',
        expected: true,
        statusCode: 400
    }),
    NotFound: TypedError({
        type: 'playdoh-test.device.not.found',
        message: 'Record {id} could not be found',
        expected: true,
        statusCode: 404,
        id: null
    })
};
