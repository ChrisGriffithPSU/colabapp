import { getAuthUserById } from "@auth/services/auth.service";
import { IAuthDocument } from "@chrisgriffithpsu/colab-shared/src";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export async function currentUser(req: Request, res: Response): Promise<void> {
    let user = null;
    const existingUser: IAuthDocument | undefined = await getAuthUserById(req.currentUser!.id);

    if (Object.keys(existingUser!).length) {
        user = existingUser;
    }
    
    res.status(StatusCodes.OK).json({ message: 'Authenticated user', user });
}