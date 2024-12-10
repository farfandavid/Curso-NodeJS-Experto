import { httpClient } from "../../src/plugins";

describe('plugin/http-client', () => {
  test('should return a valid response', async () => {
    const data = await httpClient.get('https://jsonplaceholder.typicode.com/todos/1');
    expect(data).toEqual({
        userId: 1,
        id: 1,
        title: "delectus aut autem",
        completed: expect.any(Boolean)
    })
    expect(data.userId).toBe(1);
  });

  it('should throw an error when calling post', async () => {
    // POST, PUT and DELETE are not implemented yet
    
    // POST
    await expect(httpClient.post('https://jsonplaceholder.typicode.com/todos/1', {})).rejects.toThrow('Not implemented yet');
    // PUT
    await expect(httpClient.put('https://jsonplaceholder.typicode.com/todos/1', {})).rejects.toThrow('Not implemented yet');
    // DELETE
    await expect(httpClient.delete('https://jsonplaceholder.typicode.com/todos/1')).rejects.toThrow('Not implemented yet');
  });

});