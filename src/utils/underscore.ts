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
