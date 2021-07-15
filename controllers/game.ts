import { Request, Response } from 'express';
import { IUser } from '../models/user';
import FavouriteGame from '../models/favourite-games';
import { API_GAMES_PATH, QUERY_API_GAMES, API_AUTH_GAMES } from '../routes/api/games';
import { API_TRANSLATE } from '../routes/api/translate';
import { HTTP_METHOD, urlScreenshots } from '../utils/constants';
import { callApi, callApiTranslate } from '../utils/helpers/call-apis';
import { listDataSplitted } from '../utils/helpers/utils';
import { FAVOURITE_GAMES_ERRORS } from '../utils/errors';


/**
 * getAllGames: Mostramos todos los juegos segun pagina
 * @param request 
 * @param response 
 * @returns games: IGame[]
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
    // Obtenemos los juegos
    let result: IGame[] = await callApi(API_GAMES_PATH, HTTP_METHOD.POST, header,body);

    return response.status(200).json(result);
}

/**
 * Save: Guardamos la relacion entre juego y usuario 
 * * Si sale bien, devolvemos el juego pasado por request
 * @param request 
 * @param response 
 * @returns games: IGame[]
 */
export async function save (request: any, response: Response) {

    const user: IUser = request.user;
    const game: IGame  = request.body;

    let allPlatforms = '';
    if(game.platforms && game.platforms.length > 0){
        allPlatforms = game.platforms.map(platform => `${platform.id+':'+platform.name}`).toString();
    }
    let allScreenshots = '';
    if(game.screenshots && game.screenshots.length > 0){
        allScreenshots = game.screenshots.map(screenshot => `${screenshot.id+':'+screenshot.url.substring(screenshot.url.lastIndexOf('/'))}`).toString();
    }

    const favGame = new FavouriteGame({user:user.id, ...game, platforms: allPlatforms, release_dates: game.release_dates[0].human, screenshots: allScreenshots});
    await favGame.save();

    response.status(200).json(game);
}

/**
 * getByUser: Guardamos la relacion entre juego y usuario 
 * * Si sale bien, devolvemos los juegos relacionados con usuario
 * @param request 
 * @param response 
 * @returns result: IGame[]
 */
 export async function getByUser (request: any, response: Response) {

    // Obtenemos el usuario
    const user: IUser = request.user;

    // Obtenemos todos los juegos asociados
    const games = await FavouriteGame.find({user: user.id});

    let result: IGame[] = [];
    if(games && games.length > 0) {
        games.forEach(game => {
            const platforms: string[] = game.platforms.split(',');
            const screenshots = game.screenshots.split(',').map(screenshot => `${screenshot.split(':')[0] + ':' + urlScreenshots + screenshot.split(':')[1]}`);
            const release_date = game.release_dates;

            // Platforms
            const dataPlatforms = listDataSplitted(platforms, ':', ['id','name']);
            // Release Dates
            const dataRelease_dates = {id:0, human:release_date};
            // Screenshots
            const dataScreenshots = listDataSplitted(screenshots, ':', ['id','url']);

            // Lo agregamos al array final
            result.push({
                id: game.id,
                name: game.name ,
                platforms: dataPlatforms ,
                rating: game.rating ,
                release_dates: [dataRelease_dates] ,
                screenshots: dataScreenshots ,
                summary: game.summary 
            });
        });
    }
    return response.status(200).json(result);
}

/**
 * deleteGame: Eliminamos la relacion entre juego y usuario 
 * * Si sale bien, devolvemos los juego
 * @param request 
 * @param response 
 * @returns game: Games
 */
 export async function deleteGame (request: any, response: Response) {

    // Obtenemos el usuario
    const user: IUser = request.user;

    // Obntemos el id juego
    const { id } = request.body;

    // Obtenemos todos los juegos asociados
    const game = await FavouriteGame.findOneAndDelete({user: user.id, id});

    if(!game) { return  response.status(400).json({error: FAVOURITE_GAMES_ERRORS.GAME_NOT_FOUND})}
    
    return response.status(200).json(game);
}

//TODO: 502 Bad Gateway
const translateSummary = async (data: IGame[]) => {
    let arrayGames:string[] = data.map(game => `${game.id}:${game.summary}`);
    const responseTranslate:any =  await callApiTranslate(arrayGames.toString());

    console.log('###### TRANLATE ######:',responseTranslate);

}


/**
 * Obtenemos el token de la API de juegos
 * @returns string
 */
const getTokenApiGame = async () => {

    let url: string = API_AUTH_GAMES;
    url = url.replace('{{client-id}}'       , (process.env.CLIENT_ID_API_GAMES || ''));
    url = url.replace('{{client-secret}}'   , (process.env.CLIENT_SECRET_ID_API_GAMES || ''));
    url = url.replace('{{grant-type}}'      , (process.env.GRANT_TYPE || ''));

    const tokenApi = await callApi(url, HTTP_METHOD.POST);
    if(tokenApi) { return tokenApi['access_token']; }
}