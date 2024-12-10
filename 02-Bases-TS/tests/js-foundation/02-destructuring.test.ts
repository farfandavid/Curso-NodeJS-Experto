import { characters } from "../../src/js-foundation/02-destructuring";

describe('js-foundation/02-destructuring', () => {
    test('characters should containt Flash and Batman', () => {
       /*  const [flash, batman] = characters;
        expect(flash).toBe('Flash');
        expect(batman).toBe('Batman'); */
        expect(characters).toContain('Flash');
        expect(characters).toContain('Batman');
    });

    test('firstCharacter should be Flash', () => {
        const [firstCharacter] = characters;
        expect(firstCharacter).toBe('Flash');
    });
});