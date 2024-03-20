import crypto from 'crypto';
import { getAuthUserByPasswordToken, getUserByEmail, getUserByUsername, updatePassword, updatePasswordToken } from '@auth/services/auth.service';
import { Request, Response } from 'express';
import { IAuthDocument, IEmailMessageDetails } from '@chrisgriffithpsu/colab-shared/src'
import { publishDirectMessage } from '@auth/queues/producer';
import { authChannel } from '@auth/server';
import { StatusCodes } from 'http-status-codes'
import { hashPassword } from '@auth/models/auth.schema';

export async function forgotPassword(req: Request, res: Response): Promise<void> {
    const { email } = req.body;
    const existingUser: IAuthDocument | undefined = await getUserByEmail(email);

    if (!existingUser) {
        throw new Error('Invalid Credentials');
    }

    const randomBytes: Buffer = await Promise.resolve(crypto.randomBytes(20));
    const randomCharacters: string = randomBytes.toString('hex');
    const date: Date = new Date();
    date.setHours(date.getHours() + 1);
    await updatePasswordToken(existingUser.id!, randomCharacters, date);
    
    const messageDetails: IEmailMessageDetails = {
        receiverEmail: existingUser.email,
        resetLink: randomCharacters,
        username: existingUser.username,
        template: 'forgotPassword'
    };

    await publishDirectMessage(authChannel, 'email.notification', 'auth.email', JSON.stringify(messageDetails));
    res.status(StatusCodes.OK).json({ message: 'Password reset sent.' });
}

export async function resetPassword(req: Request, res: Response): Promise<void> {
    const { password, confirmPassword } = req.body;
    const { token } = req.params;

    if (password !== confirmPassword) {
        throw new Error('Passwords do not match');
    }

    const existingUser: IAuthDocument | undefined = await getAuthUserByPasswordToken(token);
    if (!existingUser) {
        throw new Error('Reset token has expired');
    }

    const hashedPassword: string = await hashPassword(password);
    await updatePassword(existingUser.id!, hashedPassword);
    const messageDetails: IEmailMessageDetails = {
        username: existingUser.username,
        template: 'resetPasswordSuccess'
    }
    await publishDirectMessage(authChannel, 'email.notification', 'auth.email', JSON.stringify(messageDetails));
    res.status(StatusCodes.OK).json({ message: 'Password successfully updated.' });
}

export async function changePassword(req: Request, res: Response): Promise<void> {
    const { newPassword } = req.body;
    const existingUser: IAuthDocument | undefined = await getUserByUsername(`${req.currentUser?.username}`);
    
    if (!existingUser) {
        throw new Error('Must be signed in');
    }

    const hashedPassword: string = await hashPassword(newPassword);
    await updatePassword(existingUser.id!, hashedPassword);

    const messageDetails: IEmailMessageDetails = {
        username: existingUser.username,
        template: 'resetPasswordSuccess'
    };
    await publishDirectMessage(authChannel, 'email.notification', 'auth.email', JSON.stringify(messageDetails));
    res.status(StatusCodes.OK).json({ message: 'Password successfully updated.' });
}