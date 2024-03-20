import { signupSchema } from "@auth/schemas/signup";
import { createAuthUser, getUserByEmail, getUserByUsername, signToken } from "@auth/services/auth.service";
import { IAuthDocument, IEmailMessageDetails } from "@chrisgriffithpsu/colab-shared/src";
import { Response, Request } from "express";
// import { v4 as uuid } from "uuid";
import crypto from 'crypto';
import { publishDirectMessage } from "@auth/queues/producer";
import { authChannel } from "@auth/server";
import { StatusCodes } from "http-status-codes";

export async function signup(req: Request, res: Response): Promise<void> {
    const { error } = await Promise.resolve(signupSchema.validate(req.body));
    if (error?.details) {
        throw new Error(error.details[0].message);
    }

    const { username, email, password } = req.body;
    const emailAlreadyExists: IAuthDocument | undefined = await getUserByEmail(email);
    const usernameAlreadyExists: IAuthDocument | undefined = await getUserByUsername(username);
    
    if (emailAlreadyExists || usernameAlreadyExists) {
        throw new Error('Invalid credentials. Email or Username must be unique');
    }

    // const profileId = uuid();
    const randomBytes: Buffer = await Promise.resolve(crypto.randomBytes(20));
    const randomCharacters: string = randomBytes.toString('hex');
    const authData: IAuthDocument = {
        username,
        email,
        password,
        emailVerficationToken: randomCharacters,
    } as IAuthDocument;
    const result: IAuthDocument = await createAuthUser(authData) as IAuthDocument;
    const verificationLink = `${process.env.CLIENT_URL}/confirm_email?v_token=${authData.emailVerficationToken}`;
    const emailDetails: IEmailMessageDetails = {
        receiverEmail: result.email,
        verifyLink: verificationLink,
        template: 'verifyEmail'
    };

    await publishDirectMessage(authChannel, 'email.notification', 'auth.email', JSON.stringify(emailDetails));
    const userJWT: string = signToken(result.id!, result.email!, result.username!);
    res.status(StatusCodes.CREATED).json({ message: 'User created successfully', user: result, token: userJWT });
}