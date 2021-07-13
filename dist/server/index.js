"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = require("../database/config");
const base_1 = require("../routes/base");
const authPath = __importStar(require("../routes/auth.route"));
const gamePath = __importStar(require("../routes/game.route"));
class Server {
    constructor() {
        // Configuration Server
        this.app = express_1.default();
        this.port = process.env.PORT_SERVER || '8080';
        this.configurationDatabase = new config_1.DatabaseConnection();
        // Configuracion para conectar Servidor
        this.connectionDatabase();
        // Middlewares
        this.middlewares();
        // Rutas de mi aplicación
        this.routes();
        // Escucha del servidor
        this.app.listen(this.port);
    }
    /**
     * Configuration Server
     */
    connectionDatabase() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.configurationDatabase.connection();
        });
    }
    /**
     * Configuracion Middlewares, se ejecuta antes de
     * cualquier peticion
     */
    middlewares() {
        // CORS
        this.app.use(cors_1.default());
        // Lectura y parseo del body
        this.app.use(express_1.default.json());
    }
    /**
     * Configuracion de las rutas de la aplicacion
     */
    routes() {
        this.app.use(base_1.BASE_PATH.AUTH, authPath.router);
        this.app.use(base_1.BASE_PATH.GAME, gamePath.router);
    }
}
exports.Server = Server;
//# sourceMappingURL=index.js.map