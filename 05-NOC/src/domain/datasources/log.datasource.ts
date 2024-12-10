import { LogEntity, LogSeveityLevel } from "../entities/log.entity";

export abstract class LogDataSource {
    abstract saveLog(log: LogEntity): Promise<void>;
    abstract getLogs(severityLevel: LogSeveityLevel): Promise<LogEntity[]>;
}

