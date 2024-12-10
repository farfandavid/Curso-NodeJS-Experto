import { level } from "winston";
import { buildLogger } from "../../src/plugins";
import { logger } from "../../src/plugins/logger.plugin";

describe('plugin/logger.plugin', () => {
    it('should log a message', () => {
        const loggerBuilded = buildLogger('test');
        loggerBuilded.log('test message');
        expect(loggerBuilded).toBeDefined();
    });

    it('buildLogger shoul retun a function and if winston called',()=>{
        /* const logger = buildLogger('test');
        expect(typeof logger.log).toBe('function');
        expect(typeof logger.error).toBe('function'); */
        const winstonLoggerMock = jest.spyOn(logger, 'log');
        const message = 'test message';
        const service = 'test service';

        const loggerBuilded = buildLogger(service);
        loggerBuilded.log(message);
        loggerBuilded.error(message);
        expect(winstonLoggerMock).toHaveBeenCalledWith(
            'info',
            expect.objectContaining(
            {
                level: 'info',
                message,
                service
            }),
        );
        
    })
});