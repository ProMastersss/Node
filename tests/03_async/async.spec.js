import { Ajax, getTodo } from './async';
import { jest } from '@jest/globals';
import axios from 'axios';

jest.mock('axios');

describe('Ajax: echo', () => {
  test('должен вернуть переданную строку ассинхронно', async () => {
    const result = await Ajax.echo('transmitted string');

    expect(result).toBe('transmitted string');
  });

  test('должен вернуть переданную строку с промисом', () => {
    return Ajax.echo('transmitted string').then((data) =>
      expect(data).toBe('transmitted string')
    );
  });

  test('должен вернуть ошибку с промисом', () => {
    return Ajax.echo().catch((err) => expect(err).toBeInstanceOf(Error));
  });

  test('должен вернуть ошибку ассинхронно', async () => {
    try {
      await Ajax.echo();
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });
});

describe('axios', () => {
  test('should return todo', () => {
    const returnTodo = { data: { id: 1, title: 'Title todo 1' } };

    axios.get.mockImplementation(() => Promise.resolve(returnTodo));

    return getTodo(1).then((res) => {
      expect(res).toEqual({ id: 1, title: 'Title todo 1' });
    });
  });
});
