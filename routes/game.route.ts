import { Router } from "express";
import { getAllGames, save, getByUser, deleteGame } from '../controllers/game';
import { middlewareAllGames, middlewareSave, middlewareGetByUser, middlewaregetDelete } from '../middlewares/game';


export const router = Router();

// Path - Controllers

/**
 * Path: /getAll
 * Middlewares: middlewareAllGames
 * Controller:
 *          name:           getAllGames
 *          description:    Obtenemos todos los juegos paginados  
 */
router.get(     '/getAll',
                middlewareAllGames,
                getAllGames);

/**
 * Path: /save
 * Middlewares: middlewareSave
 * Controller:
 *          name:           save
 *          description:    Guardamos relacion usuario - juego   
 */
router.post(    '/save',
                middlewareSave,
                save);

/**
 * Path: /getByUser
 * Middlewares: middlewaregetByUser
 * Controller:
 *          name:           getByUser
 *          description:    Obtenemos los juegos favoritos del usuario logado   
 */
 router.get(   '/getByUser',
                middlewareGetByUser,
                getByUser);

/**
 * Path: /getByUser
 * Middlewares: middlewaregetByUser
 * Controller:
 *          name:           getByUser
 *          description:    Obtenemos los juegos favoritos del usuario logado   
 */
router.delete(  '/delete',
                middlewaregetDelete,
                deleteGame);
