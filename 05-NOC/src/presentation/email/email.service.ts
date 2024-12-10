import nodemailer from 'nodemailer';
import { envVars } from '../../config/plugin/envs.plugin';
import { LogRepository } from '../../domain/repository/log.repository';
import { LogEntity, LogSeveityLevel } from '../../domain/entities/log.entity';

interface SendEmailOptions {
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachements?: Attachement[];
}

interface Attachement {
    filename: string;
    path: string;
}

export class EmailService {
    private transporter = nodemailer.createTransport({
        service: envVars.MAILER_SERVICE,
        auth: {
            user: envVars.MAILER_EMAIL,
            pass: envVars.MAILER_SECRET_KEY
        }
    });

    constructor(
    ) {

    }

    async sendEmail(options: SendEmailOptions): Promise<boolean> {
        const { to, subject, htmlBody, attachements = [] } = options;
        try {

            const sentInformation = await this.transporter.sendMail({
                to: to,
                subject: subject,
                html: htmlBody,
                attachments: attachements,
            })

            const log = new LogEntity({
                level: LogSeveityLevel.low,
                message: 'Email sent',
                origin: 'email.service.ts',
            })

            return true;
        } catch (error) {
            const log = new LogEntity({
                level: LogSeveityLevel.high,
                message: 'Email not sent',
                origin: 'email.service.ts',
            })
            return false;
        }
    }

    async sendEmailWithFileSystemLogs(to: string | string[]) {
        const subject = 'Logs del servidor';
        const htmlBody = `
            <h1>Logs del servidor</h1>
            <p>Adjunto encontrarás los logs del servidor</p>
            `;
        const attachements: Attachement[] = [
            {
                filename: 'logs-all.log',
                path: 'logs/logs-all.log'
            },
            {
                filename: 'logs-high.log',
                path: 'logs/logs-high.log'
            },
            {
                filename: 'logs-medium.log',
                path: 'logs/logs-medium.log'
            }
        ];
        return this.sendEmail({ to, subject, htmlBody, attachements });
    }
}