import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeveityLevel } from "../../domain/entities/log.entity";
import { LogRepository } from "../../domain/repository/log.repository";

export class LogRepositoryImpl implements LogRepository {
    //private logDatasource: LogDataSource;
    constructor(
        private readonly logDatasource: LogDataSource,
    ) {

    }
    async saveLog(log: LogEntity): Promise<void> {
        this.logDatasource.saveLog(log);
    }
    async getLogs(severityLevel: LogSeveityLevel): Promise<LogEntity[]> {
        return this.logDatasource.getLogs(severityLevel);
    }

}