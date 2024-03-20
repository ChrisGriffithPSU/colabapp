import { IAuthDocument } from "@chrisgriffithpsu/colab-shared/src";
import { compare, hash } from 'bcryptjs';
import { DataTypes, Model, ModelDefined, Optional } from "sequelize";
import { sequelize } from "@auth/database";

const SALT_ROUND = 10;

type AuthUserCreationAttributes = Optional<IAuthDocument, 'id' | 'passwordResetToken' | 'passwordResetExpires'>;

const AuthModel: ModelDefined<IAuthDocument, AuthUserCreationAttributes> = sequelize.define('auths', {
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    profilePicture: {
        type: DataTypes.STRING,
        allowNull: true
    },
    emailVerified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    emailVerficationToken: {
        type: DataTypes.STRING,
        allowNull: true
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: Date.now
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: true
    },
    passwordResetToken: {
        type: DataTypes.STRING,
        allowNull: true
    },
    passwordResetExpires: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: new Date()
    }
}, {
    indexes: [
        {
            unique: true,
            fields: ['email']
        },
        {
            unique: true,
            fields: ['username']
        },
    ]
});

AuthModel.addHook('beforeCreate', async (auth: Model) => {
    const hashedPassword: string = await hash(auth.dataValues.password as string, SALT_ROUND);
    auth.dataValues.password = hashedPassword;
});

export const comparePassword = async function (password: string, hashedPassword: string): Promise<boolean> {
    return compare(password, hashedPassword);
};

export const hashPassword = async function (password: string): Promise<string> {
    return hash(password, SALT_ROUND);
};

AuthModel.sync({});

export { AuthModel };