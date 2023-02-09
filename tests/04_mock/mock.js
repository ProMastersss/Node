export function map(arr, callback) {
  const result = [];

  for (let index = 0; index < arr.length; index++) {
    const element = arr[index];

    result.push(callback(element, index, arr));
  }

  return result;
}
