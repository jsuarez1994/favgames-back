import express, {Application} from 'express';
import cors from 'cors';
import { DatabaseConnection } from '../database/config';
import { BASE_PATH } from '../routes/base';
import * as authPath from '../routes/auth.route';
import * as gamePath from '../routes/game.route';

export class Server {

    private app: Application;
    private port: string;

    private configurationDatabase: DatabaseConnection;


    constructor() {
        // Configuration Server
        this.app    = express();
        this.port   = process.env.PORT_SERVER || '8080';
        this.configurationDatabase = new DatabaseConnection();

        // Configuracion para conectar Servidor
        this.connectionDatabase();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();

        // Escucha del servidor
        this.app.listen( this.port);
    }

    /**
     * Configuration Server
     */
    async connectionDatabase() {
        await this.configurationDatabase.connection();
    }

    /**
     * Configuracion Middlewares, se ejecuta antes de 
     * cualquier peticion
     */
    middlewares() {
        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );
    }

    /**
     * Configuracion de las rutas de la aplicacion
     */
    routes() {
        this.app.use( BASE_PATH.AUTH, authPath.router);
        this.app.use( BASE_PATH.GAME, gamePath.router);
    }

}