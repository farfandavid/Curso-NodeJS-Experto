import { existsSync, readFileSync, rm, rmSync } from 'fs';
import fs from 'fs';
import { SaveFile } from './save-file.use-case';

describe('SaveFileUseCase', () => {
    const options = {
        fileContent: 'custom content',
        fileDestination: 'outputs/custom',
        fileName: 'custom'
    }

    const filePath = `${options.fileDestination}/${options.fileName}.txt`;


    afterEach(() => {
        const outputFolderExists = existsSync('output');
        if (outputFolderExists) rmSync('output', { recursive: true, force: true, maxRetries: 3 });

        const outputCustomFolderExists = existsSync(filePath);
        const outputCustomFolder = options.fileDestination.split('/')[0];
        if (outputCustomFolderExists) rmSync(outputCustomFolder, { recursive: true, force: true, maxRetries: 3 });
    });

    it('should save file with default values', () => {
        const saveFile = new SaveFile();
        const options = {
            fileContent: 'test content',
        }
        const filePath = 'output/table.txt';

        const result = saveFile.execute(options);

        const checkFile = existsSync(filePath);
        const fileContent = readFileSync(filePath, { encoding: 'utf-8' });

        expect(result).toBe(true);
        expect(checkFile).toBe(true);
        expect(fileContent).toBe(options.fileContent);
    })

    it('should save file with custom values', () => {

        const saveFile = new SaveFile();
        const result = saveFile.execute(options);

        const checkFile = existsSync(filePath);
        //const fileContent = readFileSync(filePath, { encoding: 'utf-8' });

        expect(result).toBe(true);
        expect(checkFile).toBe(true);
        //expect(fileContent).toBe(options.fileContent);
    })

    it('should return false when mkdirSync fail', () => {
        const saveFile = new SaveFile();

        const mkdirMock = jest.spyOn(fs, 'mkdirSync').mockImplementation(() => {
            throw new Error('Error');
        });

        const result = saveFile.execute(options);

        expect(result).toBe(false);

        mkdirMock.mockRestore();
    });

    it('should return false when writeFileSync fail', () => {
        const saveFile = new SaveFile();

        const writeFileMock = jest.spyOn(fs, 'writeFileSync').mockImplementation(() => {
            throw new Error('Error');
        });

        const result = saveFile.execute(options);

        expect(result).toBe(false);

        writeFileMock.mockRestore();
    });
});