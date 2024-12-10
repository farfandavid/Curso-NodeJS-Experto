
const runCommand = async (args: string[]) => {
    process.argv = [...process.argv, ...args];

    const { myArgs } = await import('./args.plugin');

    return myArgs;
}

describe('ArgsPlugin', () => {

    const originalArgv = process.argv;
    beforeEach(() => {
        process.argv = originalArgv;
        jest.resetModules();
    });

    test('should return the default values', async () => {
        const argv = await runCommand(['-b', '5']);

        expect(argv).toEqual(expect.objectContaining({
            base: 5,
            limit: 10,
            show: false,
            name: 'table',
            destination: 'output'
        }))
    });

    it('should return configuration with custom value', async () => {
        const argv = await runCommand(['-b', '5', '-l', '20', '-s', '-n', 'custom-name', '-d', 'custom-destination']);

        expect(argv).toEqual(expect.objectContaining({
            base: 5,
            limit: 20,
            show: true,
            name: 'custom-name',
            destination: 'custom-destination'
        }))
    })
});