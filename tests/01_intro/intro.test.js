import { returNullable, sum } from './intro.js';

describe('sum function: ', () => {
  test('должна вернуть сумму дух чисел', () => {
    expect(sum(1, 2)).toBe(3); // для примитивов
    expect(sum(1, 2)).toEqual(3); // для ссылочных типов
    expect(sum(1, 2)).toBeGreaterThan(2);
    expect(sum(1, 2)).toBeGreaterThanOrEqual(1);
    expect(sum(1, 2)).toBeLessThan(4);
    expect(sum(1, 2)).toBeLessThanOrEqual(5);
  });

  test('должна складывать вещественные числа', () => {
    expect(sum(0.1, 0.2)).toBeCloseTo(0.3); // округляет результат 0.3000000004
  });
});

describe('returnNullable', () => {
  test('должна вернуть null', () => {
    expect(returNullable()).toBeNull();
    expect(returNullable()).toBeFalsy(); // undefined, null, 0, '', false
    expect(returNullable()).toBeDefined(); // не undefined
    expect(returNullable()).not.toBeTruthy(); // не истено; truthy - проверить истенность значения
    expect(returNullable()).not.toBeUndefined();
  });
});
