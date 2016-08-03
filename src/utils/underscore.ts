export function isPresent(val: any) {
  return val !== undefined && val !== null;
}

export function base64Encode(str: string) {
  if (typeof btoa !== 'undefined') {
    return btoa(str);
  } else if (typeof Buffer !== 'undefined') {
    return new Buffer(str).toString('base64');
  } else {
    return null;
  }
}

export function encodeObjectForUrlParams(data: any):string {
  if (!data) {
      return '';
  }

  return Object.keys(data).map((key) => {
    const snakeKey = camelToSnakeCase(key);

    return [snakeKey, data[key]].map(encodeURIComponent).join('=');
  }).join('&');
}

export function camelToSnakeCase(str: string): string {
  return str.replace(/([A-Z])/g, function($1) {
    return '_' + $1.toLowerCase();
  });
}
