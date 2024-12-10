import { getUserById } from "../../src/js-foundation/03-callbacks";

describe('js-foundation/03-callbacks', () => {
    test('getUserById should return an error if user is not found', (done) => {
        const id = 10;
        getUserById(id , (err, user)=> {
            expect(err).toBe(`User not found with id ${id}`);
            expect(user).toBeUndefined();
        })
        done();
    });
    /* test('getUserById should return an error if user is not found', (done) => {
        getUserById(3, (err, user) => {
            expect(err).toBe('User not found with id 3');
            expect(user).toBeUndefined();
            done();
        });
    }); */
    test('getUserById should return id=1 user=John Doe', (done) => {
        getUserById(1, (err, user) => {
            expect(err).toBeUndefined();
            expect(user).toEqual({ id: 1, name: 'John Doe' });
            done();
        });
    });
});