"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const auth_2 = require("../middlewares/auth");
exports.router = express_1.Router();
// Path - Controllers
/**
 * Path: /registrer
 * Middlewares: TODO: Hacer metodos
 * Controller:
 *      name: registrer
 *      description: Registro de datos necesarios dar
 *                   alta usuario
 */
exports.router.post('/registrer', auth_1.register);
/**
 * Path: /login
 * Middlewares: TODO: Hacer metodos
 * Controller:
 *      name: login
 *      description: Login a la BD Mongo by email/password
 */
exports.router.post('/login', auth_2.middlewareLogin, auth_1.login);
/**
 * Path: /googleSign
 * Middlewares: TODO: Hacer metodos
 * Controller:
 *      name: googleSign
 *      description: Logeo usuario mediante credenciales de google
 */
exports.router.post('/googleSign', auth_1.googleSign);
//# sourceMappingURL=auth.route.js.map