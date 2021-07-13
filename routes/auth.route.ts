import { Router } from "express";
import { login, register, googleSign } from '../controllers/auth';
import { middlewareLogin, middlewareRegister,middlewareGoogleSign } from "../middlewares/auth";


export const router = Router();

// Path - Controllers

/**
 * Path: /registrer
 * Middlewares: middlewareRegister
 * Controller:
 *      name: registrer
 *      description: Registro de datos necesarios dar 
 *                   alta usuario   
 */
 router.post(   '/registrer',
                middlewareRegister,
                register);

/**
 * Path: /login
 * Middlewares: middlewareLogin
 * Controller:
 *      name: login
 *      description: Login a la BD Mongo by email/password
 */
router.post(    '/login',
                middlewareLogin,
                login);

/**
 * Path: /googleSign
 * Middlewares: middlewareGoogleSign
 * Controller:
 *      name: googleSign
 *      description: Logeo usuario mediante credenciales de google   
 */
router.post(    '/googleSign',
                middlewareGoogleSign,
                googleSign);
