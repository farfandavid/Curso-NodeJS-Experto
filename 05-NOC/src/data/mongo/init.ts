import mongoose from "mongoose";

interface ConnectionOptions {
    mongoUrl: string;
    dbName: string;
}

export class MongoDatabase {
    static async connect(options: ConnectionOptions) {

        const { mongoUrl, dbName } = options;
        try {
            await mongoose.connect(mongoUrl, {
                dbName: dbName,
            });
            console.log('MongoDB connection success');
        } catch (error) {
            console.log('MongoDB connection error');
            throw error;
        }
    }
}