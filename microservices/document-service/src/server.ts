import http from 'http';
// import { Logger } from 'winston';
import { Application, Request, Response, json, urlencoded, NextFunction } from 'express';
// import { Server } from 'socket.io';
// import hpp from 'hpp';
// import helmet from 'helmet';
// import cors from 'cors';
import compression from 'compression';
import { StatusCodes } from 'http-status-codes';
import { appRoutes } from './routes';
import { checkConnection, createIndex } from './elasticsearch';
import { Channel } from 'amqplib';
import { createConnection } from './queues/connection';

const SERVER_PORT = 4002;
// const log: Logger = winstonLogger('', 'apiGatewayServer', 'debug');
let documentChannel: Channel;

export class GatewayServer {
    private app: Application;

    constructor(app: Application) {
        this.app = app;
    }

    public start(): void {
        // this.securityMiddleware(this.app);
        this.standardMiddleware(this.app);
        this.routesMiddleware(this.app);
        this.startElasticSearch();
        this.invalidEndpoint(this.app);
        this.startServer(this.app);
        this.startQueues();
    }

    // private securityMiddleware(app: Application): void {
    //     app.set('trust proxy', 1);
    //     app.use(hpp);
    //     app.use(helmet());
    //     app.use(cors({ credentials: true, methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'] }))
    // }

    private standardMiddleware(app: Application): void {
        app.use(compression());
        app.use(json({ limit: '200mb' }));
        app.use(urlencoded({ extended: true, limit: '200mb' }));
    }

    private routesMiddleware(app: Application): void {
        appRoutes(app);
    }

    private startElasticSearch(): void {
        checkConnection();
        createIndex('document');
    }

    private startQueues = async (): Promise<void> => {
        documentChannel = await createConnection() as Channel;
    }

    private invalidEndpoint(app: Application): void {
        app.use('*', (req: Request, res: Response, next: NextFunction) => {
            const fullURL = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
            console.log(`${fullURL} endpoint does not exist.`);
            res.status(StatusCodes.NOT_FOUND).json({ message: 'This endpoint does not exist.' });
            next();
        })
    }

    private async startServer(app: Application): Promise<void> {
        try {
            const httpServer: http.Server = new http.Server(app);
            this.startHttpServer(httpServer);
        } catch(error) {
            console.log(`Error: ${error}`);
        }
    }

    // private async createSocketIO(httpServer: http.Server): Promise<void> {
    // }

    private async startHttpServer(httpServer: http.Server): Promise<void> {
        try {
            console.log("Document Server has started with process id ", process.pid);
            httpServer.listen(SERVER_PORT, () => { console.log("Document server running on port ", SERVER_PORT) });
        } catch (error) {
            console.log("startServer() error method: ", error);
        }
    }

    // private socketIOConnections(io: Server): void {
    // }
}

export { documentChannel };