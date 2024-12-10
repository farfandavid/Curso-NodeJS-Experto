import { getAge } from "../../src/plugins";

describe('plugin/get-age.plugin',()=>{
    test('getAge() should return the age of the user',()=>{
        const birthdate = '1995-12-17'
        const age = getAge(birthdate);
        expect(age).toBe(29);
    });

    test('getAge() should return current age',()=>{
        const birthdate = '1995-12-17'
        const age = getAge(birthdate);
        const calculatedAge = new Date().getFullYear() - new Date(birthdate).getFullYear();
        expect(age).toBe(calculatedAge);
    });

    test('getAge() should return 0 years',()=>{
        const spy = jest.spyOn(Date.prototype, 'getFullYear').mockReturnValue(1995);
        const birthdate = '1995-12-17'
        const age = getAge(birthdate);
        expect(age).toBe(0);
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith();
    })
})