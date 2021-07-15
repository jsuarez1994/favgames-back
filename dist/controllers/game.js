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
exports.deleteGame = exports.getByUser = exports.save = exports.getAllGames = void 0;
const favourite_games_1 = __importDefault(require("../models/favourite-games"));
const games_1 = require("../routes/api/games");
const constants_1 = require("../utils/constants");
const call_apis_1 = require("../utils/helpers/call-apis");
const utils_1 = require("../utils/helpers/utils");
const errors_1 = require("../utils/errors");
/**
 * getAllGames: Mostramos todos los juegos segun pagina
 * @param request
 * @param response
 * @returns games: Games[]
 */
function getAllGames(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const { page } = request.body;
        const body = games_1.QUERY_API_GAMES.replace('{{page}}', page || 0);
        // Obtenemos datos necesario para header
        // Obtenemos el token para llamada api
        const tokenApiGame = yield getTokenApiGame();
        // Obntenemos client-id
        const clientId = process.env.CLIENT_ID_API_GAMES || '';
        const header = {
            'Client-ID': clientId,
            'Authorization': `Bearer ${tokenApiGame}`
        };
        // Obtenemos los juegos
        let result = yield call_apis_1.callApi(games_1.API_GAMES_PATH, constants_1.HTTP_METHOD.POST, header, body);
        return response.status(200).json(result);
    });
}
exports.getAllGames = getAllGames;
/**
 * Save: Guardamos la relacion entre juego y usuario
 * * Si sale bien, devolvemos el juego pasado por request
 * @param request
 * @param response
 * @returns games: Games[]
 */
function save(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = request.user;
        const game = request.body;
        let allPlatforms = '';
        if (game.platforms && game.platforms.length > 0) {
            allPlatforms = game.platforms.map(platform => `${platform.id + ':' + platform.name}`).toString();
        }
        let allScreenshots = '';
        if (game.screenshots && game.screenshots.length > 0) {
            allScreenshots = game.screenshots.map(screenshot => `${screenshot.id + ':' + screenshot.url.substring(screenshot.url.lastIndexOf('/'))}`).toString();
        }
        const favGame = new favourite_games_1.default(Object.assign(Object.assign({ user: user.id }, game), { platforms: allPlatforms, release_dates: game.release_dates[0].human, screenshots: allScreenshots }));
        yield favGame.save();
        response.status(200).json(game);
    });
}
exports.save = save;
/**
 * getByUser: Guardamos la relacion entre juego y usuario
 * * Si sale bien, devolvemos los juegos relacionados con usuario
 * @param request
 * @param response
 * @returns games: Games[]
 */
function getByUser(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        // Obtenemos el usuario
        const user = request.user;
        // Obtenemos todos los juegos asociados
        const games = yield favourite_games_1.default.find({ user: user.id });
        let result = [];
        if (games && games.length > 0) {
            games.forEach(game => {
                const platforms = game.platforms.split(',');
                const screenshots = game.screenshots.split(',').map(screenshot => `${screenshot.split(':')[0] + ':' + constants_1.urlScreenshots + screenshot.split(':')[1]}`);
                const release_date = game.release_dates;
                // Platforms
                const dataPlatforms = utils_1.listDataSplitted(platforms, ':', ['id', 'name']);
                // Release Dates
                const dataRelease_dates = { id: 0, human: release_date };
                // Screenshots
                const dataScreenshots = utils_1.listDataSplitted(screenshots, ':', ['id', 'url']);
                // Lo agregamos al array final
                result.push({
                    id: game.id,
                    name: game.name,
                    platforms: dataPlatforms,
                    rating: game.rating,
                    release_dates: [dataRelease_dates],
                    screenshots: dataScreenshots,
                    summary: game.summary
                });
            });
        }
        return response.status(200).json(result);
    });
}
exports.getByUser = getByUser;
/**
 * deleteGame: Eliminamos la relacion entre juego y usuario
 * * Si sale bien, devolvemos los juego
 * @param request
 * @param response
 * @returns games: Games[]
 */
function deleteGame(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        // Obtenemos el usuario
        const user = request.user;
        // Obntemos el id juego
        const { id } = request.body;
        // Obtenemos todos los juegos asociados
        const game = yield favourite_games_1.default.findOneAndDelete({ user: user.id, id });
        if (!game) {
            return response.status(400).json({ error: errors_1.FAVOURITE_GAMES_ERRORS.GAME_NOT_FOUND });
        }
        return response.status(200).json(game);
    });
}
exports.deleteGame = deleteGame;
//TODO: 502 Bad Gateway
const translateSummary = (data) => __awaiter(void 0, void 0, void 0, function* () {
    let arrayGames = data.map(game => `${game.id}:${game.summary}`);
    const responseTranslate = yield call_apis_1.callApiTranslate(arrayGames.toString());
    console.log('###### TRANLATE ######:', responseTranslate);
});
/**
 * Obtenemos el token de la API de juegos
 * @returns string
 */
const getTokenApiGame = () => __awaiter(void 0, void 0, void 0, function* () {
    let url = games_1.API_AUTH_GAMES;
    url = url.replace('{{client-id}}', (process.env.CLIENT_ID_API_GAMES || ''));
    url = url.replace('{{client-secret}}', (process.env.CLIENT_SECRET_ID_API_GAMES || ''));
    url = url.replace('{{grant-type}}', (process.env.GRANT_TYPE || ''));
    const tokenApi = yield call_apis_1.callApi(url, constants_1.HTTP_METHOD.POST);
    if (tokenApi) {
        return tokenApi['access_token'];
    }
});
//# sourceMappingURL=game.js.map