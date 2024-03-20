// import { winstonLogger } from "@chrisgriffithpsu/colab-shared/src";
// import { Logger } from "winston";
// import { config } from "@document/config";
import mongoose from "mongoose";

// const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'DocumentDatabaseServer', 'debug');

const databaseConnection = async (): Promise<void> => {
    try {
        await mongoose.connect(`mongodb://127.0.0.1:27017/colab-document`);
        console.log("Successfully Connected to database");
        // log.info('Document Service successfully connected to database.');
    } catch (error) {
        console.log("Could not connect to database ", error)
        // log.log('error', 'Document Service databaseConnection() method error:', error);
    }
};

export { databaseConnection }