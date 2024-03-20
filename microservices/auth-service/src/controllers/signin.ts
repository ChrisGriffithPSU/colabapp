import { comparePassword } from "@auth/models/auth.schema";
import { getUserByEmail, getUserByUsername, signToken } from "@auth/services/auth.service";
import { IAuthDocument } from "@chrisgriffithpsu/colab-shared/src";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { omit } from "lodash";

export async function signin(req: Request, res: Response): Promise<void> {
    const { username, password } = req.body;
    const usernameIsEmail: boolean = isEmail(username)
    const existingUser: IAuthDocument | undefined = !usernameIsEmail ? await getUserByUsername(username) : await getUserByEmail(username);

    if (!existingUser) {
        throw new Error('Invalid credentials');
    }

    const passwordsMatch: boolean = await comparePassword(password, existingUser.password!);
    
    if (!passwordsMatch) {
        throw new Error('Invalid credential');
    }

    const userJWT: string = signToken(existingUser.id!, existingUser.email!, existingUser.username!);
    const userData: IAuthDocument = omit(existingUser, ['password']);

    res.status(StatusCodes.OK).json({ message: 'User login successful', user: userData, token: userJWT });
}

export function isEmail(email: string): boolean {
    const regexExp =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;
    return regexExp.test(email);
}