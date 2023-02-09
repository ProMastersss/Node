function isArray(data) {
  return Array.isArray(data);
}

function isEmpty(data) {
  switch (typeof data) {
    case 'string':
      return data.length === 0;

    case 'number':
      return data === 0;

    case 'boolean':
      return data === false;

    case 'object':
      return data === null || Object.keys(data).length === 0;

    default:
      return !Boolean(data);
  }
}

function isNotEmpty(data) {
  return !isEmpty(data);
}

function arrayToString(data) {
  if (isArray(data)) {
    return data.join('; ');
  }

  throw new Error('arrayToString: data not array');
}

export default { isArray, isEmpty, isNotEmpty, arrayToString };
