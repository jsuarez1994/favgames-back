import { Request, Response } from 'express';
import User from '../models/user';
import { USER_ERRORS } from '../utils/errors'
import bcryptjs from 'bcryptjs';
import { generateJWT } from '../utils/helpers/generate-jwt';
import { googleVerify } from '../utils/helpers/google-verify';


/**
 * Register: Realizamos registro con
 * los parametros obligatorios 
 * * Si sale bien, devolvemos el token
 * @param request 
 * @param response 
 * @returns token: string
 */
export async function register (request: Request, response: Response) {
    const {password, ...data} = request.body;
    const user = new User(data);

    // Encriptar la contraseña
    user.password = bcryptjs.hashSync( password, bcryptjs.genSaltSync() );

    // Guardar en BD
    await user.save();

    // Generamos el token de la sesion
    const token = await generateJWT(user.id);

    return response.status(200).json(token);
}



/**
 * Login: Realizamos login con
 * los parametros correo y password 
 * * Si sale bien, devolvemos el token
 * @param request 
 * @param response 
 * @returns token: string
 */
export async function login (request: Request, response: Response) {
    // Obtenemos correo y password
    const { email, password } = request.body;

    try {
        // Filtro para busqueda
        const query = {email, active: true};
        const user = await User.findOne(query);

        // Si no encuentra un usuario activo con ese email
        // Mostrara error
        if( !user ) { return  response.status(400).json({error: USER_ERRORS.LOGIN_FAIL}) }

        // Verificar la contraseña
        const validPassword = bcryptjs.compareSync( password, user.password );
        if ( !validPassword ) { return response.status(400).json({error: USER_ERRORS.LOGIN_FAIL}); }

        // Generamos el token de la sesion
        const token = await generateJWT(user.id);

        return response.status(200).json(token);
    } catch (err) {
        console.error(err);
        throw new Error(err);
    }
}

/**
 * googleSign: Obtenemos el token retornado de google
 * * Si sale bien, devolvemos el token
 * @param request 
 * @param response 
 * @returns token: string
 */
export async function googleSign (request: Request, response: Response)  {
    // Obtenemos token recibimos google
    const { id_token } = request.body;
    
    try {
        const { name, image, email } = await googleVerify( id_token );

        let user = await User.findOne({ email });

        if ( !user ) {
            // Tengo que crearlo
            user = new User( { email, password: '', name, image } );
            await user.save();
        }

        // Si el usuario en DB
        if ( !user.active ) { return response.status(401).json({error: USER_ERRORS.ACTIVE_FALSE}); }

        // Generar el JWT
        const token = await generateJWT( user.id );
        
        // Retornamos el token
        return response.status(200).json({ token });
        
    } catch (error) {
        console.error(error);
        return response.status(400).json({ msg: 'Token de Google no es válido' })
    }
}