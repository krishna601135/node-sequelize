import * as mongoose from 'mongoose';

class DatabaseConnection {
    connectToDb() {
        return new Promise((resolve, reject) => {
            const dbURL: any = process.env.MONGO_URL;
            mongoose.connect(dbURL)
                .then(() => { console.log("connected "); resolve(true) })
                .catch((err) => { return reject(err) })
        });
    }
}

export const databaseConnection = new DatabaseConnection();