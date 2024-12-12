import { ChecksServiceMultiple } from "../domain/use-cases/checks/checks-services-multiple";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDataSource } from "../infrastructure/datasources/file-system.datasource";
import { MongoDataSource } from "../infrastructure/datasources/mongo-log.datasource";
import { PostgresLogDataSource } from "../infrastructure/datasources/postgres-log.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl"
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";

const fsLogRepository = new LogRepositoryImpl(
    new FileSystemDataSource()
);

const mongoLogRepository = new LogRepositoryImpl(
    new MongoDataSource()
);

const pgLogRepository = new LogRepositoryImpl(
    new PostgresLogDataSource()
);

const emailService = new EmailService();

export class Server {
    public static async start() {
        console.log('Server started')
        //console.log(envVars);

        // new SendEmailLogs(emailService, fileSystemLogRepository).execute([
        //     'farfetchdev@hotmail.com'
        // ]);

        CronService.createJob(
            '*/10 * * * * *',
            () => {
                const url = 'http://localhost:3001';
                //const url = 'https://www.google.com.ar';
                new ChecksServiceMultiple(
                    [fsLogRepository, mongoLogRepository, pgLogRepository],
                    () => console.log(`Service ${url} is up and running`),
                    (error) => console.error(error)
                ).execute(url)
                /* new ChecksService(
                    logRepository,
                    () => console.log(`Service ${url} is up and running`),
                    (error) => console.error(error)
                ).execute(url); */
                //new ChecksService().execute('http://localhost:3001');
            }
        )

    }
}