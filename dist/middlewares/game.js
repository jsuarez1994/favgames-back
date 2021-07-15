"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.middlewaregetDelete = exports.middlewareGetByUser = exports.middlewareSave = exports.middlewareAllGames = void 0;
const express_validator_1 = require("express-validator");
const errors_1 = require("../utils/errors");
const validate_fields_1 = require("./commons/validate-fields");
const validate_jwt_1 = require("./commons/validate-jwt");
// Middlewares que se ejecutan antes de llegar al controlador
exports.middlewareAllGames = [
    validate_jwt_1.validateJWT,
    validate_fields_1.validateFields
];
exports.middlewareSave = [
    validate_jwt_1.validateJWT,
    validate_fields_1.validateFields
];
exports.middlewareGetByUser = [
    validate_jwt_1.validateJWT,
    validate_fields_1.validateFields
];
exports.middlewaregetDelete = [
    validate_jwt_1.validateJWT,
    express_validator_1.check('id', errors_1.FAVOURITE_GAMES_ERRORS.ID_REQUIRED).notEmpty(),
    validate_fields_1.validateFields
];
//# sourceMappingURL=game.js.map