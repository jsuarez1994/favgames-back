"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.middlewareGoogleSign = exports.middlewareLogin = exports.middlewareRegister = void 0;
const validate_fields_1 = require("../middlewares/commons/validate-fields");
const express_validator_1 = require("express-validator");
const errors_1 = require("../utils/errors");
// Middlewares que se ejecutan antes de llegar al controlador
exports.middlewareRegister = [
    express_validator_1.check('email', errors_1.MIDDLEWARE_ERRORS.EMAIL_EMPTY).notEmpty(),
    express_validator_1.check('email', errors_1.MIDDLEWARE_ERRORS.EMAIL_FORMAT).isEmail(),
    express_validator_1.check('password', errors_1.MIDDLEWARE_ERRORS.PASSWORD_FORMAT).isLength({ min: 5 }),
    express_validator_1.check('name', errors_1.MIDDLEWARE_ERRORS.NAME_SURNAME_EMPTY).notEmpty(),
    express_validator_1.check('surname', errors_1.MIDDLEWARE_ERRORS.NAME_SURNAME_EMPTY).notEmpty(),
    validate_fields_1.validateFields
];
exports.middlewareLogin = [
    express_validator_1.check('email', errors_1.MIDDLEWARE_ERRORS.EMAIL_FORMAT).isEmail(),
    express_validator_1.check('password', errors_1.MIDDLEWARE_ERRORS.PASSWORD_FORMAT).isLength({ min: 5 }),
    validate_fields_1.validateFields
];
exports.middlewareGoogleSign = [
    express_validator_1.check('id_token', errors_1.MIDDLEWARE_ERRORS.TOKEN_REQUIRED).notEmpty(),
    validate_fields_1.validateFields
];
//# sourceMappingURL=auth.js.map