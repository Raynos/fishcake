var TypedError = require('error/typed');

module.exports = {
    EmptyBody: TypedError({
        type: 'playdoh-test.device.empty.body',
        message: 'Unexpected empty body',
        expected: true,
        statusCode: 400
    })
};
