import compression from "compression";
import http from 'http';
import { Application, json, urlencoded } from "express";
import { checkConnection } from "./elasticsearch";
import { Channel } from "amqplib";
import { createConnection } from "./queues/connection";

const SERVER_PORT = 4003;

const start = (app: Application): void => {
    standardMiddleware(app);
    startQueues();
    startElasticSearch();
    startServer(app);
};

const standardMiddleware = (app: Application): void => {
    app.use(compression());
    app.use(json({ limit: '200mb' }));
    app.use(urlencoded({ extended: true, limit: '200mb' }));
};

const startQueues = async (): Promise<void> => {
    const userChannel: Channel = await createConnection() as Channel;
};

const startElasticSearch = (): void => {
    checkConnection();
};

const startServer = (app: Application): void => {
    try {
        const httpServer: http.Server = new http.Server(app);
        console.log('Users server has started with process id ' + process.pid);
        httpServer.listen(SERVER_PORT, () => {
            console.log('Users server running on port ' + SERVER_PORT);
        });
    } catch (error) {
        console.log('Users service startServer() method error: ' + error);
    }
};

export { start }