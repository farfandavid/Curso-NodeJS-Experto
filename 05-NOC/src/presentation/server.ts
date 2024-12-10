import { envVars } from "../config/plugin/envs.plugin";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDataSource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl"
import { EmailService } from "./email/email.service";

const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDataSource()
    // new MongoDBDataSource()
);

const emailService = new EmailService();

export class Server {
    static start() {
        console.log('Server started')
        console.log(envVars);

        new SendEmailLogs(emailService, fileSystemLogRepository).execute([
            'farfetchdev@hotmail.com'
        ]);

        // CronService.createJob(
        //     '*/2 * * * * *',
        //     () => {
        //         const url = 'http://localhost:3001';
        //         new ChecksService(
        //             fileSystemLogRepository,
        //             () => console.log(`Service ${url} is up and running`),
        //             (error) => console.error(error)
        //         ).execute(url);
        //         //new ChecksService().execute('http://localhost:3001');
        //     }
        // )

    }
}