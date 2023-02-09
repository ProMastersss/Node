import { Lodash } from './sync.js';

const _ = new Lodash();

describe('compact', () => {
  let arr;

  // beforeAll, afterEach, afterAll
  beforeEach(() => {
    arr = [1, false, null, 0, '', 'hello', undefined, true];
  });

  test('должен быть определен', () => {
    expect(_.compact).toBeDefined();
  });

  test('cоздает массив, в котором удалены все ложные значения. Значения false, null, 0, "", undefined, и NaNявляются ложными.', () => {
    const result = [1, 'hello', true];

    expect(_.compact(arr)).toEqual(result);
  });

  test('возвращает массив с истенными значениями', () => {
    expect(_.compact(arr)).not.toContain(false);
    expect(_.compact(arr)).not.toContain(null);
    expect(_.compact(arr)).not.toContain(0);
    expect(_.compact(arr)).not.toContain('');
    expect(_.compact(arr)).not.toContain(undefined);
  });

  test('groupBy: группирует массив по заданному свойству', () => {
    //
  });
});

describe('groupBy', () => {
  test('должен быть определен', () => {
    expect(_.groupBy).toBeDefined();
  });

  test('должен сгруппировать по функции Math.floor', () => {
    const arr = [1.1, 1.9, 2.5, -1.1, -1.9, -2.2];
    const result = {
      1: [1.1, 1.9],
      2: [2.5],
      '-2': [-1.1, -1.9],
      '-3': [-2.2],
    };

    const output = _.groupBy(arr, Math.floor);
    expect(output).toEqual(result);
    expect(output).toBeInstanceOf(Object);
  });
});
