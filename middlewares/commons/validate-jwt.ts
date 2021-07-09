import { Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../../models/user';
import { MIDDLEWARE_ERRORS } from '../../utils/errors';

export async function validateJWT ( request: any, response: Response, next:any ) {

    
    // Se recoge el token que viene en el header
    const token = request.header('x-token');
    if ( !token ) {
        return response.status(401).json({ error: MIDDLEWARE_ERRORS.TOKEN_REQUIRED });
    }
    
    // Obtenemos private key del servidor
    const privateKey: string = process.env.PRIVATE_KEY_SERVER || '123abc';
    
    try {
        jwt.verify( token, privateKey, async (err:any, decoded:any) => {      
            if (err) { return response.json({ error: MIDDLEWARE_ERRORS.TOKEN_FORMAT }); } 
            else {
              // leer el usuario que corresponde al uid
              const user = await User.findById( decoded.id );
      
              if( !user || !user.active ) {
                  return response.status(401).json( {error: MIDDLEWARE_ERRORS.TOKEN_INVALID} )
              }
              request.user = user;
              next();
            }
        });

    } catch (error) {
        console.log(error);
        response.status(401).json({ error: MIDDLEWARE_ERRORS.TOKEN_REQUIRED })
    }
}