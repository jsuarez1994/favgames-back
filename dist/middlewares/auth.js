"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.middlewareLogin = void 0;
const validate_fields_1 = require("../middlewares/commons/validate-fields");
const express_validator_1 = require("express-validator");
const errors_1 = require("../utils/errors");
// Middlewares que se ejecutan antes de llegar al controlador
exports.middlewareLogin = [
    express_validator_1.check('email', errors_1.MIDDLEWARE_ERRORS.EMAIL_FORMAT).isEmail(),
    express_validator_1.check('password', errors_1.MIDDLEWARE_ERRORS.EMAIL_FORMAT).isLength({ min: 5 }),
    validate_fields_1.validateFields
];
//# sourceMappingURL=auth.js.map