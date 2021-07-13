import { Request, Response } from 'express';
import { API_GAMES_PATH, QUERY_API_GAMES, API_AUTH_GAMES } from '../routes/api/games';
import { HTTP_METHOD } from '../utils/constants';
import { callApi } from '../utils/helpers/call-apis';


/**
 * Register: Realizamos registro con
 * los parametros obligatorios 
 * * Si sale bien, devolvemos el token
 * @param request 
 * @param response 
 * @returns games: Games[]
 */
export async function getAllGames (request: Request, response: Response) {
    const { page } = request.body;
    const body: string = QUERY_API_GAMES.replace('{{page}}', page || 0);

    // Obtenemos datos necesario para header
    // Obtenemos el token para llamada api
    const tokenApiGame: string= await getTokenApiGame();
    // Obntenemos client-id
    const clientId: string = process.env.CLIENT_ID_API_GAMES || '';

    const header = {
        'Client-ID': clientId,
        'Authorization': `Bearer ${tokenApiGame}`
    }


    const result: Games[] = await callApi(API_GAMES_PATH, HTTP_METHOD.POST, header,body);
    return response.status(200).json(result);
}

const getTokenApiGame = async () => {

    let url: string = API_AUTH_GAMES;
    url = url.replace('{{client-id}}'       , (process.env.CLIENT_ID_API_GAMES || ''));
    url = url.replace('{{client-secret}}'   , (process.env.CLIENT_SECRET_ID_API_GAMES || ''));
    url = url.replace('{{grant-type}}'      , (process.env.GRANT_TYPE || ''));

    const tokenApi = await callApi(url, HTTP_METHOD.POST);
    if(tokenApi) { return tokenApi['access_token']; }
}