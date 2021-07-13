"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.middlewareAllGames = void 0;
const validate_fields_1 = require("./commons/validate-fields");
const validate_jwt_1 = require("./commons/validate-jwt");
// Middlewares que se ejecutan antes de llegar al controlador
exports.middlewareAllGames = [
    validate_jwt_1.validateJWT,
    validate_fields_1.validateFields
];
//# sourceMappingURL=game.js.map