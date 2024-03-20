import { currentUser } from "@auth/controllers/current-user";
import { token } from "@auth/controllers/refresh-token";
import express, { Router } from "express";

const router: Router = express.Router();

export function currentUserRoutes(): Router {
    router.get('/currentuser', currentUser);
    router.get('/refresh-token/:username', token);

    return router;
}