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
Object.defineProperty(exports, "__esModule", { value: true });
exports.allGames = void 0;
const games_1 = require("../routes/api/games");
const constants_1 = require("../utils/constants");
const call_apis_1 = require("../utils/helpers/call-apis");
/**
 * Register: Realizamos registro con
 * los parametros obligatorios
 * * Si sale bien, devolvemos el token
 * @param request
 * @param response
 * @returns games: Games[]
 */
function allGames(request, response) {
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
        const result = yield call_apis_1.callApi(games_1.API_GAMES_PATH, constants_1.HTTP_METHOD.POST, header, body);
        return response.status(200).json(result);
    });
}
exports.allGames = allGames;
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