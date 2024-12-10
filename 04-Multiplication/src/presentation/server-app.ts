import { CreateTable } from "../domain/use-cases/create-table.use-case";
import { SaveFile } from "../domain/use-cases/save-file.use-case";

interface RunOptions {
    base: number;
    limit: number;
    showTable: boolean;
    destination: string;
    name: string;
}

export class ServerApp {
    static run(options: RunOptions) {
        console.log('ServerApp is running');
        const table = new CreateTable().execute({ base: options.base, limit: options.limit });
        const wasCreated = new SaveFile().execute({
            fileContent: table,
            fileDestination: options.destination,
            fileName: options.name
        });
        if (options.showTable) console.log(table);
        wasCreated ? console.log('Table created!') : console.log('Table not created!');
    }
}
