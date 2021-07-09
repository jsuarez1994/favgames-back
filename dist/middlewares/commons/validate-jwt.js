"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../../models/user"));
const errors_1 = require("../../utils/errors");
function validateJWT(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        // Se recoge el token que viene en el header
        const token = request.header('x-token');
        if (!token) {
            return response.status(401).json({ error: errors_1.MIDDLEWARE_ERRORS.TOKEN_REQUIRED });
        }
        // Obtenemos private key del servidor
        const privateKey = process.env.PRIVATE_KEY_SERVER || '123abc';
        try {
            jsonwebtoken_1.default.verify(token, privateKey, (err, decoded) => __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    return response.json({ error: errors_1.MIDDLEWARE_ERRORS.TOKEN_FORMAT });
                }
                else {
                    // leer el usuario que corresponde al uid
                    const user = yield user_1.default.findById(decoded.id);
                    if (!user || !user.active) {
                        return response.status(401).json({ error: errors_1.MIDDLEWARE_ERRORS.TOKEN_INVALID });
                    }
                    request.user = user;
                    next();
                }
            }));
        }
        catch (error) {
            console.log(error);
            response.status(401).json({ error: errors_1.MIDDLEWARE_ERRORS.TOKEN_REQUIRED });
        }
    });
}
exports.validateJWT = validateJWT;
//# sourceMappingURL=validate-jwt.js.map