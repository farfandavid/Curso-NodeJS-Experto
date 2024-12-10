import { CreateTable, CreateTableUseCase } from './create-table.use-case';

describe('CreateTableUseCase', () => {
    it('should create table with default values', () => {
        const createTable = new CreateTable();
        const table = createTable.execute({ base: 10 });
        const rows = table.split('\n');

        expect(createTable).toBeInstanceOf(CreateTable);
        expect(table).toContain('10 x 1 = 10');
        expect(table).toContain('10 x 10 = 100');
        expect(rows.length).toBe(10);
    })

    it('should create table with custom values', () => {
        const options = { base: 10, limit: 5 };
        const createTable = new CreateTable();
        const table = createTable.execute(options);
        const rows = table.split('\n');

        expect(createTable).toBeInstanceOf(CreateTable);
        expect(table).toContain('10 x 1 = 10');
        expect(table).toContain('10 x 5 = 50');
        expect(rows.length).toBe(options.limit);
    })
});