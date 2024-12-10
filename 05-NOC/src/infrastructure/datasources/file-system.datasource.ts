import fs from "fs";
import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeveityLevel } from "../../domain/entities/log.entity";

export class FileSystemDataSource implements LogDataSource {

    private readonly logPath = 'logs/';
    private readonly allLogsPath = 'logs/logs-all.log';
    private readonly mediumLogsPath = 'logs/logs-medium.log';
    private readonly highLogsPath = 'logs/logs-high.log';

    constructor() {
        this.createLogsFiles();
    }

    private createLogsFiles = () => {
        if (!fs.existsSync(this.logPath)) {
            fs.mkdirSync(this.logPath);
        }

        [
            this.allLogsPath,
            this.mediumLogsPath,
            this.highLogsPath
        ].forEach((path) => {
            if (fs.existsSync(path)) return;
            fs.writeFileSync(path, '');
        });
    }

    async saveLog(log: LogEntity): Promise<void> {
        const logAsJSON = `${JSON.stringify(log)}\n`;

        fs.appendFileSync(this.allLogsPath, logAsJSON);
        if (log.level === LogSeveityLevel.low) return;
        if (log.level === LogSeveityLevel.medium) {
            fs.appendFileSync(this.mediumLogsPath, logAsJSON);
        } else {
            fs.appendFileSync(this.highLogsPath, logAsJSON);
        }

    }

    private getLogsFromFile = async (path: string): Promise<LogEntity[]> => {
        const content = fs.readFileSync(path, 'utf-8');
        const logs = content.split('\n').map(log => LogEntity.fromJSON(log));

        return logs;
    }
    async getLogs(severityLevel: LogSeveityLevel): Promise<LogEntity[]> {
        switch (severityLevel) {
            case LogSeveityLevel.low:
                return this.getLogsFromFile(this.allLogsPath);
            case LogSeveityLevel.medium:
                return this.getLogsFromFile(this.mediumLogsPath);
            case LogSeveityLevel.high:
                return this.getLogsFromFile(this.highLogsPath);
            default:
                throw new Error(`${severityLevel}: Invalid severity level`);
        }
    }

}