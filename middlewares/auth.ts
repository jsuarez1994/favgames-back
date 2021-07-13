import { validateFields } from "../middlewares/commons/validate-fields";
import { check } from 'express-validator';
import { MIDDLEWARE_ERRORS } from '../utils/errors';

// Middlewares que se ejecutan antes de llegar al controlador

export const middlewareRegister = [
    check('email', MIDDLEWARE_ERRORS.EMAIL_EMPTY).notEmpty(),
    check('email', MIDDLEWARE_ERRORS.EMAIL_FORMAT).isEmail(),
    check('password', MIDDLEWARE_ERRORS.PASSWORD_FORMAT).isLength({ min: 5 }),
    check('name', MIDDLEWARE_ERRORS.NAME_SURNAME_EMPTY).notEmpty(),
    check('surname', MIDDLEWARE_ERRORS.NAME_SURNAME_EMPTY).notEmpty(),
    validateFields
]


export const middlewareLogin = [
    check('email', MIDDLEWARE_ERRORS.EMAIL_FORMAT).isEmail(),
    check('password', MIDDLEWARE_ERRORS.PASSWORD_FORMAT).isLength({ min: 5 }),
    validateFields
];

export const middlewareGoogleSign = [
    check('id_token', MIDDLEWARE_ERRORS.TOKEN_REQUIRED).notEmpty(),
    validateFields
];
