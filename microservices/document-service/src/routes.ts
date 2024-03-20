import { Application } from "express";
import { documentRoutes } from "@document/routes/document";

const BASE_PATH = '/api/v1/documents';

const appRoutes = (app: Application): void => {
    app.use(BASE_PATH, documentRoutes());
}

export { appRoutes };