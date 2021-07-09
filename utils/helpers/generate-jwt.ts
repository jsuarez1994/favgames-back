import jwt from 'jsonwebtoken';

export function generateJWT (id:string = '') {
    return new Promise( (resolve, reject) => {
        const privateKey: string = process.env.PRIVATE_KEY_SERVER || '123abc';
        jwt.sign(   { id }, privateKey, { expiresIn:'7d' },
                    ( err, token ) => {
                        if ( err )  reject( 'No se pudo generar el token' ) 
                        else  resolve( token ); 
                    }
                );
    });
}