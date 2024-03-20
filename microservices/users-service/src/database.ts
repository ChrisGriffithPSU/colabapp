import mongoose from 'mongoose';

const databaseConnection = async (): Promise<void> => {
    try {
        await mongoose.connect(`mongodb://127.0.0.1:27017/colab-users`);
        console.log('Users service successfully connected to database.');
    } catch (error) {
        console.log('Users service databaseConnection() method error: ' + error);
    }
};

export { databaseConnection };