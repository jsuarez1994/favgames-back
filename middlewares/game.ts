import { check } from "express-validator";
import { FAVOURITE_GAMES_ERRORS } from "../utils/errors";
import { validateFields } from "./commons/validate-fields";
import { validateJWT } from "./commons/validate-jwt";
import { validateGame } from "./custom/validate-game";

// Middlewares que se ejecutan antes de llegar al controlador

export const middlewareAllGames = [
    validateJWT,
    validateFields
];

export const middlewareSave = [
    validateJWT,
    validateFields
];

export const middlewareGetByUser = [
    validateJWT,
    validateFields
];

export const middlewaregetDelete = [
    validateJWT,
    check('id', FAVOURITE_GAMES_ERRORS.ID_REQUIRED).notEmpty(),
    validateFields
];
