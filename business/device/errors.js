var TypedError = require('error/typed');

module.exports = {
    NotFound: TypedError({
        type: 'playdoh-test.device.not.found',
        message: 'Record {id} could not be found',
        expected: true,
        statusCode: 404,
        id: null
    })
};
