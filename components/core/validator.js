const ErrorType = {
    SUCCESS: 'SUCCESS',
    STRING_VALIDATION_ISTRING_FUNCTION_ARGUMENT: '_isString function didn`t get argument',
    NUMBER_VALIDATION_ISNUMBER_FUNCTION_ARGUMENT: '_isNumber function didn`t get argument',
    INVALID_STRING_TYPE: 'invalid string type',
    INVALID_NUMBER_TYPE: 'invalid number type',
    USERNAME_MISSING: 'username missing',
    USERNAME_ALREADY_EXIST: 'username already exist',
    INVALID_USERNAME: 'invalid username',
    INVALID_USERNAME_RANGE: 'invalid username range',
    PASSWORD_MISSING: 'password missing',
    INVALID_PASSWORD: 'invalid password',
    INVALID_PASSWORD_RANGE: 'invalid password range',
    EMAIL_MISSING: 'email missing',

}

class Validator {

    _isString(str) {
        if (!str) {
            return this.generateErrorMessage(ErrorType.STRING_VALIDATION_ISTRING_FUNCTION_ARGUMENT);
        }
        if (typeof str !== 'string') {
            return this.generateErrorMessage(ErrorType.INVALID_STRING_TYPE);
        }
        return ErrorType.SUCCESS;
    }

    _isNumber(str) {
        if (!str) {
            return this.generateErrorMessage(ErrorType.NUMBER_VALIDATION_ISNUMBER_FUNCTION_ARGUMENT);
        }
        if (typeof str !== 'number') {
            return this.generateErrorMessage(ErrorType.INVALID_NUMBER_TYPE);
        }
        return ErrorType.SUCCESS;
    }

    generateErrorMessage(type, message) {
        let error_object = {
            type: type || ErrorType.UNKNOWN_ERROR,
            message: 'Smt went wrong'
        }

        switch (type) {
            case ErrorType.STRING_VALIDATION_ISTRING_FUNCTION_ARGUMENT:
            error_object.message = '_isString function didnt get argument';
                break;
            case ErrorType.NUMBER_VALIDATION_ISNUMBER_FUNCTION_ARGUMENT:
            error_object.message = '_isNumber function didn`t get argument';
                break;
            case ErrorType.INVALID_STRING_TYPE:
            error_object.message = 'invalid string type';
                break;
            case ErrorType.INVALID_NUMBER_TYPE:
            error_object.message = 'invalid number type';
                break;
            case ErrorType.USERNAME_MISSING:
            error_object.message = 'username missing';
                break;
            case ErrorType.INVALID_USERNAME:
            error_object.message = 'invalid username';
                break;
            case ErrorType.INVALID_USERNAME_RANGE:
            error_object.message = 'invalid username range';
                break;
            case ErrorType.EMAIL_MISSING:
            error_object.message = 'email missing';
                break;
            case ErrorType.INVALID_EMAIL:
            error_object.message = 'invalid email';
                break;
            case ErrorType.PASSWORD_MISSING:
            error_object.message = 'password missing';
                break;
            case ErrorType.INVALID_PASSWORD:
            error_object.message = 'invalid password';
                break;
            case ErrorType.INVALID_PASSWORD_RANGE:
            error_object.message = 'invalid password range';
                break;
            case ErrorType.USERNAME_ALREADY_EXIST:
            error_object.message = 'username already exist';
                break;
            default:
        }

        return error_object;
    }
}

module.exports = new Validator();
module.exports.ErrorType = ErrorType;
