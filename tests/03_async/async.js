import axios from 'axios';

export class Ajax {
  static echo(data) {
    return new Promise((res, rej) => {
      setTimeout(() => {
        return data ? res(data) : rej(new Error('data undefined'));
      }, 1000);
    });
  }
}

export async function getTodo(id) {
  const response = await axios.get(
    'https://jsonplaceholder.typicode.com/todos/' + id
  );
  return response.data;
}
