export class Lodash {
  compact(arr) {
    return arr.filter((item) => !!item);
  }

  groupBy(arr, prop) {
    const result = {};

    arr.forEach((item) => {
      let key;
      if (prop instanceof Function) {
        key = prop(item);
      } else if (prop instanceof String && item instanceof Object) {
        key = item[prop];
      } else {
        throw new Error('Не удалось сгруппировать массив');
      }

      if (!result[key]) {
        result[key] = [];
      }

      result[key].push(item);
    });

    return result;
  }
}
