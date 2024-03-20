import { Sequelize } from 'sequelize';

export const sequelize: Sequelize = new Sequelize(`mysql://colab:api@localhost:3306/colab_auth`, {
    dialect: 'mysql',
    logging: false,
    dialectOptions: { multipleStatements: true }
});

export async function databaseConnection(): Promise<void> {
    try {
        await sequelize.authenticate();
        console.log("AuthService Mysql database connection has been established successfully.");
    } catch (error) {
        console.log("Auth Service - Unable to connect to database. " + error);
    }
}