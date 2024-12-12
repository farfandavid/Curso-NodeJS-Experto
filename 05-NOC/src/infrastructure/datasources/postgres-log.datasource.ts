import { PrismaClient, SeverityLevel } from "@prisma/client";
import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeveityLevel } from "../../domain/entities/log.entity";

const prismaClient = new PrismaClient();

const severityLevelEnum = {
    low: SeverityLevel.LOW,
    medium: SeverityLevel.MEDIUM,
    high: SeverityLevel.HIGH,
}

export class PostgresLogDataSource implements LogDataSource {
    async saveLog(log: LogEntity): Promise<void> {
        const level = severityLevelEnum[log.level];
        await prismaClient.logModel.create({
            data: {
                level: level,
                message: log.message,
                origin: log.origin,
            }
        })
        console.log("Save with Postgres");
        //throw new Error("Method not implemented.");
    }
    async getLogs(severityLevel: LogSeveityLevel): Promise<LogEntity[]> {
        const level = severityLevelEnum[severityLevel];
        const logs = await prismaClient.logModel.findMany({
            where: {
                level: level
            }
        });
        return logs.map(log => LogEntity.fromObject(log))
        //throw new Error("Method not implemented.");
    }

}