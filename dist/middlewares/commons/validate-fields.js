"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateFields = void 0;
const express_validator_1 = require("express-validator");
function validateFields(request, response, next) {
    const errors = express_validator_1.validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json(errors);
    }
    next();
}
exports.validateFields = validateFields;
//# sourceMappingURL=validate-fields.js.map