"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MIDDLEWARE_ERRORS = exports.FAVOURITE_GAMES_ERRORS = exports.USER_ERRORS = void 0;
var USER_ERRORS;
(function (USER_ERRORS) {
    // Email requerido
    USER_ERRORS["EMAIL_REQUIRED"] = "USEMAIL0001";
    // Password requerida
    USER_ERRORS["PASSWORD_REQUIRED"] = "USPWD0001";
    // Password vacia o menor tamaño de 8
    USER_ERRORS["PASSWORD_BAD"] = "USPWD0002";
    // Name requerido
    USER_ERRORS["NAME_REQUIRED"] = "USNAME0001";
    // SurName requerido
    USER_ERRORS["SURNAME_REQUIRED"] = "USSURNAME0001";
    // Login fail con credentiales
    USER_ERRORS["LOGIN_FAIL"] = "USLOGIN0001";
    // Usuario no activo
    USER_ERRORS["ACTIVE_FALSE"] = "USACTIVE0001";
})(USER_ERRORS = exports.USER_ERRORS || (exports.USER_ERRORS = {}));
var FAVOURITE_GAMES_ERRORS;
(function (FAVOURITE_GAMES_ERRORS) {
    // Id requerido
    FAVOURITE_GAMES_ERRORS["ID_REQUIRED"] = "FVID0001";
    // Name requerido
    FAVOURITE_GAMES_ERRORS["NAME_REQUIRED"] = "FVNAME0001";
    // Name requerido
    FAVOURITE_GAMES_ERRORS["RATING_REQUIRED"] = "FVRATING0001";
    // Name requerido
    FAVOURITE_GAMES_ERRORS["SUMMARY_REQUIRED"] = "FVSUMMARY0001";
    // User requerido
    FAVOURITE_GAMES_ERRORS["USER_REQUIRED"] = "FVUSER0001";
    // Juego no encontrado
    FAVOURITE_GAMES_ERRORS["GAME_NOT_FOUND"] = "FVGNF0001";
})(FAVOURITE_GAMES_ERRORS = exports.FAVOURITE_GAMES_ERRORS || (exports.FAVOURITE_GAMES_ERRORS = {}));
var MIDDLEWARE_ERRORS;
(function (MIDDLEWARE_ERRORS) {
    // TOKEN  requerido
    MIDDLEWARE_ERRORS["TOKEN_REQUIRED"] = "MIDDTOKEN0001";
    // TOKEN invalido usuario no existe
    MIDDLEWARE_ERRORS["TOKEN_INVALID"] = "MIDDTOKEN0002";
    // TOKEN mal formado
    MIDDLEWARE_ERRORS["TOKEN_FORMAT"] = "MIDDTOKEN0003";
    // Email mal formado
    MIDDLEWARE_ERRORS["EMAIL_FORMAT"] = "MIDDEMAIL0001";
    // Email vacio
    MIDDLEWARE_ERRORS["EMAIL_EMPTY"] = "MIDDEMAIL0002";
    // Password mal formado
    MIDDLEWARE_ERRORS["PASSWORD_FORMAT"] = "MIDDEPASSWORD0001";
    // Nombre Apellido
    MIDDLEWARE_ERRORS["NAME_SURNAME_EMPTY"] = "MIDDENAME0001";
})(MIDDLEWARE_ERRORS = exports.MIDDLEWARE_ERRORS || (exports.MIDDLEWARE_ERRORS = {}));
//# sourceMappingURL=errors.js.map