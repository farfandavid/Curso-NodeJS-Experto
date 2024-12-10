import { buildMakePerson } from "../../src/js-foundation/05-factory";
//import { getAge, getUUID } from "../../src/plugins";

describe('js-foundation/05-factory', () => {
  test('should create a person', () => {
    const getAge = (birthdate: string)=> 35;
    const getUUID = ()=> '1234';
    const makePerson = buildMakePerson({getAge,getUUID});
    const person = makePerson({ name: 'Jane', birthdate: '1990-01-01' });
    expect(person).toEqual({ 
        name: 'Jane', 
        age: 35, 
        birthdate: '1990-01-01', 
        id: '1234' 
    });
  });
});