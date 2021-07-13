import { Router } from "express";
import { getAllGames } from '../controllers/game';
import { middlewareAllGames } from "../middlewares/game";


export const router = Router();

// Path - Controllers

/**
 * Path: /registrer
 * Middlewares: TODO: Hacer metodos
 * Controller:
 *      name: registrer
 *      description: Registro de datos necesarios dar 
 *                   alta usuario   
 */
 router.get(   '/getAll',
                middlewareAllGames,
                getAllGames);
