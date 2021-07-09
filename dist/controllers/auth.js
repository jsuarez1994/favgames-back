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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleSign = exports.login = exports.register = void 0;
const user_1 = __importDefault(require("../models/user"));
const errors_1 = require("../utils/errors");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const generate_jwt_1 = require("../utils/helpers/generate-jwt");
const google_verify_1 = require("../utils/helpers/google-verify");
/**
 * Register: Realizamos registro con
 * los parametros obligatorios
 * * Si sale bien, devolvemos el token
 * @param request
 * @param response
 * @returns token: string
 */
function register(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const _a = request.body, { password } = _a, data = __rest(_a, ["password"]);
        const user = new user_1.default(data);
        // Encriptar la contraseña
        user.password = bcryptjs_1.default.hashSync(password, bcryptjs_1.default.genSaltSync());
        // Guardar en BD
        yield user.save();
        // Generamos el token de la sesion
        const token = yield generate_jwt_1.generateJWT(user.id);
        return response.status(200).json(token);
    });
}
exports.register = register;
/**
 * Login: Realizamos login con
 * los parametros correo y password
 * * Si sale bien, devolvemos el token
 * @param request
 * @param response
 * @returns token: string
 */
function login(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        // Obtenemos correo y password
        const { email, password } = request.body;
        try {
            // Filtro para busqueda
            const query = { email, active: true };
            const user = yield user_1.default.findOne(query);
            // Si no encuentra un usuario activo con ese email
            // Mostrara error
            if (!user) {
                return response.status(400).json({ error: errors_1.USER_ERRORS.LOGIN_FAIL });
            }
            // Verificar la contraseña
            const validPassword = bcryptjs_1.default.compareSync(password, user.password);
            if (!validPassword) {
                return response.status(400).json({ error: errors_1.USER_ERRORS.LOGIN_FAIL });
            }
            // Generamos el token de la sesion
            const token = yield generate_jwt_1.generateJWT(user.id);
            return response.status(200).json(token);
        }
        catch (err) {
            console.error(err);
            throw new Error(err);
        }
    });
}
exports.login = login;
/**
 * googleSign: Obtenemos el token retornado de google
 * * Si sale bien, devolvemos el token
 * @param request
 * @param response
 * @returns token: string
 */
function googleSign(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        // Obtenemos token recibimos google
        const { id_token } = request.body;
        try {
            const { name, image, email } = yield google_verify_1.googleVerify(id_token);
            let user = yield user_1.default.findOne({ email });
            if (!user) {
                // Tengo que crearlo
                user = new user_1.default({ email, password: '', name, image });
                yield user.save();
            }
            // Si el usuario en DB
            if (!user.active) {
                return response.status(401).json({ error: errors_1.USER_ERRORS.ACTIVE_FALSE });
            }
            // Generar el JWT
            const token = yield generate_jwt_1.generateJWT(user.id);
            // Retornamos el token
            return response.status(200).json({ token });
        }
        catch (error) {
            console.error(error);
            return response.status(400).json({ msg: 'Token de Google no es válido' });
        }
    });
}
exports.googleSign = googleSign;
//# sourceMappingURL=auth.js.map