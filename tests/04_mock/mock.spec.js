import { map } from './mock';
import { jest } from '@jest/globals';

describe('Map function', () => {
  let arr;
  let callback;

  beforeEach(() => {
    arr = [1, 2, 3, 4, 5];
    callback = jest.fn((item) => item * 2);
    map(arr, callback);
  });

  test('должен вызвать колбек', () => {
    expect(callback).toBeCalled();
    expect(callback).toBeCalledTimes(5);
    expect(callback.mock.calls.length).toBe(5);
  });

  test('должен элементы массива умножить на два', () => {
    const results = [2, 4, 6, 8, 10];

    callback.mock.results.forEach((result, index) =>
      expect(result.value).toBe(results[index])
    );
  });

  test('должен вернуть mock value', () => {
    callback.mockReturnValueOnce(100).mockReturnValue(200);

    expect(callback()).toBe(100);
    expect(callback()).toBe(200);
    expect(callback()).toBe(200);
  });
});
