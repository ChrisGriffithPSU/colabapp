import http from 'http';

// import { Logger } from 'winston';
import { Application, Request, Response, json, urlencoded, NextFunction } from 'express';
// import { Server } from 'socket.io';
import hpp from 'hpp';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import { StatusCodes } from 'http-status-codes';

const SERVER_PORT = 4000;
// const log: Logger = winstonLogger('', 'apiGatewayServer', 'debug');

export class GatewayServer {
    private app: Application;

    constructor(app: Application) {
        this.app = app;
    }

    public start(): void {
        this.securityMiddleware(this.app);
        this.standardMiddleware(this.app);
        // this.routesMiddleware(this.app);
        // this.startElasticSearch();
        this.invalidEndpoint(this.app);
        this.startServer(this.app);
    }

    private securityMiddleware(app: Application): void {
        app.set('trust proxy', 1);
        app.use(hpp);
        app.use(helmet());
        app.use(cors({ credentials: true, methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'] }))
    }

    private standardMiddleware(app: Application): void {
        app.use(compression());
        app.use(json({ limit: '200mb' }));
        app.use(urlencoded({ extended: true, limit: '200mb' }));
    }

    // private routesMiddleware(app: Application): void {

    // }

    // private startElasticSearch(): void {

    // }

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
            console.log("Gateway Server has started with process id ", process.pid);
            httpServer.listen(SERVER_PORT, () => { console.log("Gateway server running on port ", SERVER_PORT) });
        } catch (error) {
            console.log("startServer() error method: ", error);
        }
    }

    // private socketIOConnections(io: Server): void {
    // }
}