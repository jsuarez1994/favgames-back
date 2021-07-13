"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const game_1 = require("../controllers/game");
const game_2 = require("../middlewares/game");
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
exports.router.get('/getAll', game_2.middlewareAllGames, game_1.allGames);
//# sourceMappingURL=game.route.js.map