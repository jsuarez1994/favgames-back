"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const game_1 = require("../controllers/game");
const game_2 = require("../middlewares/game");
exports.router = express_1.Router();
// Path - Controllers
/**
 * Path: /getAll
 * Middlewares: middlewareAllGames
 * Controller:
 *          name:           getAllGames
 *          description:    Obtenemos todos los juegos paginados
 */
exports.router.get('/getAll', game_2.middlewareAllGames, game_1.getAllGames);
/**
 * Path: /save
 * Middlewares: middlewareSave
 * Controller:
 *          name:           save
 *          description:    Guardamos relacion usuario - juego
 */
exports.router.post('/save', game_2.middlewareSave, game_1.save);
/**
 * Path: /getByUser
 * Middlewares: middlewaregetByUser
 * Controller:
 *          name:           getByUser
 *          description:    Obtenemos los juegos favoritos del usuario logado
 */
exports.router.get('/getByUser', game_2.middlewareGetByUser, game_1.getByUser);
/**
 * Path: /getByUser
 * Middlewares: middlewaregetByUser
 * Controller:
 *          name:           getByUser
 *          description:    Obtenemos los juegos favoritos del usuario logado
 */
exports.router.delete('/delete', game_2.middlewaregetDelete, game_1.deleteGame);
//# sourceMappingURL=game.route.js.map