import { AuthModel } from "@auth/models/auth.schema";
import { IAuthDocument } from "@chrisgriffithpsu/colab-shared/src";
import { sign } from "jsonwebtoken";
import { omit } from "lodash";
import { Model, Op } from "sequelize";

export async function createAuthUser(data: IAuthDocument): Promise<IAuthDocument | undefined> {
    try {
        const result: Model = await AuthModel.create(data);
        // Send message to user service of user data to create a user
        const userData: IAuthDocument = omit(result.dataValues, ['password']) as IAuthDocument;
        return userData;
    } catch (error) {
        console.log(error);
    }
}

export async function getAuthUserById(authId: number): Promise<IAuthDocument | undefined> {
    try {
        const user: Model = await AuthModel.findOne({ where: { id: authId }, attributes: { exclude: ['password'] }}) as Model;
        return user?.dataValues;
    } catch (error) {
        console.log(error);
    }
}

export async function getUserByUsername(username: string): Promise<IAuthDocument | undefined> {
    try {
        const user: Model = await AuthModel.findOne({ where: { username }}) as Model; // Might need to change firstLetter to uppercase
        return user?.dataValues;
    } catch (error) {
        console.log(error);
    }
}

export async function getUserByEmail(email: string): Promise<IAuthDocument | undefined> {
    try {
        const user: Model = await AuthModel.findOne({ where: { email: email }}) as Model;
        return user?.dataValues;
    } catch (error) {
        console.log(error);
    }
}

export async function getAuthUserByVerificationToken(token: string): Promise<IAuthDocument | undefined> {
    try {
        const user: Model = await AuthModel.findOne({ where: { emailVerficationToken: token }, attributes: { exclude: ['password'] }}) as Model;
        return user?.dataValues;
    } catch (error) {
        console.log(error);
    }
}

export async function getAuthUserByPasswordToken(token: string): Promise<IAuthDocument | undefined> {
    try {
        const user: Model = await AuthModel.findOne({
            where: { [Op.and]: [{ passwordResetToken: token }, { passwordResetExpires: { [Op.gt]: new Date() }}] }
        }) as Model;
        return user?.dataValues;
    } catch (error) {
        console.log(error);
    }
}

export async function updateVerifyEmailField(authId: number, emailVerified: boolean, emailVerficationToken?: string): Promise<void> {
    try {
        await AuthModel.update(!emailVerficationToken ? { emailVerified } : { emailVerficationToken, emailVerified }, { where: { id: authId }});
    } catch (error) {
        console.log(error);
    }
}

export async function updatePasswordToken(authId: number, token: string, tokenExpiration: Date): Promise<void> {
    try {
        await AuthModel.update({ passwordResetToken: token, passwordResetExpires: tokenExpiration }, { where: { id: authId }});
    } catch (error) {
        console.log(error);
    }
}

export async function updatePassword(authId: number, password: string): Promise<void> {
    try {
        await AuthModel.update({ password, passwordResetToken: '', passwordResetExpires: new Date() }, { where: { id: authId }});
    } catch (error) {
        console.log(error);
    }
}

export function signToken(id: number, email: string, username: string): string {
    return sign({ id, email, username }, '0b6ab42cebb32baa8696d9214b07bb5d99d90d3cb8ca99826f309e5c0489ad43');
}