import { envVars } from "./config/plugin/envs.plugin";
import { LogModel, MongoDatabase } from "./data/mongo";
import { Server } from "./presentation/server";

(async () => {
    main();
})();

async function main() {
    await MongoDatabase.connect({
        mongoUrl: envVars.MONGO_URL,
        dbName: envVars.MONGO_DB_NAME,
    })
    /* const newLog = await LogModel.create({
        level: "low",
        message: 'Test',
        origin: 'localhost',
    })

    await newLog.save(); */
    const logs = await LogModel.find();
    console.table(logs.map(log => log.toJSON()), Object.keys(logs[0].toJSON()));
    //Server.start();
}