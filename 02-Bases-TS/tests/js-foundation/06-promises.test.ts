import { getPokemonById } from "../../src/js-foundation/06-promises";

describe('js-foundation/06-promises tests', () => {
    test('getPokemonById should return a string', async() => {
        const pokemon = await getPokemonById(2);
        expect(typeof pokemon).toBe('string');
        expect(pokemon).toBe('ivysaur');
    });
    test('getPokemonById return an error if pokemon does not exist', async() => {
        try {
            await getPokemonById(100000000);
        } catch (error: Error | unknown) {
            if (error instanceof Error) {
                expect(error.message).toBe('Pokemon no existe');
            }
        }
    });
});