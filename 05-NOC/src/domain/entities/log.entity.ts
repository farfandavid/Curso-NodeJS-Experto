export enum LogSeveityLevel {
    low = 'low',
    medium = 'medium',
    high = 'high'
}

export interface LogEntityOptions {
    level: LogSeveityLevel;
    message: string;
    createdAt?: Date;
    origin: string;
}

export class LogEntity implements LogEntityOptions {

    public level: LogSeveityLevel;
    public message: string;
    public createdAt: Date;
    public origin: string;

    constructor(options: LogEntityOptions) {
        this.level = options.level;
        this.message = options.message;
        this.createdAt = options.createdAt || new Date();
        this.origin = options.origin;
    }

    static fromJSON = (json: any): LogEntity => {
        const { message, level, createdAt } = JSON.parse(json);
        if (!message || !level || !createdAt) {
            throw new Error('Invalid JSON');
        }

        const log = new LogEntity({
            message,
            level,
            createdAt,
            origin: 'log.entity.ts'
        });
        return log;
    }
}