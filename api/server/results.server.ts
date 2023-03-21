import express, { Application } from 'express';
import config from '../config'
import resultRoutes from '../routes/results.routes';
import cors from 'cors';
import db from '../database/results.database';

class Server {
    private app: Application;

    constructor() {
        this.app = express();
        this.dbConnection();
        this.middlewares();
        this.routes();
    }

    async dbConnection() {
        try {
            await db.authenticate();
            console.log('Database connected');
        } catch (error) {
            console.error(error, 'Error connecting to DB');
        }
    }

    middlewares() {
        this.app.use( cors() );
        this.app.use( express.json() );
        this.app.use( express.static('public') );
    }

    routes() {
        this.app.use( config.apiPaths.results, resultRoutes );
    }

    listen() {
        this.app.listen( config.port, () => {
            console.log(`Server up and running at port: ${config.port}`);
        })
    }

}

export default Server;