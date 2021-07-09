"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function generateJWT(id = '') {
    return new Promise((resolve, reject) => {
        const privateKey = process.env.PRIVATE_KEY_SERVER || '123abc';
        jsonwebtoken_1.default.sign({ id }, privateKey, { expiresIn: '7d' }, (err, token) => {
            if (err)
                reject('No se pudo generar el token');
            else
                resolve(token);
        });
    });
}
exports.generateJWT = generateJWT;
//# sourceMappingURL=generate-jwt.js.map