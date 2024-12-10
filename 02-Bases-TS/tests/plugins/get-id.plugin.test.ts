import { getUUID } from "../../src/plugins"

describe('plugin/get-id.plugin',()=>{
    test('should return the id',()=>{   
        const uuid = getUUID();
        expect(typeof uuid).toBe('string');
        expect(uuid.length).toBe(36);
    })
})