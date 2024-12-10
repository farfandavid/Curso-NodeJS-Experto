import fs from 'fs';
export interface SaveFileUseCase {
    execute: (options: Options) => boolean;
}

export interface Options {
    fileContent: string;
    fileDestination?: string;
    fileName?: string;
}

export class SaveFile implements SaveFileUseCase {
    constructor() {

    }

    execute({
        fileContent,
        fileDestination: destination = "output",
        fileName = "table"
    }: Options): boolean {
        try {
            fs.mkdirSync(destination, { recursive: true });
            fs.writeFileSync(`${destination}/${fileName}.txt`, fileContent);

            return true;
        } catch (error) {
            return false;
        }

    };
}