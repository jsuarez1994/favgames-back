import { validateFields } from "./commons/validate-fields";
import { validateJWT } from "./commons/validate-jwt";

// Middlewares que se ejecutan antes de llegar al controlador

export const middlewareAllGames = [
    validateJWT,
    validateFields
];
