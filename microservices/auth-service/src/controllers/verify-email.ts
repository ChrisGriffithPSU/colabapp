import { getAuthUserById, getAuthUserByVerificationToken, updateVerifyEmailField } from "@auth/services/auth.service";
import { IAuthDocument } from "@chrisgriffithpsu/colab-shared/src";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export async function updateVerifyEmail(req: Request, res: Response): Promise<void> {
    const { token } = req.body;
    const user: IAuthDocument | undefined = await getAuthUserByVerificationToken(token);
    if (!user) {
        throw new Error('verification token is either invalid or is already used.');
    }
    await updateVerifyEmailField(user.id!, true);
    const updatedUser = await getAuthUserById(user.id!);
    res.status(StatusCodes.OK).json({ message: 'Email Verified Successfully', user: updatedUser });
}