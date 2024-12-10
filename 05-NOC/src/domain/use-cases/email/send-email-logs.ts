import { EmailService } from "../../../presentation/email/email.service";
import { LogEntity, LogSeveityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface SendLogEmailUseCase {
    execute: (to: string | string[]) => Promise<boolean>
}

export class SendEmailLogs implements SendLogEmailUseCase {

    constructor(
        private readonly emailService: EmailService,
        private readonly logRepository: LogRepository,
    ) {

    }
    async execute(to: string | string[]): Promise<boolean> {
        try {
            const sent = await this.emailService.sendEmailWithFileSystemLogs(to);
            if (!sent) throw new Error('Email not sent');

            return true;
        } catch (error) {
            const log = new LogEntity({
                level: LogSeveityLevel.high,
                message: `${error}`,
                origin: 'email.service.ts',
            })
            this.logRepository.saveLog(log);
            return false;
        }
    }
}