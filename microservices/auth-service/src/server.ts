import http from 'http';

import { IErrorResponse } from '@chrisgriffithpsu/colab-shared/src';
import { Application, Request, Response, NextFunction, json, urlencoded } from 'express';
// import hpp from 'hpp';
// import helmet from 'helmet';
// import cors from 'cors';
// import { verify } from 'jsonwebtoken';
import compression from 'compression';
import { checkConnection, createIndex } from './elasticsearch';
import { Channel } from 'amqplib';
import { createConnection } from '@auth/queues/connection';
import { appRoutes } from './routes';

const SERVER_PORT = 4001;
export let authChannel: Channel;

export function start(app: Application): void {
    standardMiddleware(app);
    routesMiddleware(app);
    authErrorHandler(app);
    startElasticSearch();
    startQueues();
    startServer(app);
}

// function securityMiddleware(app: Application): void {
//     app.set('trust proxy', 1);
//     app.use(hpp());
//     app.use(helmet());
//     app.use(
//       cors({
//         origin: config.API_GATEWAY_URL,
//         credentials: true,
//         methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
//       })
//     );
//     app.use((req: Request, _res: Response, next: NextFunction) => {
//       if (req.headers.authorization) {
//         const token = req.headers.authorization.split(' ')[1];
//         const payload: IAuthPayload = verify(token, config.JWT_TOKEN!) as IAuthPayload;
//         req.currentUser = payload;
//       }
//       next();
//     });
//   }

function standardMiddleware(app: Application): void {
    app.use(compression());
    app.use(json({ limit: '200mb' }));
    app.use(urlencoded({ extended: true, limit: '200mb' }));
}

function routesMiddleware(app: Application): void {
  appRoutes(app);
}

function authErrorHandler(app: Application): void {
    app.use((error: IErrorResponse, _req: Request, res: Response, next: NextFunction) => {
      console.log('AuthService Error ' + error);
      // removed error instanceof CustomError because CustomError was giving me an export issue
      if (error) {
        res.status(error.statusCode).json(error.serializeErrors());
      }
      next();
    });
}

function startElasticSearch(): void {
  checkConnection();
  createIndex('document');
}

async function startQueues(): Promise<void> {
  authChannel = await createConnection() as Channel;
}

function startServer(app: Application): void {
  try {
    const httpServer: http.Server = new http.Server(app);
    console.log(`Authentication server has started with process id ${process.pid}`);
    httpServer.listen(SERVER_PORT, () => {
      console.log(`Authentication server running on port ${SERVER_PORT}`);
    });
  } catch (error) {
    console.log("Auth error " + error);
  }
}