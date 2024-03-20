import http from 'http';
import { Application } from "express";

const SERVER_PORT = 4001;

export function start(app: Application): void {
    startServer(app);
    startQueues();
}

async function startQueues(): Promise<void> {

}

function startServer(app: Application): void {
    try {
        const httpServer: http.Server = new http.Server(app);
        console.log(`Worker with process id of ${process.pid} on notification server has started`);
        httpServer.listen(SERVER_PORT, () => { console.log(`Notification server running on port ${SERVER_PORT}`) });
    } catch (error) {
        console.log("NotificationService startServer() method: ",  error);
    }
}