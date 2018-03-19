const BaseValidator = require('./../../core/validator');
const AppConstants = require('./../../settings/constants');


class UserValidator {

    validateUsername(username) {
        if (!username) {
            return BaseValidator.generateErrorMessage(BaseValidator.ErrorType.USERNAME_MISSING);
        }
        let username_reg_exp = /^\w+$/;
        if (!username_reg_exp.test(username)) {
            return BaseValidator.generateErrorMessage(BaseValidator.ErrorType.INVALID_USERNAME);
        }
        let check_username = BaseValidator._isString(username);
        if (check_username !== BaseValidator.ErrorType.SUCCESS) {
            return check_username;
        }
        if (username.length < AppConstants.user.USERNAME_MIN_LENGTH
            || username.length > AppConstants.user.USERNAME_MAX_LENGTH) {
                return BaseValidator.generateErrorMessage(BaseValidator.ErrorType.INVALID_USERNAME_RANGE)
            }

        return BaseValidator.ErrorType.SUCCESS;
    }

    validateUpdateUsername(username) {
        if (!username) {
            return BaseValidator.ErrorType.SUCCESS;
        }
        let check_username = BaseValidator._isString(username);
        if (check_username !== BaseValidator.ErrorType.SUCCESS) {
            return check_username;
        }
        if (username.length < AppConstants.user.USERNAME_MIN_LENGTH
            || username.length > AppConstants.user.USERNAME_MAX_LENGTH) {
                return BaseValidator.generateErrorMessage(BaseValidator.ErrorType.INVALID_USERNAME_RANGE)
            }

        return BaseValidator.ErrorType.SUCCESS;
    }

    validatePassword(password) {
        if (!password) {
            return BaseValidator.generateErrorMessage(BaseValidator.ErrorType.PASSWORD_MISSING);
        }
        let check_password = BaseValidator._isString(password);

        if (check_password !== BaseValidator.ErrorType.SUCCESS) {
            return check_password;
        }
        if (password.length < AppConstants.user.PASSWORD_MIN_LENGTH
            || password.length > AppConstants.user.PASSWORD_MAX_LENGTH) {
                return BaseValidator.generateErrorMessage(BaseValidator.ErrorType.INVALID_PASSWORD_RANGE)
            }

        return BaseValidator.ErrorType.SUCCESS;

    }

    validateUpdatePassword(password) {
        if (!password) {
            return BaseValidator.ErrorType.SUCCESS;
        }
        let check_password = BaseValidator._isString(password);

        if (check_password !== BaseValidator.ErrorType.SUCCESS) {
            return check_password;
        }
        if (password.length < AppConstants.user.PASSWORD_MIN_LENGTH
            || password.length > AppConstants.user.PASSWORD_MAX_LENGTH) {
                return BaseValidator.generateErrorMessage(BaseValidator.ErrorType.INVALID_PASSWORD_RANGE)
            }

        return BaseValidator.ErrorType.SUCCESS;
    }

    validateEmail(email) {
        if (!email) {
            return BaseValidator.generateErrorMessage(BaseValidator.ErrorType.EMAIL_MISSING);
        }
        let check_string = BaseValidator._isString(email);

        if (check_string !== BaseValidator.ErrorType.SUCCESS) {
            return check_string;
        }

        let regexp_email = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (!regexp_email.test(email)) {
            return BaseValidator.generateErrorMessage(BaseValidator.ErrorType.INVALID_EMAIL)
        }

        return BaseValidator.ErrorType.SUCCESS;
    }

    validateUpdateEmail(email) {
        if (!email) {
            return BaseValidator.ErrorType.SUCCESS;
        }
        let check_string = BaseValidator._isString(email);

        if (check_string !== BaseValidator.ErrorType.SUCCESS) {
            return check_string;
        }

        let regexp_email = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (!regexp_email.test(email)) {
            return BaseValidator.generateErrorMessage(BaseValidator.ErrorType.INVALID_EMAIL)
        }

        return BaseValidator.ErrorType.SUCCESS;
    }

}

module.exports = new UserValidator();
