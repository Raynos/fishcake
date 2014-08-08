var TypedError = require('error/typed');

var IncorrectPassword = TypedError({
    type: 'auth.common.incorrectPassword',
    message: 'Password provided does not match password in db.',
    expected: true,
    statusCode: 400
});

module.exports = {
    IncorrectPassword: IncorrectPassword
};
