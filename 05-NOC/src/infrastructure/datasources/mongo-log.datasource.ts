import { LogModel } from "../../data/mongo";
import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeveityLevel } from "../../domain/entities/log.entity";

export class MongoDataSource implements LogDataSource {
    async saveLog(log: LogEntity): Promise<void> {
        const newLog = await LogModel.create(log);
        console.log("Save with Mongo");
        //throw new Error("Method not implemented.");
    }

    async getLogs(severityLevel: LogSeveityLevel): Promise<LogEntity[]> {
        const logs = await LogModel.find({ level: severityLevel });

        return logs.map(log => LogEntity.fromObject(log));
        //throw new Error("Method not implemented.");
    }

}