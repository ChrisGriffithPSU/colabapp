import express, { Express } from 'express';
import { GatewayServer } from '@document/server';
import { databaseConnection } from '@document/database';

class Application {
    public initialize(): void {
        databaseConnection();
        const app: Express = express();
        const server: GatewayServer = new GatewayServer(app);
        server.start();
    }
}

const application: Application = new Application();
application.initialize();