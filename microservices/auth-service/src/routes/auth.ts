import { changePassword, forgotPassword, resetPassword } from "@auth/controllers/password";
import { signin } from "@auth/controllers/signin";
import { signup } from "@auth/controllers/signup";
import { updateVerifyEmail } from "@auth/controllers/verify-email";
import express, { Router } from "express";

const router: Router = express.Router();

export function authRoutes(): Router {
    router.post('/signup', signup);
    router.post('/signin', signin);
    router.put('/verify-email', updateVerifyEmail);
    router.put('/forgot-password', forgotPassword);
    router.put('/reset-password/:token', resetPassword);
    router.put('/change-password', changePassword);

    return router;
}