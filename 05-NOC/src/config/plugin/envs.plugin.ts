import { z } from 'zod';

export const envSchema = z.object({
    PORT: z.string().transform(Number).pipe(z.number().min(0).max(65535)),
    MAILER_EMAIL: z.string().email(),
    MAILER_SECRET_KEY: z.string(),
    MAILER_SERVICE: z.string(),
    PROD: z.string().transform(Boolean),
})

export const envVars = envSchema.parse(process.env);