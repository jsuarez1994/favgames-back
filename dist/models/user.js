"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const errors_1 = require("../utils/errors");
const UserSchema = new mongoose_1.Schema({
    email: { type: String,
        required: [true, errors_1.USER_ERRORS.EMAIL_REQUIRED],
        unique: true },
    password: { type: String,
        required: [true, errors_1.USER_ERRORS.PASSWORD_REQUIRED],
        validators: {
            validator: (pwd = '') => {
                return pwd === '' || pwd.length < 8;
            },
            message: (pwd) => `${errors_1.USER_ERRORS.PASSWORD_BAD}:${pwd}`
        }
    },
    name: { type: String,
        required: [true, errors_1.USER_ERRORS.NAME_REQUIRED]
    },
    surname: { type: String,
        required: [true, errors_1.USER_ERRORS.SURNAME_REQUIRED]
    },
    home: { country: { type: String, default: '' },
        town: { type: String, default: '' }
    },
    active: { type: Boolean, default: true },
    image: { type: String, default: '' }
});
// Export the model and return your IUser interface
exports.default = mongoose_1.default.model('User', UserSchema);
//# sourceMappingURL=user.js.map