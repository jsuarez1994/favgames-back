import { validationResult } from 'express-validator';
import { Request, Response } from 'express';

/**
 * Validamos los campos previamente checkeados por por express validators
 * @param request 
 * @param response 
 * @param next 
 * @returns 
 */
export function validateFields ( request: Request, response: Response, next:any )  {
    const errors = validationResult(request);
    if( !errors.isEmpty() ){ return response.status(400).json(errors); }
    next();
}