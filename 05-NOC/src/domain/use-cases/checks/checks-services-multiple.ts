import { LogEntity, LogSeveityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface ChecksServiceUseCase {
    execute(url: string): Promise<boolean>
}

type SuccessCallback = (() => void) | undefined;
type ErrorCallback = ((error: string) => void) | undefined;

export class ChecksServiceMultiple implements ChecksServiceUseCase {

    constructor(
        private readonly logRepository: LogRepository[],
        private readonly successCallback: SuccessCallback,
        private readonly errorCallback: ErrorCallback
    ) { }

    private callLogsRepository(log: LogEntity) {
        this.logRepository.forEach(logRepository => {
            logRepository.saveLog(log);
        })
    }

    public async execute(url: string): Promise<boolean> {
        try {
            const req = await fetch(url);
            if (!req.ok) {
                throw new Error(`Failed to fetch ${url}`);
            }
            const log = new LogEntity({
                level: LogSeveityLevel.low,
                message: `Service ${url} is up and running`,
                origin: 'checks-service.ts'
            });
            this.callLogsRepository(log);
            this.successCallback && this.successCallback();
            return true;
        } catch (error) {
            const errorMessage = `Failed to fetch ${url} - ${error}`;
            const log = new LogEntity({
                level: LogSeveityLevel.high,
                message: errorMessage,
                origin: 'checks-service.ts'
            });
            this.callLogsRepository(log);
            this.errorCallback && this.errorCallback(errorMessage);
            return false;
        }
    }
}