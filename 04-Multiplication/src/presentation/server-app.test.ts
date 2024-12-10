import { CreateTable } from '../domain/use-cases/create-table.use-case';
import { SaveFile } from '../domain/use-cases/save-file.use-case';
import { ServerApp } from './server-app';

describe('Server App', () => {

    const options = {
        base: 2,
        limit: 10,
        showTable: true,
        destination: 'tmp',
        name: 'table'
    }

    beforeAll(() => {
        jest.clearAllMocks();
    })

    it('should create ServerApp instance', () => {
        const serverApp = new ServerApp();
        expect(serverApp).toBeInstanceOf(ServerApp);

        expect(typeof ServerApp.run).toBe('function');
    });

    it('should run ServerApp with options', () => {

        const logSpy = jest.spyOn(console, 'log').mockImplementation();
        const createTableSpy = jest.spyOn(CreateTable.prototype, 'execute');
        const saveFileSpy = jest.spyOn(SaveFile.prototype, 'execute');

        ServerApp.run(options);

        expect(logSpy).toHaveBeenCalledWith('ServerApp is running');
        expect(logSpy).toHaveBeenLastCalledWith('Table created!');
        expect(createTableSpy).toHaveBeenCalledWith({ base: options.base, limit: options.limit });
        expect(saveFileSpy).toHaveBeenCalledWith({
            //expect.any(String) is used to avoid testing the exact content of the file
            fileContent: createTableSpy.mock.results[0].value,
            fileDestination: options.destination,
            fileName: options.name
        });
    })

    it('should run with custom values mocked', () => {
        const logMock = jest.fn();
        const logErrorMock = jest.fn();
        const createMock = jest.fn().mockReturnValue('1 x 2 = 2');
        const saveFileMock = jest.fn().mockReturnValue(true);

        console.log = logMock;
        console.error = logErrorMock;
        CreateTable.prototype.execute = createMock;
        SaveFile.prototype.execute = saveFileMock;

        ServerApp.run(options);

        expect(logMock).toHaveBeenCalledWith('ServerApp is running');
        //expect(logMock).toHaveBeenLastCalledWith(undefined, 'Table created!');
        expect(createMock).toHaveBeenCalledWith({ base: options.base, limit: options.limit });
        expect(saveFileMock).toHaveBeenCalledWith({
            //expect.any(String) is used to avoid testing the exact content of the file
            fileContent: createMock.mock.results[0].value,
            fileDestination: options.destination,
            fileName: options.name
        });
        expect(logMock).toHaveBeenLastCalledWith('Table created!');
        expect(logErrorMock).not.toHaveBeenCalled();
    })
});

