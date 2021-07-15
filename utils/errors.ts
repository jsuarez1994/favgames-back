export enum USER_ERRORS {
    // Email requerido
    EMAIL_REQUIRED      = 'USEMAIL0001',
    // Password requerida
    PASSWORD_REQUIRED   = 'USPWD0001',
    // Password vacia o menor tamaño de 8
    PASSWORD_BAD        = 'USPWD0002',
    // Name requerido
    NAME_REQUIRED       = 'USNAME0001',
    // SurName requerido
    SURNAME_REQUIRED    = 'USSURNAME0001',
    // Login fail con credentiales
    LOGIN_FAIL          = 'USLOGIN0001',
    // Usuario no activo
    ACTIVE_FALSE        = 'USACTIVE0001',
}

export enum FAVOURITE_GAMES_ERRORS {
    // Id requerido
    ID_REQUIRED         = 'FVID0001',
    // Name requerido
    NAME_REQUIRED       = 'FVNAME0001',
    // Name requerido
    RATING_REQUIRED     = 'FVRATING0001',
    // Name requerido
    SUMMARY_REQUIRED    = 'FVSUMMARY0001',
    // User requerido
    USER_REQUIRED       = 'FVUSER0001',
    // Juego no encontrado
    GAME_NOT_FOUND      = 'FVGNF0001',
}

export enum MIDDLEWARE_ERRORS {
    // TOKEN  requerido
    TOKEN_REQUIRED      = 'MIDDTOKEN0001',
    // TOKEN invalido usuario no existe
    TOKEN_INVALID       = 'MIDDTOKEN0002',
    // TOKEN mal formado
    TOKEN_FORMAT        = 'MIDDTOKEN0003',
    // Email mal formado
    EMAIL_FORMAT        = 'MIDDEMAIL0001',
    // Email vacio
    EMAIL_EMPTY         = 'MIDDEMAIL0002',
    // Password mal formado
    PASSWORD_FORMAT     = 'MIDDEPASSWORD0001',
    // Nombre Apellido
    NAME_SURNAME_EMPTY  = 'MIDDENAME0001',
}