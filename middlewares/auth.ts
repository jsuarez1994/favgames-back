import { validateFields } from "../middlewares/commons/validate-fields";
import { check } from 'express-validator';
import { MIDDLEWARE_ERRORS } from '../utils/errors';

// Middlewares que se ejecutan antes de llegar al controlador
export const middlewareLogin = [
    check('email', MIDDLEWARE_ERRORS.EMAIL_FORMAT).isEmail(),
    check('password', MIDDLEWARE_ERRORS.PASSWORD_FORMAT).isLength({ min: 5 }),
    validateFields
];