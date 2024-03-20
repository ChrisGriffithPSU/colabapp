import { Application } from "express";
import { authRoutes } from "./routes/auth";
import { currentUserRoutes } from "./routes/current-user";

const BASE_PATH = '/api/v1/auth';

export function appRoutes(app: Application): void {
    app.use(BASE_PATH, authRoutes());
    app.use(BASE_PATH, currentUserRoutes());
}